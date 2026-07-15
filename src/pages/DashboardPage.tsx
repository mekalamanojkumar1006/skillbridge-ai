import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
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
  Sparkles as SparklesIcon
} from "lucide-react";
import ProfileSettingsPage from "./ProfileSettingsPage";
import { CAREER_ROADMAPS, CareerPath, Milestone } from "../data/careersData";

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

export function CircularScoreGauge({
  score,
  maxScore = 100,
  size = 112,
  strokeWidth = 8,
  colorClass = "stroke-indigo-600",
  duration = 1000,
  showMaxScore = true,
  suffix = ""
}: CircularScoreGaugeProps) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = score;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad
      setCurrentScore(Math.floor(easedProgress * (endValue - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentScore(endValue);
      }
    }

    requestAnimationFrame(animate);
  }, [score, duration]);

  const radius = (size - strokeWidth * 2) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - currentScore / maxScore);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-[var(--color-border)] fill-none"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          className={`${colorClass} fill-none`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-[var(--color-text-primary)] font-sans">
          {currentScore}{suffix}
        </span>
        {showMaxScore && (
          <span className="text-[9px] text-[var(--color-text-tertiary)] font-mono uppercase font-bold">
            / {maxScore}
          </span>
        )}
      </div>
    </motion.div>
  );
}

interface CountUpTextProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUpText({ to, duration = 1000, prefix = "", suffix = "" }: CountUpTextProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = to;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = progress * (2 - progress); // easeOutQuad
      setValue(Math.floor(easedProgress * (endValue - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    }

    requestAnimationFrame(animate);
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

  // Hiring probability state
  const [probJobTitle, setProbJobTitle] = useState("");
  const [probCompany, setProbCompany] = useState("");
  const [hiringProbability, setHiringProbability] = useState<any>(null);
  const [predictingProb, setPredictingProb] = useState(false);

  // Recommended Opportunities (Cosine Similarity skill matching)
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

  const isLocalLightMode = theme === "light";
  const setIsLocalLightMode = (newVal: boolean) => {
    setTheme(newVal ? "light" : "dark");
  };

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans selection:bg-indigo-500/30 selection:text-white relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300">
      
      {/* Background soft spheres */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Left Sidebar Rail */}
      <aside className="w-full md:w-64 border-r border-[var(--color-border)] backdrop-blur-2xl flex flex-col justify-between shrink-0 relative z-10 p-5 bg-[var(--clay-card-bg)] shadow-[var(--clay-card-shadow)] rounded-none md:rounded-r-[32px]">
        <div>
          {/* Brand Title */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-base font-black tracking-tight">
                SkillBridge
              </span>
              <span className="px-1.5 py-0.5 text-[8px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono font-black uppercase">
                AI
              </span>
            </div>

            {/* Local Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition shadow-sm cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* User badge */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-sm text-white font-mono shadow-md">
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black truncate text-[var(--color-text-primary)]">
                {user.displayName || "Career Professional"}
              </p>
              <p className="text-[9px] font-mono text-[var(--color-text-tertiary)] truncate font-bold mt-0.5">{user.email}</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="p-2 space-y-2 mt-4">
            {[
              { id: "overview", label: "Career Board", icon: LayoutDashboard },
              { id: "ats", label: "ATS Optimiser", icon: FileText },
              { id: "jobs", label: "Job Matcher", icon: Search },
              { id: "roadmap", label: "Skill Gaps", icon: Map },
              { id: "career-roadmap", label: "Career Roadmap", icon: Sparkles, iconColor: "text-purple-500 dark:text-purple-400" },
              { id: "interview", label: "Interview Lab", icon: MessageSquare },
              { id: "probability", label: "Hiring Predictor", icon: Award },
              { id: "settings", label: "Profile Settings", icon: Settings }
            ].map((tab: any) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setError(null);
                    if (tab.id === "jobs" && resume && jobMatches.length === 0) {
                      handleJobMatching();
                    }
                    if (tab.id === "career-roadmap" && resume && careerRoadmaps.length === 0) {
                      fetchCareerRoadmaps();
                    }
                  }}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer border ${
                    isActive
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-indigo-500/5 border-transparent"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${tab.iconColor || ""}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Aside footer */}
        <div className="p-2 border-t border-[var(--color-border)]">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3.5 px-4 py-3 text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 rounded-2xl cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        
        {/* Universal Alert Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Sub page mapping */}
        {activeTab === "settings" ? (
          <ProfileSettingsPage
            user={user}
            onUpdateUser={onUpdateUser}
            onResetResume={onResetResume}
            onNavigateBack={() => setActiveTab("overview")}
          />
        ) : !resume ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 clay-card max-w-xl mx-auto my-12 relative z-10">
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-3xl mb-5 animate-bounce">
              <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-black">No Active Resume Loaded</h2>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-md mt-2 font-sans leading-relaxed font-medium">
              Before exploring multi-agent career tools, you must parse your current profile resume. Our algorithms will map out matching paths, learning roadmaps, and mock evaluation.
            </p>
            <button
              onClick={() => onNavigate("upload")}
              className="mt-6 px-6 py-3.5 clay-btn clay-btn-primary text-xs font-mono tracking-wider uppercase font-bold text-white shadow-md"
            >
              Parse Profile Resume
            </button>
          </div>
        ) : (
          /* ACTIVE TABS */
          <div className="space-y-8 animate-fade-in relative z-10">
            
            {/* Tab: Overview (Career Board) */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Hero section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-2.5">
                      <span>Career Board</span>
                      <span className="text-[10px] px-2.5 py-0.5 bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono font-bold lowercase">
                        online
                      </span>
                    </h1>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-semibold">
                      Resume parsed: <span className="font-mono text-indigo-600 dark:text-indigo-400">{resume.fileName}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate("upload")}
                    className="px-4 py-2.5 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Replace Resume
                  </button>
                </div>

                {/* Score and synthesis breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Score gauge container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 clay-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                          Resume Score
                        </h2>
                        <Sparkles className="w-4.5 h-4.5 text-purple-500 dark:text-purple-400" />
                      </div>
                      <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1.5 font-medium leading-relaxed">
                        Evaluated by Cognitive Quality Agent based on formatting, depth, and syntax guidelines.
                      </p>
                    </div>

                    <div className="my-6 flex flex-col items-center justify-center">
                      {analyzingQuality ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                          <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">
                            Analyzing...
                          </span>
                        </div>
                      ) : qualityAnalysis ? (
                        <CircularScoreGauge score={qualityAnalysis.qualityScore} colorClass="stroke-indigo-600" />
                      ) : (
                        <button
                          onClick={triggerQualityAnalysis}
                          className="px-4 py-2.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white shadow-sm"
                        >
                          Trigger Quality Review
                        </button>
                      )}
                    </div>

                    <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-center text-xs font-mono font-bold">
                      <span className="text-[var(--color-text-secondary)]">Suggested Enhancements:</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {qualityAnalysis?.improvements?.length || 0}
                      </span>
                    </div>
                  </motion.div>

                  {/* Summary & Core Profile */}
                  <div className="lg:col-span-2 p-6 clay-card flex flex-col justify-between">
                    <div>
                      <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2.5 font-bold">
                        Synthesized Profile
                      </h2>
                      <h3 className="text-lg font-black text-[var(--color-text-primary)]">
                        {resume.parsedData?.name || "Career Professional"}
                      </h3>
                      {resume.parsedData?.summary ? (
                        <p className="mt-2.5 text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans line-clamp-4 font-medium">
                          {resume.parsedData.summary}
                        </p>
                      ) : (
                        <p className="mt-2.5 text-xs text-[var(--color-text-tertiary)] italic font-sans font-medium">
                          No professional summary extracted. Click 'Trigger Quality Review' to analyze improvements.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <h4 className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2.5 font-bold">
                        Identified Tech Stack / Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1 custom-scrollbar">
                        {(() => {
                          const skillsObj = resume?.parsedData?.skills;
                          let skillsArr: string[] = [];
                          if (Array.isArray(skillsObj)) {
                            skillsArr = skillsObj;
                          } else if (skillsObj && typeof skillsObj === "object") {
                            skillsArr = Array.isArray(skillsObj.all) ? skillsObj.all : Object.values(skillsObj).flat().filter((s): s is string => typeof s === "string");
                          }
                          if (skillsArr.length > 0) {
                            return skillsArr.map((skill: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[10px] font-mono text-[var(--color-text-primary)] font-bold shadow-sm"
                              >
                                {skill}
                              </span>
                            ));
                          }
                          return (
                            <span className="text-xs text-[var(--color-text-tertiary)] font-sans italic">
                              No structured skills extracted.
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* History & quality report details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quality Coach Feedback */}
                  <div className="p-6 clay-card space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center space-x-1.5 font-bold">
                        <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
                        <span>AI Quality Analysis</span>
                      </h3>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                        Real-time Evaluation
                      </span>
                    </div>

                    {qualityAnalysis ? (
                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* Verdict */}
                        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
                          <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase block font-black mb-1">
                            Final Recruiter Verdict
                          </span>
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                            {qualityAnalysis.verdict || `Current Quality Score: ${qualityAnalysis.qualityScore || 75}/100. This resume has a solid base structure and is suitable for target developer profiles.`}
                          </p>
                        </div>

                        {/* Breakdown */}
                        {(() => {
                          const breakdown = qualityAnalysis.breakdown || {
                            formatting: Math.min(20, Math.round((qualityAnalysis.qualityScore || 75) * 0.2)),
                            contactInfo: 9,
                            summary: Math.min(10, Math.round((qualityAnalysis.qualityScore || 75) * 0.1)),
                            skills: Math.min(10, Math.round((qualityAnalysis.qualityScore || 75) * 0.1)),
                            experience: Math.min(10, Math.round((qualityAnalysis.qualityScore || 75) * 0.1)),
                            projects: Math.min(20, Math.round((qualityAnalysis.qualityScore || 75) * 0.2)),
                            education: 4,
                            certifications: 4,
                            keywords: Math.min(10, Math.round((qualityAnalysis.qualityScore || 75) * 0.1))
                          };
                          return (
                            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-2.5 shadow-inner">
                              <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase block font-black">
                                ATS Score Breakdown
                              </span>
                              <div className="space-y-2 text-xs">
                                {[
                                  { name: "ATS Formatting", val: breakdown.formatting, max: 20 },
                                  { name: "Contact Information", val: breakdown.contactInfo, max: 10 },
                                  { name: "Professional Summary", val: breakdown.summary, max: 10 },
                                  { name: "Technical Skills", val: breakdown.skills, max: 10 },
                                  { name: "Work Experience", val: breakdown.experience, max: 10 },
                                  { name: "Projects", val: breakdown.projects, max: 20 },
                                  { name: "Education", val: breakdown.education, max: 5 },
                                  { name: "Certifications", val: breakdown.certifications, max: 5 },
                                  { name: "ATS Keywords", val: breakdown.keywords, max: 10 }
                                ].map((b, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-[var(--color-text-secondary)] font-medium">
                                    <span className="shrink-0">{b.name}</span>
                                    <div className="flex-grow border-b border-dotted border-[var(--color-border)] mx-2 translate-y-1.5" />
                                    <span className="font-mono text-[var(--color-text-tertiary)] shrink-0 font-bold">{b.val}/{b.max}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* What's Excellent */}
                        <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-2 shadow-inner">
                          <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase block font-black">
                            What's Excellent ✅
                          </span>
                          <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-medium">
                            {(qualityAnalysis.strengths || ["ATS-friendly layout template structure", "Strong core developer skill metrics matching target roles"]).map((str: string, i: number) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-2 shadow-inner">
                          <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 uppercase block font-black">
                            Areas for Improvement ⚠️
                          </span>
                          <div className="space-y-2">
                            {(qualityAnalysis.improvements || [{ text: "Incorporate more quantified metrics in project details", impact: 2 }]).map((imp: any, i: number) => (
                              <div key={i} className="flex items-start justify-between bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl p-3 text-xs leading-relaxed gap-3 shadow-sm">
                                <span className="text-[var(--color-text-secondary)] font-medium">{imp.text || imp}</span>
                                {imp.impact && (
                                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-mono rounded-lg font-black shrink-0">
                                    +{imp.impact}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center">
                        <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                          Complete quality evaluation to unlock deep roadmap checks.
                        </p>
                        <button
                          onClick={triggerQualityAnalysis}
                          className="mt-4 px-4 py-2.5 clay-btn clay-btn-secondary text-[var(--color-text-primary)] text-xs font-mono uppercase tracking-wider font-bold"
                        >
                          Trigger Analysis
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Work Experience */}
                  <div className="p-6 clay-card space-y-4">
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center space-x-1.5 font-bold">
                        <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span>Work History Timeline</span>
                      </h3>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                        Parsed Records
                      </span>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                      {resume.parsedData?.experience && resume.parsedData.experience.length > 0 ? (
                        resume.parsedData.experience.map((exp: any, idx: number) => (
                          <div key={idx} className="relative pl-5 border-l-2 border-[var(--color-border)] pb-4">
                            <div className="absolute w-3 h-3 rounded-full bg-indigo-500 border border-[var(--color-bg-page)] top-1 left-[-7px]" />
                            <div className="flex justify-between items-start text-xs">
                              <h4 className="font-extrabold text-[var(--color-text-primary)]">{exp.role}</h4>
                              <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] shrink-0 font-bold">
                                {exp.duration}
                              </span>
                            </div>
                            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">{exp.company}</p>
                            <p className="text-[10px] text-[var(--color-text-secondary)] font-medium font-sans mt-1.5 leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-[var(--color-text-tertiary)] font-sans italic font-medium">No employment records parsed.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-8 clay-card space-y-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[var(--color-border)] pb-6">
                    <div>
                      <h2 className="text-lg font-black flex items-center space-x-2.5">
                        <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <span>AI Role Recommendations</span>
                      </h2>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium">
                        Personalized career role suggestions matched using our multi-agent capabilities against your profile.
                      </p>
                    </div>

                    <button
                      onClick={handleCalculateOpps}
                      disabled={calculatingOpps || loadingOpps}
                      className="flex items-center space-x-2 px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white shadow-md disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${(calculatingOpps || loadingOpps) ? "animate-spin" : ""}`} />
                      <span>{calculatingOpps ? "Matching..." : "Recalculate Matches"}</span>
                    </button>
                  </div>

                  {calculatingOpps || loadingOpps ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-3">
                      <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                      <div className="text-center">
                        <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-widest block font-bold">Comparing Skill Vectors</span>
                        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1 max-w-xs font-medium">
                          Generating candidate-to-role intersection indices and calculating matching statistics...
                        </p>
                      </div>
                    </div>
                  ) : recommendedOpps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {recommendedOpps.map((opp, idx) => (
                        <motion.div
                          key={opp.opportunityId || idx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          whileHover={{ y: -4 }}
                          className="p-6 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-3xl flex flex-col justify-between space-y-5 transition duration-300 shadow-sm"
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <span className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-black border ${
                                opp.matchScore >= 75
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                  : opp.matchScore >= 50
                                  ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                              }`}>
                                <CountUpText to={opp.matchScore} suffix="% Match" />
                              </span>
                            </div>

                            <div>
                              <h3 className="text-sm font-extrabold text-[var(--color-text-primary)] leading-snug">
                                {opp.title}
                              </h3>
                              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-black mt-1">{opp.company}</p>
                            </div>

                            <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-[var(--color-text-secondary)] font-mono font-bold">
                              <span>{opp.location}</span>
                              <span>&bull;</span>
                              <span>{opp.type}</span>
                              <span>&bull;</span>
                              <span>{opp.salary}</span>
                            </div>

                            <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed line-clamp-3">
                              {opp.description}
                            </p>
                          </div>

                          <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
                            <div>
                              <h4 className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                <span>Overlap Skills ({opp.matchedSkills?.length || 0})</span>
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {opp.matchedSkills && opp.matchedSkills.length > 0 ? (
                                  opp.matchedSkills.slice(0, 4).map((skill: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-mono font-medium"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-[var(--color-text-tertiary)] italic">None</span>
                                )}
                                {opp.matchedSkills?.length > 4 && (
                                  <span className="text-[9px] text-[var(--color-text-tertiary)] font-mono font-bold self-center">
                                    +{opp.matchedSkills.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 flex items-center space-x-1 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                                <span>Deficit Skills ({opp.missingSkills?.length || 0})</span>
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {opp.missingSkills && opp.missingSkills.length > 0 ? (
                                  opp.missingSkills.slice(0, 4).map((skill: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-mono font-medium"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold italic">Check list full!</span>
                                )}
                                {opp.missingSkills?.length > 4 && (
                                  <span className="text-[9px] text-[var(--color-text-tertiary)] font-mono font-bold self-center">
                                    +{opp.missingSkills.length - 4} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-48 flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-[var(--color-text-secondary)] font-medium">
                        No role recommendations have been calculated yet.
                      </p>
                      <button
                        onClick={handleCalculateOpps}
                        className="mt-4 px-4 py-2.5 clay-btn clay-btn-secondary text-[var(--color-text-primary)] text-xs font-mono uppercase tracking-wider font-bold"
                      >
                        Calculate Recommendations
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tab: ATS Scanner */}
            {activeTab === "ats" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)]">ATS Optimiser</h1>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                    Directly simulate recruiter applicant filters and optimize keywords to maximize resume pass-through.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form */}
                  <form onSubmit={handleAtsScan} className="p-6 clay-card flex flex-col justify-between space-y-5 min-h-[400px]">
                    <div className="space-y-3">
                      <label className="block text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                        Target Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the target job description here to analyze matched and missing core keywords..."
                        rows={10}
                        required
                        className="w-full clay-input px-4 py-3.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none leading-relaxed resize-none min-h-[220px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={scanningAts}
                      className="w-full py-4 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white shadow-md"
                    >
                      {scanningAts ? "Scanning Keywords against ATS..." : "Analyze ATS Compatibility"}
                    </button>
                  </form>

                  {/* Results */}
                  <div className="p-6 clay-card space-y-6 min-h-[400px] flex flex-col justify-between">
                    {scanningAts ? (
                      <div className="flex-grow flex flex-col items-center justify-center space-y-3 text-center">
                        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                          Recruiter Simulator active...
                        </span>
                      </div>
                    ) : atsResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 flex-grow flex flex-col justify-between"
                      >
                        {/* Gauge & info */}
                        <div className="flex items-center space-x-5 border-b border-[var(--color-border)] pb-5">
                          <CircularScoreGauge score={atsResult.score} size={84} strokeWidth={6} colorClass="stroke-indigo-600" />
                          <div>
                            <h3 className="text-sm font-bold">ATS Match Rating</h3>
                            <p className="text-[10px] text-[var(--color-text-secondary)] mt-1.5 leading-relaxed font-sans font-medium">
                              {atsResult.score >= 85
                                ? "Excellent compatibility! Your resume exhibits high-quality project details and aligned skills."
                                : atsResult.score >= 70
                                ? "Moderate match. Optimize using the recommended keyword weights below to improve selection chances."
                                : "Weak compatibility. Structurally audit experience descriptions and target missing keywords."}
                            </p>
                          </div>
                        </div>

                        {/* Report list */}
                        <div className="space-y-5 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                          
                          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
                            <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black mb-1">
                              Verdict Summary
                            </span>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                              {atsResult.verdict || `Current ATS Score: ${atsResult.score}/100. This resume has a solid base structure and is suitable for target developer profiles.`}
                            </p>
                          </div>

                          {/* Keywords lists */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-black">
                                Keywords Matched
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.keywordsMatched?.map((word: string, i: number) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-emerald-50/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded text-[9px] font-mono font-medium"
                                  >
                                    {word}
                                  </span>
                                )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                              </div>
                            </div>

                            <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                              <span className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase tracking-widest block font-black">
                                Missing Keywords
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.missingKeywords?.map((word: string, i: number) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded text-[9px] font-mono font-medium"
                                  >
                                    {word}
                                  </span>
                                )) || <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None</span>}
                              </div>
                            </div>
                          </div>

                          {/* Copiable templates */}
                          {atsResult.score < 80 && (
                            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 space-y-2.5">
                              <div className="flex items-start space-x-2.5">
                                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 text-xs font-bold">
                                  💡
                                </div>
                                <div className="space-y-0.5">
                                  <h5 className="text-xs font-black text-amber-600 dark:text-amber-400">ATS Template Recommendation</h5>
                                  <p className="text-[10px] text-[var(--color-text-secondary)] leading-relaxed font-medium">
                                    Since your score is under 80, formatting errors may be hindering parsing. Copy this standard single-column layout structure:
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mt-2 text-left">
                                <textarea
                                  readOnly
                                  value={ATS_FRIENDLY_TEMPLATE}
                                  className="w-full h-32 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl p-3 text-[10px] font-mono text-[var(--color-text-secondary)] focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(ATS_FRIENDLY_TEMPLATE);
                                    alert("ATS template copied to clipboard!");
                                  }}
                                  className="mt-2 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1 cursor-pointer"
                                >
                                  <span>[Copy Template to Clipboard]</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                        <ClipboardList className="w-10 h-10 text-[var(--color-text-tertiary)] mb-3" />
                        <h3 className="text-sm font-bold text-[var(--color-text-secondary)]">Scan Results Pending</h3>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs font-medium font-sans leading-relaxed">
                          Input the target job description in the form to check matching indices and keyword density.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Job Matcher */}
            {activeTab === "jobs" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black">Neural Job Matcher</h1>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                      Our intelligence matchers examine your profile skills to recommend real roles and companies.
                    </p>
                  </div>
                  <button
                    onClick={handleJobMatching}
                    disabled={matchingJobs}
                    className="px-5 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white shadow-md disabled:opacity-50"
                  >
                    {matchingJobs ? "Matching..." : "Refresh Job Matches"}
                  </button>
                </div>

                {matchingJobs ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                    <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                      Consulting market indices...
                    </span>
                  </div>
                ) : jobMatches.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {jobMatches.map((job, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="p-6 clay-card flex flex-col justify-between space-y-6 transition duration-300"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-black rounded-lg">
                              <CountUpText to={job.matchPercentage} suffix="% Match" />
                            </span>
                            <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                              Rank #{idx + 1}
                            </span>
                          </div>

                          <h3 className="mt-4 text-base font-extrabold text-[var(--color-text-primary)] leading-tight">
                            {job.role}
                          </h3>
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold mt-0.5">{job.company}</p>

                          <p className="mt-3 text-xs text-[var(--color-text-secondary)] font-medium font-sans leading-relaxed line-clamp-3">
                            {job.description}
                          </p>
                        </div>

                        <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
                          <div>
                            <h4 className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 font-bold">
                              Leveraged Strengths
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {job.strengths?.map((str: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-mono font-medium"
                                >
                                  {str}
                                </span>
                              )) || <span className="text-[9px] text-[var(--color-text-tertiary)]">None</span>}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 font-bold">
                              Unmet Requirements
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {job.missingRequirements?.map((req: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-mono font-medium"
                                >
                                  {req}
                                </span>
                              )) || <span className="text-[9px] text-[var(--color-text-tertiary)]">None</span>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center clay-card p-6 max-w-xl mx-auto my-6">
                    <Briefcase className="w-10 h-10 text-[var(--color-text-tertiary)] mb-3" />
                    <h3 className="text-sm font-bold text-[var(--color-text-secondary)]">No Job Matches Cached</h3>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs font-medium font-sans leading-relaxed">
                      Trigger neural matching to inspect prospective companies and custom fit analysis.
                    </p>
                    <button
                      onClick={handleJobMatching}
                      className="mt-6 px-5 py-3 clay-btn clay-btn-primary text-white text-xs font-mono uppercase tracking-wider font-bold shadow-md"
                    >
                      Trigger Neural Matcher
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Skill Gaps */}
            {activeTab === "roadmap" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black">Skill Gap & Learning Roadmap</h1>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                    State your target career goal, and the system will design a visual learning path to bridge the tech skill gaps.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Goal Input form */}
                  <div className="p-6 clay-card h-fit space-y-5">
                    <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                      Configure Target Role
                    </h2>
                    <form onSubmit={handleSkillGapAnalysis} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2 font-bold">
                          Target Role Title
                        </label>
                        <input
                          type="text"
                          value={targetCareerRole}
                          onChange={(e) => setTargetCareerRole(e.target.value)}
                          placeholder="e.g. Senior Cloud Engineer, Lead Architect"
                          required
                          className="w-full clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={analyzingGaps}
                        className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md"
                      >
                        {analyzingGaps ? "Synthesizing Roadmap..." : "Calculate Skill Gaps"}
                      </button>
                    </form>

                    {skillGapResult && (
                      <div className="pt-4 border-t border-[var(--color-border)] space-y-4 font-sans text-xs">
                        <div>
                          <h4 className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 font-bold">
                            Possessed Skills
                          </h4>
                          <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
                            {skillGapResult.currentSkills?.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-[9px] font-mono font-medium"
                              >
                                {skill}
                              </span>
                            )) || <span className="text-[10px] text-[var(--color-text-tertiary)]">None</span>}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 font-bold">
                            Core Skill Deficits
                          </h4>
                          <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1 custom-scrollbar">
                            {skillGapResult.missingSkills?.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-mono font-medium"
                              >
                                {skill}
                              </span>
                            )) || <span className="text-[10px] text-[var(--color-text-tertiary)]">None</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Roadmap Timeline */}
                  <div className="lg:col-span-2 p-6 clay-card min-h-[400px]">
                    <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3 mb-6">
                      <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                        Tailored Multi-Week Roadmap
                      </h3>
                      <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                        Timeline Sequence
                      </span>
                    </div>

                    {analyzingGaps ? (
                      <div className="h-64 flex flex-col items-center justify-center space-y-3">
                        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                          Assembling educational plan...
                        </span>
                      </div>
                    ) : skillGapResult?.learningRoadmap && skillGapResult.learningRoadmap.length > 0 ? (
                      <div className="space-y-6">
                        {skillGapResult.learningRoadmap.map((step: any, idx: number) => (
                          <div key={idx} className="relative pl-8 border-l-2 border-[var(--color-border)] pb-4">
                            <div className="absolute w-6 h-6 rounded-full bg-[var(--color-bg-page)] border border-indigo-500 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-black flex items-center justify-center top-0.5 left-[-13px] shadow-sm">
                              {idx + 1}
                            </div>
                            <div className="flex justify-between items-start text-xs">
                              <h4 className="font-extrabold text-[var(--color-text-primary)]">{step.title}</h4>
                              <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-lg font-bold">
                                {step.duration}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--color-text-secondary)] font-medium font-sans mt-1.5 leading-relaxed">
                              {step.description}
                            </p>
                            {step.resources && step.resources.length > 0 && (
                              <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                                <span className="text-[8px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider font-black">Resources:</span>
                                {step.resources.map((res: string, rIdx: number) => (
                                  <span
                                    key={rIdx}
                                    className="px-2 py-0.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded text-[9px] font-mono text-[var(--color-text-secondary)] font-medium shadow-sm"
                                  >
                                    {res}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center text-center p-4">
                        <BookOpen className="w-10 h-10 text-[var(--color-text-tertiary)] mb-3" />
                        <h3 className="text-sm font-bold text-[var(--color-text-secondary)]">Plan Offline</h3>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs font-medium font-sans leading-relaxed">
                          State your career objectives in the sidebar configuration to build a personalized study roadmap.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab: Career Roadmap Navigator */}
            {activeTab === "career-roadmap" && (
              <div className={`premium-theme-container ${isLocalLightMode ? "premium-light-theme" : "premium-dark-theme"} w-full text-[var(--theme-text-primary)] bg-[var(--theme-bg-page)] premium-transition pb-24 rounded-3xl overflow-hidden border border-[var(--theme-border)]`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 animate-fade-in"
                >
                  {/* Search Header */}
                  {!selectedCareer && (
                    <div className="sticky top-0 z-30 backdrop-blur-md bg-[var(--theme-bg-page)]/85 border-b border-[var(--theme-border)] py-6 px-8 flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text-primary)] flex items-center gap-2.5">
                            <SparklesIcon className="w-7 h-7 text-[var(--theme-accent)]" />
                            <span>Career Path Navigator</span>
                          </h1>
                          <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5 font-sans font-medium">
                            Master industry-aligned technical skillsets, practice assignments, and custom structured projects curated for premium job readiness.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                        <div className="lg:col-span-2 relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--theme-text-tertiary)]">
                            <Search className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={searchQuery}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search premium careers (e.g. SDE, AI Developer, ML Engineer)..."
                            className="w-full bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl pl-11 pr-10 py-3 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-purple-500/40 transition duration-200 shadow-inner"
                          />
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery("")}
                              className="absolute inset-y-0 right-3 flex items-center text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)] transition"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                              {CAREER_ROADMAPS.filter(c => 
                                c.title.toLowerCase().includes(searchQuery.toLowerCase())
                              ).slice(0, 5).map((c) => (
                                <button
                                  key={c.id}
                                  onMouseDown={() => {
                                    setSearchQuery(c.title);
                                    addRecentSearch(c.title);
                                    setSelectedCareer(c);
                                  }}
                                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--theme-accent-soft)] hover:text-purple-400 text-xs font-sans text-[var(--theme-text-primary)] flex items-center justify-between"
                                >
                                  <span>{c.title}</span>
                                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-sans">
                          <span className="text-[var(--theme-text-tertiary)] uppercase font-semibold tracking-wider text-[9px] mr-1">Trending:</span>
                          {["AI Engineer", "SDE", "DevOps", "Frontend"].map((trend) => (
                            <button
                              key={trend}
                              onClick={() => {
                                const match = CAREER_ROADMAPS.find(c => c.title.toLowerCase().includes(trend.toLowerCase()) || c.id.toLowerCase().includes(trend.toLowerCase()));
                                if (match) {
                                  setSearchQuery(match.title);
                                  addRecentSearch(match.title);
                                  setSelectedCareer(match);
                                }
                              }}
                              className="px-2.5 py-1 bg-[var(--theme-accent-soft)] hover:bg-[var(--theme-accent-hover)] text-[var(--theme-accent)] rounded-lg font-mono font-medium transition duration-150 border border-purple-500/5 flex items-center gap-1 cursor-pointer"
                            >
                              <ArrowUpRight className="w-3 h-3" />
                              <span>{trend}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {recentSearches.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                          <span className="text-[var(--theme-text-tertiary)] flex items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5" /> Recent:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {recentSearches.map((s, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSearchQuery(s);
                                  addRecentSearch(s);
                                  const exact = CAREER_ROADMAPS.find(c => c.title.toLowerCase() === s.toLowerCase());
                                  if (exact) setSelectedCareer(exact);
                                }}
                                className="px-2.5 py-0.5 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-md text-[10px] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:border-purple-500/20 transition cursor-pointer"
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                setRecentSearches([]);
                                localStorage.removeItem("premium_roadmap_recent_searches");
                              }}
                              className="text-[9px] text-red-400 hover:underline pl-1 cursor-pointer font-bold"
                            >
                              Clear History
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!selectedCareer ? (
                    /* CATALOG VIEW */
                    isLoadingCatalog ? (
                      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-6 h-[380px] flex flex-col justify-between"
                          >
                            <div className="space-y-5">
                              <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--theme-border)] premium-skeleton" />
                                <div className="w-24 h-6 rounded-full bg-[var(--theme-border)] premium-skeleton" />
                              </div>
                              <div className="w-3/4 h-6 rounded-md bg-[var(--theme-border)] premium-skeleton" />
                              <div className="space-y-2">
                                <div className="w-full h-4 rounded bg-[var(--theme-border)] premium-skeleton" />
                                <div className="w-5/6 h-4 rounded bg-[var(--theme-border)] premium-skeleton" />
                              </div>
                            </div>
                            <div className="w-full h-11 rounded-xl bg-[var(--theme-border)] premium-skeleton" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(() => {
                          const filteredCareers = CAREER_ROADMAPS.filter(
                            (c) =>
                              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              c.description.toLowerCase().includes(searchQuery.toLowerCase())
                          );

                          if (filteredCareers.length === 0) {
                            return (
                              <div className="col-span-full clay-card p-16 text-center flex flex-col items-center justify-center space-y-4">
                                <AlertCircle className="w-12 h-12 text-[var(--theme-text-tertiary)] animate-pulse" />
                                <h3 className="text-base font-bold text-[var(--theme-text-primary)] font-mono uppercase tracking-wider">
                                  No Career Tracks Found
                                </h3>
                                <p className="text-xs text-[var(--theme-text-secondary)] max-w-sm font-sans font-medium">
                                  Try typing in direct keywords like "SDE", "Java", "Python", "Data", "Cyber", or "DevOps".
                                </p>
                              </div>
                            );
                          }

                          return filteredCareers.map((career, idx) => {
                            const completedList = completedCareerMilestones[career.id] || [];
                            const total = career.milestones.length;
                            const progressPercent = total > 0 ? Math.round((completedList.length / total) * 100) : 0;

                            return (
                              <motion.div
                                key={career.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.04 }}
                                whileHover={{
                                  y: -5,
                                  boxShadow: "var(--theme-card-shadow)",
                                  borderColor: "rgba(168, 85, 247, 0.25)"
                                }}
                                className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-6 flex flex-col justify-between h-[380px] premium-transition relative group"
                              >
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--theme-accent-soft)] border border-purple-500/10 text-[var(--theme-accent)]">
                                      {renderCareerIcon(career.icon)}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                      <span className="text-[10px] font-mono text-[var(--theme-accent)] bg-[var(--theme-accent-soft)] border border-purple-500/15 px-2.5 py-0.5 rounded-full font-bold">
                                        {career.demandScore}% Demand
                                      </span>
                                      {completedList.length > 0 && (
                                        <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full font-bold">
                                          Active
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="text-base font-extrabold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors duration-200 font-sans">
                                      {career.title}
                                    </h3>
                                    <p className="text-xs text-[var(--theme-text-secondary)] mt-2 line-clamp-2 font-sans leading-relaxed font-medium">
                                      {career.description}
                                    </p>
                                  </div>

                                  <div className="space-y-2 border-t border-[var(--theme-border)] pt-4 text-xs font-mono font-bold">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider">Est. Salary</span>
                                      <span className="text-emerald-500">{career.salaryLPA}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider">Est. Duration</span>
                                      <span className="text-blue-400">{career.durationMonths} Months</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider">Phases</span>
                                      <span className="text-[var(--theme-text-primary)]">{career.milestones.length} Stages</span>
                                    </div>
                                  </div>

                                  {completedList.length > 0 ? (
                                    <div className="space-y-1 pt-1">
                                      <div className="flex justify-between text-[9px] font-mono text-[var(--theme-text-secondary)] font-bold">
                                        <span>Pathway Completed</span>
                                        <span>{progressPercent}%</span>
                                      </div>
                                      <div className="w-full h-1 bg-[var(--theme-border)] rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                                          style={{ width: `${progressPercent}%` }}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="pt-2 flex justify-between items-center">
                                      <span className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold">Top Hiring Entities</span>
                                      <div className="flex -space-x-1.5 overflow-hidden">
                                        {career.hiringCompanies.slice(0, 4).map((company, i) => {
                                          const initials = company.split(" ").map(w => w[0]).join("").slice(0, 2);
                                          const colors = [
                                            "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                            "bg-purple-500/10 text-purple-400 border-purple-500/20",
                                            "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                          ];
                                          return (
                                            <div
                                              key={i}
                                              className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-mono font-black ${colors[i % colors.length]} bg-[var(--theme-bg-card)]`}
                                              title={company}
                                            >
                                              {initials}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => {
                                    addRecentSearch(career.title);
                                    setSelectedCareer(career);
                                  }}
                                  className="w-full mt-4 py-2.5 bg-[var(--theme-accent-soft)] hover:bg-[var(--theme-accent)] text-[var(--theme-accent)] hover:text-white border border-[var(--theme-accent)]/15 text-xs font-bold rounded-xl transition duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-purple-500/10 cursor-pointer"
                                >
                                  <span>View Roadmap</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                                </button>
                              </motion.div>
                            );
                          });
                        })()}
                      </div>
                    )
                  ) : (
                    /* DEDICATED SYLLABUS TIMELINE */
                    <div className="px-8 space-y-8">
                      <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-8 space-y-6 shadow-[var(--theme-card-shadow)]">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => setSelectedCareer(null)}
                            className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border)] bg-[var(--theme-inner-input)] px-4 py-2 rounded-xl transition duration-200 shadow-sm cursor-pointer font-bold"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Directory</span>
                          </button>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-t border-[var(--theme-border)] pt-6">
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-[var(--theme-accent)] uppercase tracking-widest bg-[var(--theme-accent-soft)] px-2.5 py-0.5 rounded-full font-black">
                              Verified Learning Pathway
                            </span>
                            <h2 className="text-2xl font-black text-[var(--theme-text-primary)] font-sans">{selectedCareer.title}</h2>
                            <p className="text-xs text-[var(--theme-text-secondary)] font-sans max-w-2xl leading-relaxed font-medium">
                              {selectedCareer.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0 font-mono font-bold">
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] uppercase tracking-wider">Avg Salary</span>
                              <span className="text-xs text-emerald-500">{selectedCareer.salaryLPA}</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] uppercase tracking-wider">Duration</span>
                              <span className="text-xs text-blue-400">{selectedCareer.durationMonths} Months</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] uppercase tracking-wider">Demand</span>
                              <span className="text-xs text-purple-400">{selectedCareer.demandScore}/100</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] uppercase tracking-wider">Postings</span>
                              <span className="text-xs text-amber-500">
                                {selectedCareer.id.includes("sde") ? "4,820+" : selectedCareer.id.includes("ai") ? "1,240+" : "2,500+"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[var(--theme-border)] pt-4 text-xs font-sans text-[var(--theme-text-secondary)]">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[var(--theme-text-tertiary)]">Hiring Entities:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedCareer.hiringCompanies.map((c, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[9px] font-mono text-[var(--theme-text-secondary)] rounded-md font-bold"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Syllabus progress percentage */}
                        {(() => {
                          const completedList = completedCareerMilestones[selectedCareer.id] || [];
                          const total = selectedCareer.milestones.length;
                          const percentage = total > 0 ? Math.round((completedList.length / total) * 100) : 0;

                          return (
                            <div className="border-t border-[var(--theme-border)] pt-6 space-y-3">
                              <div className="flex justify-between items-center text-xs font-mono font-bold">
                                <span className="text-[var(--theme-text-secondary)]">Pathway Completion progress</span>
                                <span className="text-[var(--theme-accent)]">{percentage}% Done ({completedList.length}/{total} Stages)</span>
                              </div>
                              <div className="w-full h-2.5 bg-[var(--theme-inner-input)] rounded-full overflow-hidden border border-[var(--theme-border)] p-[1px]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Timeline */}
                      <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-8 space-y-8 shadow-[var(--theme-card-shadow)]">
                        <h3 className="text-xs font-mono text-[var(--theme-text-tertiary)] uppercase tracking-widest font-black">
                          Sequential Milestone Syllabus
                        </h3>

                        {loadingProgress ? (
                          <div className="py-16 flex flex-col items-center justify-center space-y-2">
                            <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold">Synchronizing client states...</span>
                          </div>
                        ) : (
                          <div className="relative pl-6 sm:pl-10">
                            {/* Track lines */}
                            <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-[var(--theme-border)] z-0" />
                            
                            {(() => {
                              const completedList = completedCareerMilestones[selectedCareer.id] || [];
                              const total = selectedCareer.milestones.length;
                              const fraction = total > 1 ? completedList.length / (total - 1) : 0;
                              const cappedFraction = Math.min(1, fraction);
                              return (
                                <div
                                  className="absolute left-[11px] sm:left-[19px] top-4 w-[2px] bg-gradient-to-b from-purple-500 to-indigo-500 z-10 transition-all duration-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
                                  style={{ height: `${cappedFraction * 90}%` }}
                                />
                              );
                            })()}

                            <div className="space-y-10">
                              {selectedCareer.milestones.map((m, idx) => {
                                const completedList = completedCareerMilestones[selectedCareer.id] || [];
                                const isCompleted = completedList.includes(idx);
                                const isUnlocked = idx === 0 || completedList.includes(idx - 1);
                                
                                const currentActiveIdx = selectedCareer.milestones.findIndex((_, i) => !completedList.includes(i));
                                const isCurrent = idx === currentActiveIdx;

                                const isExpanded = expandedMilestones[idx] || false;

                                return (
                                  <div key={idx} className="relative z-20">
                                    {/* Icon circle */}
                                    <div
                                      className={`absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center top-1 left-[-21px] sm:left-[-35px] z-30 border transition-all duration-300 ${
                                        isCompleted
                                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-[var(--theme-bg-card)]"
                                          : isCurrent
                                          ? "bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] animate-pulse bg-[var(--theme-bg-card)]"
                                          : "bg-[var(--theme-inner-input)] border-[var(--theme-border)] text-[var(--theme-text-tertiary)]"
                                      }`}
                                    >
                                      <span className="text-[10px] sm:text-xs font-mono font-black">
                                        {isCompleted ? "✓" : idx + 1}
                                      </span>
                                    </div>

                                    {/* Syllabus Detail Card */}
                                    <div
                                      className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-[var(--theme-bg-card)] ${
                                        isCompleted
                                          ? "border-emerald-500/15 bg-emerald-500/[0.01]"
                                          : isCurrent
                                          ? "border-purple-500/30 shadow-md shadow-purple-500/5 bg-purple-500/[0.01]"
                                          : !isUnlocked
                                          ? "opacity-40 border-[var(--theme-border)] pointer-events-none select-none bg-slate-500/[0.01]"
                                          : "border-[var(--theme-border)]"
                                      }`}
                                    >
                                      <div
                                        onClick={() => {
                                          if (isUnlocked) {
                                            setExpandedMilestones((prev) => ({
                                              ...prev,
                                              [idx]: !prev[idx]
                                            }));
                                          }
                                        }}
                                        className="p-5 flex justify-between items-center cursor-pointer select-none gap-4"
                                      >
                                        <div className="space-y-1">
                                          <div className="flex items-center gap-2.5">
                                            <h4 className="font-extrabold text-sm sm:text-base text-[var(--theme-text-primary)] font-sans">
                                              {m.milestoneTitle}
                                            </h4>
                                            {!isUnlocked ? (
                                              <span className="flex items-center gap-1 text-[8px] font-mono uppercase bg-slate-800/40 text-slate-500 px-2 py-0.5 rounded border border-white/5 font-semibold">
                                                <Lock className="w-2.5 h-2.5" /> Locked
                                              </span>
                                            ) : isCurrent ? (
                                              <span className="text-[8px] font-mono uppercase bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded border border-purple-500/15 font-semibold">
                                                Active
                                              </span>
                                            ) : null}
                                          </div>

                                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-[var(--theme-text-tertiary)] font-bold">
                                            <span className="text-[var(--theme-accent)]">{m.duration}</span>
                                            <span>Complexity: {m.difficulty}</span>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-3 shrink-0">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isUnlocked) {
                                                handleToggleMilestone(selectedCareer.id, idx);
                                              }
                                            }}
                                            className={`px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-wider border rounded-xl transition duration-200 font-black cursor-pointer ${
                                              isCompleted
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                                                : "bg-[var(--theme-inner-input)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]"
                                            }`}
                                          >
                                            {isCompleted ? "Completed ✓" : "Mark Done"}
                                          </button>
                                          <ChevronDown className={`w-4 h-4 text-[var(--theme-text-tertiary)] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                        </div>
                                      </div>

                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          transition={{ duration: 0.25 }}
                                          className="border-t border-[var(--theme-border)] p-5 space-y-5 text-xs text-[var(--theme-text-secondary)] bg-[var(--theme-inner-input)]/30 font-sans font-medium"
                                        >
                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-black mb-1.5">
                                              Milestone Briefing
                                            </h5>
                                            <p className="leading-relaxed text-[var(--theme-text-secondary)] text-xs">
                                              {m.description}
                                            </p>
                                          </div>

                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-black mb-1.5">
                                              Key Capabilities Acquired
                                            </h5>
                                            <div className="flex flex-wrap gap-1.5">
                                              {m.skillsToLearn.map((skill, sIdx) => (
                                                <span
                                                  key={sIdx}
                                                  className="px-2 py-0.5 bg-[var(--theme-accent-soft)] border border-[var(--theme-accent)]/15 text-[var(--theme-accent)] rounded-lg text-[10px] font-mono font-bold"
                                                >
                                                  {skill}
                                                </span>
                                              ))}
                                            </div>
                                          </div>

                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-black mb-1.5">
                                              Self-Assessment Problems
                                            </h5>
                                            <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-[var(--theme-text-secondary)]">
                                              {m.practiceQuestions.map((q, qIdx) => (
                                                <li key={qIdx}>{q}</li>
                                              ))}
                                            </ul>
                                          </div>

                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-black mb-1.5">
                                              Curated Reference Guides
                                            </h5>
                                            <div className="flex flex-wrap gap-2">
                                              {m.recommendedResources.map((res, rIdx) => {
                                                const searchUrl = res.startsWith("http")
                                                  ? res
                                                  : `https://www.google.com/search?q=${encodeURIComponent(res)}`;
                                                return (
                                                  <a
                                                    key={rIdx}
                                                    href={searchUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-3 py-1 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 rounded-xl text-[10px] font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition duration-200 cursor-pointer font-bold"
                                                  >
                                                    {res} ↗
                                                  </a>
                                                );
                                              })}
                                            </div>
                                          </div>

                                          {m.practicalProject && (
                                            <div className="p-4 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl space-y-2">
                                              <span className="text-[8px] font-mono text-[var(--theme-accent)] uppercase tracking-widest block font-black">
                                                Practical Capstone Assignment
                                              </span>
                                              <h4 className="text-xs font-extrabold text-[var(--theme-text-primary)]">
                                                {m.practicalProject.title}
                                              </h4>
                                              <p className="text-[11px] text-[var(--theme-text-secondary)] leading-relaxed font-sans mt-0.5">
                                                {m.practicalProject.description}
                                              </p>
                                            </div>
                                          )}
                                        </motion.div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}`
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  {/* Floating AI Coach Panel */}
                  <div className="fixed bottom-6 right-6 z-50">
                    <button
                      onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 duration-200 transition-all shadow-purple-500/20 cursor-pointer"
                      title="Consult AI Career Mentor"
                    >
                      {isAiMentorOpen ? <X className="w-5 h-5" /> : <SparklesIcon className="w-6 h-6 animate-pulse" />}
                    </button>

                    {isAiMentorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 h-[450px] bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border-b border-[var(--theme-border)] flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-bold flex items-center gap-1.5">
                              <SparklesIcon className="w-3.5 h-3.5" />
                              <span>AI Career Mentor</span>
                            </h4>
                            <p className="text-[10px] text-[var(--theme-text-secondary)] font-sans font-medium">Ask me about resource materials or exam strategies</p>
                          </div>
                          <button
                            onClick={() => setIsAiMentorOpen(false)}
                            className="text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)] transition cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-xs custom-scrollbar">
                          {aiMentorMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                                  msg.sender === "user"
                                    ? "bg-purple-600 text-white rounded-tr-none font-sans font-semibold"
                                    : "bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] rounded-tl-none font-sans font-semibold"
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                          {isAiMentorTyping && (
                            <div className="flex justify-start animate-pulse">
                              <div className="bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[var(--theme-text-tertiary)] rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce [animation-delay:0.4s]" />
                              </div>
                            </div>
                          )}
                        </div>

                        <form onSubmit={handleSendAiMentorMessage} className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-inner-input)] flex items-center gap-2">
                          <input
                            type="text"
                            value={aiMentorInput}
                            onChange={(e) => setAiMentorInput(e.target.value)}
                            placeholder="Ask about exam materials, target jobs..."
                            className="flex-grow bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-xl px-3 py-2 text-[11px] text-[var(--theme-text-primary)] focus:outline-none focus:border-purple-500/40"
                          />
                          <button
                            type="submit"
                            disabled={isAiMentorTyping || !aiMentorInput.trim()}
                            className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-xl transition duration-150 cursor-pointer"
                          >
                            Send
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}

            {/* Tab: AI Interview Lab */}
            {activeTab === "interview" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black">AI Interview Simulator</h1>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                    Conduct technical and behavioral interview simulations generated dynamically from your work history and profile skills.
                  </p>
                </div>

                {interviewQuestions.length === 0 ? (
                  <div className="p-8 clay-card flex flex-col items-center justify-center text-center max-w-xl mx-auto my-6">
                    <MessageSquare className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-4 animate-pulse" />
                    <h2 className="text-lg font-extrabold tracking-tight">Initialize Mock Session</h2>
                    <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mt-1.5 leading-relaxed font-medium">
                      Specialized AI interviewers will assemble 3 tailored interview questions targeting your parsed resume skills.
                    </p>
                    <button
                      onClick={handleStartInterview}
                      disabled={generatingQuestions}
                      className="mt-6 px-6 py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md"
                    >
                      {generatingQuestions ? "Agents Preparing Questions..." : "Begin Mock Session"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Active Question */}
                    <div className="lg:col-span-2 p-6 clay-card flex flex-col justify-between space-y-6 min-h-[420px]">
                      {currentQuestionIndex < interviewQuestions.length ? (
                        <div className="space-y-6 flex-grow flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-mono font-bold">
                              <span className="text-indigo-600 dark:text-indigo-400">
                                Question {currentQuestionIndex + 1} of {interviewQuestions.length}
                              </span>
                              <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] text-indigo-600 dark:text-indigo-400 font-black uppercase">
                                {interviewQuestions[currentQuestionIndex].category}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-text-primary)] leading-snug">
                              {interviewQuestions[currentQuestionIndex].question}
                            </h3>
                          </div>

                          <form onSubmit={handleSubmitInterviewAnswer} className="space-y-4">
                            <div>
                              <label className="block text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2 font-bold">
                                Your Response
                              </label>
                              <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your response here. Try to structure your answer using the STAR method (Situation, Task, Action, Result)..."
                                rows={6}
                                required
                                disabled={evaluatingAnswer || !!currentEvaluation}
                                className="w-full clay-input px-4 py-3.5 text-xs focus:outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] leading-relaxed font-medium resize-none min-h-[140px]"
                              />
                            </div>

                            {!currentEvaluation ? (
                              <button
                                type="submit"
                                disabled={evaluatingAnswer || !userAnswer.trim()}
                                className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md"
                              >
                                {evaluatingAnswer ? (
                                  "Evaluation Agent assessing answer..."
                                ) : (
                                  <>
                                    <Send className="w-4 h-4 mr-1.5" />
                                    <span>Submit Response</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <div className="flex justify-between items-center gap-4">
                                {currentQuestionIndex + 1 < interviewQuestions.length ? (
                                  <button
                                    type="button"
                                    onClick={handleNextQuestion}
                                    className="w-full py-3.5 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-primary)]"
                                  >
                                    Next Question &rarr;
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCurrentQuestionIndex((prev) => prev + 1);
                                    }}
                                    className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white"
                                  >
                                    View Session Report Card
                                  </button>
                                )}
                              </div>
                            )}
                          </form>
                        </div>
                      ) : (
                        /* Session completed */
                        <div className="space-y-6 text-center py-8 flex-grow flex flex-col justify-center">
                          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full w-fit mx-auto animate-bounce">
                            <ShieldCheck className="w-12 h-12" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-[var(--color-text-primary)]">Session Completed</h3>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 max-w-sm mx-auto leading-relaxed font-medium">
                              Your interview responses have been analyzed. Here is your overall session performance metric:
                            </p>
                          </div>

                          <div className="text-center my-4">
                            <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                              <CountUpText to={getInterviewOverallScore()} suffix="%" />
                            </span>
                            <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-widest block mt-2 font-bold">Average Evaluation Rating</span>
                          </div>

                          <button
                            onClick={handleStartInterview}
                            className="clay-btn clay-btn-secondary px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-primary)] mx-auto shadow-sm"
                          >
                            Restart Mock Session
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Feedback */}
                    <div className="p-6 clay-card flex flex-col justify-between min-h-[420px]">
                      {evaluatingAnswer ? (
                        <div className="flex-grow flex flex-col items-center justify-center space-y-3 text-center">
                          <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                          <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                            Evaluating depth and vocabulary...
                          </span>
                        </div>
                      ) : currentEvaluation ? (
                        <div className="space-y-4 flex-grow flex flex-col justify-between">
                          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                            <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                              Agent Feedback Report
                            </h3>
                            <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-black rounded-lg">
                              <CountUpText to={currentEvaluation.score} suffix="% Score" />
                            </span>
                          </div>

                          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            <div>
                              <h4 className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 font-bold">
                                Evaluation Feedback
                              </h4>
                              <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans leading-relaxed">
                                {currentEvaluation.feedback}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1.5 font-bold">
                                Addressed Expected Points
                              </h4>
                              <div className="space-y-1.5">
                                {currentEvaluation.expectedPointsMatched?.map((pt: string, i: number) => (
                                  <div key={i} className="flex items-center space-x-2 text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                                    <span>{pt}</span>
                                  </div>
                                ))}
                                {(!currentEvaluation.expectedPointsMatched || currentEvaluation.expectedPointsMatched.length === 0) && (
                                  <span className="text-[10px] text-[var(--color-text-tertiary)] italic">No expected metrics covered.</span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1.5 font-bold">
                                Recommendations
                              </h4>
                              <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)] font-sans font-medium">
                                {currentEvaluation.suggestions?.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start space-x-1.5">
                                    <span className="text-amber-500 mt-0.5 font-bold">&bull;</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                          <HelpCircle className="w-10 h-10 text-[var(--color-text-tertiary)] mb-3" />
                          <h3 className="text-sm font-bold text-[var(--color-text-secondary)]">Response Analysis</h3>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs font-medium font-sans leading-relaxed">
                            Complete and submit your question response to display grading and constructive feedback.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Tab: Hiring Predictor */}
            {activeTab === "probability" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black">Hiring Predictor</h1>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                    Calculate career metrics, predict the probability of success for specific roles, and highlight optimizations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Form */}
                  <form onSubmit={handlePredictHiringProbability} className="p-6 clay-card h-fit space-y-5">
                    <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                      Specify Application Details
                    </h2>

                    <div>
                      <label className="block text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2 font-bold">
                        Target Job Title
                      </label>
                      <input
                        type="text"
                        value={probJobTitle}
                        onChange={(e) => setProbJobTitle(e.target.value)}
                        placeholder="e.g. Senior Backend Engineer"
                        required
                        className="w-full clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2 font-bold">
                        Target Company Name
                      </label>
                      <input
                        type="text"
                        value={probCompany}
                        onChange={(e) => setProbCompany(e.target.value)}
                        placeholder="e.g. Stripe, Netflix"
                        required
                        className="w-full clay-input px-4 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={predictingProb}
                      className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md"
                    >
                      {predictingProb ? "Consulting Predictors..." : "Predict Hiring Odds"}
                    </button>
                  </form>

                  {/* Results */}
                  <div className="lg:col-span-2 p-6 clay-card min-h-[400px] flex flex-col justify-between">
                    {predictingProb ? (
                      <div className="flex-grow flex flex-col items-center justify-center space-y-3 text-center">
                        <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                          Analyzing profile strengths...
                        </span>
                      </div>
                    ) : hiringProbability ? (
                      <div className="space-y-6 flex-grow flex flex-col justify-between">
                        <div className="flex items-center space-x-6 border-b border-[var(--color-border)] pb-5">
                          <CircularScoreGauge score={hiringProbability.probabilityScore} size={96} strokeWidth={8} colorClass="stroke-purple-600" />
                          <div>
                            <h3 className="text-base font-extrabold text-[var(--color-text-primary)]">Hiring Probability</h3>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-1 font-bold">
                              {hiringProbability.jobTitle} &bull; {hiringProbability.company}
                            </p>
                            <p className="text-[10px] text-[var(--color-text-tertiary)] mt-2 leading-relaxed font-sans font-medium">
                              Probability model simulated based on background align, missing skills, and tech depth compared against target firm indices.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
                              Core Assets / Strengths
                            </h4>
                            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-sans font-medium">
                              {hiringProbability.strengths?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[10px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider font-bold">
                              Identified Gaps / Weaknesses
                            </h4>
                            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-sans font-medium">
                              {hiringProbability.weaknesses?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <XCircle className="w-4.5 h-4.5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {hiringProbability.suggestions && hiringProbability.suggestions.length > 0 && (
                          <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 text-xs text-[var(--color-text-secondary)] rounded-2xl leading-relaxed font-sans font-medium shadow-inner">
                            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block mb-1">Strategist Tips to Maximize Odds:</span>
                            <ul className="space-y-1.5 list-disc pl-4">
                              {hiringProbability.suggestions.map((sug: string, i: number) => (
                                <li key={i}>{sug}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                        <Award className="w-10 h-10 text-[var(--color-text-tertiary)] mb-3" />
                        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] font-mono uppercase tracking-wider">Simulator Offline</h3>
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5 max-w-xs font-medium font-sans leading-relaxed">
                          Input your application details in the sidebar form to check predictive statistics and gap remedies.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
