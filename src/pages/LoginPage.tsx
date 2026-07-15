import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { ApiService } from "../services/api";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle,
  FileText,
  Map,
  Search,
  MessageSquare,
  Sparkles
} from "lucide-react";

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

  // Success states
  const [showSuccess, setShowSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState<any>(null);

  // Inline Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

  // Real-time Email validation
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (!val) {
      setEmailError(null);
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError(null);
      }
    }
  };

  // Real-time Password validation
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (!val) {
      setPasswordError(null);
    } else {
      if (val.length < 6) {
        setPasswordError("Password must be at least 6 characters");
      } else {
        setPasswordError(null);
      }
    }
  };

  // Login execution handler
  const executeLoginSuccess = (user: any) => {
    setSuccessUser(user);
    setShowSuccess(true);
    // Delay routing slightly to show the beautiful confirmation checkmark
    setTimeout(() => {
      onLoginSuccess(user);
      onNavigate("dashboard");
    }, 1300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Final checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Handle remember me persistence
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
        return ApiService.registerUser(user.uid, user.email || "", user.displayName || "");
      });

      executeLoginSuccess(user);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password combination.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email & Password sign-in is not enabled in Firebase Console.");
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
        return ApiService.registerUser(user.uid, user.email || "", user.displayName || "Google User");
      });

      executeLoginSuccess(user);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/popup-blocked") {
        setError("Popup blocked by browser. Please allow popups for this site.");
      } else if (err.code === "auth/popup-closed-by-user") {
        setError("Google sign-in popup was closed before completion.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized. Please add it in Firebase Console.");
      } else {
        setError(err.message || "Google Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const featuresList = [
    { label: "ATS Resume Analysis", icon: FileText, desc: "Visual deficit summaries and keyword optimization logs." },
    { label: "AI Career Roadmap", icon: Map, desc: "Step-by-step milestones to land your target software role." },
    { label: "Smart Job Matching", icon: Search, desc: "Real-time listings fetched from global API boards." },
    { label: "AI Interview Preparation", icon: MessageSquare, desc: "Interactive mock simulator with voice waves feedback." }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans">
      
      {/* Top Floating Utility Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
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

      {/* LEFT SIDE (45%) - Large Hero Section */}
      <div className="hidden md:flex md:w-[45%] flex-col justify-center relative p-12 lg:p-16 bg-gradient-to-br from-[#6D5DF6]/5 to-[#8B5CF6]/10 border-r border-[var(--color-border)] overflow-hidden min-h-screen">
        
        {/* Animated Background Spheres */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-56 h-56 rounded-full bg-gradient-to-br from-[#6D5DF6]/10 to-[#8B5CF6]/5 blur-[60px] pointer-events-none"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-indigo-500/5 blur-[80px] pointer-events-none"
        />

        {/* Hero Copy */}
        <div className="relative z-10 space-y-8 max-w-md">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-none bg-gradient-to-r from-[#6D5DF6] to-[#8B5CF6] bg-clip-text text-transparent">
              Welcome to SkillBridge AI
            </h1>
            <p className="text-sm font-sans font-semibold text-[var(--color-text-secondary)] leading-relaxed">
              Your AI-powered Career Intelligence Platform
            </p>
          </div>

          {/* Highlights Checklist */}
          <div className="space-y-4 pt-4">
            {featuresList.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white/40 dark:bg-[#1E293B]/40 border border-white/50 dark:border-white/5 shadow-sm hover:translate-x-1.5 transition duration-300"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-[#6D5DF6] shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-[var(--color-text-primary)]">{feat.label}</h4>
                    <p className="text-[10px] text-[var(--color-text-secondary)] font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Platform Stat Tag */}
          <div className="pt-6 border-t border-[var(--color-border)] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#8B5CF6] animate-pulse" />
            <span className="text-[10.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold tracking-wider">
              Powered by advanced neural evaluation metrics
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (55%) - Centered Claymorphic Login Card */}
      <div className="w-full md:w-[55%] flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen relative">
        
        {/* Mobile Background Blob */}
        <div className="absolute top-[25%] left-[20%] w-48 h-48 rounded-full bg-[#6D5DF6]/5 blur-[60px] md:hidden pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative glass-card p-8 sm:p-10 z-10"
        >
          {/* Success Animation Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[var(--clay-card-bg)] rounded-[28px] flex flex-col items-center justify-center p-8 z-30 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0.6, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#22C55E] drop-shadow-md" />
                </motion.div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-[var(--color-text-primary)]">Sign In Successful</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium">
                    Welcome back! Syncing profile details & redirecting...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Header */}
          <div className="text-center mb-7">
            {/* Logo */}
            <div className="inline-flex items-center space-x-2.5 mb-3.5">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight">
                SkillBridge
              </span>
              <span className="px-1.5 py-0.2 text-[9px] bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-md font-mono font-black uppercase">
                AI
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">
              Welcome Back
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium font-sans">
              Sign in to continue your career journey
            </p>
          </div>

          {/* Global Auth Error Alerts */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="name@company.com"
                  required
                  disabled={loading}
                  aria-label="Email Address"
                  className={`w-full clay-input pl-10 pr-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 ${
                    emailError ? "border-red-500 focus:ring-red-500/30" : "focus:ring-indigo-500/30"
                  }`}
                />
              </div>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10.5px] text-red-500 font-medium"
                >
                  {emailError}
                </motion.p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-tertiary)]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={loading}
                  aria-label="Password"
                  className={`w-full clay-input pl-10 pr-10 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 ${
                    passwordError ? "border-red-500 focus:ring-red-500/30" : "focus:ring-indigo-500/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10.5px] text-red-500 font-medium"
                >
                  {passwordError}
                </motion.p>
              )}
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center justify-between text-xs pt-1 select-none">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-[var(--color-text-secondary)] font-medium">Remember me</span>
              </label>
            </div>

            {/* Sign In Primary Button */}
            <button
              type="submit"
              disabled={loading || !!emailError || !!passwordError}
              className="w-full mt-4 py-3.5 clay-btn clay-btn-primary font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center space-x-2 shadow-lg disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Separator */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[var(--color-border)]"></div>
              <span className="flex-shrink mx-4 text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                OR
              </span>
              <div className="flex-grow border-t border-[var(--color-border)]"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 clay-btn clay-btn-secondary text-[var(--color-text-primary)] text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2.5 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Create Account route button */}
          <p className="mt-8 text-center text-xs text-[var(--color-text-secondary)] font-medium">
            New to SkillBridge?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
