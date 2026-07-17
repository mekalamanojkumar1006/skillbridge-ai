import React, { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { sendEmailVerification, signOut, updateEmail } from "firebase/auth";
import { ApiService } from "../services/api";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowLeft, RefreshCw, LogOut, CheckCircle, AlertCircle, Sun, Moon, Inbox, Edit3 } from "lucide-react";
import ResponsiveContainer from "../components/ResponsiveContainer";

interface VerifyEmailPageProps {
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  onLogout: () => Promise<void>;
}

export default function VerifyEmailPage({ onNavigate, theme, setTheme, onLogout }: VerifyEmailPageProps) {
  const [userEmail, setUserEmail] = useState(auth.currentUser?.email || "");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // State for email editing option
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState(userEmail);

  // Auto-check verification status every 7 seconds
  useEffect(() => {
    const checkVerificationInterval = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await currentUser.reload();
          if (currentUser.emailVerified) {
            clearInterval(checkVerificationInterval);
            handleVerificationSuccess();
          }
        } catch (e) {
          console.warn("Auto-check verification reload failed:", e);
        }
      }
    }, 7000);

    return () => clearInterval(checkVerificationInterval);
  }, []);

  // Cooldown countdown effect for Resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerificationSuccess = async () => {
    setVerifying(true);
    setError(null);
    try {
      // Sync verification status on the database backend
      await ApiService.verifySuccess();
      setSuccess("Your email has been verified successfully!");
      setTimeout(() => {
        onNavigate("dashboard");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update profile verification status on server.");
    } finally {
      setVerifying(false);
    }
  };

  const handleCheckVerified = async () => {
    setVerifying(true);
    setError(null);
    setSuccess(null);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Session expired. Please sign in again.");
        return;
      }
      
      // Reload Firebase User
      await currentUser.reload();
      
      if (currentUser.emailVerified) {
        await handleVerificationSuccess();
      } else {
        setError("Email not verified yet. Please check your inbox (and spam folder) and try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to verify email status: " + (err.message || "Network Error"));
    } finally {
      setVerifying(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Session expired. Please sign in again.");
        return;
      }

      await sendEmailVerification(currentUser);
      setSuccess("Verification email sent successfully. Please check your inbox!");
      setResendCooldown(60);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please wait a few moments and try again.");
      } else {
        setError(err.message || "Failed to resend verification email.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmailInput.trim() || newEmailInput === userEmail) {
      setIsEditingEmail(false);
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("Session expired. Please sign in again.");
        return;
      }

      await updateEmail(currentUser, newEmailInput);
      await sendEmailVerification(currentUser);
      
      setUserEmail(newEmailInput);
      setIsEditingEmail(false);
      setSuccess("Email updated and verification dispatch sent successfully!");
      setResendCooldown(60);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/requires-recent-login") {
        setError("Security precaution: Changing email requires a recent login. Please log out and sign back in to modify email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address format.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("This email address is already in use by another account.");
      } else {
        setError(err.message || "Failed to update email address.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans">
      <ResponsiveContainer className="flex flex-col justify-center items-center min-h-screen">
      
      {/* Background Clay Spheres */}
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
        className="absolute top-[10%] left-[10%] w-48 h-48 rounded-full bg-gradient-to-br from-[#6D5DF6]/15 to-[#8B5CF6]/5 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 40, 0],
          x: [0, -25, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-[#8B5CF6]/15 to-pink-500/5 blur-[100px] pointer-events-none"
      />

      {/* Header Toolbar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto relative glass-card glowing-border p-8 sm:p-10 z-10 text-center space-y-6"
      >
        <div className="flex flex-col items-center">
          <div className="p-4.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-3xl mb-4 animate-pulse shadow-md">
            <Mail className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Verify your Email</h2>
          
          <p className="text-xs text-[var(--color-text-secondary)] mt-2 font-medium leading-relaxed max-w-sm">
            We have sent a verification link to <span className="font-mono text-[#6D5DF6] font-bold">{userEmail}</span>. Please verify your email before continuing.
          </p>
        </div>

        {/* Action Feedbacks */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold text-left"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold text-left"
            >
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Change email block */}
        {isEditingEmail ? (
          <form onSubmit={handleUpdateEmail} className="flex space-x-2 animate-fade-in">
            <input
              type="email"
              value={newEmailInput}
              onChange={(e) => setNewEmailInput(e.target.value)}
              required
              disabled={loading}
              className="flex-1 clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none"
              placeholder="Correct email address"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 clay-btn clay-btn-primary text-[10px] font-mono uppercase tracking-wider font-semibold text-white cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditingEmail(false)}
              className="px-3 py-2 clay-btn clay-btn-secondary text-[10px] font-mono uppercase tracking-wider font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditingEmail(true)}
            className="inline-flex items-center space-x-1 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Change Email / Correct Typo</span>
          </button>
        )}

        {/* Buttons List */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleOpenGmail}
            className="w-full py-3.5 bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] text-white font-semibold text-xs rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 cursor-pointer transition"
          >
            <Inbox className="w-4 h-4" />
            <span>Open Gmail</span>
          </button>

          <button
            onClick={handleCheckVerified}
            disabled={verifying}
            className="w-full py-3.5 clay-btn clay-btn-primary font-semibold text-xs text-white flex items-center justify-center space-x-2 cursor-pointer"
          >
            {verifying ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span>I've Verified My Email</span>
            )}
          </button>

          <button
            onClick={handleResendEmail}
            disabled={resendCooldown > 0 || loading}
            className={`w-full py-3.5 clay-btn clay-btn-secondary text-xs font-semibold flex items-center justify-center cursor-pointer ${
              resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendCooldown > 0 ? (
              <span>Resend in {resendCooldown}s</span>
            ) : (
              <span>Resend Verification Email</span>
            )}
          </button>
        </div>

        {/* Spam Reminder & Log out */}
        <div className="border-t border-[var(--color-border)] pt-4 flex flex-col items-center space-y-3">
          <p className="text-[10px] text-[var(--color-text-tertiary)] italic">
            Don't see the email? Please check your <b>Spam or Junk folder</b>.
          </p>

          <button
            onClick={onLogout}
            className="inline-flex items-center space-x-1.5 text-xs text-red-500 font-bold hover:underline cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out and exit</span>
          </button>
        </div>
      </motion.div>
      </ResponsiveContainer>
    </div>
  );
}
