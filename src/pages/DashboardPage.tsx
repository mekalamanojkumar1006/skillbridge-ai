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
  Sparkles,
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
  Sparkles as SparklesIcon
} from "lucide-react";
import ProfileSettingsPage from "./ProfileSettingsPage";
import { CAREER_ROADMAPS, CareerPath, Milestone } from "../data/careersData";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart as ReChartsBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

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
  const [activeTab, setActiveTab] = useState<"overview" | "ats" | "jobs" | "roadmap" | "career-roadmap" | "interview" | "probability" | "settings">("overview");
  const [resume, setResume] = useState<any>(initialResume || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Custom interactive dashboard states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("Good evening");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: "Resume parsed successfully", time: "2 hours ago", read: false },
    { id: 2, title: "ATS Optimizer scan recommendations updated", time: "4 hours ago", read: false },
    { id: 3, title: "Your simulated Interview feedback is ready", time: "1 day ago", read: true }
  ]);

  // Clock & Greetings Effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setResume(initialResume);
  }, [initialResume]);

  // Resume Quality state
  const [qualityAnalysis, setQualityAnalysis] = useState<any>(null);
  const [analyzingQuality, setAnalyzingQuality] = useState(false);

  // ATS scanner state
  const [jobDescription, setJobDescription] = useState("");
  const [atsResult, setAtsResult] = useState<any>(null);
  const [scanningAts, setScanningAts] = useState(false);

  // Job matching state
  const [jobMatches, setJobMatches] = useState<any[]>([]);
  const [matchingJobs, setMatchingJobs] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  // Skill gap analysis state
  const [targetCareerRole, setTargetCareerRole] = useState("");
  const [skillGapResult, setSkillGapResult] = useState<any>(null);
  const [analyzingGaps, setAnalyzingGaps] = useState(false);

  // Interview state
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

  // Voice recording simulation
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTimer(0);
    const id = setInterval(() => {
      setRecordingTimer((prev) => prev + 1);
    }, 1000);
    setRecordingIntervalId(id);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalId) {
      clearInterval(recordingIntervalId);
      setRecordingIntervalId(null);
    }
    // Simulate auto typing response text
    setUserAnswer("As an experienced developer, I design distributed system databases focusing on transactional safety and data partitioning. I utilize Redis for high-performance memory cache hits and execute query planning optimizations on Postgres.");
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
    } catch (err: any) {
      console.error(err);
      setError("Skill Gap Analysis failed: " + err.message);
    } finally {
      setAnalyzingGaps(false);
    }
  };

  const handleStartInterview = async () => {
    if (!resume) return;
    setGeneratingQuestions(true);
    setError(null);
    setInterviewQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setCurrentEvaluation(null);
    setInterviewAnswers([]);
    try {
      const res = await ApiService.getInterviewQuestions(resume.id);
      setInterviewQuestions(res.questions || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate custom interview questions: " + err.message);
    } finally {
      setGeneratingQuestions(false);
    }
  };

  const handleSubmitInterviewAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    setEvaluatingAnswer(true);
    setError(null);
    try {
      const evaluation = await ApiService.evaluateInterviewAnswer(
        currentQuestion.question,
        currentQuestion.expectedPoints,
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
    } catch (err: any) {
      console.error(err);
      setError("Evaluation failed: " + err.message);
    } finally {
      setEvaluatingAnswer(false);
    }
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setCurrentEvaluation(null);
    setCurrentQuestionIndex((prev) => prev + 1);
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
    } catch (err: any) {
      console.error(err);
      setError("Hiring prediction failed: " + err.message);
    } finally {
      setPredictingProb(false);
    }
  };

  const getInterviewOverallScore = () => {
    if (interviewAnswers.length === 0) return 0;
    const sum = interviewAnswers.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / interviewAnswers.length);
  };

  const toggleBookmark = (company: string) => {
    setBookmarkedJobs((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  // Sidebar parameters
  const navigationItems = [
    { id: "overview", label: "Career Board", icon: LayoutDashboard, badge: 0 },
    { id: "ats", label: "ATS Optimiser", icon: FileText, badge: 1 },
    { id: "jobs", label: "Job Matcher", icon: Search, badge: 0 },
    { id: "roadmap", label: "Skill Gaps", icon: Map, badge: 0 },
    { id: "career-roadmap", label: "Career Roadmap", icon: Sparkles, iconColor: "text-[#8B5CF6]" },
    { id: "interview", label: "Interview Lab", icon: MessageSquare, badge: 0 },
    { id: "probability", label: "Hiring Predictor", icon: Award, badge: 0 },
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

      {/* Sidebar Rail */}
      <aside className={`border-r border-[var(--color-border)] backdrop-blur-2xl flex flex-col justify-between shrink-0 relative z-20 p-5 bg-[var(--glass-card-bg)] shadow-[var(--glass-card-shadow)] rounded-none md:rounded-r-[32px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isSidebarCollapsed ? "w-full md:w-20" : "w-full md:w-64"
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
              {!isSidebarCollapsed && (
                <span className="text-base font-black tracking-tight shrink-0">
                  SkillBridge
                </span>
              )}
              {!isSidebarCollapsed && (
                <span className="px-1.5 py-0.5 text-[8px] bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-black uppercase shrink-0">
                  AI
                </span>
              )}
            </div>

            {/* Collapse Trigger (hidden on mobile) */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] transition cursor-pointer"
            >
              <ChevronLeftIcon className={`w-3.5 h-3.5 transform transition duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} />
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
          
          {/* Resume Completion & Storage stats */}
          {!isSidebarCollapsed && (
            <div className="space-y-3.5 p-3.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl shadow-inner text-[10px] font-mono font-semibold text-[var(--color-text-secondary)]">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Profile Asset</span>
                  <span className="text-[#6D5DF6] font-bold">{resume ? "85%" : "0%"}</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#6D5DF6] h-full transition-all duration-300" style={{ width: resume ? "85%" : "0%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Cloud Database</span>
                  <span className="text-[#8B5CF6] font-bold">8.4%</span>
                </div>
                <div className="w-full bg-[var(--color-border)] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8B5CF6] h-full" style={{ width: "8.4%" }} />
                </div>
              </div>
            </div>
          )}

          {/* Floating Premium AI badge */}
          {!isSidebarCollapsed && (
            <div className="p-3 bg-gradient-to-tr from-[#6D5DF6]/12 to-[#8B5CF6]/5 border border-[var(--color-glass-border)] rounded-2xl flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-[#8B5CF6] shrink-0 animate-bounce" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-extrabold">
                Copilot Enterprise
              </span>
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
        <header className="sticky top-0 z-10 border-b border-[var(--color-glass-border)] backdrop-blur-md bg-[var(--glass-card-bg)] shadow-[var(--glass-card-shadow)] h-16 shrink-0 flex items-center px-6 sm:px-8 justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-bold tracking-tight text-[var(--color-text-secondary)] hidden sm:flex items-center space-x-2">
              <span>{greeting}, {user.displayName || "Manoj"} 👋</span>
            </h2>
            
            {/* Search Box */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                placeholder="Search tools & courses..."
                className="pl-8.5 pr-4 py-1.5 text-xs clay-input focus:outline-none w-36 sm:w-56 text-[var(--color-text-primary)]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            
            {/* Current Time Clock */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-[#6D5DF6]/5 border border-[#6D5DF6]/12 rounded-xl text-[10px] font-mono text-[#6D5DF6] font-extrabold">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime}</span>
            </div>

            {/* AI Advisor Button */}
            <button
              onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
              className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer flex items-center space-x-1.5"
              title="Open AI Mentor"
            >
              <SparklesIcon className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline text-[9px] font-mono uppercase tracking-wider font-black">AI Coach</span>
            </button>

            {/* Notifications panel toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shadow-[var(--clay-btn-secondary-shadow)] transition duration-200 cursor-pointer relative"
              >
                <Bell className="w-4 h-4" />
                {notificationsList.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 glass-card p-4 space-y-3 z-50 text-[var(--color-text-primary)] text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
                      <span className="font-mono uppercase font-black tracking-wider text-[10px] text-[var(--color-text-secondary)]">Inbox Notifications</span>
                      <button
                        onClick={() => {
                          setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
                        }}
                        className="text-[9px] font-bold text-[#6D5DF6]"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
                      {notificationsList.map(n => (
                        <div key={n.id} className={`p-2 rounded-xl transition duration-200 ${n.read ? "bg-transparent" : "bg-[#6D5DF6]/5 border border-[#6D5DF6]/12"}`}>
                          <p className="font-bold text-[11px] leading-tight text-[var(--color-text-primary)]">{n.title}</p>
                          <span className="text-[9px] text-[var(--color-text-tertiary)] font-mono block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme switcher */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Workspace core canvas */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold animate-fade-in z-20">
              <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "settings" ? (
            <ProfileSettingsPage
              user={user}
              onUpdateUser={onUpdateUser}
              onResetResume={onResetResume}
              onNavigateBack={() => setActiveTab("overview")}
            />
          ) : !resume ? (
            /* Redesigned blank slate workflow diagram when no resume exists */
            <div className="max-w-3xl mx-auto my-6 space-y-8 animate-fade-in">
              <div className="glass-card glowing-border p-8 sm:p-10 text-center relative overflow-hidden">
                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#6D5DF6]/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col items-center justify-center max-w-md mx-auto">
                  <div className="p-4.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-3xl mb-5 animate-pulse shadow-md">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">No Resume Uploaded</h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2 font-medium leading-relaxed font-sans">
                    SkillBridge AI requires a parsed profile document to calculate match scores, skill deficits, and mock interview questions.
                  </p>
                  
                  <button
                    onClick={() => onNavigate("upload")}
                    className="mt-6 px-6 py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-md"
                  >
                    Upload Profile Resume
                  </button>
                </div>

                {/* Workflow timeline stepper illustration */}
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                  <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-6 font-black">AI Pipeline Workflow</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center text-[10px] font-mono font-bold text-[var(--color-text-secondary)]">
                    {[
                      { step: "01", label: "Upload Resume", color: "text-[#6D5DF6]" },
                      { step: "02", label: "AI Analysis" },
                      { step: "03", label: "Skill gaps" },
                      { step: "04", label: "Career roadmap" },
                      { step: "05", label: "Job match" },
                      { step: "06", label: "Interview Prep" }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-2 flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-inner ${idx === 0 ? "border-[#6D5DF6]/30 bg-[#6D5DF6]/5 text-[#6D5DF6]" : "border-[var(--color-border)]"}`}>
                          {step.step}
                        </div>
                        <span className={`block truncate w-full ${step.color || ""}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits list details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "ATS Checkers", desc: "Instantly scan matched keywords.", icon: Cpu },
                  { title: "Simulator Labs", desc: "Interact with real interview mock modules.", icon: Monitor },
                  { title: "Hiring Dials", desc: "Predict placement probability.", icon: Award }
                ].map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="glass-card p-5 space-y-3">
                      <Icon className="w-5 h-5 text-[#6D5DF6]" />
                      <h4 className="text-xs font-bold">{b.title}</h4>
                      <p className="text-[10.5px] text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium">{b.desc}</p>
                    </div>
                  );
                })}
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
                            Active
                          </span>
                        </h1>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
                          Parsed File Name: <span className="font-mono text-[#6D5DF6] font-bold">{resume.fileName}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigate("upload")}
                        className="px-5 py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-semibold"
                      >
                        Replace Resume
                      </button>
                    </div>
                  </div>

                  {/* Bento Statistics widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Resume Score Card */}
                    <div className="glass-card p-6 flex flex-col justify-between h-[240px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Resume Score</span>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>

                      <div className="flex items-center justify-center my-2">
                        {analyzingQuality ? (
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-6 h-6 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                            <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase">Analyzing...</span>
                          </div>
                        ) : qualityAnalysis ? (
                          <CircularScoreGauge score={qualityAnalysis.qualityScore} colorClass="stroke-[#6D5DF6]" size={80} strokeWidth={6} />
                        ) : (
                          <button
                            onClick={triggerQualityAnalysis}
                            className="px-3.5 py-2.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-semibold text-white shadow-sm"
                          >
                            Trigger Review
                          </button>
                        )}
                      </div>

                      <div className="border-t border-[var(--color-border)] pt-3 text-[10px] font-mono font-semibold text-[var(--color-text-tertiary)] flex justify-between items-center">
                        <span>Quality Verdict</span>
                        <span className="text-[#6D5DF6]">{qualityAnalysis?.improvements?.length || 0} Improvements</span>
                      </div>
                    </div>

                    {/* ATS Score details widget */}
                    <div className="glass-card p-6 flex flex-col justify-between h-[240px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">ATS Score Matrix</span>
                        <FileText className="w-4.5 h-4.5 text-[#6D5DF6]" />
                      </div>

                      <div className="space-y-2.5 my-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span>Keyword Fit</span>
                          <span className="text-[#6D5DF6]">{atsResult ? `${atsResult.score}%` : "Not scanned"}</span>
                        </div>
                        <div className="w-full bg-[var(--color-border)] h-2.5 rounded-full overflow-hidden p-[1px]">
                          <div className="bg-[#6D5DF6] h-full rounded-full transition-all duration-500" style={{ width: atsResult ? `${atsResult.score}%` : "0%" }} />
                        </div>
                      </div>

                      <div className="border-t border-[var(--color-border)] pt-3 text-[10px] font-mono font-semibold text-[var(--color-text-tertiary)] flex justify-between items-center">
                        <span>Missing Keywords</span>
                        <span className="text-[#6D5DF6]">{atsResult?.missingKeywords?.length || 0} Deficits</span>
                      </div>
                    </div>

                    {/* Matched Opportunities count */}
                    <div className="glass-card p-6 flex flex-col justify-between h-[240px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Matched Opportunities</span>
                        <Award className="w-4.5 h-4.5 text-[#8B5CF6]" />
                      </div>

                      <div className="text-center my-3">
                        <span className="text-4xl font-black bg-gradient-to-r from-[#6D5DF6] to-[#8B5CF6] bg-clip-text text-transparent block font-mono">
                          {recommendedOpps.length || 0}
                        </span>
                        <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase mt-1.5 block font-bold">Active developer paths</span>
                      </div>

                      <button
                        onClick={() => setActiveTab("jobs")}
                        className="w-full py-2.5 clay-btn clay-btn-secondary text-[10px] font-mono uppercase tracking-wider font-semibold"
                      >
                        Inspect Matches
                      </button>
                    </div>
                  </div>

                  {/* Quick actions bento grid */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">Quick Actions Bento</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { id: "ats", title: "ATS Optimization", desc: "Simulate applicant track search filters", fill: "hover:shadow-indigo-500/10" },
                        { id: "jobs", title: "Neural Job Matcher", desc: "Browse custom matches scores", fill: "hover:shadow-pink-500/10" },
                        { id: "roadmap", title: "Skill gaps", desc: "Find deficits and learning roadmaps", fill: "hover:shadow-emerald-500/10" },
                        { id: "career-roadmap", title: "Career Timeline", desc: "Structured milestones", fill: "hover:shadow-purple-500/10" },
                        { id: "interview", title: "Interview Simulator", desc: "Mock questions evaluation feedback", fill: "hover:shadow-amber-500/10" },
                        { id: "probability", title: "Hiring Predictor", desc: "Score prediction gauges details", fill: "hover:shadow-cyan-500/10" }
                      ].map((action, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveTab(action.id as any)}
                          className={`p-5 glass-card glowing-border cursor-pointer transition duration-300 ${action.fill} min-h-[130px] flex flex-col justify-between`}
                        >
                          <div>
                            <h4 className="text-xs font-bold">{action.title}</h4>
                            <p className="text-[10px] text-[var(--color-text-secondary)] mt-1 leading-relaxed font-sans font-medium line-clamp-2">{action.desc}</p>
                          </div>
                          <span className="text-[9px] font-mono text-[#6D5DF6] flex items-center space-x-1 font-bold pt-2">
                            <span>Open Tool</span>
                            <span>➔</span>
                          </span>
                        </div>
                      ))}
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
                      className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md flex items-center space-x-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${matchingJobs ? "animate-spin" : ""}`} />
                      <span>{matchingJobs ? "Matching..." : "Re-Calculate Matches"}</span>
                    </button>
                  </div>

                  {matchingJobs ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                      <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Scanning Global Job Indexes</span>
                    </div>
                  ) : jobMatches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {jobMatches.map((job, idx) => {
                        const isBookmarked = bookmarkedJobs.includes(job.company);
                        return (
                          <div key={idx} className="p-6 glass-card flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] leading-snug">{job.role}</h3>
                                  <div className="flex items-center space-x-2 text-xs font-mono text-[#6D5DF6]">
                                    <span>{job.company}</span>
                                    <div className="flex items-center text-amber-500 text-[10px]">
                                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                                      <span className="ml-1 font-bold">4.8</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    onClick={() => toggleBookmark(job.company)}
                                    className="p-2 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:text-[#6D5DF6] transition shadow-sm cursor-pointer"
                                  >
                                    <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-[#6D5DF6] text-[#6D5DF6]" : "text-[var(--color-text-secondary)]"}`} />
                                  </button>
                                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] rounded-lg text-[9px] font-mono font-black">
                                    {job.matchPercentage || 85}% Fit
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold text-[var(--color-text-secondary)]">
                                <span className="bg-[var(--color-bg-page)] px-2.5 py-1 rounded-xl border border-[var(--color-border)]">Location: {job.location || "San Francisco (Remote)"}</span>
                                <span className="bg-[var(--color-bg-page)] px-2.5 py-1 rounded-xl border border-[var(--color-border)]">Salary: {job.salary || "$145,000 - $180,000"}</span>
                              </div>

                              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium line-clamp-3">
                                {job.description || "Exciting role to engineer and maintain scalable cloud architecture networks using Redis, Express, Node.js and REST endpoints."}
                              </p>
                            </div>

                            <div className="flex space-x-3 items-center justify-between border-t border-[var(--color-border)] pt-4">
                              <span className="text-[9.5px] font-mono text-[var(--color-text-tertiary)]">Posted 2 days ago</span>
                              <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2.5 clay-btn clay-btn-primary text-[10px] font-mono uppercase tracking-wider font-semibold text-white shadow-sm"
                              >
                                Apply Now
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-center p-6">
                      <Briefcase className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                      <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                        Trigger calculation to matches your candidate profile.
                      </p>
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
                    <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between space-y-6">
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
                              ➔
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
                    <div className="lg:col-span-3 glass-card p-6 flex flex-col justify-between min-h-[380px]">
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
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" radius="70%" data={[
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
                            </ResponsiveContainer>
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
                              <span className="text-[9px] font-mono text-[var(--color-text-secondary)]">{career.duration}</span>
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

                          {/* Roadmap stepper list */}
                          <div className="space-y-5">
                            {selectedCareer.milestones?.map((milestone, idx) => {
                              const isCompleted = (completedCareerMilestones[selectedCareer.id] || []).includes(idx);
                              const isExpanded = expandedMilestones[idx] || false;
                              return (
                                <div key={idx} className="relative pl-7 border-l border-[var(--color-border)] space-y-3">
                                  {/* Step Circle checkbox */}
                                  <button
                                    onClick={() => handleToggleMilestone(selectedCareer.id, idx)}
                                    className={`absolute left-[-11px] top-1.5 w-5.5 h-5.5 rounded-full border flex items-center justify-center text-xs font-mono font-bold transition shadow-sm cursor-pointer ${
                                      isCompleted 
                                        ? "bg-emerald-500 border-emerald-500 text-white" 
                                        : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[#6D5DF6]"
                                    }`}
                                  >
                                    {isCompleted ? "✓" : idx + 1}
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-5">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">AI Interview Lab</h1>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium leading-relaxed font-sans">
                        Practice mock simulator runs tailored to parsed resume stack skills.
                      </p>
                    </div>

                    <button
                      onClick={handleStartInterview}
                      disabled={generatingQuestions}
                      className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md flex items-center space-x-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${generatingQuestions ? "animate-spin" : ""}`} />
                      <span>{generatingQuestions ? "Generating..." : "Generate Custom Mock Questions"}</span>
                    </button>
                  </div>

                  {generatingQuestions ? (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                      <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">Synthesizing Tailored Interview Questionnaire</span>
                    </div>
                  ) : interviewQuestions.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
                      
                      {/* Left: Interactive Mic & Recording simulator */}
                      <div className="lg:col-span-3 glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#6D5DF6]">
                            <span>QUESTION {currentQuestionIndex + 1} OF {interviewQuestions.length}</span>
                            <span>{interviewQuestions[currentQuestionIndex]?.category}</span>
                          </div>

                          <h3 className="text-base font-black text-[var(--color-text-primary)] leading-snug">
                            {interviewQuestions[currentQuestionIndex]?.question}
                          </h3>
                        </div>

                        {/* Interactive mic / voice animation */}
                        <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner relative">
                          {isRecording ? (
                            <div className="space-y-4">
                              <span className="text-[10px] font-mono text-red-500 animate-pulse font-extrabold">RECORDING FEEDBACK LIVE ({recordingTimer}s)</span>
                              
                              {/* Voice Visualization waves */}
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
                                className="px-5 py-2.5 clay-btn clay-btn-danger text-xs font-mono uppercase tracking-wider font-bold shadow-md"
                              >
                                Stop & Parse Speech
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <span className="text-[9.5px] font-mono text-[var(--color-text-tertiary)] uppercase font-black">Speech Simulation</span>
                              <button
                                type="button"
                                onClick={startRecording}
                                className="w-16 h-16 rounded-full bg-[#6D5DF6] text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-105 transition cursor-pointer"
                              >
                                🎙️
                              </button>
                              <p className="text-[10.5px] text-[var(--color-text-secondary)] font-medium font-sans">Click to speak answer or type below</p>
                            </div>
                          )}
                        </div>

                        <form onSubmit={handleSubmitInterviewAnswer} className="space-y-4">
                          <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Type your simulated response here..."
                            rows={4}
                            required
                            disabled={evaluatingAnswer}
                            className="w-full clay-input px-4 py-3 text-xs focus:outline-none font-medium leading-relaxed font-sans"
                          />

                          <div className="flex justify-between items-center">
                            <span className="text-[9.5px] font-mono text-[var(--color-text-tertiary)]">Double highlights active</span>
                            <button
                              type="submit"
                              disabled={evaluatingAnswer || !userAnswer.trim()}
                              className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-semibold shadow-md disabled:opacity-50"
                            >
                              {evaluatingAnswer ? "Evaluating..." : "Submit Answer"}
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Right: Results / evaluation review */}
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

                            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar text-xs">
                              {/* Grading cards */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-center">
                                  <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Confidence</span>
                                  <span className="text-xs font-extrabold text-[#22C55E]">High (92%)</span>
                                </div>
                                <div className="p-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-center">
                                  <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block">Grammar</span>
                                  <span className="text-xs font-extrabold text-[#6D5DF6]">Excellent</span>
                                </div>
                              </div>

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
                            </div>

                            {currentQuestionIndex < interviewQuestions.length - 1 ? (
                              <button
                                onClick={handleNextQuestion}
                                className="w-full py-3.5 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold"
                              >
                                Next Question
                              </button>
                            ) : (
                              <div className="bg-emerald-500/5 border border-emerald-500/15 p-4.5 rounded-2xl text-center">
                                <p className="text-xs font-extrabold text-[#22C55E]">Session Complete!</p>
                                <span className="text-[10px] text-[var(--color-text-secondary)] font-mono font-semibold block mt-1">Average rating: {getInterviewOverallScore()}/100</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                            <Sparkles className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                            <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                              Submit response to activate recruiter grade evaluation.
                            </p>
                          </div>
                        )}
                      </div>

                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-center p-6">
                      <MessageSquare className="w-10 h-10 text-[var(--color-text-tertiary)] opacity-60 mb-3" />
                      <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                        Click 'Generate Questions' to initialize mockup simulation.
                      </p>
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
                                    <span className="text-[#22C55E] font-bold shrink-0">✓</span>
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
                  <SparklesIcon className="w-4.5 h-4.5 text-[#8B5CF6] animate-pulse" />
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
          <SparklesIcon className="w-5 h-5 animate-pulse" />
        </button>
      </div>

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
