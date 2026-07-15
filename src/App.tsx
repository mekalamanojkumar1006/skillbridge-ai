import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import SplashLoader from "./components/SplashLoader";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import AnalysisPage from "./pages/AnalysisPage";

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("landing");
  const [user, setUser] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Global theme synchronized with local storage key matching DashboardPage
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("premium_roadmap_theme");
      return saved === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("premium_roadmap_theme", theme);
    } catch (e) {
      console.error(e);
    }
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // Monitor auth changes for auto-login
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setAuthChecking(true);
      if (firebaseUser) {
        // Build local user object
        const localUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Career Practitioner"
        };
        setUser(localUser);

        // Fetch latest resume from Firestore automatically in background
        const loadResume = async () => {
          try {
            const resumesRef = collection(db, "resumes");
            const q = query(resumesRef, where("userId", "==", firebaseUser.uid));
            const querySnapshot = await getDocs(q);
            const list: any[] = [];
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });

            if (list.length > 0) {
              // Sort by createdAt descending
              list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
              setResume(list[0]);
            }
          } catch (error) {
            console.error("Failed to restore latest resume:", error);
          }
        };
        loadResume();

        // Direct authenticated users to workspace
        setCurrentPage("dashboard");
      } else {
        setUser(null);
        setResume(null);
        setCurrentPage("landing");
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setResume(null);
      setCurrentPage("landing");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLoginSuccess = (loggedInUser: any) => {
    setUser({
      uid: loggedInUser.uid,
      email: loggedInUser.email,
      displayName: loggedInUser.displayName || loggedInUser.email?.split("@")[0] || "Career Practitioner"
    });
  };

  const handleResumeUploadSuccess = (uploadedResume: any) => {
    setResume(uploadedResume);
  };

  if (!splashComplete) {
    return <SplashLoader onComplete={() => setSplashComplete(true)} />;
  }

  if (authChecking) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === "light" ? "bg-[#F5F7FF] text-[#1F2937]" : "bg-[#0B0C10] text-[#F1F5F9]"}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
            Synchronizing profile auth...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "light" ? "bg-[#F5F7FF] text-[#1F2937]" : "bg-[#0B0C10] text-[#F1F5F9]"}`}>
      {currentPage === "landing" && (
        <LandingPage onNavigate={setCurrentPage} user={user} theme={theme} setTheme={setTheme} />
      )}
      {currentPage === "login" && (
        <LoginPage onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} theme={theme} setTheme={setTheme} />
      )}
      {currentPage === "signup" && (
        <SignupPage onNavigate={setCurrentPage} onLoginSuccess={handleLoginSuccess} theme={theme} setTheme={setTheme} />
      )}
      {currentPage === "dashboard" && user && (
        <DashboardPage
          user={user}
          resume={resume}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          onUpdateUser={(updatedUser: any) => setUser(updatedUser)}
          onResetResume={() => setResume(null)}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      {currentPage === "upload" && user && (
        <ResumeUploadPage
          userId={user.uid}
          onUploadSuccess={handleResumeUploadSuccess}
          onNavigate={setCurrentPage}
          theme={theme}
          setTheme={setTheme}
        />
      )}
      {currentPage === "analysis" && user && (
        <AnalysisPage user={user} resume={resume} onNavigate={setCurrentPage} theme={theme} setTheme={setTheme} />
      )}
    </div>
  );
}
