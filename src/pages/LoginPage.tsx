import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ApiService } from "../services/api";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, ArrowRight, Sun, Moon } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: (user: any) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function LoginPage({ onNavigate, onLoginSuccess, theme, setTheme }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Email from Remembered state
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("remembered_email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Handle remember me logic
      try {
        if (rememberMe) {
          localStorage.setItem("remembered_email", email);
        } else {
          localStorage.removeItem("remembered_email");
        }
      } catch (err) {
        console.error("Local storage remember me error:", err);
      }

      // Sync user profile on the backend
      await ApiService.loginUser(user.uid).catch(async () => {
        // If profile doesn't exist, register it
        return ApiService.registerUser(user.uid, user.email || "", user.displayName || "");
      });

      onLoginSuccess(user);
      onNavigate("dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password combination.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email & Password sign-in is not enabled in the Firebase Console. Please enable it in Authentication -> Sign-in Method.");
      } else {
        setError(err.message || "Authentication failed. Please try again.");
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
        setError("This domain is not authorized. Please add it to your Authorized Domains list in Firebase Console.");
      } else {
        setError(err.message || "Google Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative px-6 overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans">
      
      {/* Dynamic Background Blobs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[10%] w-60 h-60 rounded-full bg-gradient-to-br from-[#6D5DF6]/15 to-[#8B5CF6]/5 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 45, 0],
          x: [0, -30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-pink-500/5 blur-[100px] pointer-events-none"
      />

      {/* Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto relative glass-card glowing-border p-8 sm:p-10 z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2.5 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight">
              SkillBridge
            </span>
            <span className="px-2 py-0.5 text-[10px] bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-black uppercase">
              AI
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight mt-4">
            Welcome Back
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed">
            Sign in to continue building your AI career path
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-bold">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                required
                disabled={loading}
                className="w-full clay-input pl-10 pr-4 py-3.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                disabled={loading}
                className="w-full clay-input pl-10 pr-10 py-3.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password bar */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-[var(--color-text-secondary)] font-medium">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 clay-btn clay-btn-primary font-semibold text-sm text-white flex items-center justify-center space-x-2 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">or continue with</span>
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 clay-btn clay-btn-secondary text-[var(--color-text-primary)] text-sm font-semibold flex items-center justify-center space-x-2.5 shadow-md"
          >
            <svg className="w-4.5 h-4.5 mr-1" viewBox="0 0 24 24">
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
            <span>Google Workspace</span>
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-[var(--color-text-secondary)] font-medium">
          New to SkillBridge?{" "}
          <button
            onClick={() => onNavigate("signup")}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
          >
            Create an Account
          </button>
        </p>
      </motion.div>
    </div>
  );
}
