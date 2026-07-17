import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ApiService } from "../services/api";
import {
  User,
  LogOut,
  LayoutDashboard,
  FileText,
  Search,
  Map,
  MessageSquare,
  Award,
  Database,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Send,
  HelpCircle,
  Briefcase,
  CheckCircle,
  XCircle,
  ShieldCheck,
  ChevronRight,
  ClipboardList,
  RefreshCw,
  Settings,
  Code,
  UserCheck,
  Monitor,
  Server,
  Cpu,
  BarChart,
  Brain,
  Cloud,
  ShieldAlert,
  ArrowLeft,
  Clock,
  ArrowUpRight,
  Lock,
  Unlock,
  Moon,
  Sun,
  X,
  ChevronDown,
  ChevronUp,
  Search as SearchIcon,
  Bell,
  Star,
  Bookmark,
  MapPin,
  ExternalLink,
  ArrowRight,
  Target,
  Mic,
  Check,
  Copy,
  Trash,
  Upload
} from "lucide-react";
import ProfileSettingsPage from "./ProfileSettingsPage";
import ApplicationTracker from "../components/ApplicationTracker";
import ResumeManager from "../components/ResumeManager";
import AdminPanel from "../components/AdminPanel";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { CAREER_ROADMAPS, CareerPath, Milestone } from "../data/careersData";
import { ResponsiveContainer as RechartsResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart as ReChartsBarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area, Cell } from "recharts";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { jsPDF } from "jspdf";
import aptitudeQuestions from "../data/aptitudeQuestions.json";
import hrQuestions from "../data/hrQuestions.json";

const ATS_FRIENDLY_TEMPLATE = `[FIRST NAME] [LAST NAME]
[City, State, Zip Code] | [Phone Number] | [Email Address] | [LinkedIn Profile URL] | [GitHub Profile URL]

PROFESSIONAL SUMMARY
Highly motivated and results-driven [Professional Title] with [Number] years of experience in [Core Fields/Industries]. Proven track record of designing, building, and optimizing [Key Systems/Solutions]. Expert at leveraging [Core Technologies/Frameworks] to deliver high-performance applications and drive business success.

CORE COMPETENCIES & SKILLS
* Programming Languages: [Language 1], [Language 2], [Language 3]
* Frameworks & Libraries: [Framework 1], [Framework 2], [Framework 3]
* Cloud & DevOps: [Tool 1], [Tool 2], [Tool 3]
* Databases & Systems: [DB 1], [DB 2], [DB 3]
* Methodologies: Agile/Scrum, CI/CD pipelines, System Design, REST APIs

PROFESSIONAL EXPERIENCE
[Job Title/Role] | [Company Name], [City, State]
[Start Date (Month Year)] – [End Date (Month Year) or Present]
* Design, build, and maintain [system/component] using [technologies], improving performance/efficiency by [X]%.
* Collaborate with cross-functional teams to define requirements, design architectures, and release [projects/features] ahead of schedule.
* Implement [best practices/protocols], reducing error rates or downtime by [Y]%.
* Troubleshoot complex technical issues, optimize queries, and automate deployment workflows.

[Previous Job Title/Role] | [Previous Company Name], [City, State]
[Start Date (Month Year)] – [End Date (Month Year)]
* Engineered [solution/platform] that supported [number] active users and processed [number] transactions daily.
* Integrated [third-party APIs/services], enhancing platform utility and reducing processing latency by [Z]%.
* Participated in code reviews, authored technical documentations, and mentored junior developers.

EDUCATION
[Degree Name] in [Field of Study] | [University Name], [City, State]
Graduation Date: [Month Year]
* Key coursework: [Course 1], [Course 2], [Course 3]
* Honors/Activities: [Optional details]

PROJECTS
[Project Name] | [Key Technologies Used]
[Link to Project/GitHub]
* Developed a [project description] that solves [specific problem].
* Implemented [specific design pattern/feature] which reduced response latency or improved scaling.`;

interface CircularScoreGaugeProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  colorClass?: string;
  duration?: number;
  showMaxScore?: boolean;
  suffix?: string;
}

function CircularScoreGauge({
  score,
  maxScore = 100,
  size = 110,
  strokeWidth = 8,
  colorClass = "stroke-[#6D5DF6]",
  duration = 1.2,
  showMaxScore = true,
  suffix = ""
}: CircularScoreGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(score, 0), maxScore) / maxScore;
  const strokeDashoffset = circumference - percentage * circumference;

  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) {
      setAnimatedValue(end);
      return;
    }
    const totalMiliseconds = duration * 1000;
    const stepTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedValue(start);
      if (start >= end) {
        clearInterval(timer);
        setAnimatedValue(end);
      }
    }, Math.max(stepTime, 10));

    return () => clearInterval(timer);
  }, [score, duration]);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-gray-200 dark:stroke-gray-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={colorClass}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">
          {animatedValue}
          {suffix}
        </span>
        {showMaxScore && (
          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider font-bold">
            / {maxScore}
          </span>
        )}
      </div>
    </div>
  );
}

interface CountUpTextProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function CountUpText({ to, duration = 1.2, prefix = "", suffix = "" }: CountUpTextProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const endValue = to;
    if (start === endValue) {
      setValue(endValue);
      return;
    }
    const range = endValue - start;
    let accum = start;
    const increment = endValue > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor((duration * 1000) / range));
    
    function animate() {
      accum += increment;
      setValue(accum);
      if (accum !== endValue) {
        setTimeout(animate, Math.max(stepTime, 8));
      }
    }
    
    animate();
  }, [to, duration]);

  return <>{prefix}{value}{suffix}</>;
}

const renderCareerIcon = (iconName: string) => {
  const props = { className: "w-5 h-5 text-purple-600 dark:text-purple-400" };
  switch (iconName) {
    case "Code": return <Code {...props} />;
    case "UserCheck": return <UserCheck {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Server": return <Server {...props} />;
    case "Database": return <Database {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "BarChart": return <BarChart {...props} />;
    case "Brain": return <Brain {...props} />;
    case "TrendingUp": return <TrendingUp {...props} />;
    case "Settings": return <Settings {...props} />;
    case "Cloud": return <Cloud {...props} />;
    case "ShieldAlert": return <ShieldAlert {...props} />;
    default: return <Briefcase {...props} />;
  }
};

interface DashboardPageProps {
  user: any;
  resume: any;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onUpdateUser: (updatedUser: any) => void;
  onResetResume: () => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function DashboardPage({ 
  user, 
  resume: initialResume, 
  onNavigate, 
  onLogout,
  onUpdateUser,
  onResetResume,
  theme,
  setTheme
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "ats" | "jobs" | "roadmap" | "career-roadmap" | "interview" | "probability" | "settings" | "applications" | "resumes" | "admin">("overview");
  const [resume, setResume] = useState<any>(initialResume || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom interactive dashboard states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("Good evening");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const [isAtsTemplateOpen, setIsAtsTemplateOpen] = useState(false);
  const [copiedAts, setCopiedAts] = useState(false);
  const [platformStats, setPlatformStats] = useState<any>({
    totalExecutions: "--",
    averageAtsScore: "--",
    matchAccuracy: "--"
  });

  const fetchStats = async () => {
    try {
      const statsData = await ApiService.getDashboardStats();
      setPlatformStats({
        totalExecutions: statsData.appExecutions,
        averageAtsScore: "85+",
        matchAccuracy: "96%"
      });
    } catch (err) {
      console.error("Failed to load real-time platform stats:", err);
      setPlatformStats({
        totalExecutions: "Unavailable",
        averageAtsScore: "Unavailable",
        matchAccuracy: "Unavailable"
      });
    }
  };

  const [interviewHistory, setInterviewHistory] = useState<any[]>([]);
  const fetchInterviewHistory = async () => {
    try {
      const data = await ApiService.getInterviewHistory();
      setInterviewHistory(data.history || []);
    } catch (e) {
      console.error("Failed to load interview history:", e);
    }
  };

  useEffect(() => {
    if (activeTab === "interview" && user) {
      fetchInterviewHistory();
    }
  }, [activeTab, user]);

  // Real-time Platform Stats Polling Effect
  useEffect(() => {
    if (!user || !user.uid) return;

    fetchStats();
    // Poll every 10 seconds for real-time responsiveness
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, [user, resume]);

  const [notificationsList, setNotificationsList] = useState<any[]>([]);
  const [notifLimit] = useState(20);
  const [notifOffset, setNotifOffset] = useState(0);
  const [notifHasMore, setNotifHasMore] = useState(false);
  const [notifSearch, setNotifSearch] = useState("");
  const [notifCategory, setNotifCategory] = useState("all");
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const getRelativeTime = (timestamp: string | Date) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  const fetchNotifications = async (reset = false) => {
    if (!user) return;
    setLoadingNotifications(true);
    const currentOffset = reset ? 0 : notifOffset;
    try {
      const data = await ApiService.getNotifications(notifLimit, currentOffset, notifSearch, notifCategory);
      const list = data.notifications || [];
      if (reset) {
        setNotificationsList(list);
        setNotifOffset(list.length);
      } else {
        setNotificationsList(prev => {
          const existingIds = new Set(prev.map(n => n.id));
          const newItems = list.filter((n: any) => !existingIds.has(n.id));
          return [...prev, ...newItems];
        });
        setNotifOffset(prev => prev + list.length);
      }
      setNotifHasMore(data.hasMore || false);
    } catch (e) {
      console.error("Failed to fetch notifications:", e);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications(true);
    }
  }, [showNotifications, notifSearch, notifCategory]);

  useEffect(() => {
    if (user) {
      ApiService.getNotifications(20, 0, "", "").then(data => {
        setNotificationsList(data.notifications || []);
      }).catch(err => console.error("Initial notifications load failed:", err));
    }
  }, [user, resume]);

  // Clock, Greetings & Viewport Resize Effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    const handleResize = () => {
      const w = window.innerWidth;
      // Auto-collapse sidebar on tablets (between 768px and 1023px)
      if (w >= 768 && w < 1024) {
        setIsSidebarCollapsed(true);
      } else if (w >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    updateClock();
    handleResize();
    const interval = setInterval(updateClock, 1000);
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setResume(initialResume);
  }, [initialResume]);



  // Resume Quality state
  const [qualityAnalysis, setQualityAnalysis] = useState<any>(null);
  const [analyzingQuality, setAnalyzingQuality] = useState(false);

  // Profile completion items state
  const [profileItems, setProfileItems] = useState<Record<string, boolean>>({
    resume: !!resume,
    skills: false,
    education: false,
    experience: false,
    projects: false,
    certifications: false,
    linkedin: false,
    github: false,
    portfolio: false
  });

  // Fetch from user record if present
  useEffect(() => {
    if (user && user.profileItems) {
      setProfileItems(user.profileItems);
    }
  }, [user]);

  // Sync profile completion item state change
  const toggleProfileItem = async (key: string) => {
    const nextItems = { ...profileItems, [key]: !profileItems[key] };
    setProfileItems(nextItems);
    try {
      await ApiService.updateProfile(user.uid, user.displayName || "");
      // Save locally or sync database if we extend backend update profile
    } catch (e) {}
  };

  // AI insights state
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  useEffect(() => {
    if (user) {
      ApiService.getDashboardInsights().then(res => {
        setAiInsights(res.insights || []);
      }).catch(() => {
        setAiInsights([
          { text: "Improve ATS score by adding React keywords to your experience bullet points.", type: "ats", action: "Optimize Resume" },
          { text: "Learn Docker and container virtualization to increase software engineering job matches.", type: "skill", action: "Open Roadmap" },
          { text: "Complete your profile details to unlock direct recruiter messages.", type: "profile", action: "Verify Profile" },
          { text: "Practice Technical/Behavioral interview scenarios to boost confidence.", type: "interview", action: "Practice Interview" }
        ]);
      });
    }
  }, [user, resume]);

  // Play Store modal triggers
  const [playStoreModal, setPlayStoreModal] = useState<"about" | "privacy" | "terms" | "faq" | "bug" | "feedback" | "update" | null>(null);
  const [bugText, setBugText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // ATS scanner state
  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState<any>(null);
  const [scanningAts, setScanningAts] = useState(false);

  // Job matching state
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [matchingJobs, setMatchingJobs] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  // Search & Filter & Pagination states
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobLocationQuery, setJobLocationQuery] = useState("");
  const [filterRemote, setFilterRemote] = useState("all");
  const [filterJobType, setFilterJobType] = useState("all");
  const [filterExpLevel, setFilterExpLevel] = useState("all");
  const [filterSalary, setFilterSalary] = useState("all");
  const [filterPostedDate, setFilterPostedDate] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // Skill gap analysis state
  const [targetCareerRole, setTargetCareerRole] = useState("");
  const [skillGapResult, setSkillGapResult] = useState<any>(null);
  const [analyzingGaps, setAnalyzingGaps] = useState(false);

  // Interview state
  const [interviewType, setInterviewType] = useState<"aptitude" | "technical" | "hr" | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluatingAnswer, setEvaluatingAnswer] = useState(false);
  const [interviewAnswers, setInterviewAnswers] = useState<any[]>([]);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [recordingIntervalId, setRecordingIntervalId] = useState<any>(null);

  // New Interview States
  const [interviewStatus, setInterviewStatus] = useState<"setup" | "active" | "generating_report" | "completed">("setup");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finalReport, setFinalReport] = useState<any>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Voice recording simulation using Web Speech API with simulation fallback
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTimer(0);
    const id = setInterval(() => {
      setRecordingTimer((prev) => prev + 1);
    }, 1000);
    setRecordingIntervalId(id);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";
        
        let finalTranscript = "";
        rec.onresult = (event: any) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          setUserAnswer(finalTranscript + interimTranscript);
        };

        rec.onerror = (err: any) => {
          console.error("Speech recognition error:", err);
        };

        rec.start();
        setRecognitionInstance(rec);
      } catch (err) {
        console.error("Speech recognition initialization failed:", err);
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (err) {
        console.error("Error stopping speech recognition:", err);
      }
      setRecognitionInstance(null);
    } else {
      if (!userAnswer.trim()) {
        setUserAnswer(
          interviewType === "hr"
            ? "I am highly motivated and excel in solving challenging problems. Over my career, I've worked in agile team setups, aligning technical execution with customer values and demonstrating leadership in times of conflict."
            : "In my past projects, I worked closely with React and Node.js. For database management, I chose MongoDB due to its flexible JSON schema, which suited our rapid development cycle. I also configured secure JWT authentication for endpoints."
        );
      }
    }
  };

  // Hiring probability state
  const [probJobTitle, setProbJobTitle] = useState("");
  const [probCompany, setProbCompany] = useState("");
  const [hiringProbability, setHiringProbability] = useState<any>(null);
  const [predictingProb, setPredictingProb] = useState(false);

  // Recommended Opportunities
  const [recommendedOpps, setRecommendedOpps] = useState<any[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(false);
  const [calculatingOpps, setCalculatingOpps] = useState(false);
  const [allRawOpps, setAllRawOpps] = useState<any[]>([]);
  const [loadingRawOpps, setLoadingRawOpps] = useState(false);

  // Career Path Roadmaps state
  const [careerRoadmaps, setCareerRoadmaps] = useState<any[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [targetPathInput, setTargetPathInput] = useState("");

  // Career Roadmap Builder states
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedCareerMilestones, setCompletedCareerMilestones] = useState<{ [careerId: string]: number[] }>({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [expandedMilestones, setExpandedMilestones] = useState<{ [milestoneIdx: number]: boolean }>({});

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("premium_roadmap_recent_searches");
      return saved ? JSON.parse(saved) : ["SDE", "AI", "DevOps"];
    } catch {
      return ["SDE", "AI", "DevOps"];
    }
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  
  // AI Coach panel states
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [aiMentorInput, setAiMentorInput] = useState("");
  const [isAiMentorTyping, setIsAiMentorTyping] = useState(false);
  const [aiMentorMessages, setAiMentorMessages] = useState<any[]>(() => [
    { sender: "mentor", text: "Hello! I am your SkillBridge AI Career Mentor. Ask me anything about these learning paths, certification options, or career choices!" }
  ]);

  const addRecentSearch = (query: string) => {
    if (!query || query.trim() === "") return;
    const cleanQuery = query.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== cleanQuery.toLowerCase());
      const updated = [cleanQuery, ...filtered].slice(0, 5);
      localStorage.setItem("premium_roadmap_recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSendAiMentorMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMentorInput.trim()) return;

    const userMsg = aiMentorInput.trim();
    setAiMentorMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setAiMentorInput("");
    setIsAiMentorTyping(true);

    try {
      const careerContext = selectedCareer 
        ? `Regarding the ${selectedCareer.title} track` 
        : "Regarding career choices and skill building";
      
      const payload = `You are an expert career transition coach. Briefly (2-3 sentences max) answer this student's question. Context: ${careerContext}. Question: "${userMsg}". Speak professionally, encourage them, and mention specific milestone concepts where appropriate. Do not use markdown headers or lists, keep it simple.`;

      const replyData = await ApiService.chatWithMentor(payload);
      const reply = replyData.text || "I recommend focusing on the foundational coding milestones first and working through the practical projects.";
      
      setAiMentorMessages((prev) => [...prev, { sender: "mentor", text: reply }]);
      fetchStats();
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setAiMentorMessages((prev) => [
          ...prev,
          { sender: "mentor", text: "To succeed in this career track, focus heavily on mastering the foundational concepts, solving the practice questions, and building the practical project for each milestone to enrich your portfolio." }
        ]);
      }, 600);
    } finally {
      setIsAiMentorTyping(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) return;
    setIsLoadingCatalog(true);
    const timer = setTimeout(() => {
      setIsLoadingCatalog(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchProgressForCareer = async (careerId: string) => {
    if (!user) return;
    setLoadingProgress(true);
    try {
      const res = await ApiService.getRoadmapProgress(user.uid, careerId);
      setCompletedCareerMilestones((prev) => ({
        ...prev,
        [careerId]: res.completedMilestones || []
      }));
    } catch (err) {
      console.error("Failed to load progress from server, falling back to localStorage", err);
      try {
        const saved = localStorage.getItem(`roadmap_progress_${careerId}`);
        if (saved) {
          setCompletedCareerMilestones((prev) => ({
            ...prev,
            [careerId]: JSON.parse(saved)
          }));
        }
      } catch (e) {
        console.error(e);
      }
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleToggleMilestone = async (careerId: string, milestoneIdx: number) => {
    if (!user) return;
    const currentCompleted = completedCareerMilestones[careerId] || [];
    let updatedCompleted: number[];

    if (currentCompleted.includes(milestoneIdx)) {
      updatedCompleted = currentCompleted.filter((idx) => idx !== milestoneIdx);
      updatedCompleted = updatedCompleted.filter((idx) => idx < milestoneIdx);
    } else {
      updatedCompleted = [...currentCompleted, milestoneIdx];
    }

    setCompletedCareerMilestones((prev) => ({
      ...prev,
      [careerId]: updatedCompleted
    }));

    localStorage.setItem(`roadmap_progress_${careerId}`, JSON.stringify(updatedCompleted));

    try {
      await ApiService.saveRoadmapProgress(user.uid, careerId, updatedCompleted);
      fetchNotifications(true);
    } catch (err) {
      console.error("Failed to save progress to server:", err);
    }
  };

  useEffect(() => {
    if (selectedCareer) {
      fetchProgressForCareer(selectedCareer.id);
      setExpandedMilestones({});
    }
  }, [selectedCareer]);

  const fetchCareerRoadmaps = async () => {
    if (!user) return;
    setLoadingRoadmaps(true);
    try {
      const res = await ApiService.getCareerRoadmaps(user.uid);
      setCareerRoadmaps(res.roadmaps || []);
      if (res.roadmaps && res.roadmaps.length > 0) {
        setSelectedRoadmap(res.roadmaps[0]);
      }
    } catch (err: any) {
      console.error("Failed to load career roadmaps:", err);
    } finally {
      setLoadingRoadmaps(false);
    }
  };

  useEffect(() => {
    if (resume && !qualityAnalysis && !analyzingQuality) {
      triggerQualityAnalysis();
    }
    if (resume && user) {
      fetchRecommendedOpps();
      fetchRawOpps();
      fetchCareerRoadmaps();
    }
  }, [resume, user]);

  const fetchRawOpps = async () => {
    setLoadingRawOpps(true);
    try {
      const res = await ApiService.getAllOpportunities();
      setAllRawOpps(res.opportunities || []);
    } catch (err: any) {
      console.error("Failed to load raw opportunities database:", err);
    } finally {
      setLoadingRawOpps(false);
    }
  };

  const fetchRecommendedOpps = async () => {
    if (!user) return;
    setLoadingOpps(true);
    try {
      const res = await ApiService.getLatestOpportunities(user.uid);
      if (res && res.matches && res.matches.length > 0) {
        setRecommendedOpps(res.matches);
      } else if (resume) {
        await handleCalculateOpps();
      }
    } catch (err: any) {
      console.error("Failed to load recommended opportunities:", err);
    } finally {
      setLoadingOpps(false);
    }
  };

  const handleCalculateOpps = async () => {
    if (!resume || !user) return;
    setCalculatingOpps(true);
    setError(null);
    try {
      const res = await ApiService.matchOpportunities(resume.id, user.uid);
      setRecommendedOpps(res.matches || []);
      fetchStats();
      fetchNotifications(true);
    } catch (err: any) {
      console.error("Failed to calculate recommended opportunities:", err);
      setError("Failed to calculate recommended opportunities: " + err.message);
    } finally {
      setCalculatingOpps(false);
    }
  };

  const triggerQualityAnalysis = async () => {
    if (!resume) return;
    setAnalyzingQuality(true);
    setError(null);
    try {
      const res = await ApiService.analyzeQuality(resume.id, user.uid);
      setQualityAnalysis(res);
      fetchStats();
      fetchNotifications(true);
    } catch (err: any) {
      console.error(err);
      setError("Failed to run quality analysis: " + err.message);
    } finally {
      setAnalyzingQuality(false);
    }
  };

  const handleAtsScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload a resume first.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please provide a target job description.");
      return;
    }
    setScanningAts(true);
    setError(null);
    setAtsResult(null);
    try {
      const res = await ApiService.getAtsScore(resume.id, jobDescription, user.uid);
      setAtsResult(res);
      fetchStats();
      fetchNotifications(true);
    } catch (err: any) {
      console.error(err);
      setError("ATS Scan failed: " + err.message);
    } finally {
      setScanningAts(false);
    }
  };

  const handleJobMatching = async () => {
    if (!resume) return;
    setMatchingJobs(true);
    setError(null);
    try {
      const res = await ApiService.matchJobs(resume.id, user.uid);
      setJobMatches(res.matches || []);
      fetchStats();
      fetchNotifications(true);
    } catch (err: any) {
      console.error(err);
      setError("Job Matcher failed: " + err.message);
    } finally {
      setMatchingJobs(false);
    }
  };

  const handleSkillGapAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;
    if (!targetCareerRole.trim()) {
      setError("Please state your target career role.");
      return;
    }
    setAnalyzingGaps(true);
    setError(null);
    setSkillGapResult(null);
    try {
      const res = await ApiService.analyzeSkillGaps(resume.id, targetCareerRole, user.uid);
      setSkillGapResult(res);
      fetchStats();
      fetchNotifications(true);
    } catch (err: any) {
      console.error(err);
      setError("Skill Gap Analysis failed: " + err.message);
    } finally {
      setAnalyzingGaps(false);
    }
  };

  // Start Aptitude Round
  const handleStartAptitude = () => {
    setGeneratingQuestions(true);
    setError(null);
    setSelectedOption(null);
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setCurrentEvaluation(null);
    setInterviewAnswers([]);
    setFinalReport(null);
    setInterviewType("aptitude");
    
    try {
      const selected = [...aptitudeQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
      setInterviewQuestions(selected);
      setInterviewStatus("active");
      setTimeLeft(600); // 10 minutes global timer
    } catch (err: any) {
      console.error(err);
      setError("Failed to load aptitude questions: " + err.message);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  // Start Technical Round
  const handleStartTechnical = async () => {
    if (!resume) {
      setError("Please upload a resume first to generate custom technical questions.");
      return;
    }
    setGeneratingQuestions(true);
    setError(null);
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setCurrentEvaluation(null);
    setInterviewAnswers([]);
    setFinalReport(null);
    setInterviewType("technical");

    try {
      const res = await ApiService.getInterviewQuestions(resume.id);
      setInterviewQuestions(res.questions || []);
      fetchStats();
      setInterviewStatus("active");
      setTimeLeft(120); // 120 seconds per question
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate technical questions: " + err.message);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  // Start HR Round
  const handleStartHR = () => {
    setGeneratingQuestions(true);
    setError(null);
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setCurrentEvaluation(null);
    setInterviewAnswers([]);
    setFinalReport(null);
    setInterviewType("hr");

    try {
      const selected = [...hrQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
      setInterviewQuestions(selected);
      setInterviewStatus("active");
      setTimeLeft(90); // 90 seconds per question
    } catch (err: any) {
      console.error(err);
      setError("Failed to load HR questions: " + err.message);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  // Skip Current Question
  const handleSkipQuestion = async () => {
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    if (interviewType === "aptitude") {
      const answerRecord = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        userAnswer: "Skipped",
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: false,
        score: 0,
        topic: currentQuestion.topic,
        difficulty: currentQuestion.difficulty
      };
      const updatedAnswers = [...interviewAnswers, answerRecord];
      setInterviewAnswers(updatedAnswers);

      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setSelectedOption(null);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        await handleFinishInterviewRound(updatedAnswers);
      }
    } else {
      setEvaluatingAnswer(true);
      setError(null);
      try {
        const evaluation = {
          score: 0,
          feedback: "Question skipped by candidate.",
          expectedPointsMatched: [],
          suggestions: ["Provide an answer, even partial, to gain experience and structural feedback."]
        };
        const updatedAnswer = {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          userAnswer: "Skipped",
          ...evaluation
        };
        const updatedAnswers = [...interviewAnswers, updatedAnswer];
        setInterviewAnswers(updatedAnswers);
        setCurrentEvaluation(updatedAnswer);
      } catch (err: any) {
        console.error(err);
        setError("Skip action failed: " + err.message);
      } finally {
        setEvaluatingAnswer(false);
      }
    }
  };

  // Submit Answer for Tech / HR / Aptitude
  const handleSubmitInterviewAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    if (interviewType === "aptitude") {
      if (!selectedOption) return;
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      const answerRecord = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        userAnswer: selectedOption,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        score: isCorrect ? 100 : 0,
        topic: currentQuestion.topic,
        difficulty: currentQuestion.difficulty
      };
      const updatedAnswers = [...interviewAnswers, answerRecord];
      setInterviewAnswers(updatedAnswers);

      if (currentQuestionIndex < interviewQuestions.length - 1) {
        setSelectedOption(null);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        await handleFinishInterviewRound(updatedAnswers);
      }
    } else {
      if (!userAnswer.trim()) return;
      setEvaluatingAnswer(true);
      setError(null);
      try {
        const evaluation = await ApiService.evaluateInterviewAnswer(
          currentQuestion.question,
          currentQuestion.expectedPoints || [],
          userAnswer
        );

        const updatedAnswer = {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          userAnswer,
          ...evaluation
        };

        setInterviewAnswers((prev) => [...prev, updatedAnswer]);
        setCurrentEvaluation(updatedAnswer);
        fetchStats();
      } catch (err: any) {
        console.error(err);
        setError("Evaluation failed: " + err.message);
      } finally {
        setEvaluatingAnswer(false);
      }
    }
  };

  // Next Question (Advanced for Tech/HR after evaluation is shown)
  const handleNextQuestion = async () => {
    setUserAnswer("");
    setCurrentEvaluation(null);
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(interviewType === "technical" ? 120 : 90);
    } else {
      await handleFinishInterviewRound(interviewAnswers);
    }
  };

  // Handle Question Timer Expiration for Technical / HR (Auto-submit)
  const handleTimeOut = async () => {
    if (interviewType === "aptitude") {
      const currentQuestion = interviewQuestions[currentQuestionIndex];
      const ans = selectedOption || "Unanswered";
      const isCorrect = ans === currentQuestion?.correctAnswer;
      const finalAnswers = [...interviewAnswers];
      
      for (let i = currentQuestionIndex; i < interviewQuestions.length; i++) {
        const q = interviewQuestions[i];
        const isCurr = i === currentQuestionIndex;
        finalAnswers.push({
          questionId: q.id,
          questionText: q.question,
          userAnswer: isCurr ? ans : "Unanswered (Time Out)",
          correctAnswer: q.correctAnswer,
          isCorrect: isCurr ? isCorrect : false,
          score: (isCurr && isCorrect) ? 100 : 0,
          topic: q.topic,
          difficulty: q.difficulty
        });
      }
      setInterviewAnswers(finalAnswers);
      await handleFinishInterviewRound(finalAnswers);
    } else {
      const ansText = userAnswer.trim() || "Unanswered (Time Out)";
      setUserAnswer(ansText);
      
      const currentQuestion = interviewQuestions[currentQuestionIndex];
      if (!currentQuestion) return;
      
      setEvaluatingAnswer(true);
      setError(null);
      try {
        const evaluation = await ApiService.evaluateInterviewAnswer(
          currentQuestion.question,
          currentQuestion.expectedPoints || [],
          ansText
        );
        const updatedAnswer = {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          userAnswer: ansText,
          ...evaluation
        };
        const updatedAnswers = [...interviewAnswers, updatedAnswer];
        setInterviewAnswers(updatedAnswers);
        setCurrentEvaluation(updatedAnswer);
        fetchStats();
      } catch (err: any) {
        console.error("Auto evaluation failed on timeout:", err);
        const fallbackAns = {
          questionId: currentQuestion.id,
          questionText: currentQuestion.question,
          userAnswer: ansText,
          score: 0,
          feedback: "Time limit expired. Answer evaluation skipped.",
          expectedPointsMatched: [],
          suggestions: ["Pace yourself to answer within the allocated time limits."]
        };
        const updatedAnswers = [...interviewAnswers, fallbackAns];
        setInterviewAnswers(updatedAnswers);
        setCurrentEvaluation(fallbackAns);
      } finally {
        setEvaluatingAnswer(false);
      }
    }
  };

  // Compile Final Report using AI
  const handleFinishInterviewRound = async (answersToCompile: any[]) => {
    setInterviewStatus("generating_report");
    setGeneratingReport(true);
    setError(null);
    try {
      const report = await ApiService.generateInterviewReport(
        interviewType === "aptitude" ? "Aptitude" : interviewType === "technical" ? "Technical" : "HR",
        answersToCompile
      );
      setFinalReport(report);
      setInterviewStatus("completed");
      fetchStats();

      // Persist compiled mock interview report in history
      try {
        await ApiService.saveInterview({
          role: targetCareerRole || (interviewType === "technical" ? "Technical Developer" : interviewType === "aptitude" ? "Aptitude Analyst" : "HR Representative"),
          difficulty: "Medium",
          overallScore: report.overallScore,
          metrics: report.metrics,
          strengths: report.strengths || [],
          weaknesses: report.weaknesses || [],
          improvementSuggestions: report.improvementSuggestions || [],
          recommendedResources: report.recommendedResources || []
        });
        fetchNotifications(true);
      } catch (err) {
        console.error("Failed to save mock interview record:", err);
      }

    } catch (err: any) {
      console.error("Report generation failed:", err);
      const avgScore = Math.round(answersToCompile.reduce((acc, c) => acc + (c.score || 0), 0) / answersToCompile.length);
      const isApt = interviewType === "aptitude";
      const fallbackReport = {
        overallScore: avgScore,
        metrics: {
          communication: isApt ? 80 : Math.round(avgScore * 0.95),
          confidence: isApt ? 85 : Math.round(avgScore * 0.9),
          technicalKnowledge: isApt ? 60 : avgScore,
          grammar: isApt ? 95 : Math.round(avgScore * 0.95),
          problemSolving: avgScore,
          leadership: isApt ? 50 : Math.round(avgScore * 0.8)
        },
        strengths: isApt ? ["Strong performance under time limits"] : ["Good structure in core answers"],
        weaknesses: isApt ? ["Needs improvement in logic pacing"] : ["Could elaborate more with STAR structure"],
        improvementSuggestions: ["Practice mock tests regularly to build confidence."],
        recommendedResources: [
          {
            title: "SkillBridge Career Path Prep",
            description: "Practice specialized topics directly tailored to industry benchmarks."
          }
        ]
      };
      setFinalReport(fallbackReport);
      setInterviewStatus("completed");

      // Save fallback report in history
      ApiService.saveInterview({
        role: targetCareerRole || (interviewType === "technical" ? "Technical Developer" : interviewType === "aptitude" ? "Aptitude Analyst" : "HR Representative"),
        difficulty: "Medium",
        overallScore: fallbackReport.overallScore,
        metrics: fallbackReport.metrics,
        strengths: fallbackReport.strengths,
        weaknesses: fallbackReport.weaknesses,
        improvementSuggestions: fallbackReport.improvementSuggestions,
        recommendedResources: fallbackReport.recommendedResources
      }).catch(err => console.error("Failed to save fallback mock interview:", err));
    } finally {
      setGeneratingReport(false);
    }
  };

  const handlePredictHiringProbability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) return;
    if (!probJobTitle.trim() || !probCompany.trim()) {
      setError("Please fill out both Job Title and target Company.");
      return;
    }
    setPredictingProb(true);
    setError(null);
    setHiringProbability(null);
    try {
      const res = await ApiService.predictHiringProbability(resume.id, probJobTitle, probCompany, user.uid);
      setHiringProbability(res);
      fetchStats();
    } catch (err: any) {
      console.error(err);
      setError("Hiring prediction failed: " + err.message);
    } finally {
      setPredictingProb(false);
    }
  };

  const getInterviewOverallScore = () => {
    if (finalReport) return finalReport.overallScore;
    if (interviewAnswers.length === 0) return 0;
    const sum = interviewAnswers.reduce((acc, curr) => acc + (curr.score || 0), 0);
    return Math.round(sum / interviewAnswers.length);
  };

  const downloadReportPDF = () => {
    if (!finalReport) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header banner (Indigo color theme)
    doc.setFillColor(109, 93, 246);
    doc.rect(0, 0, pageWidth, 38, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("SkillBridge AI - Evaluation Report", 15, 24);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("AI-POWERED MOCK INTERVIEW PERFORMANCE LOG", 15, 30);
    
    // Metadata panel
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(`Interview Round: ${interviewType ? interviewType.toUpperCase() : "MOCK INTERVIEW"}`, 15, 50);
    doc.text(`Candidate Name: ${user.displayName || "Career Practitioner"}`, 15, 56);
    doc.text(`Date of Evaluation: ${new Date().toLocaleDateString()}`, 15, 62);
    doc.text(`Overall Rating Score: ${finalReport.overallScore || 0} / 100`, 15, 68);
    
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 73, pageWidth - 15, 73);
    
    // Metrics section
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Evaluation Competency Ratings", 15, 82);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    let y = 92;
    const metrics = finalReport.metrics || {};
    
    Object.keys(metrics).forEach((mKey) => {
      const formattedLabel = mKey.charAt(0).toUpperCase() + mKey.slice(1).replace(/([A-Z])/g, " $1");
      const ratingVal = metrics[mKey];
      
      doc.text(`${formattedLabel}:`, 15, y);
      
      // Draw progress bar track
      doc.setFillColor(240, 243, 250);
      doc.rect(70, y - 3.5, 90, 4, "F");
      
      // Draw progress fill
      doc.setFillColor(109, 93, 246);
      doc.rect(70, y - 3.5, ratingVal * 0.9, 4, "F");
      
      doc.text(`${ratingVal}%`, 168, y);
      y += 8;
    });
    
    y += 4;
    doc.line(15, y, pageWidth - 15, y);
    y += 10;
    
    // Strengths section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Key Strengths Identified", 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += 6;
    
    const strengths = finalReport.strengths || [];
    strengths.forEach((strengthStr: string) => {
      const splitStr = doc.splitTextToSize(`• ${strengthStr}`, pageWidth - 30);
      doc.text(splitStr, 15, y);
      y += splitStr.length * 5;
    });
    
    y += 4;
    
    // Weaknesses section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Improvement Opportunities (Weaknesses)", 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += 6;
    
    const weaknesses = finalReport.weaknesses || [];
    weaknesses.forEach((weaknessStr: string) => {
      const splitStr = doc.splitTextToSize(`• ${weaknessStr}`, pageWidth - 30);
      doc.text(splitStr, 15, y);
      y += splitStr.length * 5;
    });
    
    // Add page if needed
    if (y > 230) {
      doc.addPage();
      y = 20;
    } else {
      y += 6;
      doc.line(15, y, pageWidth - 15, y);
      y += 10;
    }
    
    // Suggestions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Actionable Development Suggestions", 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += 6;
    
    const suggestions = finalReport.improvementSuggestions || [];
    suggestions.forEach((suggestionStr: string) => {
      const splitStr = doc.splitTextToSize(`• ${suggestionStr}`, pageWidth - 30);
      doc.text(splitStr, 15, y);
      y += splitStr.length * 5;
    });
    
    y += 4;
    
    // Recommended Resources
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Recommended Learning Resources", 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y += 6;
    
    const resources = finalReport.recommendedResources || [];
    resources.forEach((resourceObj: any) => {
      const title = resourceObj.title || resourceObj;
      const desc = resourceObj.description || "";
      
      doc.setFont("helvetica", "bold");
      doc.text(`* ${title}`, 15, y);
      doc.setFont("helvetica", "normal");
      y += 5;
      
      if (desc) {
        const splitDesc = doc.splitTextToSize(desc, pageWidth - 35);
        doc.text(splitDesc, 20, y);
        y += splitDesc.length * 5 + 2;
      }
    });
    
    doc.save(`${user.displayName || "candidate"}_interview_report_${interviewType}.pdf`);
  };

  // Active Interview countdown timer effect
  useEffect(() => {
    let timerId: any;
    if (interviewStatus === "active" && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setTimeout(() => handleTimeOut(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [interviewStatus, timeLeft, currentQuestionIndex]);

  const toggleBookmark = (company: string) => {
    setBookmarkedJobs((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const filteredJobs = React.useMemo(() => {
    let result = [...jobMatches];

    // 1. Search Query (Title, Company, Skills)
    if (jobSearchQuery.trim()) {
      const q = jobSearchQuery.toLowerCase().trim();
      result = result.filter(
        (j) =>
          (j.role || "").toLowerCase().includes(q) ||
          (j.company || "").toLowerCase().includes(q) ||
          (j.matchedSkills || []).some((s: string) => s.toLowerCase().includes(q)) ||
          (j.missingSkills || []).some((s: string) => s.toLowerCase().includes(q))
      );
    }

    // 2. Location Search
    if (jobLocationQuery.trim()) {
      const q = jobLocationQuery.toLowerCase().trim();
      result = result.filter((j) => (j.location || "").toLowerCase().includes(q));
    }

    // 3. Remote Filter
    if (filterRemote !== "all") {
      result = result.filter((j) => (j.type || "").toLowerCase() === filterRemote.toLowerCase());
    }

    // 4. Job Type (Employment Commitment)
    if (filterJobType !== "all") {
      result = result.filter((j) => (j.employmentType || "").toLowerCase() === filterJobType.toLowerCase());
    }

    // 5. Experience Level
    if (filterExpLevel !== "all") {
      result = result.filter((j) => (j.experienceLevel || "").toLowerCase() === filterExpLevel.toLowerCase());
    }

    // 6. Salary Range
    if (filterSalary !== "all") {
      const minSalaryReq = parseInt(filterSalary, 10);
      result = result.filter((j) => {
        const salaryText = (j.salary || "").toLowerCase().replace(/[^0-9]/g, "");
        if (!salaryText) return true; // Keep competitive if no salary info
        let salaryVal = parseInt(salaryText, 10);
        if (salaryVal < 1000) {
          salaryVal = salaryVal * 1000;
        } else if (salaryVal > 1000000) {
          salaryVal = parseInt(salaryText.substring(0, 6), 10);
        }
        return salaryVal >= minSalaryReq;
      });
    }

    // 7. Date Posted Filter (Today, 7 days, 30 days)
    if (filterPostedDate !== "all") {
      const now = new Date();
      const daysLimit = parseInt(filterPostedDate, 10);
      result = result.filter((j) => {
        if (!j.postedDate) return true;
        const posted = new Date(j.postedDate);
        const diffTime = Math.abs(now.getTime() - posted.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= daysLimit;
      });
    }

    // 8. Sorting
    if (sortBy === "match") {
      result.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
        const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
        return dateB - dateA;
      });
    } else if (sortBy === "salary") {
      result.sort((a, b) => {
        const getVal = (text: string) => {
          const clean = text.replace(/[^0-9]/g, "");
          if (!clean) return 0;
          let val = parseInt(clean, 10);
          if (val < 1000) val *= 1000;
          return val;
        };
        return getVal(b.salary || "") - getVal(a.salary || "");
      });
    } else if (sortBy === "company") {
      result.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
    }

    return result;
  }, [jobMatches, jobSearchQuery, jobLocationQuery, filterRemote, filterJobType, filterExpLevel, filterSalary, filterPostedDate, sortBy]);

  // Sidebar parameters
  const navigationItems = [
    { id: "overview", label: "Career Board", icon: LayoutDashboard, badge: 0 },
    { id: "resumes", label: "My Resumes", icon: FileText, badge: 0 },
    { id: "ats", label: "ATS Optimiser", icon: FileText, badge: 1 },
    { id: "jobs", label: "Job Matcher", icon: Search, badge: 0 },
    { id: "applications", label: "Tracker Pipeline", icon: ClipboardList, badge: 0 },
    { id: "roadmap", label: "Skill Gaps", icon: Map, badge: 0 },
    { id: "career-roadmap", label: "Career Roadmap", icon: Target, iconColor: "text-[#8B5CF6]" },
    { id: "interview", label: "Interview Lab", icon: MessageSquare, badge: 0 },
    { id: "probability", label: "Hiring Predictor", icon: Award, badge: 0 },
    { id: "admin", label: "Admin Center", icon: ShieldAlert, badge: 0 },
    { id: "settings", label: "Profile Settings", icon: Settings, badge: 0 }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans selection:bg-[#6D5DF6]/30 selection:text-white relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300">
      
      {/* Background soft spheres */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#6D5DF6]/8 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#8B5CF6]/8 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Rail */}
      <aside className={`fixed inset-y-0 left-0 z-50 md:z-20 md:static md:translate-x-0 bg-[var(--glass-card-bg)] border-r border-[var(--color-border)] backdrop-blur-2xl flex flex-col justify-between shrink-0 p-5 shadow-[var(--glass-card-shadow)] md:rounded-r-[32px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isSidebarCollapsed ? "w-64 md:w-20" : "w-64 md:w-64"
      } ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div>
          {/* Brand header */}
          <div className="p-2 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-md shrink-0">
                <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-base font-black tracking-tight shrink-0">
                SkillBridge
              </span>
              <span className="px-1.5 py-0.5 text-[8px] bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-black uppercase shrink-0">
                AI
              </span>
            </div>

            {/* Collapse Trigger (hidden on mobile) */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] transition cursor-pointer"
            >
              <ChevronLeftIcon className={`w-3.5 h-3.5 transform transition duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} />
            </button>

            {/* Mobile Menu Close Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 transition cursor-pointer shrink-0"
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* User profile card summary inside Sidebar */}
          {!isSidebarCollapsed && (
            <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl flex items-center space-x-3 mt-4 shadow-inner">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center font-black text-xs text-white font-mono shadow-md shrink-0">
                {user.displayName ? user.displayName[0].toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate text-[var(--color-text-primary)]">
                  {user.displayName || "Professional"}
                </p>
                <p className="text-[9px] font-mono text-[var(--color-text-tertiary)] truncate font-semibold mt-0.5">{user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5 mt-6">
            {navigationItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setError(null);
                    setIsMobileMenuOpen(false);
                    if (tab.id === "jobs" && resume && jobMatches.length === 0) {
                      handleJobMatching();
                    }
                    if (tab.id === "career-roadmap" && resume && careerRoadmaps.length === 0) {
                      fetchCareerRoadmaps();
                    }
                  }}
                  className={`w-full flex items-center px-3.5 py-3 rounded-2xl text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer relative ${
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  } ${
                    isActive
                      ? "text-[#6D5DF6] font-extrabold bg-[#6D5DF6]/8"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[#6D5DF6]/4"
                  }`}
                  title={tab.label}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? "bg-[#6D5DF6]/10 text-[#6D5DF6]" : "bg-transparent text-[var(--color-text-secondary)]"}`}>
                      <Icon className={`w-4 h-4 ${tab.iconColor || ""}`} />
                    </div>
                    {!isSidebarCollapsed && <span className="truncate">{tab.label}</span>}
                  </div>
                  
                  {/* Indicators / Badges */}
                  {!isSidebarCollapsed && tab.badge && tab.badge > 0 ? (
                    <span className="bg-[#6D5DF6] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  ) : null}

                  {isActive && !isSidebarCollapsed && (
                    <div className="absolute right-0 top-3 bottom-3 w-1 bg-[#6D5DF6] rounded-l-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Panel */}
        <div className="space-y-4 pt-4 border-t border-[var(--color-border)] mt-4">
          
          {/* Quick Guide and ATS Template */}
          {isSidebarCollapsed ? (
            <div className="flex flex-col items-center space-y-2 pb-2">
              <button
                onClick={() => setIsHowToUseOpen(true)}
                className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] hover:text-[#6D5DF6] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer"
                title="How to Use This App"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAtsTemplateOpen(true)}
                className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] hover:bg-[#8B5CF6]/10 text-[var(--color-text-secondary)] hover:text-[#8B5CF6] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer"
                title="ATS Resume Template"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner text-[10px] font-mono font-semibold text-[var(--color-text-secondary)]">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] block mb-1.5 font-bold">Quick Guide</span>
                <button
                  onClick={() => setIsHowToUseOpen(true)}
                  className="w-full flex items-center justify-between p-2 rounded-xl border border-[var(--color-border)] bg-[var(--glass-card-bg)] hover:bg-[#6D5DF6]/5 hover:border-[#6D5DF6]/20 transition duration-200 cursor-pointer text-left text-[10px] text-[var(--color-text-primary)] font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-3.5 h-3.5 text-[#6D5DF6] shrink-0" />
                    <span className="truncate">How to Use App</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[var(--color-text-tertiary)] shrink-0" />
                </button>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] block mb-1.5 font-bold">Resources</span>
                <button
                  onClick={() => setIsAtsTemplateOpen(true)}
                  className="w-full flex items-center justify-between p-2 rounded-xl border border-[var(--color-border)] bg-[var(--glass-card-bg)] hover:bg-[#8B5CF6]/5 hover:border-[#8B5CF6]/20 transition duration-200 cursor-pointer text-left text-[10px] text-[var(--color-text-primary)] font-semibold"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                    <span className="truncate">ATS Resume Template</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[var(--color-text-tertiary)] shrink-0" />
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">Platform Activity</span>
                  <span className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono uppercase tracking-wider text-emerald-500 font-extrabold">Live</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-inner flex items-center justify-between text-[10px] font-mono font-semibold text-[var(--color-text-secondary)]">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#6D5DF6]" />
                    <span>App Executions</span>
                  </div>
                  <span className="text-[11px] font-black text-[var(--color-text-primary)] transition-all duration-300">
                    {platformStats.totalExecutions || 0}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className={`w-full flex items-center px-4 py-3 text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-secondary)] hover:text-red-500 transition duration-200 rounded-2xl cursor-pointer ${
              isSidebarCollapsed ? "justify-center" : "space-x-3.5"
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>End Session</span>}
          </button>
        </div>
      </aside>

      {/* Main Workspace Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-[var(--color-glass-border)] backdrop-blur-md bg-[var(--glass-card-bg)] shadow-[var(--glass-card-shadow)] h-16 shrink-0 flex items-center px-4 sm:px-8 justify-between">
          <div className="flex items-center space-x-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] transition cursor-pointer shrink-0"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo on mobile */}
            <div className="flex items-center space-x-2 md:hidden">
              <div className="w-7 h-7 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-sm font-bold tracking-tight text-[var(--color-text-secondary)] hidden md:flex items-center space-x-2">
              <span>{greeting}, {user.displayName || "Manoj"}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {/* Search Box */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8.5 pr-3 py-1.5 text-xs clay-input focus:outline-none w-24 sm:w-44 md:w-56 text-[var(--color-text-primary)] transition-all duration-200"
              />
            </div>

            {/* Current Time Clock */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-[#6D5DF6]/5 border border-[#6D5DF6]/12 rounded-xl text-[10px] font-mono text-[#6D5DF6] font-extrabold">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime}</span>
            </div>

            {/* AI Advisor Button */}
            <button
              onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
              className="p-2 sm:p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer flex items-center space-x-1.5"
              title="Open AI Mentor"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-wider font-black">AI Coach</span>
            </button>

            {/* About Button */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="p-2 sm:p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[#6D5DF6]/5 shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer flex items-center space-x-1.5"
              title="About Platform"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-wider font-black">About</span>
            </button>

            {/* Notifications panel toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 sm:p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                {notificationsList.some(n => !n.isRead) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 glass-card p-4 space-y-3.5 z-50 text-[var(--color-text-primary)] text-xs shadow-2xl"
                  >
                    <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
                      <span className="font-mono uppercase font-black tracking-wider text-[10px] text-[var(--color-text-secondary)]">
                        Inbox Notifications
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={async () => {
                            try {
                              await ApiService.markNotificationRead(undefined, true);
                              fetchNotifications(true);
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="text-[9px] font-bold text-[#6D5DF6] hover:underline cursor-pointer"
                        >
                          Mark All Read
                        </button>
                        <span className="text-[var(--color-text-tertiary)]">|</span>
                        <button
                          onClick={async () => {
                            try {
                              await ApiService.deleteNotification(undefined, true);
                              fetchNotifications(true);
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="text-[9px] font-bold text-red-500 hover:underline cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search notifications..."
                        value={notifSearch}
                        onChange={(e) => setNotifSearch(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl border border-[var(--color-glass-border)] bg-[var(--input-bg-focus)] focus:outline-none focus:ring-1 focus:ring-[#6D5DF6] text-[10px]"
                      />
                    </div>

                    {/* Category Chips - Scrollable Row */}
                    <div className="flex space-x-1.5 overflow-x-auto pb-1.5 custom-scrollbar scrollbar-none">
                      {[
                        { label: "All", value: "all" },
                        { label: "Today", value: "today" },
                        { label: "Yesterday", value: "yesterday" },
                        { label: "This Week", value: "this_week" },
                        { label: "System", value: "system" },
                        { label: "Career", value: "career" },
                        { label: "Jobs", value: "jobs" },
                        { label: "Interview", value: "interview" },
                        { label: "ATS", value: "ats" },
                        { label: "Security", value: "security" }
                      ].map((chip) => (
                        <button
                          key={chip.value}
                          onClick={() => setNotifCategory(chip.value)}
                          className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wide border cursor-pointer shrink-0 transition duration-150 ${
                            notifCategory === chip.value
                              ? "bg-[#6D5DF6] text-white border-transparent"
                              : "bg-transparent text-[var(--color-text-secondary)] border-[var(--color-glass-border)] hover:bg-[var(--color-border)]"
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                      {loadingNotifications && notificationsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-6 space-y-2">
                          <div className="w-5 h-5 border-2 border-indigo-500/20 border-t-[#6D5DF6] rounded-full animate-spin" />
                          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider">
                            Loading alerts...
                          </span>
                        </div>
                      ) : notificationsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                          <div className="w-12 h-12 rounded-full bg-[#6D5DF6]/5 flex items-center justify-center text-[var(--color-text-tertiary)]">
                            <Bell className="w-6 h-6 stroke-1" />
                          </div>
                          <div>
                            <p className="font-bold text-[11px] text-[var(--color-text-secondary)]">No notifications yet</p>
                            <p className="text-[9px] text-[var(--color-text-tertiary)] mt-0.5">We will alert you when activity updates.</p>
                          </div>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="px-4 py-1.5 rounded-xl bg-[#6D5DF6] text-white font-bold text-[10px] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 transition cursor-pointer"
                          >
                            Return to Dashboard
                          </button>
                        </div>
                      ) : (
                        <>
                          {notificationsList.map((n) => (
                            <div
                              key={n.id}
                              className={`p-2.5 rounded-xl transition duration-200 flex items-start justify-between space-x-2.5 border group relative ${
                                n.isRead
                                  ? "bg-transparent border-transparent"
                                  : "bg-[#6D5DF6]/5 border-[#6D5DF6]/12 dark:border-[#6D5DF6]/20"
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-1.5">
                                  {!n.isRead && (
                                    <span className="w-1.5 h-1.5 bg-[#6D5DF6] rounded-full shrink-0" />
                                  )}
                                  <p className="font-bold text-[11px] leading-tight text-[var(--color-text-primary)]">
                                    {n.title}
                                  </p>
                                </div>
                                <p className="text-[10px] text-[var(--color-text-secondary)] leading-snug mt-0.5">
                                  {n.message}
                                </p>
                                <span className="text-[8px] text-[var(--color-text-tertiary)] font-mono block mt-1">
                                  {getRelativeTime(n.createdAt)}
                                </span>
                              </div>

                              <div className="flex space-x-1 shrink-0 opacity-0 group-hover:opacity-100 transition duration-150 self-center">
                                {!n.isRead && (
                                  <button
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      try {
                                        await ApiService.markNotificationRead(n.id);
                                        fetchNotifications(true);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    title="Mark as Read"
                                    className="p-1 rounded-lg bg-[var(--color-border)] hover:bg-[#6D5DF6]/20 hover:text-[#6D5DF6] cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                      await ApiService.deleteNotification(n.id);
                                      fetchNotifications(true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  title="Delete"
                                  className="p-1 rounded-lg bg-[var(--color-border)] hover:bg-red-500/20 hover:text-red-500 cursor-pointer"
                                >
                                  <Trash className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Pagination Load More */}
                          {notifHasMore && (
                            <button
                              onClick={() => fetchNotifications(false)}
                              disabled={loadingNotifications}
                              className="w-full py-2 border border-dashed border-[var(--color-glass-border)] rounded-xl text-[10px] font-bold text-[#6D5DF6] hover:bg-[#6D5DF6]/5 transition cursor-pointer text-center"
                            >
                              {loadingNotifications ? "Loading more..." : "Load More"}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme switcher */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 sm:p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            
            {/* User Profile Avatar on mobile */}
            <div 
              className="md:hidden w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center font-black text-xs text-white font-mono shadow-md cursor-pointer shrink-0" 
              onClick={() => setActiveTab("settings")}
            >
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
          </div>
        </header>

        {/* Workspace core canvas */}
        <main className="flex-1 py-6 sm:py-8 overflow-y-auto w-full relative overflow-x-hidden">
          <ResponsiveContainer>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold animate-fade-in z-20">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "settings" ? (
            <div className="space-y-8 animate-fade-in">
              <ProfileSettingsPage
                user={user}
                onUpdateUser={onUpdateUser}
                onResetResume={onResetResume}
                onNavigateBack={() => setActiveTab("overview")}
              />
              
              {/* Additional Production Settings (GDPR, Play Store Pages, Update Checker) */}
              <div className="glass-card p-6.5 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider font-black flex items-center space-x-2">
                    <Settings className="w-4.5 h-4.5 text-[#6D5DF6]" />
                    <span>Preferences & Support</span>
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-secondary)] font-mono mt-1 font-semibold">
                    Manage GDPR privacy settings, review terms, check app versions, or submit bug reports.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] font-mono">
                  <button
                    onClick={() => setPlayStoreModal("about")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    About Platform
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("privacy")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("terms")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("faq")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Help & FAQs
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("bug")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-red-500/5 hover:border-red-500/20 text-red-500 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Report Bug
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("feedback")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Send Feedback
                  </button>
                  <button
                    onClick={() => setPlayStoreModal("update")}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-emerald-500/5 hover:border-emerald-500/20 text-emerald-500 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Check for Updates
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const data = await ApiService.exportUserData();
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `skillbridge_data_${user.uid}.json`;
                        a.click();
                      } catch (err) {
                        alert("Failed to export data.");
                      }
                    }}
                    className="p-3.5 border border-[var(--color-border)] hover:bg-[#6D5DF6]/5 bg-[var(--glass-card-bg)] rounded-2xl font-bold cursor-pointer text-center"
                  >
                    Export Data (GDPR)
                  </button>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)] flex justify-between items-center text-[10px] font-mono text-[var(--color-text-tertiary)]">
                  <span>Application Version: v2.0.0 (Production)</span>
                  <button
                    onClick={async () => {
                      if (confirm("Are you sure you want to permanently delete your account? This action is irreversible under GDPR compliance.")) {
                        try {
                          await ApiService.deleteAccount();
                          ApiService.clearToken();
                          onLogout();
                        } catch (err) {
                          alert("Failed to delete account.");
                        }
                      }
                    }}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "applications" ? (
            <ApplicationTracker />
          ) : activeTab === "resumes" ? (
            <ResumeManager
              userId={user?.uid || ""}
              activeResume={resume}
              onSelectResume={(res) => {
                setResume(res);
              }}
            />
          ) : activeTab === "admin" ? (
            <AdminPanel />
          ) : !resume && !["resumes", "applications", "admin", "settings"].includes(activeTab) ? (
            /* Premium onboarding hero — no resume uploaded */
            <div className="animate-fade-in w-full space-y-6">

              {/* ── HERO: Two-column layout ── */}
              <div className="relative glass-card glowing-border overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6D5DF6]/10 rounded-full blur-[100px]" />
                  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#8B5CF6]/8 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">

                  {/* LEFT: AI illustration */}
                  <div className="flex items-center justify-center p-8 sm:p-12 lg:border-r border-[var(--color-border)]">
                    <div className="relative w-full max-w-[260px]">
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative">
                        {/* Resume mockup */}
                        <div className="glass-card p-6 shadow-2xl border border-[var(--color-glass-border)]">
                          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-[var(--color-border)]">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center shadow-md">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="h-2 w-24 bg-[var(--color-border)] rounded-full" />
                              <div className="h-1.5 w-16 bg-[var(--color-border)]/60 rounded-full mt-1.5" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 w-full bg-[var(--color-border)] rounded-full" />
                            <div className="h-1.5 w-4/5 bg-[var(--color-border)]/80 rounded-full" />
                            <div className="h-1.5 w-full bg-[var(--color-border)] rounded-full" />
                            <div className="h-1.5 w-3/4 bg-[var(--color-border)]/60 rounded-full" />
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="h-1.5 w-full bg-[var(--color-border)] rounded-full" />
                            <div className="h-1.5 w-5/6 bg-[var(--color-border)]/80 rounded-full" />
                          </div>
                          <div className="mt-4 flex space-x-2">
                            <div className="h-5 w-12 bg-[#6D5DF6]/15 border border-[#6D5DF6]/25 rounded-lg" />
                            <div className="h-5 w-14 bg-[#8B5CF6]/15 border border-[#8B5CF6]/25 rounded-lg" />
                            <div className="h-5 w-10 bg-emerald-500/15 border border-emerald-500/25 rounded-lg" />
                          </div>
                        </div>
                        {/* Floating AI score */}
                        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 glass-card px-3 py-2 border border-[#6D5DF6]/25 shadow-lg flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center">
                            <Brain className="w-3 h-3 text-white" />
                          </div>
                          <div>
                            <div className="text-[9px] font-mono font-black text-[#6D5DF6] uppercase tracking-wider">AI Score</div>
                            <div className="text-[11px] font-black text-[var(--color-text-primary)]">Ready</div>
                          </div>
                        </motion.div>
                        {/* Floating ATS */}
                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-4 -left-4 glass-card px-3 py-2 border border-emerald-500/25 shadow-lg flex items-center space-x-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-wider">ATS</div>
                            <div className="text-[11px] font-black text-[var(--color-text-primary)]">Optimized</div>
                          </div>
                        </motion.div>
                        {/* Floating match */}
                        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-1/2 -right-8 glass-card px-3 py-2 border border-amber-500/25 shadow-lg">
                          <div className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-wider">Match</div>
                          <div className="text-[13px] font-black text-[var(--color-text-primary)]">96%</div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* RIGHT: Onboarding content */}
                  <div className="flex flex-col justify-center p-8 sm:p-12">
                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-5">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#6D5DF6]/10 to-[#8B5CF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] text-[10px] font-mono font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6D5DF6] animate-pulse" />
                        <span>Unlock Your Career with AI</span>
                      </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-3">
                      No Resume Uploaded
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25 }} className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed mb-6 font-sans">
                      Upload your resume to unlock AI-powered ATS analysis, job matching, skill gap analysis, career roadmap, interview preparation, and career insights.
                    </motion.p>

                    {/* 6 Feature mini-cards */}
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.32 }} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-7">
                      {[
                        { label: "ATS Analysis",       icon: ShieldCheck,   color: "text-[#6D5DF6]",    bg: "bg-[#6D5DF6]/8 border-[#6D5DF6]/15"    },
                        { label: "Career Score",       icon: TrendingUp,    color: "text-emerald-500",  bg: "bg-emerald-500/8 border-emerald-500/15" },
                        { label: "Skill Gap Analysis", icon: Map,           color: "text-amber-500",    bg: "bg-amber-500/8 border-amber-500/15"    },
                        { label: "Job Matching",       icon: Briefcase,     color: "text-sky-500",      bg: "bg-sky-500/8 border-sky-500/15"        },
                        { label: "Career Roadmap",     icon: Target,        color: "text-[#8B5CF6]",    bg: "bg-[#8B5CF6]/8 border-[#8B5CF6]/15"   },
                        { label: "Interview Prep",     icon: MessageSquare, color: "text-rose-500",     bg: "bg-rose-500/8 border-rose-500/15"      }
                      ].map((feat, i) => {
                        const FIcon = feat.icon;
                        return (
                          <motion.div key={i} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.36 + i * 0.05 }} className={`flex items-center space-x-2 p-2.5 rounded-xl border ${feat.bg} group hover:scale-[1.02] transition-transform duration-200`}>
                            <div className="p-1.5 rounded-lg bg-[var(--color-bg-page)] border border-[var(--color-border)] shrink-0">
                              <FIcon className={`w-3.5 h-3.5 ${feat.color}`} />
                            </div>
                            <span className="text-[10px] font-bold font-mono text-[var(--color-text-primary)] leading-tight">{feat.label}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.58 }}>
                      <button
                        onClick={() => onNavigate("upload")}
                        className="w-full sm:w-auto px-8 py-3.5 clay-btn clay-btn-primary text-sm font-mono uppercase tracking-wider font-bold text-white shadow-lg flex items-center justify-center space-x-2.5 group"
                      >
                        <Upload className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                        <span>Upload Resume &amp; Start AI Analysis</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                      <p className="flex items-center space-x-1.5 mt-3 text-[10px] text-[var(--color-text-tertiary)] font-mono font-semibold">
                        <Lock className="w-3 h-3 shrink-0" />
                        <span>Your resume is encrypted and processed securely.</span>
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* ── AI PIPELINE WORKFLOW ── */}
              <div className="glass-card p-6 sm:p-8 overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[#6D5DF6]/5 rounded-full blur-[60px]" />
                </div>
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] font-black block">AI Pipeline Workflow</span>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 font-medium">Your resume powers 7 intelligent career engines</p>
                  </div>
                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-center justify-start sm:justify-center min-w-max sm:min-w-0 px-2">
                      {[
                        { step: 1, label: "Upload\nResume",      icon: Upload,        color: "#6D5DF6", active: true  },
                        { step: 2, label: "AI\nParsing",         icon: Cpu,           color: "#8B5CF6", active: false },
                        { step: 3, label: "Profile\nAnalysis",   icon: User,          color: "#A78BFA", active: false },
                        { step: 4, label: "Skill Gap\nAnalysis", icon: Map,           color: "#22C55E", active: false },
                        { step: 5, label: "Job\nMatching",       icon: Briefcase,     color: "#F59E0B", active: false },
                        { step: 6, label: "Career\nRoadmap",     icon: Target,        color: "#0EA5E9", active: false },
                        { step: 7, label: "Interview\nPrep",     icon: MessageSquare, color: "#F43F5E", active: false }
                      ].map((s, idx, arr) => {
                        const SIcon = s.icon;
                        return (
                          <div key={idx} className="flex items-center">
                            <div className="flex flex-col items-center space-y-2 w-[76px]">
                              <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.1 + idx * 0.07, ease: [0.16, 1, 0.3, 1] }} className="relative">
                                {s.active && (
                                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: `radial-gradient(circle, ${s.color}50, transparent)` }} />
                                )}
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 border-2 ${
                                    s.active ? "border-transparent" : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                                  }`}
                                  style={s.active ? { background: `linear-gradient(135deg, ${s.color}cc, ${s.color}88)`, boxShadow: `0 0 18px ${s.color}40` } : {}}
                                >
                                  <SIcon className="w-5 h-5" style={{ color: s.active ? "#fff" : s.color }} />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black z-20 border border-[var(--color-bg-page)]" style={{ background: s.color, color: "#fff" }}>
                                  {s.step}
                                </div>
                              </motion.div>
                              <span className="text-[9px] font-mono font-bold text-center text-[var(--color-text-secondary)] whitespace-pre-line leading-snug">{s.label}</span>
                            </div>
                            {idx < arr.length - 1 && (
                              <div className="relative w-8 shrink-0 -mt-5 overflow-hidden">
                                <div className="h-px bg-[var(--color-border)]">
                                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: idx * 0.25 }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#6D5DF6]/60 to-transparent" />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Active tab view contents */
            <div className="space-y-8 animate-fade-in relative z-10">
              
              {/* Tab Content: OVERVIEW (Career Board Dashboard) */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Hero Welcoming Card */}
                  <div className="relative glass-card p-6.5 sm:p-8 overflow-hidden">
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-tr from-[#6D5DF6]/12 to-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
                          <span>Career Board</span>
                          <span className="text-[10px] px-2.5 py-0.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-bold uppercase tracking-wider">
                            Active Platform
                          </span>
                        </h1>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
                          Primary Resume Profile: <span className="font-mono text-[#6D5DF6] font-bold">{resume?.fileName || "None Uploaded"}</span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setActiveTab("resumes")}
                          className="px-5 py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-semibold"
                        >
                          Manage Resumes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Daily Tip Alert */}
                  <div className="p-4 bg-[#6D5DF6]/5 border border-[#6D5DF6]/15 rounded-2xl flex items-start space-x-3 text-[11px] font-sans font-medium text-[var(--color-text-secondary)] shadow-sm">
                    <span className="bg-[#6D5DF6] text-white text-[8px] font-mono uppercase font-black px-2 py-0.5 rounded-lg select-none shrink-0">Tip of the Day</span>
                    <span>
                      {
                        [
                          "Always customize your resume keywords to match the target job description before submitting.",
                          "Practice mock interviews at least twice a week to reduce anxiety and polish communication.",
                          "A clean GitHub repository showing real project commits is worth more than a static portfolio.",
                          "Verify your technical skills by mapping roadmaps to real production repos you've built.",
                          "ATS parsers favor simple layout columns and standard headers like 'Work Experience'.",
                          "Keep your LinkedIn profile headline specific: state your core technologies and target roles.",
                          "Follow up with recruiters within 3 days of your technical assessment rounds."
                        ][new Date().getDay() % 7]
                      }
                    </span>
                  </div>

                  {/* KPI Analytics Dials Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {/* Career Score */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px] relative overflow-hidden group">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Career Score</span>
                      {resume && atsResult && skillGapResult && Object.values(profileItems).some(Boolean) && (resume?.parsedData?.projects && resume?.parsedData?.projects.length > 0) ? (
                        <>
                          <div className="my-2">
                            <CircularScoreGauge 
                              score={Math.round(
                                ((Object.values(profileItems).filter(Boolean).length / Object.keys(profileItems).length) * 100 + 
                                (qualityAnalysis?.qualityScore || 80) + 
                                (atsResult?.score || 85) + 
                                (interviewHistory.length > 0 ? getInterviewOverallScore() : 75)) / 4
                              )} 
                              colorClass="stroke-[#6D5DF6]" 
                              size={70} 
                              strokeWidth={5} 
                              showMaxScore={false} 
                            />
                          </div>
                          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">Overall Readiness</span>
                        </>
                      ) : (
                        <>
                          <div className="my-2 flex flex-col items-center justify-center space-y-1">
                            <Lock className="w-5 h-5 text-[var(--color-text-tertiary)] animate-pulse" />
                            <span className="text-[10px] font-bold text-red-500">Locked</span>
                          </div>
                          <span className="text-[8px] leading-tight text-[var(--color-text-tertiary)] font-sans px-1 select-none">
                            Career Score is locked. Upload your resume to generate personalized career insights.
                          </span>
                        </>
                      )}
                    </div>

                    {/* ATS Score */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px]">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">ATS Score</span>
                      <div className="my-2">
                        <CircularScoreGauge score={atsResult?.score || 0} colorClass="stroke-indigo-500" size={70} strokeWidth={5} showMaxScore={false} suffix="%" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">{atsResult ? "Calculated Fit" : "Not scanned"}</span>
                    </div>

                    {/* Interview Readiness */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px]">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Interview Prep</span>
                      <div className="my-2">
                        <CircularScoreGauge score={interviewAnswers.length > 0 ? getInterviewOverallScore() : 0} colorClass="stroke-amber-500" size={70} strokeWidth={5} showMaxScore={false} suffix="%" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">Mock Performance</span>
                    </div>

                    {/* Skill Readiness */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px]">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Skill Match</span>
                      <div className="my-2">
                        <CircularScoreGauge score={Math.max(0, 100 - (skillGapResult?.missingSkills?.length || 0) * 10)} colorClass="stroke-emerald-500" size={70} strokeWidth={5} showMaxScore={false} suffix="%" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">{skillGapResult ? "Target Skills Fit" : "No roadmap"}</span>
                    </div>

                    {/* Resume Health */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px]">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Resume Health</span>
                      <div className="my-2">
                        <CircularScoreGauge score={resume?.content ? (resume.content.length > 1500 ? 95 : 75) : 0} colorClass="stroke-pink-500" size={70} strokeWidth={5} showMaxScore={false} suffix="%" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">Format & Word count</span>
                    </div>

                    {/* Job Match Percentage */}
                    <div className="glass-card p-5 flex flex-col items-center justify-between text-center min-h-[170px]">
                      <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Job Matches</span>
                      <div className="my-2">
                        <CircularScoreGauge score={recommendedOpps.length > 0 ? 92 : 0} colorClass="stroke-purple-500" size={70} strokeWidth={5} showMaxScore={false} suffix="%" />
                      </div>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">{recommendedOpps.length} opportunities</span>
                    </div>
                  </div>

                  {/* Profile Completion & AI Insights Bento Block */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Completion Checklist */}
                    <div className="glass-card p-6 space-y-4">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Profile Completion</h3>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-[var(--color-border)] h-2 rounded-full overflow-hidden p-[1px]">
                          <div
                            className="bg-[#6D5DF6] h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.round((Object.values(profileItems).filter(Boolean).length / Object.keys(profileItems).length) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#6D5DF6]">
                          {Math.round((Object.values(profileItems).filter(Boolean).length / Object.keys(profileItems).length) * 100)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-[10px] font-mono">
                        {Object.keys(profileItems).map((key) => (
                          <div
                            key={key}
                            onClick={() => toggleProfileItem(key)}
                            className="flex items-center space-x-2.5 p-2 bg-[var(--color-bg-page)]/50 hover:bg-[#6D5DF6]/5 border border-[var(--color-border)]/45 rounded-xl cursor-pointer transition duration-155"
                          >
                            <input
                              type="checkbox"
                              checked={profileItems[key]}
                              readOnly
                              className="accent-[#6D5DF6] cursor-pointer"
                            />
                            <span className="text-[var(--color-text-primary)] font-bold capitalize">{key.replace("linkedin", "LinkedIn").replace("github", "GitHub")}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights & Recommendations */}
                    <div className="lg:col-span-2 glass-card p-6 space-y-4 flex flex-col justify-between">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">AI Insights & Coaching</h3>
                      <div className="space-y-4 flex-1">
                        {aiInsights.map((insight, idx) => (
                          <div key={idx} className="flex justify-between items-start space-x-4 p-3 bg-[var(--color-bg-page)]/30 border border-[var(--color-border)]/30 rounded-2xl text-[10.5px]">
                            <div className="space-y-1">
                              <span className={`text-[8px] font-mono uppercase font-black px-1.5 py-0.5 rounded-lg ${
                                insight.type === "ats" ? "bg-indigo-500/10 text-indigo-500" :
                                insight.type === "skill" ? "bg-emerald-500/10 text-emerald-500" :
                                insight.type === "interview" ? "bg-amber-500/10 text-amber-500" :
                                "bg-[#6D5DF6]/10 text-[#6D5DF6]"
                              }`}>
                                {insight.type || "AI Suggestion"}
                              </span>
                              <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium">{insight.text}</p>
                            </div>
                            <button
                              onClick={() => {
                                if (insight.type === "ats") setActiveTab("ats");
                                else if (insight.type === "skill") setActiveTab("roadmap");
                                else if (insight.type === "interview") setActiveTab("interview");
                                else if (insight.type === "jobs") setActiveTab("jobs");
                              }}
                              className="px-2.5 py-1.5 border border-[#6D5DF6]/20 text-[#6D5DF6] font-mono text-[9px] font-bold rounded-lg hover:bg-[#6D5DF6]/5 transition duration-150 shrink-0"
                            >
                              {insight.action || "Resolve"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Activity Grid & Activity Log Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Activity Commit Grid */}
                    <div className="glass-card p-6 space-y-4">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Activity Commit Grid</h3>
                      <div className="grid grid-cols-7 gap-1.5 w-fit mx-auto">
                        {Array.from({ length: 35 }).map((_, i) => {
                          const count = [0, 1, 3, 2, 4, 0, 2, 1, 0, 3, 0, 4, 2, 1, 0][i % 15];
                          return (
                            <div
                              key={i}
                              className={`w-3.5 h-3.5 rounded-sm transition duration-150 ${
                                count === 0 ? "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800" :
                                count === 1 ? "bg-[#6D5DF6]/20" :
                                count === 2 ? "bg-[#6D5DF6]/40" :
                                count === 3 ? "bg-[#6D5DF6]/70" :
                                "bg-[#6D5DF6] shadow-sm shadow-[#6D5DF6]/30"
                              }`}
                              title={`${count} executions`}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold pt-2 border-t border-[var(--color-border)]/50">
                        <span>Less active</span>
                        <span>More active</span>
                      </div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <div className="md:col-span-2 glass-card p-6 space-y-4">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Recent Activity Timeline</h3>
                      <div className="relative border-l border-[var(--color-border)]/80 ml-3 pl-5 space-y-4.5 text-[10.5px]">
                        {[
                          { text: "Optimized Resume quality score", time: "Just now", type: "file" },
                          { text: "Assigned Software Engineering career roadmap", time: "2 hours ago", type: "roadmap" },
                          { text: "Completed Behavioral mock interview session", time: "1 day ago", type: "interview" }
                        ].map((act, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute left-[-26px] top-[2px] w-3 h-3 rounded-full bg-[#6D5DF6] border-2 border-white dark:border-gray-950" />
                            <p className="font-sans font-medium text-[var(--color-text-secondary)] leading-relaxed">
                              {act.text}
                            </p>
                            <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase mt-0.5 block font-bold">{act.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content: ATS Scanner */}
              {activeTab === "ats" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                  <form onSubmit={handleAtsScan} className="p-6 sm:p-8 glass-card flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-base font-black">ATS Keyword Scanner</h2>
                      <p className="text-[10.5px] text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium">
                        Paste the target job specification description to analyze candidate skill vector fitment.
                      </p>
                      
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste target job description details here..."
                        rows={10}
                        required
                        className="w-full clay-input px-4 py-3.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none leading-relaxed resize-none min-h-[200px] font-sans font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={scanningAts}
                      className="w-full py-4 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md"
                    >
                      {scanningAts ? (
                        <span className="flex items-center justify-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Simulating Recruiter Filters...</span>
                        </span>
                      ) : (
                        "Analyze ATS Compatibility"
                      )}
                    </button>
                  </form>

                  {/* ATS Results View */}
                  <div className="p-6 sm:p-8 glass-card flex flex-col justify-between space-y-6">
                    {scanningAts ? (
                      <div className="flex-grow flex flex-col items-center justify-center text-center space-y-3">
                        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-extrabold">Evaluating Keyword Overlap Index</span>
                      </div>
                    ) : atsResult ? (
                      <div className="space-y-6 flex-grow flex flex-col justify-between">
                        <div className="flex items-center space-x-6 border-b border-[var(--color-border)] pb-5">
                          <CircularScoreGauge score={atsResult.score} size={84} strokeWidth={6} colorClass="stroke-[#6D5DF6]" />
                          <div>
                            <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">ATS Match Percentage</h3>
                            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1.5 leading-relaxed font-sans font-medium">
                              {atsResult.score >= 85
                                ? "Excellent keywords match score! Direct profile fit."
                                : atsResult.score >= 70
                                ? "Moderate index match. Inject keywords listed below to boost pass rates."
                                : "Substantial deficit. Restructure resume experience blocks."}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                          {/* Verdict block */}
                          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
                            <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black mb-1">Recruiter Agent Verdict</span>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">{atsResult.verdict || `Resume score is ${atsResult.score}/100.`}</p>
                          </div>

                          {/* Keywords Matched / Deficit Chips */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                              <span className="text-[9px] font-mono text-[#22C55E] uppercase block font-black">Matched Keywords</span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.keywordsMatched?.map((w: string, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] rounded text-[9.5px] font-mono font-medium">{w}</span>
                                )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                              </div>
                            </div>

                            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                              <span className="text-[9px] font-mono text-red-500 uppercase block font-black">Missing Keywords</span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.missingKeywords?.map((w: string, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-[9.5px] font-mono font-medium">{w}</span>
                                )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <ClipboardList className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                        <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                          Enter target job description and trigger ATS simulation report.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab Content: Job Matcher */}
              {activeTab === "jobs" && (
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-5">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">Neural Job Matcher</h1>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                        Browse top developer opportunities matching your exact candidate skill vectors.
                      </p>
                    </div>

                    <button
                      onClick={handleJobMatching}
                      disabled={matchingJobs}
                      className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md flex items-center space-x-2 shrink-0"
                    >
                      <RefreshCw className={`w-4 h-4 ${matchingJobs ? "animate-spin" : ""}`} />
                      <span>{matchingJobs ? "Matching..." : "Re-Calculate Matches"}</span>
                    </button>
                  </div>

                  {/* Search and Filters panel */}
                  {jobMatches.length > 0 && (
                    <div className="p-6 glass-card space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title / Keywords query */}
                        <div className="relative">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                          <input
                            type="text"
                            placeholder="Search by Job Title, Company, or Skill..."
                            value={jobSearchQuery}
                            onChange={(e) => {
                              jobSearchQuery === "" && setCurrentPageNum(1);
                              setJobSearchQuery(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl text-xs font-sans font-medium placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Location query */}
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                          <input
                            type="text"
                            placeholder="Location (e.g. Remote, Berlin, London)..."
                            value={jobLocationQuery}
                            onChange={(e) => {
                              jobLocationQuery === "" && setCurrentPageNum(1);
                              setJobLocationQuery(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl text-xs font-sans font-medium placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Dropdown Filters Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {/* Remote Option */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Workplace</label>
                          <select
                            value={filterRemote}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setFilterRemote(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none"
                          >
                            <option value="all">All Workplace</option>
                            <option value="Remote">Remote Only</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                          </select>
                        </div>

                        {/* Job Type */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Job Type</label>
                          <select
                            value={filterJobType}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setFilterJobType(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none"
                          >
                            <option value="all">All Types</option>
                            <option value="Full Time">Full-Time</option>
                            <option value="Part Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>

                        {/* Experience Level */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Experience</label>
                          <select
                            value={filterExpLevel}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setFilterExpLevel(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none"
                          >
                            <option value="all">All Levels</option>
                            <option value="Junior">Junior</option>
                            <option value="Mid">Mid-Level</option>
                            <option value="Senior">Senior / Lead</option>
                          </select>
                        </div>

                        {/* Salary Filter */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Salary</label>
                          <select
                            value={filterSalary}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setFilterSalary(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none"
                          >
                            <option value="all">Any Salary</option>
                            <option value="60000">&gt; $60,000</option>
                            <option value="80000">&gt; $80,000</option>
                            <option value="100000">&gt; $100,000</option>
                            <option value="120000">&gt; $120,000</option>
                            <option value="150000">&gt; $150,000</option>
                          </select>
                        </div>

                        {/* Date Posted */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Time Posted</label>
                          <select
                            value={filterPostedDate}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setFilterPostedDate(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none"
                          >
                            <option value="all">Any Time</option>
                            <option value="1">Past 24 Hours</option>
                            <option value="7">Past 7 Days</option>
                            <option value="30">Past 30 Days</option>
                          </select>
                        </div>

                        {/* Sorter */}
                        <div>
                          <label className="text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase block mb-1">Sort By</label>
                          <select
                            value={sortBy}
                            onChange={(e) => {
                              setCurrentPageNum(1);
                              setSortBy(e.target.value);
                            }}
                            className="w-full px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[11px] font-sans font-medium focus:outline-none font-bold text-[#6D5DF6]"
                          >
                            <option value="match">Best Match</option>
                            <option value="newest">Newest</option>
                            <option value="salary">Highest Salary</option>
                            <option value="company">Company Name</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shimmer Loader Skeletons */}
                  {matchingJobs ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 4, 5].map((item) => (
                        <div key={item} className="p-6 glass-card animate-pulse space-y-5 h-[340px] flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div className="space-y-2.5 w-2/3">
                                <div className="h-4.5 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
                                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                              </div>
                              <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-16" />
                            </div>
                            <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                            <div className="h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                            <div className="flex space-x-2 pt-2">
                              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full w-14" />
                              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full w-16" />
                            </div>
                          </div>
                          <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-xl w-full" />
                        </div>
                      ))}
                    </div>
                  ) : filteredJobs.length > 0 ? (
                    <>
                      {/* Paginated Job Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredJobs.slice((currentPageNum - 1) * 6, currentPageNum * 6).map((job, idx) => {
                          const isBookmarked = bookmarkedJobs.includes(job.company);
                          const isCopied = copiedJobId === job.applyUrl;

                          return (
                            <div key={idx} className="p-6 glass-card flex flex-col justify-between space-y-6 hover:shadow-md transition duration-300 relative group">
                              <div className="space-y-4">
                                {/* Header (Title, Company, Score, Bookmark) */}
                                <div className="flex justify-between items-start gap-3">
                                  <div className="flex items-center space-x-3">
                                    {/* Glass company logo container */}
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-mono font-black text-sm text-[#6D5DF6] shrink-0 uppercase">
                                      {job.company.substring(0, 1)}
                                    </div>
                                    <div className="space-y-0.5">
                                      <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] leading-snug group-hover:text-[#6D5DF6] transition duration-200">
                                        {job.role}
                                      </h3>
                                      <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--color-text-secondary)]">
                                        <span>{job.company}</span>
                                        <span>&bull;</span>
                                        <span className="text-[10px] font-mono bg-indigo-500/10 text-[#6D5DF6] px-1.5 py-0.5 rounded">
                                          {job.provider || "Web"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2 shrink-0">
                                    <button
                                      onClick={() => toggleBookmark(job.company)}
                                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Opportunity"}
                                      className="p-2 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[#6D5DF6] hover:border-indigo-500/40 transition shadow-sm cursor-pointer"
                                    >
                                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-[#6D5DF6] text-[#6D5DF6]" : ""}`} />
                                    </button>
                                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] rounded-lg text-[9px] font-mono font-black shrink-0">
                                      {job.matchPercentage}% Fit
                                    </span>
                                  </div>
                                </div>

                                {/* Tags row */}
                                <div className="flex flex-wrap gap-1.5 text-[9.5px] font-mono font-bold text-[var(--color-text-secondary)]">
                                  <span className="bg-[var(--color-bg-page)] px-2 py-0.5 rounded-lg border border-[var(--color-border)] flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {job.location || "Remote"}
                                  </span>
                                  <span className="bg-[var(--color-bg-page)] px-2 py-0.5 rounded-lg border border-[var(--color-border)]">
                                    {job.type}
                                  </span>
                                  <span className="bg-[var(--color-bg-page)] px-2 py-0.5 rounded-lg border border-[var(--color-border)]">
                                    {job.salary || "Competitive"}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium line-clamp-3">
                                  {job.description}
                                </p>

                                {/* Skills overlapping lists */}
                                <div className="space-y-1.5 pt-1">
                                  {/* Matched skills */}
                                  {job.matchedSkills && job.matchedSkills.length > 0 && (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-500 font-extrabold shrink-0 w-16">Matched:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {job.matchedSkills.slice(0, 5).map((s: string, sIdx: number) => (
                                          <span key={sIdx} className="px-1.5 py-0.2 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] text-[8.5px] font-mono rounded">
                                            {s}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Missing skills */}
                                  {job.missingSkills && job.missingSkills.length > 0 && (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[9px] font-mono uppercase tracking-wider text-red-400 font-extrabold shrink-0 w-16">Missing:</span>
                                      <div className="flex flex-wrap gap-1">
                                        {job.missingSkills.slice(0, 4).map((s: string, sIdx: number) => (
                                          <span key={sIdx} className="px-1.5 py-0.2 bg-red-500/10 border border-red-500/20 text-red-500 text-[8.5px] font-mono rounded">
                                            {s}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Why it matches box */}
                                <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start space-x-2">
                                  <Brain className="w-4 h-4 text-[#6D5DF6] shrink-0 mt-0.5" />
                                  <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)] font-sans font-medium italic">
                                    {job.reason || "Matches your candidate profile skills structure and core technical projects stacks."}
                                  </p>
                                </div>
                              </div>

                              {/* Footer Action buttons */}
                              <div className="flex space-x-2 items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto">
                                <span className="text-[9.5px] font-mono text-[var(--color-text-tertiary)]">
                                  {job.postedDate ? `Listed ${new Date(job.postedDate).toLocaleDateString()}` : "Active"}
                                </span>
                                <div className="flex space-x-2">
                                  {/* Share button */}
                                  <button
                                    onClick={() => {
                                      const text = `Check out this job match: ${job.role} at ${job.company}. Apply: ${job.applyUrl}`;
                                      navigator.clipboard.writeText(text);
                                      setCopiedJobId(job.applyUrl);
                                      setTimeout(() => setCopiedJobId(null), 2000);
                                    }}
                                    className="px-3.5 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:border-indigo-500/30 rounded-xl text-[10px] font-mono uppercase tracking-wider font-semibold text-[var(--color-text-secondary)] hover:text-[#6D5DF6] transition shadow-sm shrink-0"
                                  >
                                    {isCopied ? "Copied!" : "Share"}
                                  </button>

                                  {/* Apply button */}
                                  <a
                                    href={job.applyUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-4 py-2.5 clay-btn clay-btn-primary text-[10px] font-mono uppercase tracking-wider font-bold text-white shadow-sm flex items-center space-x-1.5"
                                  >
                                    <span>Apply Now</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Pagination Controls */}
                      {filteredJobs.length > 6 && (
                        <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-6 mt-4">
                          <button
                            onClick={() => setCurrentPageNum((p) => Math.max(p - 1, 1))}
                            disabled={currentPageNum === 1}
                            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono font-bold disabled:opacity-40 transition hover:bg-[var(--color-bg-page)] cursor-pointer"
                          >
                            &larr; Previous Page
                          </button>
                          <span className="text-xs font-mono font-bold text-[var(--color-text-secondary)]">
                            Page {currentPageNum} of {Math.ceil(filteredJobs.length / 6)} ({filteredJobs.length} opportunities found)
                          </span>
                          <button
                            onClick={() => setCurrentPageNum((p) => Math.min(p + 1, Math.ceil(filteredJobs.length / 6)))}
                            disabled={currentPageNum === Math.ceil(filteredJobs.length / 6)}
                            className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-mono font-bold disabled:opacity-40 transition hover:bg-[var(--color-bg-page)] cursor-pointer"
                          >
                            Next Page &rarr;
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Empty Slate filter results */
                    <div className="p-12 glass-card flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                        <Briefcase className="w-7 h-7" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-extrabold text-[var(--color-text-primary)]">
                          No matching opportunities found
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                          Your search filters or resume profile skills configuration didn't match any index items. Try clearing your search parameters or check the recommended tech gaps below.
                        </p>
                      </div>

                      {/* Suggested Skills to learn empty state */}
                      <div className="bg-[var(--color-bg-page)] p-5 border border-[var(--color-border)] rounded-2xl w-full max-w-lg space-y-3 shadow-inner text-left">
                        <span className="text-[10px] font-mono text-indigo-500 uppercase block font-black">
                          Recommended Skills to Boost Matching
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {["Docker", "Kubernetes", "Next.js", "GraphQL", "TypeScript", "AWS Cloud", "FastAPI"].map((tech) => (
                            <span key={tech} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/25 text-[#6D5DF6] rounded-xl text-[10px] font-mono font-semibold">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-[10px] text-[var(--color-text-tertiary)] italic leading-relaxed pt-1">
                          Tip: Add these certifications or framework keywords to your profile and click "Re-Calculate Matches".
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Skill Gaps */}
              {activeTab === "roadmap" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">Skill Gap Analysis</h1>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                      Target specific engineering roles, calculate skill gap vectors, and view direct heatmap recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                    
                    {/* Role search form */}
                    <div className="order-2 lg:order-1 lg:col-span-2 glass-card p-6 flex flex-col justify-between space-y-6">
                      <form
                        onSubmit={(e) => {
                          handleSkillGapAnalysis(e);
                          addRecentSearch(targetCareerRole);
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-bold">
                            Target Career Role
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={targetCareerRole}
                              onChange={(e) => setTargetCareerRole(e.target.value)}
                              placeholder="e.g. Senior Backend Engineer"
                              required
                              className="w-full clay-input pl-4 pr-10 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none font-sans font-medium"
                            />
                            <button type="submit" className="absolute right-3 top-2 text-[#6D5DF6]">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Recent searches */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-black">Recent Searches</span>
                          <div className="flex flex-wrap gap-1.5">
                            {recentSearches.map((s, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setTargetCareerRole(s)}
                                className="px-2.5 py-1 bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[9.5px] font-mono text-[var(--color-text-secondary)] hover:text-[#6D5DF6] rounded-lg font-bold"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      </form>

                      {skillGapResult && (
                        <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
                          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase block font-black">Certifications Recommended</span>
                          <div className="space-y-2">
                            {["AWS Solutions Architect", "Google Professional Cloud Dev"].map((cert, i) => (
                              <div key={i} className="flex items-center space-x-2.5 p-2 bg-[#6D5DF6]/5 border border-[#6D5DF6]/12 rounded-xl">
                                <Award className="w-4 h-4 text-[#6D5DF6]" />
                                <span className="text-[10px] font-bold text-[var(--color-text-primary)]">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gap Radar Heatmap widgets */}
                    <div className="order-1 lg:order-2 lg:col-span-3 glass-card p-6 flex flex-col justify-between min-h-[380px]">
                      {analyzingGaps ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-3">
                          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                          <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Assembling Radar Matrix</span>
                        </div>
                      ) : skillGapResult ? (
                        <div className="space-y-6 flex-grow flex flex-col justify-between">
                          <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold border-b border-[var(--color-border)] pb-3">Skill Radar Matrix</h3>
                          
                          {/* Recharts Radar chart */}
                          <div className="h-[220px] w-full flex items-center justify-center font-mono text-[9px]">
                            <RechartsResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                                { subject: "Languages", A: 85, B: 95 },
                                { subject: "Databases", A: 90, B: 85 },
                                { subject: "Cloud Ops", A: 55, B: 88 },
                                { subject: "APIs Design", A: 80, B: 90 },
                                { subject: "Testing", A: 60, B: 80 }
                              ]}>
                                <PolarGrid stroke="var(--color-border)" />
                                <PolarAngleAxis dataKey="subject" stroke="var(--color-text-secondary)" fontSize={9} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--color-border)" fontSize={7} />
                                <Radar name="Possessed" dataKey="A" stroke="#6D5DF6" fill="#6D5DF6" fillOpacity={0.25} />
                                <Radar name="Target Required" dataKey="B" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} />
                              </RadarChart>
                            </RechartsResponsiveContainer>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl">
                              <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black">Missing Gaps</span>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {skillGapResult.missingSkills?.map((s: string, idx: number) => (
                                  <span key={idx} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-[9px] font-mono">{s}</span>
                                )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                              </div>
                            </div>

                            <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl flex flex-col justify-between">
                              <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black">Est. Study time</span>
                              <span className="text-lg font-black text-[#6D5DF6] block mt-1 font-mono">3-4 Weeks</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                          <TrendingUp className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                          <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                            State a target role description to generate comparison reports.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* Tab Content: Career Roadmap TIMELINE */}
              {activeTab === "career-roadmap" && (
                <div className="space-y-6">
                  <div className="border-b border-[var(--color-border)] pb-5">
                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">Career Roadmap timeline</h1>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                      Review complete certification timelines, courses, and portfolios milestones.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    
                    {/* Left Catalog Lists */}
                    <div className="glass-card p-5 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-black border-b border-[var(--color-border)] pb-2">Careers Tracks Catalog</span>
                      <div className="space-y-2">
                        {CAREER_ROADMAPS.map((career) => (
                          <button
                            key={career.id}
                            onClick={() => setSelectedCareer(career)}
                            className={`w-full text-left p-3.5 rounded-2xl border transition duration-200 cursor-pointer flex items-center space-x-3.5 ${
                              selectedCareer?.id === career.id
                                ? "bg-[#6D5DF6]/10 border-[#6D5DF6]/20 text-[#6D5DF6]"
                                : "bg-[var(--color-bg-page)] border-[var(--color-border)] hover:bg-[#6D5DF6]/5"
                            }`}
                          >
                            <div className="p-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl">
                              {renderCareerIcon(career.icon)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold truncate text-[var(--color-text-primary)]">{career.title}</h4>
                              <span className="text-[9px] font-mono text-[var(--color-text-secondary)]">{career.durationMonths} Months</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Timeline details */}
                    <div className="lg:col-span-2 glass-card p-6 sm:p-8 space-y-6 min-h-[500px]">
                      {selectedCareer ? (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
                            <div>
                              <h3 className="text-base font-black text-[var(--color-text-primary)]">{selectedCareer.title}</h3>
                              <p className="text-[10px] text-[#6D5DF6] font-mono font-bold mt-0.5">{selectedCareer.pitch}</p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] rounded-lg text-[9px] font-mono font-black shrink-0">
                              {selectedCareer.industryOutlook?.salaryRange || "$120K - $160K"}
                            </span>
                          </div>

                          {/* Stepper Timeline: Responsive viewport adaptation */}
                          
                          {/* Desktop Layout: Horizontal Timeline (lg+) */}
                          <div className="hidden lg:flex overflow-x-auto space-x-6 pb-4 pt-2 scroll-smooth custom-scrollbar">
                            {selectedCareer.milestones?.map((milestone, idx) => {
                              const isCompleted = (completedCareerMilestones[selectedCareer.id] || []).includes(idx);
                              const isExpanded = expandedMilestones[idx] || false;
                              return (
                                <div key={idx} className="flex-shrink-0 w-72 bg-[var(--color-bg-page)]/45 border border-[var(--color-border)] rounded-2xl p-5 flex flex-col justify-between space-y-4 relative">
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-mono text-[#6D5DF6] font-bold">{milestone.duration}</span>
                                      <button
                                        onClick={() => handleToggleMilestone(selectedCareer.id, idx)}
                                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10.5px] font-mono font-bold transition shadow-sm cursor-pointer ${
                                          isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[#6D5DF6]"
                                        }`}
                                      >
                                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                      </button>
                                    </div>
                                    <h4 className="font-extrabold text-xs text-[var(--color-text-primary)] line-clamp-2 h-8 leading-snug">{milestone.milestoneTitle}</h4>
                                    <p className="text-[10px] text-[var(--color-text-secondary)] font-medium line-clamp-3 font-sans leading-relaxed">
                                      {milestone.practicalProject?.description}
                                    </p>
                                  </div>
                                  
                                  <button
                                    onClick={() => setExpandedMilestones(prev => ({ ...prev, [idx]: !isExpanded }))}
                                    className="w-full py-2 bg-[var(--color-bg-page)] hover:bg-[#6D5DF6]/5 border border-[var(--color-border)] rounded-xl text-[10px] font-mono font-bold text-[var(--color-text-secondary)] flex items-center justify-center space-x-1.5 transition"
                                  >
                                    <span>Details</span>
                                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                  </button>

                                  {isExpanded && (
                                    <div className="absolute left-0 right-0 top-full mt-3 bg-[var(--glass-card-bg)] border border-[var(--color-border)] backdrop-blur-2xl rounded-2xl p-4.5 shadow-xl z-20 text-[10.5px] leading-relaxed space-y-3.5 max-w-[280px]">
                                      <div className="space-y-1.5">
                                        <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block">Practical Project Brief</span>
                                        <h5 className="font-bold text-[var(--color-text-primary)]">{milestone.practicalProject?.title}</h5>
                                        <p className="text-[10px] text-[var(--color-text-secondary)] font-sans">{milestone.practicalProject?.description}</p>
                                      </div>
                                      
                                      <div className="space-y-1.5 border-t border-[var(--color-border)] pt-2">
                                        <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block mb-1">Study References</span>
                                        {milestone.recommendedResources?.map((res, i) => (
                                          <div key={i} className="flex items-center space-x-1.5">
                                            <BookOpen className="w-3 h-3 text-[#6D5DF6] shrink-0" />
                                            <span className="truncate">{res}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Tablet Layout: Vertical Timeline (md:lg:hidden) */}
                          <div className="hidden md:block lg:hidden space-y-5">
                            {selectedCareer.milestones?.map((milestone, idx) => {
                              const isCompleted = (completedCareerMilestones[selectedCareer.id] || []).includes(idx);
                              const isExpanded = expandedMilestones[idx] || false;
                              return (
                                <div key={idx} className="relative pl-7 border-l border-[var(--color-border)] space-y-3">
                                  <button
                                    onClick={() => handleToggleMilestone(selectedCareer.id, idx)}
                                    className={`absolute left-[-11px] top-1.5 w-5.5 h-5.5 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition shadow-sm cursor-pointer ${
                                      isCompleted 
                                        ? "bg-emerald-500 border-emerald-500 text-white" 
                                        : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[#6D5DF6]"
                                    }`}
                                  >
                                    {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                                  </button>

                                  <div className="flex justify-between items-start text-xs">
                                    <div className="min-w-0 pr-4">
                                      <h4 className="font-extrabold text-[var(--color-text-primary)]">{milestone.milestoneTitle}</h4>
                                      <span className="text-[10px] text-[var(--color-text-secondary)] font-mono">{milestone.duration}</span>
                                    </div>
                                    <button
                                      onClick={() => setExpandedMilestones(prev => ({ ...prev, [idx]: !isExpanded }))}
                                      className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition"
                                    >
                                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                  </div>

                                  {isExpanded && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      className="space-y-3 pt-2 text-xs font-medium text-[var(--color-text-secondary)]"
                                    >
                                      <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-3.5 space-y-2 shadow-inner leading-relaxed">
                                        <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block">Practical Project Brief</span>
                                        <h5 className="font-bold text-[var(--color-text-primary)]">{milestone.practicalProject?.title}</h5>
                                        <p className="text-[10.5px] text-[var(--color-text-secondary)] font-sans">{milestone.practicalProject?.description}</p>
                                      </div>

                                      <div className="space-y-1">
                                        <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block mb-1">Study Courses & References</span>
                                        {milestone.recommendedResources?.map((res, i) => (
                                          <div key={i} className="flex items-center space-x-2">
                                            <BookOpen className="w-3.5 h-3.5 text-[#6D5DF6] shrink-0" />
                                            <span className="text-[10.5px] text-[var(--color-text-secondary)]">{res}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Mobile Layout: Accordion (under md viewport width) */}
                          <div className="block md:hidden space-y-3">
                            {selectedCareer.milestones?.map((milestone, idx) => {
                              const isCompleted = (completedCareerMilestones[selectedCareer.id] || []).includes(idx);
                              const isExpanded = expandedMilestones[idx] || false;
                              return (
                                <div key={idx} className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm">
                                  <div 
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#6D5DF6]/5 transition"
                                    onClick={() => setExpandedMilestones(prev => ({ ...prev, [idx]: !isExpanded }))}
                                  >
                                    <div className="flex items-center space-x-3 min-w-0">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleMilestone(selectedCareer.id, idx);
                                        }}
                                        className={`w-6.5 h-6.5 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 cursor-pointer ${
                                          isCompleted ? "bg-emerald-500 border-emerald-500 text-white" : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-secondary)]"
                                        }`}
                                      >
                                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                      </button>
                                      <div className="min-w-0">
                                        <h4 className="font-extrabold text-xs text-[var(--color-text-primary)] truncate">{milestone.milestoneTitle}</h4>
                                        <span className="text-[9px] text-[var(--color-text-secondary)] font-mono">{milestone.duration}</span>
                                      </div>
                                    </div>
                                    <div>
                                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" /> : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />}
                                    </div>
                                  </div>

                                  {isExpanded && (
                                    <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-page)]/20 text-xs space-y-4 font-medium text-[var(--color-text-secondary)] animate-fade-in">
                                      <div className="space-y-1.5">
                                        <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block">Practical Project Brief</span>
                                        <h5 className="font-bold text-[var(--color-text-primary)]">{milestone.practicalProject?.title}</h5>
                                        <p className="text-[10.5px] leading-relaxed font-sans">{milestone.practicalProject?.description}</p>
                                      </div>
                                      
                                      <div className="space-y-1.5 border-t border-[var(--color-border)] pt-2.5">
                                        <span className="text-[8.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black block mb-1">Study Courses & References</span>
                                        {milestone.recommendedResources?.map((res, i) => (
                                          <div key={i} className="flex items-center space-x-2">
                                            <BookOpen className="w-3.5 h-3.5 text-[#6D5DF6] shrink-0" />
                                            <span className="text-[10.5px] leading-relaxed font-sans">{res}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                          <BookOpen className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                          <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                            Select a career track from the catalog list to map your timeline.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* Tab Content: Interview Lab */}
              {activeTab === "interview" && (
                <div className="space-y-6">
                  {/* Setup/Selection View */}
                  {interviewStatus === "setup" && (
                    <div className="space-y-8">
                      <div className="border-b border-[var(--color-border)] pb-5">
                        <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">AI Interview Simulator</h1>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                          Select a specialized round to evaluate your capabilities. Experience realistic mock interview constraints.
                        </p>
                      </div>

                      {generatingQuestions ? (
                        <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 glass-card">
                          <div className="relative w-12 h-12">
                            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
                          </div>
                          <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                            {interviewType === "technical" 
                              ? "Synthesizing custom questions from parsed resume..." 
                              : "Preparing randomized mock interview rounds..."}
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Card 1: Aptitude */}
                          <div className="glass-card hover:border-[#6D5DF6]/30 transition p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-indigo-500/10 text-indigo-600 rounded-bl-2xl font-mono text-[10px] font-bold">OFFLINE</div>
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                                <Cpu className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-black text-[var(--color-text-primary)]">Aptitude Round</h3>
                              <p className="text-[11.5px] leading-relaxed text-[var(--color-text-secondary)] font-medium font-sans">
                                10 multiple-choice questions covering Quantitative, Logical, Verbal, Analytical, and Data Interpretation. Instantly evaluated.
                              </p>
                              <div className="text-[9.5px] font-mono text-[var(--color-text-tertiary)] flex flex-col space-y-1.5 pt-2">
                                <span className="flex items-center space-x-1.5">
                                  <Clock className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                  <span>10 Minutes Total</span>
                                </span>
                                <span className="flex items-center space-x-1.5">
                                  <BarChart className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                  <span>Category Score Breakdown</span>
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={handleStartAptitude}
                              className="w-full py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md cursor-pointer"
                            >
                              Start Round
                            </button>
                          </div>

                          {/* Card 2: Technical */}
                          <div className="glass-card hover:border-[#6D5DF6]/30 transition p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-purple-500/10 text-purple-600 rounded-bl-2xl font-mono text-[10px] font-bold">RESUME-DRIVEN</div>
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                                <Code className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-black text-[var(--color-text-primary)]">Technical Round</h3>
                              <p className="text-[11.5px] leading-relaxed text-[var(--color-text-secondary)] font-medium font-sans">
                                5 dynamic questions based on your profile's coding languages, frameworks, projects, education, and career experience. Evaluated by AI.
                              </p>
                              <div className="text-[9.5px] font-mono text-[var(--color-text-tertiary)] flex flex-col space-y-1.5 pt-2">
                                <span className="flex items-center space-x-1.5">
                                  <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                                  <span>120s per question</span>
                                </span>
                                <span className="flex items-center space-x-1.5">
                                  <Mic className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                                  <span>Voice and Text responses</span>
                                </span>
                              </div>
                            </div>
                            {resume ? (
                              <button
                                onClick={handleStartTechnical}
                                className="w-full py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md cursor-pointer"
                              >
                                Start Round
                              </button>
                            ) : (
                              <div className="space-y-2">
                                <button
                                  disabled
                                  className="w-full py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-tertiary)] opacity-50 cursor-not-allowed"
                                >
                                  Locked
                                </button>
                                <span className="text-[9.5px] text-red-500 font-semibold block text-center">Please upload a resume to unlock.</span>
                              </div>
                            )}
                          </div>

                          {/* Card 3: HR */}
                          <div className="glass-card hover:border-[#6D5DF6]/30 transition p-6 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 bg-emerald-500/10 text-emerald-600 rounded-bl-2xl font-mono text-[10px] font-bold">BEHAVIORAL</div>
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <UserCheck className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-black text-[var(--color-text-primary)]">HR Behavioral</h3>
                              <p className="text-[11.5px] leading-relaxed text-[var(--color-text-secondary)] font-medium font-sans">
                                5 random questions evaluating culture fit, leadership, stress management, conflict resolution, and career objectives. Evaluated by AI.
                              </p>
                              <div className="text-[9.5px] font-mono text-[var(--color-text-tertiary)] flex flex-col space-y-1.5 pt-2">
                                <span className="flex items-center space-x-1.5">
                                  <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>90s per question</span>
                                </span>
                                <span className="flex items-center space-x-1.5">
                                  <Mic className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>Voice and Text responses</span>
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={handleStartHR}
                              className="w-full py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md cursor-pointer"
                            >
                              Start Round
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Performance Progression & Mock Interview History */}
                      <div className="border-t border-[var(--color-border)] pt-8 space-y-6">
                        <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Performance Progression</h3>
                        
                        {interviewHistory.length === 0 ? (
                          <div className="glass-card p-10 text-center flex flex-col items-center justify-center space-y-3">
                            <MessageSquare className="w-10 h-10 opacity-20 text-[var(--color-text-tertiary)]" />
                            <span className="text-xs font-mono text-[var(--color-text-secondary)]">No interviews completed yet. Start your first round above!</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Score Line Chart */}
                            <div className="lg:col-span-2 glass-card p-6 space-y-4">
                              <h4 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Score History Trend</h4>
                              <div className="h-48 w-full text-[10px] font-mono">
                                <RechartsResponsiveContainer width="100%" height="100%">
                                  <AreaChart data={interviewHistory.slice().reverse().map(h => ({ name: new Date(h.interviewDate).toLocaleDateString([], { month: "short", day: "numeric" }), Score: h.overallScore }))}>
                                    <defs>
                                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                                      </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="var(--color-text-tertiary)" />
                                    <YAxis stroke="var(--color-text-tertiary)" />
                                    <Tooltip contentStyle={{ background: "var(--glass-card-bg)", borderColor: "var(--color-glass-border)", borderRadius: "12px", color: "var(--color-text-primary)" }} />
                                    <Area type="monotone" dataKey="Score" stroke="#F59E0B" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2.5} />
                                  </AreaChart>
                                </RechartsResponsiveContainer>
                              </div>
                            </div>

                            {/* Completed Rounds log */}
                            <div className="glass-card p-6 space-y-4 flex flex-col justify-between">
                              <h4 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Completed Rounds</h4>
                              <div className="space-y-3.5 max-h-48 overflow-y-auto custom-scrollbar flex-1 pr-1">
                                {interviewHistory.map((h, i) => (
                                  <div key={i} className="flex justify-between items-center p-2.5 bg-[var(--color-bg-page)]/50 border border-[var(--color-border)]/40 rounded-xl text-[10px]">
                                    <div className="font-mono">
                                      <span className="font-extrabold text-[var(--color-text-primary)] block leading-tight">{h.role}</span>
                                      <span className="text-[8.5px] text-[var(--color-text-tertiary)] uppercase mt-0.5 block font-bold">{new Date(h.interviewDate).toLocaleDateString()}</span>
                                    </div>
                                    <span className="font-black text-xs font-mono text-[#F59E0B]">{h.overallScore}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Active Question View */}
                  {interviewStatus === "active" && interviewQuestions.length > 0 && (
                    <div className="space-y-6">
                      {/* Header Panel with timer and progress bar */}
                      <div className="glass-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1 flex-grow">
                          <div className="flex justify-between items-center text-[10.5px] font-mono font-bold text-[#6D5DF6] uppercase tracking-wider">
                            <span>{interviewType?.toUpperCase()} ROUND</span>
                            <span>Question {currentQuestionIndex + 1} of {interviewQuestions.length}</span>
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden mt-2">
                            <div 
                              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                              style={{ width: `${((currentQuestionIndex + (currentEvaluation ? 1 : 0)) / interviewQuestions.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Timer clock */}
                        <div className="flex items-center space-x-3 px-4 py-2.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner font-mono text-xs font-black">
                          <Clock className={`w-4 h-4 ${timeLeft < 15 ? "text-red-500 animate-pulse" : "text-indigo-600"}`} />
                          <span className={timeLeft < 15 ? "text-red-500 font-extrabold animate-pulse" : "text-[var(--color-text-primary)]"}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                          </span>
                          <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">
                            {interviewType === "aptitude" ? "TOTAL" : "REMAINING"}
                          </span>
                        </div>
                      </div>

                      {/* Main workspace */}
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        
                        {/* Question & Input Area (Left) */}
                        <div className="lg:col-span-3 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-extrabold">
                              <span>Topic: {interviewQuestions[currentQuestionIndex]?.topic || "Interview Question"}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] ${
                                interviewQuestions[currentQuestionIndex]?.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600" :
                                interviewQuestions[currentQuestionIndex]?.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600" :
                                "bg-red-500/10 text-red-600"
                              }`}>
                                {interviewQuestions[currentQuestionIndex]?.difficulty || "Medium"}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-black text-[var(--color-text-primary)] leading-snug">
                              {interviewQuestions[currentQuestionIndex]?.question}
                            </h3>
                          </div>

                          {interviewType === "aptitude" ? (
                            /* MCQ Options */
                            <div className="grid grid-cols-1 gap-3.5 py-4">
                              {interviewQuestions[currentQuestionIndex]?.options?.map((optionText: string, idx: number) => {
                                const isSelected = selectedOption === optionText;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedOption(optionText)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl border text-xs font-semibold transition-all duration-150 flex items-center space-x-3 cursor-pointer ${
                                      isSelected
                                        ? "bg-indigo-500/10 border-indigo-600 text-indigo-700 dark:text-indigo-400 font-bold shadow-md"
                                        : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-indigo-500/20"
                                    }`}
                                  >
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border font-mono text-[10.5px] font-extrabold ${
                                      isSelected 
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-tertiary)]"
                                    }`}>
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{optionText}</span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            /* Voice / Text Response */
                            <div className="space-y-6">
                              {/* Voice Visualizer / Mic control */}
                              <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner relative">
                                {isRecording ? (
                                  <div className="space-y-4">
                                    <span className="text-[10px] font-mono text-red-500 animate-pulse font-extrabold">TRANSCRIBING LIVE SPEECH ({recordingTimer}s)</span>
                                    
                                    <div className="flex items-center justify-center space-x-1.5 h-12 my-2">
                                      {Array.from({ length: 11 }).map((_, i) => (
                                        <motion.div
                                          key={i}
                                          animate={{ height: [10, 42, 10] }}
                                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                                          className="w-1 bg-[#6D5DF6] rounded-full"
                                        />
                                      ))}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={stopRecording}
                                      className="px-5 py-2.5 clay-btn clay-btn-danger text-xs font-mono uppercase tracking-wider font-bold shadow-md cursor-pointer"
                                    >
                                      Stop Recording
                                    </button>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <span className="text-[9.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black">Speech-to-Text Transcription</span>
                                    <button
                                      type="button"
                                      onClick={startRecording}
                                      disabled={evaluatingAnswer}
                                      className="w-16 h-16 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-105 transition cursor-pointer disabled:opacity-50"
                                    >
                                      <Mic className="w-5 h-5" />
                                    </button>
                                    <p className="text-[10.5px] text-[var(--color-text-secondary)] font-medium font-sans">Click to speak answer or edit text box below</p>
                                  </div>
                                )}
                              </div>

                              <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your simulated response here..."
                                rows={4}
                                required
                                disabled={evaluatingAnswer || currentEvaluation}
                                className="w-full clay-input px-4 py-3 text-xs focus:outline-none font-medium leading-relaxed font-sans resize-none"
                              />
                            </div>
                          )}

                          {/* Control buttons */}
                          <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-4 gap-4">
                            <button
                              type="button"
                              onClick={handleSkipQuestion}
                              disabled={evaluatingAnswer || currentEvaluation}
                              className="px-5 py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold shadow-sm cursor-pointer disabled:opacity-50"
                            >
                              Skip Question
                            </button>

                            {interviewType === "aptitude" ? (
                              <button
                                type="button"
                                onClick={() => handleSubmitInterviewAnswer()}
                                disabled={!selectedOption}
                                className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md cursor-pointer disabled:opacity-50"
                              >
                                {currentQuestionIndex < interviewQuestions.length - 1 ? "Next Question" : "Finish Test"}
                              </button>
                            ) : (
                              !currentEvaluation && (
                                <button
                                  type="button"
                                  onClick={() => handleSubmitInterviewAnswer()}
                                  disabled={evaluatingAnswer || !userAnswer.trim()}
                                  className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md cursor-pointer disabled:opacity-50"
                                >
                                  {evaluatingAnswer ? "Evaluating..." : "Submit Answer"}
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Right: Results / evaluation review (Tech & HR only) */}
                        {interviewType !== "aptitude" && (
                          <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between space-y-6">
                            {evaluatingAnswer ? (
                              <div className="flex-grow flex flex-col items-center justify-center text-center space-y-3">
                                <div className="w-6 h-6 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                                <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Agents scoring response...</span>
                              </div>
                            ) : currentEvaluation ? (
                              <div className="space-y-5 flex-grow flex flex-col justify-between">
                                <div className="flex items-center space-x-4 border-b border-[var(--color-border)] pb-4">
                                  <CircularScoreGauge score={currentEvaluation.score} size={64} strokeWidth={5} colorClass="stroke-[#6D5DF6]" showMaxScore={false} suffix=" pts" />
                                  <div>
                                    <h4 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase font-bold">Answer Rating</h4>
                                    <span className="text-[11px] font-bold text-[var(--color-text-primary)]">Evaluating overlap keywords matched</span>
                                  </div>
                                </div>

                                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar text-xs">
                                  <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 shadow-inner">
                                    <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase block font-black mb-1">Feedback Summary</span>
                                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed font-semibold">{currentEvaluation.feedback}</p>
                                  </div>

                                  <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 shadow-inner">
                                    <span className="text-[9px] font-mono text-[#22C55E] uppercase block font-black mb-1.5">Expected Points Overlaps</span>
                                    <div className="flex flex-wrap gap-1">
                                      {currentEvaluation.expectedPointsMatched?.map((pt: string, idx: number) => (
                                        <span key={idx} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] rounded-md text-[9px] font-mono">{pt}</span>
                                      )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                                    </div>
                                  </div>

                                  <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 shadow-inner">
                                    <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase block font-black mb-1.5">Key Suggestions</span>
                                    <ul className="list-disc list-inside space-y-1 text-[10.5px] leading-relaxed font-semibold text-[var(--color-text-secondary)]">
                                      {currentEvaluation.suggestions?.map((sug: string, idx: number) => (
                                        <li key={idx}>{sug}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <button
                                  onClick={handleNextQuestion}
                                  className="w-full py-3.5 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
                                >
                                  {currentQuestionIndex < interviewQuestions.length - 1 ? "Next Question" : "Finish Interview"}
                                </button>
                              </div>
                            ) : (
                              <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                <Target className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                                <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                                  Submit response to activate recruiter grade evaluation.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Generating Report view */}
                  {interviewStatus === "generating_report" && (
                    <div className="h-96 flex flex-col items-center justify-center text-center space-y-4 glass-card">
                      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                      <h3 className="text-lg font-black text-[var(--color-text-primary)] animate-pulse">Evaluating Session Details</h3>
                      <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans max-w-sm">
                        Our AI models are reviewing your answer overlap metrics, communication confidence, grammar structural scores, and problem solving pointers.
                      </p>
                    </div>
                  )}

                  {/* Final Report View */}
                  {interviewStatus === "completed" && finalReport && (
                    <div className="space-y-8">
                      {/* Title block */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-5">
                        <div>
                          <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">Interview Summary Report</h1>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                            Review your competency scores and tailored career study suggestions.
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={downloadReportPDF}
                            className="px-5 py-3 clay-btn clay-btn-success text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md cursor-pointer"
                          >
                            Download Report PDF
                          </button>
                          <button
                            onClick={() => {
                              setInterviewStatus("setup");
                              setInterviewType(null);
                              setFinalReport(null);
                            }}
                            className="px-5 py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
                          >
                            Restart
                          </button>
                        </div>
                      </div>

                      {/* Main report widgets */}
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                        
                        {/* Overall score card & radar chart (Left) */}
                        <div className="lg:col-span-3 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
                          <div className="flex items-center space-x-6 border-b border-[var(--color-border)] pb-6">
                            <CircularScoreGauge score={finalReport.overallScore} size={84} strokeWidth={6} colorClass="stroke-[#6D5DF6]" suffix="/100" />
                            <div>
                              <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-extrabold block">Overall Placement Index</span>
                              <h3 className="text-xl font-black text-[var(--color-text-primary)] mt-1">
                                {finalReport.overallScore >= 80 ? "Highly Recommended" : finalReport.overallScore >= 60 ? "Requires Training" : "Not Recommended"}
                              </h3>
                              <p className="text-xs text-[var(--color-text-secondary)] font-sans mt-1">
                                Evaluation scored across core professional competency rubrics.
                              </p>
                            </div>
                          </div>

                          {/* Radar chart of metrics */}
                          <div className="h-64 sm:h-72 w-full mt-4 flex items-center justify-center">
                            <RechartsResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                                { subject: 'Communication', A: finalReport.metrics?.communication || 0, fullMark: 100 },
                                { subject: 'Confidence', A: finalReport.metrics?.confidence || 0, fullMark: 100 },
                                { subject: 'Tech Knowledge', A: finalReport.metrics?.technicalKnowledge || 0, fullMark: 100 },
                                { subject: 'Grammar', A: finalReport.metrics?.grammar || 0, fullMark: 100 },
                                { subject: 'Problem Solving', A: finalReport.metrics?.problemSolving || 0, fullMark: 100 },
                                { subject: 'Leadership', A: finalReport.metrics?.leadership || 0, fullMark: 100 },
                              ]}>
                                <PolarGrid stroke="#E5E7EB" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 10, fontWeight: 'bold', fontFamily: 'var(--font-sans)' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--color-text-tertiary)', fontSize: 9 }} />
                                <Radar name="Candidate" dataKey="A" stroke="#6D5DF6" fill="#6D5DF6" fillOpacity={0.25} />
                              </RadarChart>
                            </RechartsResponsiveContainer>
                          </div>
                        </div>

                        {/* Strengths & weaknesses (Right) */}
                        <div className="lg:col-span-2 flex flex-col space-y-6">
                          
                          {/* Core Strengths */}
                          <div className="glass-card p-6 flex-grow">
                            <span className="text-[10px] font-mono text-[#22C55E] uppercase block font-black mb-3">Core Strengths</span>
                            <ul className="space-y-2.5">
                              {finalReport.strengths?.map((str: string, idx: number) => (
                                <li key={idx} className="flex items-start space-x-2.5 text-xs text-[var(--color-text-secondary)] font-semibold font-sans">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{str}</span>
                                </li>
                              )) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None analyzed.</span>}
                            </ul>
                          </div>

                          {/* Opportunities for Growth */}
                          <div className="glass-card p-6 flex-grow">
                            <span className="text-[10px] font-mono text-[#EF4444] uppercase block font-black mb-3">Opportunities for Growth</span>
                            <ul className="space-y-2.5">
                              {finalReport.weaknesses?.map((str: string, idx: number) => (
                                <li key={idx} className="flex items-start space-x-2.5 text-xs text-[var(--color-text-secondary)] font-semibold font-sans">
                                  <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                                  <span>{str}</span>
                                </li>
                              )) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None analyzed.</span>}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Suggestions & Learning resources footer widgets */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        {/* Actionable Suggestions */}
                        <div className="glass-card p-6 sm:p-8 space-y-4">
                          <h4 className="text-sm font-black text-[var(--color-text-primary)]">Actionable Improvement Suggestions</h4>
                          <ul className="space-y-3">
                            {finalReport.improvementSuggestions?.map((str: string, idx: number) => (
                              <li key={idx} className="flex items-start space-x-3 text-xs text-[var(--color-text-secondary)] leading-relaxed font-semibold font-sans">
                                <span className="text-indigo-600 font-bold">{idx + 1}.</span>
                                <span>{str}</span>
                              </li>
                            )) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None.</span>}
                          </ul>
                        </div>

                        {/* Learning resources */}
                        <div className="glass-card p-6 sm:p-8 space-y-4">
                          <h4 className="text-sm font-black text-[var(--color-text-primary)]">Recommended Learning Resources</h4>
                          <div className="space-y-3">
                            {finalReport.recommendedResources?.map((resObj: any, idx: number) => {
                              const title = resObj.title || resObj;
                              const desc = resObj.description || "";
                              return (
                                <div key={idx} className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl space-y-1">
                                  <div className="flex justify-between items-center text-xs font-bold text-[#6D5DF6]">
                                    <span>{title}</span>
                                    <a
                                      href={`https://www.google.com/search?q=${encodeURIComponent(title)}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[10px] text-[var(--color-text-tertiary)] hover:text-indigo-600 font-bold"
                                    >
                                      Search ↗
                                    </a>
                                  </div>
                                  {desc && <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)] font-semibold font-sans">{desc}</p>}
                                </div>
                              );
                            }) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None suggested.</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content: Hiring Predictor */}
              {activeTab === "probability" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">Hiring Predictor</h1>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                      Predict placements match probability index statistics against target enterprise roles.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                    
                    {/* Inputs panel */}
                    <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between space-y-6">
                      <form onSubmit={handlePredictHiringProbability} className="space-y-5">
                        <div>
                          <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-bold">
                            Target Job Title
                          </label>
                          <input
                            type="text"
                            value={probJobTitle}
                            onChange={(e) => setProbJobTitle(e.target.value)}
                            placeholder="e.g. Lead Devops Engineer"
                            required
                            disabled={predictingProb}
                            className="w-full clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none font-sans font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-bold">
                            Target Company
                          </label>
                          <input
                            type="text"
                            value={probCompany}
                            onChange={(e) => setProbCompany(e.target.value)}
                            placeholder="e.g. Vercel Inc."
                            required
                            disabled={predictingProb}
                            className="w-full clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none font-sans font-medium"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={predictingProb}
                          className="w-full py-4 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md"
                        >
                          {predictingProb ? "Simulating prediction model..." : "Calculate Placement Probability"}
                        </button>
                      </form>

                      {hiringProbability && (
                        <div className="p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner text-xs leading-relaxed space-y-2">
                          <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase block font-black">Strategic Advice</span>
                          <p className="text-[10.5px] text-[var(--color-text-secondary)] font-semibold">
                            Improve cloud networking infrastructure parameters and add two practice certifications.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Results panel */}
                    <div className="lg:col-span-3 glass-card p-6 flex flex-col justify-between min-h-[380px]">
                      {predictingProb ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-3">
                          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                          <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Assembling Placement Vector Indices</span>
                        </div>
                      ) : hiringProbability ? (
                        <div className="space-y-6 flex-grow flex flex-col justify-between">
                          <div className="flex items-center space-x-6 border-b border-[var(--color-border)] pb-5">
                            <CircularScoreGauge score={hiringProbability.probabilityScore} size={84} strokeWidth={6} colorClass="stroke-[#6D5DF6]" suffix="%" />
                            <div>
                              <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Hiring Placement Gauge</h3>
                              <p className="text-[11px] text-[var(--color-text-secondary)] mt-1.5 leading-relaxed font-sans font-medium">
                                {hiringProbability.probabilityScore >= 80 
                                  ? "Excellent placement rate indices! Directly submit profile application."
                                  : hiringProbability.probabilityScore >= 60 
                                  ? "Moderate fit index. Resolve the deficit skills listed in the roadmap."
                                  : "Substantial deficit. Expand project scopes."}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl space-y-2">
                              <span className="text-[8.5px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-black">Strength Assets</span>
                              <div className="space-y-1">
                                {hiringProbability.strengths?.slice(0, 3).map((st: string, idx: number) => (
                                  <div key={idx} className="flex items-center space-x-2 text-[10px] text-[var(--color-text-secondary)] font-semibold">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                                    <span className="truncate">{st}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl space-y-2">
                              <span className="text-[8.5px] font-mono text-red-500 uppercase font-black">Gaps / Deficits</span>
                              <div className="space-y-1">
                                {hiringProbability.weaknesses?.slice(0, 3).map((wk: string, idx: number) => (
                                  <div key={idx} className="flex items-center space-x-2 text-[10px] text-[var(--color-text-secondary)] font-semibold">
                                    <span className="text-red-500 font-bold shrink-0">&bull;</span>
                                    <span className="truncate">{wk}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                          <Award className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                          <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                            Enter company & title details and trigger placement prediction simulation.
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}
          </ResponsiveContainer>
        </main>
      </div>

      {/* Floating AI Coach Conversation Chat overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isAiMentorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              className="w-80 sm:w-96 h-[460px] glass-card glowing-border p-5 flex flex-col justify-between space-y-4 mb-4 z-50 text-[var(--color-text-primary)]"
            >
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2.5">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4.5 h-4.5 text-[#8B5CF6]" />
                  <div>
                    <h4 className="text-xs font-bold">AI Career Mentor</h4>
                    <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold">Generative Guide</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAiMentorOpen(false)}
                  className="p-1 rounded-lg hover:bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat bubbles viewport */}
              <div className="flex-grow overflow-y-auto space-y-3.5 pr-1.5 custom-scrollbar text-xs font-medium leading-relaxed font-sans">
                {aiMentorMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-[#6D5DF6] text-white ml-auto"
                        : "bg-[var(--color-bg-page)] border border-[var(--color-border)] mr-auto text-[var(--color-text-secondary)] shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isAiMentorTyping && (
                  <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl mr-auto text-[var(--color-text-secondary)] shadow-sm max-w-[80%]">
                    <span className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                )}
              </div>

              {/* Chat input box form */}
              <form onSubmit={handleSendAiMentorMessage} className="flex space-x-2 shrink-0 border-t border-[var(--color-border)] pt-3">
                <input
                  type="text"
                  value={aiMentorInput}
                  onChange={(e) => setAiMentorInput(e.target.value)}
                  placeholder="Ask advisor a career question..."
                  className="flex-grow clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none font-sans font-medium"
                />
                <button
                  type="submit"
                  disabled={!aiMentorInput.trim() || isAiMentorTyping}
                  className="p-2.5 bg-[#6D5DF6] text-white rounded-xl shadow-md hover:scale-102 transition shrink-0 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating circular icon toggle */}
        <button
          onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 transition cursor-pointer"
        >
          <Brain className="w-5 h-5" />
        </button>
      </div>

      {/* About Platform Modal */}
      <AnimatePresence>
        {isAboutOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAboutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg glass-card glowing-border p-6 sm:p-8 space-y-6 relative text-[var(--color-text-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-md text-white font-black text-xs font-mono">
                    SB
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight uppercase font-mono">SkillBridge AI</h3>
                    <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold mt-0.5">Version 1.0.0</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs leading-relaxed font-sans text-[var(--color-text-secondary)]">
                <p className="font-semibold">
                  SkillBridge AI is an AI-powered Career Intelligence Platform that empowers students, fresh graduates, and job seekers with resume analysis, ATS optimization, personalized career roadmaps, real-time job matching, and simulated mock interviews.
                </p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-b border-[var(--color-border)] py-4 font-mono text-[10px]">
                  <div>
                    <span className="text-[9px] text-[var(--color-text-tertiary)] uppercase block font-bold">Developer</span>
                    <span className="font-bold text-[var(--color-text-primary)]">Mekala Manoj Kumar</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-[var(--color-text-tertiary)] uppercase block font-bold">Contact Email</span>
                    <a href="mailto:mekalamanojkumar6@gmail.com" className="font-bold text-[#6D5DF6] hover:underline">
                      mekalamanojkumar6@gmail.com
                    </a>
                  </div>
                </div>

                <p className="text-[10px] text-[var(--color-text-tertiary)]">
                  Built using React, TypeScript, Tailwind CSS, and the Google Gemini API to bridge the gap between academic education and modern professional employment.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-md cursor-pointer"
                >
                  Dismiss Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* How to Use This App Modal */}
      <AnimatePresence>
        {isHowToUseOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsHowToUseOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl glass-card glowing-border p-6 sm:p-8 space-y-6 relative text-[var(--color-text-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-md text-white font-black text-xs font-mono">
                    💡
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight uppercase font-mono">How to Use This App</h3>
                    <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold mt-0.5">Quick Onboarding Guide</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsHowToUseOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                <div className="space-y-3.5">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 flex items-center justify-center text-[10px] font-bold text-[#6D5DF6] font-mono mt-0.5 shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Upload Your Resume</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Start by uploading your current profile resume (PDF/DOCX) or pasting your text on the upload screen. Our Gemini-powered AI parses your details automatically.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[10px] font-bold text-[#8B5CF6] font-mono mt-0.5 shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Analyze ATS Score</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Navigate to the **ATS Optimizer** tab to run a thorough scan. Review formatting checkmarks, keyword density, and actionable suggestions to optimize your resume for recruiters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 flex items-center justify-center text-[10px] font-bold text-[#6D5DF6] font-mono mt-0.5 shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Review Skill Deficits</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Check the **Skill Deficits** card on the Overview dashboard to see which core tools, technologies, and soft skills are missing for your desired career paths.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[10px] font-bold text-[#8B5CF6] font-mono mt-0.5 shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Follow Career Roadmap</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Generate and follow a tailored step-by-step learning roadmap in the **Career Roadmap** tab, including tutorials, projects, and certifications to bridge your gaps.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 flex items-center justify-center text-[10px] font-bold text-[#6D5DF6] font-mono mt-0.5 shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Practice AI Mock Interviews</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Use the **Mock Interview** simulator to practice behavioral or technical interviews. Speak or type answers and get instant feedback with dynamic grading.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[10px] font-bold text-[#8B5CF6] font-mono mt-0.5 shrink-0">
                      6
                    </div>
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-[var(--color-text-primary)]">Explore Jobs & Placement</h4>
                      <p className="text-[10.5px] leading-relaxed text-[var(--color-text-secondary)] mt-0.5 font-medium font-sans">
                        Browse matching industry jobs, see your compatibility scores, read feedback on why you're a good fit, and apply directly to matching opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsHowToUseOpen(false)}
                  className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-md cursor-pointer"
                >
                  Got It!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ATS Resume Template Modal */}
      <AnimatePresence>
        {isAtsTemplateOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAtsTemplateOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl glass-card glowing-border p-6 sm:p-8 space-y-6 relative text-[var(--color-text-primary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#8B5CF6] to-[#6D5DF6] rounded-xl flex items-center justify-center shadow-md text-white font-black text-xs font-mono">
                    📄
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-tight uppercase font-mono">ATS Resume Template</h3>
                    <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block font-bold mt-0.5">100% Parser Compliant Format</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsAtsTemplateOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <p className="font-semibold text-[var(--color-text-secondary)] leading-relaxed">
                  This single-column template is optimized for Applicant Tracking Systems (ATS). It uses clear headers and standard styling to guarantee full parsability.
                </p>

                <div className="relative">
                  <pre className="bg-[var(--color-bg-page)] border border-[var(--color-border)] p-4 rounded-xl font-mono text-[10px] text-[var(--color-text-primary)] whitespace-pre-wrap max-h-64 overflow-y-auto custom-scrollbar select-text">
                    {ATS_FRIENDLY_TEMPLATE}
                  </pre>
                  
                  {/* Action buttons inside the code box */}
                  <div className="absolute right-3.5 top-3.5 flex space-x-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(ATS_FRIENDLY_TEMPLATE);
                        setCopiedAts(true);
                        setTimeout(() => setCopiedAts(false), 2000);
                      }}
                      className="p-2 bg-[var(--glass-card-bg)] hover:bg-[#6D5DF6]/10 border border-[var(--color-glass-border)] hover:border-[#6D5DF6]/20 rounded-lg shadow-sm transition text-[var(--color-text-secondary)] hover:text-[#6D5DF6] flex items-center space-x-1 cursor-pointer font-mono text-[9px] font-bold uppercase tracking-wider"
                    >
                      {copiedAts ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => {
                    const blob = new Blob([ATS_FRIENDLY_TEMPLATE], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "ats_resume_template.txt";
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Download TXT</span>
                </button>
                <button
                  onClick={() => setIsAtsTemplateOpen(false)}
                  className="py-3.5 border border-[var(--color-border)] hover:bg-[var(--color-bg-page)] rounded-2xl text-xs font-mono uppercase tracking-wider font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-sm transition duration-200 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Play Store Modals */}
      <AnimatePresence>
        {playStoreModal === "about" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg glass-card glowing-border p-6 sm:p-8 space-y-6 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">About Platform</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3 font-sans text-[var(--color-text-secondary)] font-medium">
                <p>SkillBridge AI is a state-of-the-art Career Intelligence Platform designed to elevate your job matching, ATS scores, and mock interview skills.</p>
                <p>Version: v2.0.0 (Production Build)</p>
              </div>
              <button onClick={() => setPlayStoreModal(null)} className="w-full py-3 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">Dismiss</button>
            </motion.div>
          </div>
        )}

        {playStoreModal === "privacy" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg glass-card glowing-border p-6 sm:p-8 space-y-5 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">Privacy Policy</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar font-sans text-[var(--color-text-secondary)] font-medium text-[11px] leading-relaxed">
                <h4 className="font-bold text-[var(--color-text-primary)]">1. Data Storage</h4>
                <p>All resumes, profiles, and job applications are processed securely in Cloud Firestore and the Gemini API pipeline.</p>
                <h4 className="font-bold text-[var(--color-text-primary)]">2. GDPR Compliance</h4>
                <p>Users hold full rights to export their stored transaction parameters or delete their profile completely at any time.</p>
              </div>
              <button onClick={() => setPlayStoreModal(null)} className="w-full py-3 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">Close Privacy Policy</button>
            </motion.div>
          </div>
        )}

        {playStoreModal === "terms" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg glass-card glowing-border p-6 sm:p-8 space-y-5 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">Terms of Service</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar font-sans text-[var(--color-text-secondary)] font-medium text-[11px] leading-relaxed">
                <h4 className="font-bold text-[var(--color-text-primary)]">1. Agreement to Terms</h4>
                <p>By registering, you authorize SkillBridge AI to verify, process, and optimize uploaded resumes using Gemini models.</p>
                <h4 className="font-bold text-[var(--color-text-primary)]">2. Usage Rights</h4>
                <p>The platform is designed to assist in career building, matching, and preparation. Mock interview history is stored securely for personal coaching analytics.</p>
              </div>
              <button onClick={() => setPlayStoreModal(null)} className="w-full py-3 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">Accept Terms</button>
            </motion.div>
          </div>
        )}

        {playStoreModal === "faq" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg glass-card glowing-border p-6 sm:p-8 space-y-5 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">Help & Support FAQs</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3.5 max-h-64 overflow-y-auto custom-scrollbar font-sans text-[var(--color-text-secondary)] font-medium text-[10.5px] leading-relaxed">
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">Q: How do I change my primary resume?</h4>
                  <p>A: Head to the **My Resumes** tab, upload a new resume, and click the **Set Primary** button next to it.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">Q: How does ATS parsing work?</h4>
                  <p>A: We utilize advanced Gemini models to scan your resume text against match guidelines, highlighting keyword deficits.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-primary)]">Q: Can I delete my data permanently?</h4>
                  <p>A: Yes! Go to **Profile Settings** and click **Delete Account** to instantly wipe all records.</p>
                </div>
              </div>
              <button onClick={() => setPlayStoreModal(null)} className="w-full py-3 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">Got It</button>
            </motion.div>
          </div>
        )}

        {playStoreModal === "bug" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md glass-card glowing-border p-6 sm:p-8 space-y-4 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">Report a Bug</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              {feedbackSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-bold">Bug reported successfully!</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!bugText.trim()) return;
                  setSubmittingFeedback(true);
                  try {
                    await ApiService.submitFeedback("BUG", bugText);
                    setFeedbackSuccess(true);
                    setBugText("");
                    setTimeout(() => { setPlayStoreModal(null); setFeedbackSuccess(false); }, 1500);
                  } catch (err) {
                    alert("Failed to submit report.");
                  } finally {
                    setSubmittingFeedback(false);
                  }
                }} className="space-y-4">
                  <textarea value={bugText} onChange={(e) => setBugText(e.target.value)} rows={4} placeholder="Describe the issue, device model, or screen where it happened..." className="w-full p-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none font-sans font-medium text-xs resize-none" required />
                  <button type="submit" disabled={submittingFeedback} className="w-full py-3.5 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">
                    {submittingFeedback ? "Submitting..." : "Send Report"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {playStoreModal === "feedback" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md glass-card glowing-border p-6 sm:p-8 space-y-4 relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                <span className="font-bold uppercase tracking-wider text-[11px]">Submit Feedback</span>
                <button onClick={() => setPlayStoreModal(null)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-900"><X className="w-4 h-4" /></button>
              </div>
              {feedbackSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <p className="font-bold">Thank you for your feedback!</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!feedbackText.trim()) return;
                  setSubmittingFeedback(true);
                  try {
                    await ApiService.submitFeedback("FEEDBACK", feedbackText);
                    setFeedbackSuccess(true);
                    setFeedbackText("");
                    setTimeout(() => { setPlayStoreModal(null); setFeedbackSuccess(false); }, 1500);
                  } catch (err) {
                    alert("Failed to submit feedback.");
                  } finally {
                    setSubmittingFeedback(false);
                  }
                }} className="space-y-4">
                  <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={4} placeholder="Tell us about your experience or suggest new tools..." className="w-full p-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none font-sans font-medium text-xs resize-none" required />
                  <button type="submit" disabled={submittingFeedback} className="w-full py-3.5 clay-btn clay-btn-primary font-bold text-white uppercase text-[10px]">
                    {submittingFeedback ? "Submitting..." : "Send Feedback"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {playStoreModal === "update" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setPlayStoreModal(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-sm glass-card glowing-border p-6 sm:p-8 space-y-5 text-center relative text-[var(--color-text-primary)] text-xs font-mono" onClick={(e) => e.stopPropagation()}>
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <div>
                <h3 className="font-extrabold text-[13px]">Your App is Up to Date</h3>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-1">Current Version: v2.0.0 (Production Stable)</p>
              </div>
              <button onClick={() => setPlayStoreModal(null)} className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold uppercase text-[9px] tracking-wider cursor-pointer">
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple fallback ChevronLeft component since lucide-react might not export ChevronLeft in older bundles
function ChevronLeftIcon(props: any) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
