import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ApiService } from "../services/api";
import { motion } from "motion/react";
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
}

export default function SignupPage({ onNavigate, onLoginSuccess }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please fill in all details.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Call backend to save user profile doc in Firestore
      await ApiService.registerUser(user.uid, email, name);

      onLoginSuccess({
        ...user,
        displayName: name
      });
      onNavigate("dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email & Password registration is not enabled in the Firebase Console. Please go to your Firebase Console -> Authentication -> Sign-in Method tab and enable 'Email/Password'.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync user profile on the backend
      await ApiService.loginUser(user.uid).catch(async () => {
        // If profile doesn't exist, register it
        return ApiService.registerUser(user.uid, user.email || "", user.displayName || "Google User");
      });

      onLoginSuccess(user);
      onNavigate("dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/popup-blocked") {
        setError("Popup blocked by browser. Please allow popups for this site.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in popup was closed before completion.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized. Please add 'localhost' (or your current hosting domain) to the Authorized Domains list in the Firebase Console -> Authentication -> Settings tab.");
      } else {
        setError(err.message || "Google Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1016] text-slate-100 flex flex-col justify-center relative px-6 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Nav back button */}
      <button
        onClick={() => onNavigate("landing")}
        className="absolute top-6 left-6 flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Main</span>
      </button>

      <div className="w-full max-w-md mx-auto relative neomorph-card p-8 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md shadow-blue-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SkillBridge
            </span>
            <span className="px-1.5 py-0.5 text-[9px] bg-white/10 border border-white/10 text-slate-300 rounded font-mono font-bold">
              AI
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-3">
            Create Profile
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Register to join the multi-agent career intelligence network
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl flex items-start space-x-2 text-xs">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Antigravity"
                required
                disabled={loading}
                className="w-full neomorph-inset-input pl-10 pr-4 py-3 text-sm focus:outline-none text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={loading}
                className="w-full neomorph-inset-input pl-10 pr-4 py-3 text-sm focus:outline-none text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={loading}
                className="w-full neomorph-inset-input pl-10 pr-10 py-3 text-sm focus:outline-none text-slate-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 neomorph-button-primary font-bold text-sm text-white flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Registering Account...</span>
              </span>
            ) : (
              <>
                <span>Create Platform Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mt-3 py-3 neomorph-button text-slate-300 hover:text-white text-sm font-semibold flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.682 1.22 6.62l4.046 3.145z"
              />
              <path
                fill="#4285F4"
                d="M16.04 15.345c-1.037.69-2.34 1.109-4.04 1.109a7.077 7.077 0 0 1-6.734-4.855L1.22 14.745C3.23 18.682 7.27 21.364 12 21.364c3.127 0 5.964-1.009 8.027-2.79l-4.027-3.23z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 11.6c0-.527.09-1.036.255-1.518L1.475 6.936A11.83 11.83 0 0 0 0 12c0 1.836.418 3.573 1.164 5.127l4.136-3.236a7.12 7.12 0 0 1-.034-2.29z"
              />
              <path
                fill="#34A853"
                d="M23.49 12.273c0-.8-.073-1.573-.209-2.318H12v4.545h6.455a5.556 5.556 0 0 1-2.41 3.645l4.028 3.23c2.355-2.173 3.418-5.382 3.418-8.828z"
              />
            </svg>
            <span>Sign Up with Google</span>
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Already registered?{" "}
          <button
            onClick={() => onNavigate("login")}
            className="text-blue-400 hover:underline font-semibold"
          >
            Sign In Here
          </button>
        </p>
      </div>
    </div>
  );
}
