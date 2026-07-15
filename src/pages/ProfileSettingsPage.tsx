import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  Lock, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Link2, 
  Unlink, 
  RefreshCw, 
  UserCheck, 
  Key, 
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { auth } from "../lib/firebase";
import { 
  updateProfile, 
  EmailAuthProvider, 
  linkWithCredential,
  GoogleAuthProvider,
  linkWithPopup,
  unlink
} from "firebase/auth";
import { ApiService } from "../services/api";

interface ProfileSettingsPageProps {
  user: any;
  onUpdateUser: (updatedUser: any) => void;
  onResetResume: () => void;
  onNavigateBack: () => void;
}

export default function ProfileSettingsPage({ 
  user, 
  onUpdateUser, 
  onResetResume, 
  onNavigateBack 
}: ProfileSettingsPageProps) {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Link Account States
  const [linkEmail, setLinkEmail] = useState("");
  const [linkPassword, setLinkPassword] = useState("");
  const [linking, setLinking] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  // Providers list
  const [providers, setProviders] = useState<any[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Reset data states
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setProviders(currentUser.providerData);
      setIsAnonymous(currentUser.isAnonymous);
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setProfileError("Display name cannot be empty.");
      return;
    }

    setLoadingProfile(true);
    setProfileError(null);
    setProfileSuccess(false);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // 1. Update Firebase Auth Profile
        await updateProfile(currentUser, { displayName: displayName.trim() });
        
        // 2. Sync to Firestore backend
        await ApiService.updateProfile(currentUser.uid, displayName.trim());

        // 3. Update parent React App state
        onUpdateUser({
          ...user,
          displayName: displayName.trim()
        });

        setProfileSuccess(true);
      } else {
        throw new Error("No active authenticated session found.");
      }
    } catch (err: any) {
      console.error(err);
      setProfileError(err.message || "Failed to update profile details.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleLinkEmailPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkEmail.trim() || !linkPassword.trim()) {
      setLinkError("Please provide both email and a strong password.");
      return;
    }
    if (linkPassword.length < 6) {
      setLinkError("Password must be at least 6 characters.");
      return;
    }

    setLinking(true);
    setLinkError(null);
    setLinkSuccess(false);

    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const credential = EmailAuthProvider.credential(linkEmail.trim(), linkPassword.trim());
        await linkWithCredential(currentUser, credential);
        
        // Re-sync with database to ensure email is saved in Firestore
        await ApiService.updateProfile(currentUser.uid, currentUser.displayName || displayName || linkEmail.split("@")[0]);
        
        // Refresh local UI states
        setIsAnonymous(currentUser.isAnonymous);
        setProviders(currentUser.providerData);
        onUpdateUser({
          ...user,
          email: currentUser.email,
          displayName: currentUser.displayName || displayName
        });

        setLinkSuccess(true);
        setLinkEmail("");
        setLinkPassword("");
      } else {
        throw new Error("No active session to link.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/operation-not-allowed") {
        setLinkError("Email & Password authentication is not enabled in the Firebase Console. Please ask the developer to enable it.");
      } else {
        setLinkError(err.message || "Failed to link credentials. The email may already be in use.");
      }
    } finally {
      setLinking(false);
    }
  };

  const handleLinkGoogle = async () => {
    setLinkError(null);
    setLinkSuccess(false);
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(currentUser, provider);
      
      setProviders(currentUser.providerData);
      setIsAnonymous(currentUser.isAnonymous);
      
      onUpdateUser({
        ...user,
        displayName: currentUser.displayName || user.displayName
      });
      setLinkSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/popup-blocked" || err.code === "auth/popup-closed-by-user") {
        setLinkError("Authentication popup was blocked or closed. Please allow popups or try again in a new tab.");
      } else if (err.code === "auth/unauthorized-domain") {
        setLinkError("This domain is not authorized. Please add your current hosting domain to Authorized Domains in Firebase Console.");
      } else {
        setLinkError(err.message || "Failed to link Google account.");
      }
    }
  };

  const handleUnlinkProvider = async (providerId: string) => {
    if (providers.length <= 1 && !isAnonymous) {
      setLinkError("You cannot unlink your only login provider.");
      return;
    }

    if (!window.confirm(`Are you sure you want to disconnect ${providerId}?`)) {
      return;
    }

    setLinkError(null);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await unlink(currentUser, providerId);
        setProviders(currentUser.providerData);
        setLinkSuccess(true);
      }
    } catch (err: any) {
      console.error(err);
      setLinkError(err.message || "Failed to unlink provider.");
    }
  };

  const handleResetData = async () => {
    if (confirmText !== "DELETE ALL") {
      setResetError("Please type 'DELETE ALL' exactly to confirm reset.");
      return;
    }

    setResetting(true);
    setResetError(null);

    try {
      // Call backend to purge Firestore docs
      await ApiService.resetResumeData(user.uid);
      
      setResetSuccess(true);
      setShowResetConfirm(false);
      setConfirmText("");
      
      // Notify parent app to clear local resume state
      onResetResume();
    } catch (err: any) {
      console.error(err);
      setResetError(err.message || "Failed to purge account database.");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 sm:p-6 pb-24 text-[var(--color-text-primary)]">
      {/* Back Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onNavigateBack}
            className="p-3 bg-[var(--clay-card-bg)] hover:bg-[var(--color-bg-page)] rounded-2xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Profile Settings</h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium font-sans">Manage credentials, link logins, and control personal database records</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl font-mono font-bold uppercase tracking-wider">
          Secure Credentials
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Profile Summary Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="clay-card p-6 space-y-5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">Aesthetic Identity</h2>
            <div className="flex flex-col items-center justify-center p-5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-2xl text-white font-mono shadow-md mb-4 border border-white/20">
                {displayName ? displayName[0].toUpperCase() : user?.email?.[0].toUpperCase() || "U"}
              </div>
              <p className="text-sm font-extrabold text-[var(--color-text-primary)] text-center truncate w-full">{displayName || "Anonymous Professional"}</p>
              <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] text-center mt-1 truncate w-full">{user?.email || "Anonymous Guest Account"}</p>
            </div>
            
            <div className="text-xs text-[var(--color-text-secondary)] space-y-2.5 leading-relaxed font-sans">
              <p>Your workspace is secured with End-to-End Firebase Identity controls.</p>
              <p>Changes made here are instantly synchronized across your career profile, optimization tools, and AI assessors.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Action Forms */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Personal Details */}
          <section className="clay-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">Personal Details</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)]">Update how you appear across resumes and interview modules</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-secondary)] mb-2 font-bold">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full clay-input px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none"
                  placeholder="Enter your professional name"
                />
              </div>

              {profileError && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3.5 rounded-2xl font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              {profileSuccess && (
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl font-medium animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Identity synchronized and saved successfully!</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loadingProfile}
                  className="clay-btn clay-btn-primary px-5 py-3 text-xs tracking-wider uppercase text-white shadow-md disabled:opacity-50"
                >
                  {loadingProfile ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin mr-1.5" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4 mr-1.5" />
                      <span>Save Profile Details</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Account Linking */}
          <section className="clay-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold">Linked Accounts</h3>
                  <p className="text-[10px] text-[var(--color-text-secondary)]">Link authentication channels to protect and access career metadata</p>
                </div>
              </div>
              {isAnonymous && (
                <span className="px-2.5 py-0.5 text-[9px] bg-amber-500/15 border border-amber-500/35 text-amber-600 dark:text-amber-400 rounded-lg font-mono uppercase font-black">
                  Guest Mode
                </span>
              )}
            </div>

            {isAnonymous ? (
              <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3">
                  <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-amber-500">Save Your Progress Permanently!</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      You are using a temporary guest session. Register your credentials now to convert this session into a permanent lifetime account. All parsed resumes, ATS scores, and roadmaps will automatically carry over.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLinkEmailPassword} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 font-bold">Register Email</label>
                    <input
                      type="email"
                      required
                      value={linkEmail}
                      onChange={(e) => setLinkEmail(e.target.value)}
                      className="w-full clay-input px-3.5 py-2.5 text-xs focus:outline-none"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 font-bold">Setup Password</label>
                    <input
                      type="password"
                      required
                      value={linkPassword}
                      onChange={(e) => setLinkPassword(e.target.value)}
                      className="w-full clay-input px-3.5 py-2.5 text-xs focus:outline-none"
                      placeholder="Min. 6 characters"
                    />
                  </div>

                  {linkError && (
                    <div className="col-span-1 sm:col-span-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-2xl font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{linkError}</span>
                    </div>
                  )}

                  {linkSuccess && (
                    <div className="col-span-1 sm:col-span-2 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl font-medium">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Account upgraded and linked successfully! Use these credentials to log in next time.</span>
                    </div>
                  )}

                  <div className="col-span-1 sm:col-span-2 flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={linking}
                      className="clay-btn clay-btn-primary px-4 py-2.5 text-xs tracking-wider uppercase text-white shadow-md"
                    >
                      {linking ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          <span>Converting Account...</span>
                        </>
                      ) : (
                        <>
                          <Key className="w-3.5 h-3.5 mr-1.5" />
                          <span>Link Credentials</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium">
                  You are signed in via password credential authentication. Your account data is secured with absolute multi-tenant database rules.
                </div>
                
                {/* List Providers */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-sm">
                    <div className="flex items-center space-x-3.5">
                      <Mail className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs font-bold">Email & Password Auth</p>
                        <p className="text-[10px] text-[var(--color-text-tertiary)] font-mono">{user?.email}</p>
                      </div>
                    </div>
                    <span className="flex items-center space-x-1 text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 mr-0.5" />
                      <span>Linked</span>
                    </span>
                  </div>

                  {providers.some((p) => p.providerId === "google.com") ? (
                    <div className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-3.5">
                        <svg className="w-4.5 h-4.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.619 4.5 1.8l2.4-2.4C17.2 1.5 14.85.9 12.24.9c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.753 0 9.76-4.043 9.76-9.9 0-.6-.06-1.17-.16-1.715h-9.6z"/>
                        </svg>
                        <div>
                          <p className="text-xs font-bold">Google Account</p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)] font-mono">Linked social sign-in channel</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnlinkProvider("google.com")}
                        className="clay-btn clay-btn-danger px-3 py-1.5 text-[9px] uppercase tracking-wider font-bold"
                      >
                        <Unlink className="w-3 h-3 mr-1" />
                        <span>Disconnect</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] border-dashed rounded-2xl">
                      <div className="flex items-center space-x-3.5">
                        <svg className="w-4.5 h-4.5 text-[var(--color-text-tertiary)]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.619 4.5 1.8l2.4-2.4C17.2 1.5 14.85.9 12.24.9c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.753 0 9.76-4.043 9.76-9.9 0-.6-.06-1.17-.16-1.715h-9.6z"/>
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-[var(--color-text-secondary)]">Google Account</p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)]">Connect Google for quick one-click login</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLinkGoogle}
                        className="clay-btn clay-btn-secondary px-3 py-1.5 text-[9px] uppercase tracking-wider font-bold"
                      >
                        <Link2 className="w-3.5 h-3.5 mr-1" />
                        <span>Connect</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Reset Workspace Data */}
          <section className="bg-red-500/[0.02] border border-red-500/20 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold">Reset Workspace Data</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)]">Purge and clean your uploaded resumes, analyses, and learning models</p>
              </div>
            </div>

            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed space-y-2 font-sans font-medium">
              <p>Purging your data will permanently delete:</p>
              <ul className="list-disc pl-5 text-[11px] text-[var(--color-text-tertiary)] space-y-1.5">
                <li>Your uploaded resume file and its parsed structured data representation</li>
                <li>AI career rating score assessments and suggested improvements</li>
                <li>ATS profile optimization matches and learning suggestions</li>
                <li>Simulated interview performance score histories</li>
                <li>Your customized roadmap steps and career match recommendations</li>
              </ul>
              <p className="text-red-500 dark:text-red-400 font-bold pt-1.5 flex items-center"><ShieldAlert className="w-4 h-4 mr-1.5" /> This operation is destructive and completely irreversible.</p>
            </div>

            {resetSuccess && (
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl font-medium animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>All workspace data purged successfully. Dashboard reset complete.</span>
              </div>
            )}

            {!showResetConfirm ? (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="clay-btn clay-btn-danger px-5 py-3 text-xs tracking-wider uppercase text-white shadow-md"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  <span>Reset All Workspace Data</span>
                </button>
              </div>
            ) : (
              <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl space-y-4">
                <div className="flex items-start space-x-3">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-red-500">Extreme Warning: Final Deletion</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed mt-1">
                      To confirm deletion of your active resume profile, ATS ratings, and roadmaps, type <span className="font-mono font-bold bg-red-500/10 px-2 py-0.5 rounded-lg border border-red-500/20">DELETE ALL</span> in the field below.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="w-full clay-input px-4 py-3 text-xs focus:outline-none font-mono uppercase font-bold text-red-600 dark:text-red-400"
                    placeholder="Type DELETE ALL to purge"
                  />

                  {resetError && (
                    <div className="text-red-500 text-xs font-semibold leading-relaxed">
                      {resetError}
                    </div>
                  )}

                  <div className="flex space-x-3.5 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetConfirm(false);
                        setConfirmText("");
                        setResetError(null);
                      }}
                      className="px-4 py-2.5 text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={confirmText !== "DELETE ALL" || resetting}
                      onClick={handleResetData}
                      className="clay-btn clay-btn-danger px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold disabled:opacity-40"
                    >
                      {resetting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          <span>Purging...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                          <span>Confirm Permanent Deletion</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
