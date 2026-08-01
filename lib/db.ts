import { MongoClient, Db } from "mongodb";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// ==========================================
// 1. MONGODB ATLAS CONNECTION POOLING
// ==========================================
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || "";
let mongoClientPromise: Promise<MongoClient> | null = null;

if (mongoUri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(mongoUri, {
        maxPoolSize: 10,
        minPoolSize: 1,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
      });
      global._mongoClientPromise = client.connect();
    }
    mongoClientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(mongoUri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 30000,
    });
    mongoClientPromise = client.connect();
  }
}

export async function getMongoDb(): Promise<Db | null> {
  if (!mongoClientPromise) {
    return null;
  }
  try {
    const client = await mongoClientPromise;
    return client.db();
  } catch (err: any) {
    console.warn("MongoDB connection failed:", err.message);
    return null;
  }
}

// ==========================================
// 2. FIREBASE ADMIN SDK CONNECTION REUSE
// ==========================================
const trimVal = (val: any) => (typeof val === "string" ? val.trim() : val);

let localConfig: any = {};
try {
  const cfgPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(cfgPath)) {
    localConfig = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));
  }
} catch (e) {}

const firebaseConfig = {
  apiKey: trimVal(process.env.VITE_FIREBASE_API_KEY || localConfig.apiKey),
  authDomain: trimVal(process.env.VITE_FIREBASE_AUTH_DOMAIN || localConfig.authDomain),
  projectId: trimVal(process.env.VITE_FIREBASE_PROJECT_ID || localConfig.projectId),
  storageBucket: trimVal(process.env.VITE_FIREBASE_STORAGE_BUCKET || localConfig.storageBucket),
  messagingSenderId: trimVal(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || localConfig.messagingSenderId),
  appId: trimVal(process.env.VITE_FIREBASE_APP_ID || localConfig.appId),
  firestoreDatabaseId: trimVal(process.env.VITE_FIREBASE_DATABASE_ID || localConfig.firestoreDatabaseId)
};

export const inMemoryStore: Record<string, Record<string, any>> = {};
export let useMemoryFallback = false;

export function setMemoryFallback(val: boolean) {
  useMemoryFallback = val;
}

function hasLocalAdc(): boolean {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      return fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    } catch {
      return false;
    }
  }
  const appData = process.env.APPDATA || "";
  const home = process.env.HOME || process.env.USERPROFILE || "";
  const winPath = path.join(appData, "gcloud", "application_default_credentials.json");
  const unixPath = path.join(home, ".config", "gcloud", "application_default_credentials.json");
  try {
    return fs.existsSync(winPath) || fs.existsSync(unixPath);
  } catch {
    return false;
  }
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.FIREBASE_CONFIG) {
  const isGoogleCloud = process.env.K_SERVICE || process.env.GAE_SERVICE || process.env.GOOGLE_CLOUD_PROJECT;
  if (!isGoogleCloud && !hasLocalAdc()) {
    console.warn("No Google/Firebase credentials detected. Enabling in-memory database fallback.");
    useMemoryFallback = true;
  }
}

let firebaseApp: any = null;
if (!getApps().length) {
  try {
    firebaseApp = initializeApp({
      projectId: firebaseConfig.projectId
    });
  } catch (error: any) {
    console.warn("Failed to initialize Firebase Admin SDK. Enabling in-memory fallback. Error:", error.message);
    useMemoryFallback = true;
  }
} else {
  firebaseApp = getApp();
}

const config = firebaseConfig as any;
export const dbAdmin: Firestore | null = firebaseApp && config.firestoreDatabaseId
  ? getFirestore(firebaseApp, config.firestoreDatabaseId)
  : (firebaseApp ? getFirestore(firebaseApp) : null);

if (dbAdmin) {
  try {
    dbAdmin.settings({
      ignoreUndefinedProperties: true
    });
  } catch (error: any) {
    console.warn("Failed to set Firestore settings:", error.message);
  }
}

export const db = { adminFirestore: dbAdmin };
