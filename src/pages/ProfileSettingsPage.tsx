import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Mail, 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Link2, 
  Unlink, 
  RefreshCw, 
  UserCheck, 
  Key, 
  ArrowLeft,
  AlertCircle,
  Award,
  Calendar,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  FileCheck
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

  // Activity Commit Grid simulation
  const activityDays = Array.from({ length: 42 }, (_, i) => {
    const counts = [0, 1, 3, 2, 4, 0, 2, 1, 0, 3, 0, 4, 2, 1, 0, 0, 1, 2, 3, 0, 1];
    return counts[i % counts.length];
  });

  const achievements = [
    { title: "ATS Optimized", desc: "First resume match > 80%", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    { title: "Lab Prep Complete", desc: "Answered 3 simulated Qs", icon: Award, color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Roadmap Architect", desc: "Structured custom timeline", icon: Sparkles, color: "text-purple-500 bg-purple-500/10" }
  ];

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
    <div className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6 pb-24 text-[var(--color-text-primary)] font-sans">
      {/* Back Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onNavigateBack}
            className="p-3 bg-[var(--glass-card-bg)] hover:bg-[var(--color-bg-page)] rounded-2xl border border-[var(--color-glass-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Profile Settings</h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed">Manage security channels, achievements, and target parameters</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3.5 py-1 text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-[#6D5DF6] rounded-xl font-mono font-bold uppercase tracking-wider">
          Secured Session
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: profile identity and achievements widget */}
        <div className="space-y-6 lg:col-span-1">
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-extrabold border-b border-[var(--color-border)] pb-2.5">
              Candidate Card
            </h3>
            
            <div className="flex flex-col items-center justify-center p-6 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center font-black text-xl text-white shadow-md mb-3 font-mono">
                {displayName ? displayName[0].toUpperCase() : user?.email?.[0].toUpperCase() || "U"}
              </div>
              <p className="text-sm font-extrabold text-[var(--color-text-primary)] text-center truncate w-full">{displayName || "Career Professional"}</p>
              <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] text-center mt-1 truncate w-full">{user?.email || "Anonymous profile"}</p>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-black">Unlocked Achievements</span>
              {achievements.map((ach, i) => {
                const Icon = ach.icon;
                return (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl">
                    <div className={`p-2 rounded-lg shrink-0 ${ach.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate text-[var(--color-text-primary)]">{ach.title}</h4>
                      <p className="text-[10px] text-[var(--color-text-secondary)] truncate font-medium mt-0.5">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: editors & resets */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Identity editing form */}
          <section className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-[#6D5DF6] rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Personal Info</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">Update how you appear on report headers</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-2 font-bold">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full clay-input px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none"
                  placeholder="Professional Name"
                />
              </div>

              {profileError && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3.5 rounded-2xl font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              {profileSuccess && (
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl font-semibold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Details saved and synced successfully!</span>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loadingProfile}
                  className="clay-btn clay-btn-primary px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold shadow-md disabled:opacity-50"
                >
                  {loadingProfile ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Social credentials linking */}
          <section className="glass-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-[#8B5CF6] rounded-xl">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Login Integrations</h3>
                  <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">Link authorization credentials</p>
                </div>
              </div>
              {isAnonymous && (
                <span className="px-2 py-0.5 text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-md font-mono uppercase font-bold">
                  Guest Session
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
                      You are using a temporary guest session. Register your credentials now to convert this session into a permanent lifetime account.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLinkEmailPassword} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 font-bold">Email</label>
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
                    <label className="block text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest mb-1.5 font-bold">Password</label>
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
                    <div className="col-span-1 sm:col-span-2 flex items-center space-x-2 text-red-600 dark:text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-2xl font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{linkError}</span>
                    </div>
                  )}

                  {linkSuccess && (
                    <div className="col-span-1 sm:col-span-2 flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl font-semibold">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Account converted! Login credentials active.</span>
                    </div>
                  )}

                  <div className="col-span-1 sm:col-span-2 flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={linking}
                      className="clay-btn clay-btn-primary px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold shadow-md"
                    >
                      {linking ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" />
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <Key className="w-3.5 h-3.5 mr-1.5" />
                          <span>Link Account</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium">
                  Authentication linked providers list.
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-sm">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4.5 h-4.5 text-[#6D5DF6]" />
                      <div>
                        <p className="text-xs font-bold">Email Credentials</p>
                        <p className="text-[9px] text-[var(--color-text-tertiary)] font-mono">{user?.email}</p>
                      </div>
                    </div>
                    <span className="flex items-center space-x-1 text-[9px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 mr-0.5" />
                      <span>Active</span>
                    </span>
                  </div>

                  {providers.some((p) => p.providerId === "google.com") ? (
                    <div className="flex items-center justify-between p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-3.5">
                        <svg className="w-4.5 h-4.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.619 4.5 1.8l2.4-2.4C17.2 1.5 14.85.9 12.24.9c-5.523 0-10 4.477-10 10s4.477 10 10 10c5.753 0 9.76-4.043 9.76-9.9 0-.6-.06-1.17-.16-1.715h-9.6z"/>
                        </svg>
                        <div>
                          <p className="text-xs font-bold">Google SSO</p>
                          <p className="text-[9px] text-[var(--color-text-tertiary)] font-mono">Linked social provider</p>
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
                          <p className="text-xs font-bold text-[var(--color-text-secondary)]">Google Workspace</p>
                          <p className="text-[10px] text-[var(--color-text-tertiary)]">Connect Google login channel</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLinkGoogle}
                        className="clay-btn clay-btn-secondary px-3 py-1.5 text-[9px] uppercase tracking-wider font-bold animate-fade-in"
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

          {/* Activity Heat Grid */}
          <section className="glass-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#22C55E]" />
              <div>
                <h3 className="text-base font-black">Workspace Activity</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)] font-medium">Activity contributions across cognitive tools</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 items-center justify-center p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl">
              {activityDays.map((level, idx) => {
                let colorClass = "bg-gray-200 dark:bg-gray-800";
                if (level === 1) colorClass = "bg-indigo-300 dark:bg-indigo-950";
                if (level === 2) colorClass = "bg-[#6D5DF6]/50";
                if (level === 3) colorClass = "bg-[#6D5DF6]/85";
                if (level >= 4) colorClass = "bg-[#6D5DF6]";
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-[4px] shrink-0 transition duration-200 ${colorClass}`}
                    title={`Activity level: ${level}`}
                  />
                );
              })}
            </div>
          </section>

          {/* Data Reset panels */}
          <section className="bg-red-500/[0.02] border border-red-500/20 p-6 sm:p-8 rounded-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black">Reset Workspace Data</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)]">Purge and clean your uploaded resumes, analyses, and models</p>
              </div>
            </div>

            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed space-y-2 font-sans font-medium">
              <p>Purging your data will permanently delete:</p>
              <ul className="list-disc pl-5 text-[10px] text-[var(--color-text-tertiary)] space-y-1.5">
                <li>Your uploaded resume file and its parsed structured data representation</li>
                <li>AI career rating score assessments and suggested improvements</li>
                <li>ATS profile optimization matches and learning suggestions</li>
                <li>Simulated interview performance score histories</li>
              </ul>
              <p className="text-red-500 dark:text-red-400 font-bold pt-1.5 flex items-center"><ShieldAlert className="w-4.5 h-4.5 mr-1.5 shrink-0" /> This operation is destructive and completely irreversible.</p>
            </div>

            {resetSuccess && (
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-xs bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-2xl font-semibold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>All workspace data purged successfully.</span>
              </div>
            )}

            {!showResetConfirm ? (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="clay-btn clay-btn-danger px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold shadow-md"
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
                      className="clay-btn clay-btn-danger px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold disabled:opacity-40"
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
