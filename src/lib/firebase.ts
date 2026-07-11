import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import localConfig from "../../firebase-applet-config.json";

const trimVal = (val: any) => typeof val === "string" ? val.trim() : val;

const firebaseConfig = {
  apiKey: trimVal((import.meta as any).env.VITE_FIREBASE_API_KEY || localConfig.apiKey),
  authDomain: trimVal((import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || localConfig.authDomain),
  projectId: trimVal((import.meta as any).env.VITE_FIREBASE_PROJECT_ID || localConfig.projectId),
  storageBucket: trimVal((import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || localConfig.storageBucket),
  messagingSenderId: trimVal((import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || localConfig.messagingSenderId),
  appId: trimVal((import.meta as any).env.VITE_FIREBASE_APP_ID || localConfig.appId),
  firestoreDatabaseId: trimVal((import.meta as any).env.VITE_FIREBASE_DATABASE_ID || (localConfig as any).firestoreDatabaseId)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export default app;
