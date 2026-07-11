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
  colorClass = "stroke-blue-500",
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
      initial={{ opacity: 0, scale: 0.8 }}
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
          className="stroke-white/5 fill-none"
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
        <span className="text-3xl font-black text-slate-100 font-sans">
          {currentScore}{suffix}
        </span>
        {showMaxScore && (
          <span className="text-[9px] text-slate-500 font-mono uppercase">
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
  const props = { className: "w-5 h-5 text-purple-400" };
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
}

export default function DashboardPage({ 
  user, 
  resume: initialResume, 
  onNavigate, 
  onLogout,
  onUpdateUser,
  onResetResume
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
  const [oppsViewMode, setOppsViewMode] = useState<"matched" | "all">("matched");

  // Career Path Roadmaps state
  const [careerRoadmaps, setCareerRoadmaps] = useState<any[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);
  const [loadingRoadmaps, setLoadingRoadmaps] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [targetPathInput, setTargetPathInput] = useState("");

  // Career Roadmap Builder Redesign states
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [completedCareerMilestones, setCompletedCareerMilestones] = useState<{ [careerId: string]: number[] }>({});
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [expandedMilestones, setExpandedMilestones] = useState<{ [milestoneIdx: number]: boolean }>({});

  const [isLocalLightMode, setIsLocalLightMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("premium_roadmap_theme") === "light";
    } catch {
      return false;
    }
  });

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
      // Uncheck dependent subsequent milestones for strict locking
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

  const [completedMilestones, setCompletedMilestones] = useState<{ [roadmapId: string]: { [milestoneIdx: number]: boolean } }>(() => {
    try {
      const saved = localStorage.getItem("milestone_checks");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

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

  const handleGenerateCareerRoadmap = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!resume || !user) return;
    setGeneratingRoadmap(true);
    setError(null);
    try {
      const res = await ApiService.generateCareerRoadmap(
        resume.id,
        targetPathInput,
        user.uid
      );
      setCareerRoadmaps((prev) => [res, ...prev]);
      setSelectedRoadmap(res);
      setTargetPathInput("");
    } catch (err: any) {
      console.error("Failed to generate career path roadmap:", err);
      setError("Failed to generate career path roadmap: " + err.message);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const toggleMilestoneCheck = (roadmapId: string, idx: number) => {
    setCompletedMilestones((prev) => {
      const roadmapChecks = prev[roadmapId] || {};
      const updated = {
        ...prev,
        [roadmapId]: {
          ...roadmapChecks,
          [idx]: !roadmapChecks[idx]
        }
      };
      // Persist in localStorage for ease
      localStorage.setItem("milestone_checks", JSON.stringify(updated));
      return updated;
    });
  };

  // Fetch initial profile resumes on mount
  useEffect(() => {
    // If we came with a freshly uploaded resume, trigger quality analysis automatically
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
        // If empty, auto calculate once to provide instant delight
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

  // ATS Match scan
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

  // Job matching scan
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

  // Skill gap scan
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

  // Interview Questions load
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

  // Interview evaluation submit
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

  // Next Interview Question
  const handleNextQuestion = () => {
    setUserAnswer("");
    setCurrentEvaluation(null);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Hiring Probability Predictor
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
    <div className="min-h-screen bg-[#0f1016] text-slate-100 flex flex-col md:flex-row font-sans selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      {/* Background glow spots */}
      <div className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Left Navigation Rail */}
      <aside className="w-full md:w-64 bg-white/[0.01] border-r border-white/10 backdrop-blur-2xl flex flex-col justify-between shrink-0 relative z-10">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                SkillBridge
              </span>
              <span className="px-1.5 py-0.5 text-[8px] bg-white/10 border border-white/10 text-slate-300 rounded font-mono font-bold">
                AI
              </span>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-white/10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-sm text-white font-mono shadow-md">
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate text-slate-200">
                {user.displayName || "Career Professional"}
              </p>
              <p className="text-[10px] font-mono text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => {
                setActiveTab("overview");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "overview"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Career Board</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("ats");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "ats"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ATS Optimiser</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("jobs");
                setError(null);
                if (resume && jobMatches.length === 0) {
                  handleJobMatching();
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "jobs"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Job Matcher</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("roadmap");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "roadmap"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Skill Gaps</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("career-roadmap");
                setError(null);
                if (resume && careerRoadmaps.length === 0) {
                  fetchCareerRoadmaps();
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "career-roadmap"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Career Roadmap</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("interview");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "interview"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Interview Lab</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("probability");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "probability"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Hiring Predictor</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setError(null);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition duration-200 ${
                activeTab === "settings"
                  ? "bg-white/10 border border-white/15 text-blue-400 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-mono tracking-wider uppercase text-slate-500 hover:text-white transition duration-200 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        {/* Universal Alert Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl flex items-start space-x-2 text-xs">
            <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Settings page can be accessed regardless of resume presence */}
        {activeTab === "settings" ? (
          <ProfileSettingsPage
            user={user}
            onUpdateUser={onUpdateUser}
            onResetResume={onResetResume}
            onNavigateBack={() => setActiveTab("overview")}
          />
        ) : !resume ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8 neomorph-card max-w-xl mx-auto my-12 relative z-10">
            <div className="p-4 neomorph-inset-input text-blue-400 mb-4">
              <FileText className="w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">No Active Resume Loaded</h2>
            <p className="text-sm text-slate-400 max-w-md mt-2 font-sans leading-relaxed">
              Before exploring multi-agent career tools, you must parse your current profile resume. Our algorithms will map out matching paths, learning roadmaps, and mock evaluation.
            </p>
            <button
              onClick={() => onNavigate("upload")}
              className="mt-6 px-6 py-3 neomorph-button-primary text-xs font-mono tracking-wider uppercase font-bold text-white"
            >
              Parse Profile Resume
            </button>
          </div>
        ) : (
          /* ACTIVE TABS SCREEN PANEL */
          <div className="space-y-8 animate-fade-in relative z-10">
            {/* Overview dashboard */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Board header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
                      <span>Career Board</span>
                      <span className="text-xs px-2 py-0.5 bg-white/10 border border-white/10 text-slate-300 rounded font-mono font-medium lowercase">
                        online
                      </span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Resume parsed: <span className="font-mono text-slate-300 font-semibold">{resume.fileName}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate("upload")}
                    className="px-4 py-2 neomorph-button text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white"
                  >
                    Replace Resume
                  </button>
                </div>

                {/* Score & Extracted Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quality circle gauge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 neomorph-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                          Resume Score
                        </h2>
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-sans mt-0.5 leading-relaxed">
                        Evaluated by Cognitive Quality Agent based on formatting, depth, and syntax guidelines.
                      </p>
                    </div>

                    <div className="my-6 flex flex-col items-center justify-center">
                      {analyzingQuality ? (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                            Analyzing...
                          </span>
                        </div>
                      ) : qualityAnalysis ? (
                        <CircularScoreGauge score={qualityAnalysis.qualityScore} colorClass="stroke-blue-500" />
                      ) : (
                        <button
                          onClick={triggerQualityAnalysis}
                          className="px-4 py-2 bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl"
                        >
                          Trigger Quality Review
                        </button>
                      )}
                    </div>

                    <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500">Suggested Enhancements:</span>
                      <span className="text-slate-300 font-bold">
                        {qualityAnalysis?.improvements?.length || 0}
                      </span>
                    </div>
                  </motion.div>

                  {/* Summary & Core Profile */}
                  <div className="lg:col-span-2 p-6 neomorph-card flex flex-col justify-between">
                    <div>
                      <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Synthesized Profile
                      </h2>
                      <h3 className="text-lg font-black text-slate-100">
                        {resume.parsedData?.name || "Career Professional"}
                      </h3>
                      {resume.parsedData?.summary ? (
                        <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans line-clamp-4">
                          {resume.parsedData.summary}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-slate-500 italic font-sans">
                          No professional summary extracted. Click 'Trigger Quality Review' to analyze improvements.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                        Identified Tech Stack / Skills
                      </h4>
                      <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                        {resume.parsedData?.skills && resume.parsedData.skills.length > 0 ? (
                          resume.parsedData.skills.map((skill: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-slate-300"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500 font-sans italic">
                            No structured skills extracted.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extracted Work History & Suggestions Split Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {/* Quality Coach Feedback */}
                  <div className="p-6 neomorph-card space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span>AI Quality Analysis</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        Real-time Evaluation
                      </span>
                    </div>

                    {qualityAnalysis ? (
                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {/* Recruiter Verdict */}
                        <div className="bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-purple-500/10 rounded-2xl p-4">
                          <span className="text-[9px] font-mono text-purple-400 uppercase block font-bold mb-1">
                            Final Recruiter Verdict
                          </span>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
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
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 space-y-2.5">
                              <span className="text-[9px] font-mono text-blue-400 uppercase block font-bold">
                                ATS Score Breakdown
                              </span>
                              <div className="space-y-1.5 text-[11px]">
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
                                  <div key={idx} className="flex justify-between items-center text-slate-300 font-sans">
                                    <span className="shrink-0">{b.name}</span>
                                    <div className="flex-grow border-b border-dotted border-white/10 mx-2 translate-y-1.5" />
                                    <span className="font-mono text-slate-400 shrink-0">{b.val}/{b.max}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* What's Excellent */}
                        {(() => {
                          const strengths = qualityAnalysis.strengths || [
                            "ATS-friendly layout template structure",
                            "Strong core developer skill metrics matching target roles"
                          ];
                          return (
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[9px] font-mono text-emerald-400 uppercase block font-bold">
                                What's Excellent ✅
                              </span>
                              <ul className="space-y-1 text-[11px] text-slate-300 font-sans">
                                {strengths.map((str: string, i: number) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                    <span>{str}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })()}

                        {/* Areas for Improvement */}
                        {(() => {
                          const improvements = qualityAnalysis.improvements || [
                            { text: "Incorporate more quantified metrics in project details", impact: 2 }
                          ];
                          return (
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[9px] font-mono text-amber-400 uppercase block font-bold">
                                Areas for Improvement ⚠️
                              </span>
                              <div className="space-y-1.5">
                                {improvements.map((imp: any, i: number) => (
                                  <div key={i} className="flex items-start justify-between bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-[11px] leading-relaxed gap-2.5">
                                    <span className="text-slate-300 font-sans">{imp.text || imp}</span>
                                    {imp.impact && (
                                      <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/15 text-amber-400 text-[8px] font-mono rounded font-bold shrink-0">
                                        +{imp.impact}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Company ATS Compatibility */}
                        {(() => {
                          const comp = qualityAnalysis.companyCompatibility || {
                            tcsInfosysWipro: "90+/100",
                            accentureCapgemini: "88+/100",
                            deloitte: "87-90/100",
                            productCompanies: "82–87/100",
                            amazon: "80–85/100",
                            microsoft: "78–83/100",
                            google: "75–80/100"
                          };
                          return (
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 space-y-2">
                              <span className="text-[9px] font-mono text-purple-400 uppercase block font-bold">
                                Company ATS Compatibility
                              </span>
                              <div className="space-y-1.5 text-[11px]">
                                {[
                                  { name: "TCS / Infosys / Wipro", val: comp.tcsInfosysWipro },
                                  { name: "Accenture / Capgemini", val: comp.accentureCapgemini },
                                  { name: "Deloitte", val: comp.deloitte },
                                  { name: "Product Companies", val: comp.productCompanies },
                                  { name: "Amazon", val: comp.amazon },
                                  { name: "Microsoft", val: comp.microsoft },
                                  { name: "Google", val: comp.google }
                                ].map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-slate-300 font-sans">
                                    <span className="shrink-0">{item.name}</span>
                                    <div className="flex-grow border-b border-dotted border-white/10 mx-2 translate-y-1.5" />
                                    <span className="font-mono text-slate-400 shrink-0">{item.val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Critical Missing Skills */}
                        {qualityAnalysis.missingSkills && qualityAnalysis.missingSkills.length > 0 && (
                          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-3.5 space-y-2">
                            <span className="text-[9px] font-mono text-blue-400 uppercase block font-bold">
                              Critical Missing Skills
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {qualityAnalysis.missingSkills.map((skill: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-1.5 py-0.5 bg-red-950/20 border border-red-500/10 text-red-300 rounded text-[9px] font-mono"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-48 flex flex-col items-center justify-center text-center">
                        <p className="text-xs text-slate-500 font-sans">
                          Complete quality evaluation to unlock deep roadmap checks.
                        </p>
                        <button
                          onClick={triggerQualityAnalysis}
                          className="mt-3 px-4 py-1.5 bg-white/10 border border-white/10 text-xs font-mono text-slate-300 rounded-lg hover:text-white"
                        >
                          Trigger Analysis
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Work Experience Timeline */}
                  <div className="p-6 neomorph-card space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span>Work History Timeline</span>
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        Parsed Records
                      </span>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                      {resume.parsedData?.experience && resume.parsedData.experience.length > 0 ? (
                        resume.parsedData.experience.map((exp: any, idx: number) => (
                          <div key={idx} className="relative pl-4 border-l border-white/10 pb-2">
                            <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-500/50 border border-[#020204] top-1.5 left-[-5px]" />
                            <div className="flex justify-between items-start text-xs">
                              <h4 className="font-bold text-slate-200">{exp.role}</h4>
                              <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                {exp.duration}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-semibold">{exp.company}</p>
                            <p className="text-[10px] text-slate-500 font-sans mt-1 leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 font-sans italic">No employment records parsed.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommended Opportunities Section with Live Database Explorer */}
                <div className="p-8 neomorph-card space-y-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-white/5 pb-6">
                    <div>
                      <h2 className="text-lg font-black text-white flex items-center space-x-2">
                        <Award className="w-5 h-5 text-blue-400" />
                        <span>AI Role Recommendations</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        Personalized career role suggestions matched using our multi-agent capabilities against your profile.
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={handleCalculateOpps}
                        disabled={calculatingOpps || loadingOpps}
                        className="flex items-center space-x-2 px-4 py-2 neomorph-button-primary disabled:opacity-50 text-white text-xs font-mono uppercase tracking-wider font-bold shrink-0"
                      >
                        <RefreshCw className={`w-4 h-4 ${(calculatingOpps || loadingOpps) ? "animate-spin" : ""}`} />
                        <span>{calculatingOpps ? "Matching..." : "Recalculate Recommendations"}</span>
                      </button>
                    </div>
                  </div>

                  {calculatingOpps || loadingOpps ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-3">
                      <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                      <div className="text-center">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Comparing Skill Vectors</span>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-xs font-sans">
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
                          whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                          className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col justify-between space-y-5 transition duration-300 group"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border ${
                                opp.matchScore >= 75
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                  : opp.matchScore >= 50
                                  ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                  : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                              }`}>
                                <CountUpText to={opp.matchScore} suffix="% Match Score" />
                              </span>
                            </div>

                            <div>
                              <h3 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors leading-snug">
                                {opp.title}
                              </h3>
                              <p className="text-xs text-blue-400 font-mono font-semibold mt-0.5">{opp.company}</p>
                            </div>

                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-400 font-mono">
                              <span className="flex items-center space-x-1">
                                <span className="text-slate-600">&bull;</span>
                                <span>{opp.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <span className="text-slate-600">&bull;</span>
                                <span>{opp.type}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <span className="text-slate-600">&bull;</span>
                                <span>{opp.salary}</span>
                              </span>
                            </div>

                            <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                              {opp.description}
                            </p>
                          </div>

                          <div className="space-y-3 border-t border-white/5 pt-4">
                            <div>
                              <h4 className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                <span>Your Matching Skills ({opp.matchedSkills?.length || 0})</span>
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {opp.matchedSkills && opp.matchedSkills.length > 0 ? (
                                  opp.matchedSkills.slice(0, 5).map((skill: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-1.5 py-0.5 bg-emerald-950/20 text-emerald-400 rounded text-[9px] font-mono border border-emerald-500/10"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-slate-500 italic">No exact skill overlap</span>
                                )}
                                {opp.matchedSkills?.length > 5 && (
                                  <span className="text-[9px] text-slate-500 font-mono self-center">
                                    +{opp.matchedSkills.length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[9px] font-mono text-red-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                                <span>Missing Target Skills ({opp.missingSkills?.length || 0})</span>
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {opp.missingSkills && opp.missingSkills.length > 0 ? (
                                  opp.missingSkills.slice(0, 5).map((skill: string, i: number) => (
                                    <span
                                      key={i}
                                      className="px-1.5 py-0.5 bg-red-950/20 text-red-300 rounded text-[9px] font-mono border border-red-500/10"
                                    >
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-[9px] text-emerald-400 italic">Fully aligned!</span>
                                )}
                                {opp.missingSkills?.length > 5 && (
                                  <span className="text-[9px] text-slate-500 font-mono self-center">
                                    +{opp.missingSkills.length - 5} more
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
                      <p className="text-xs text-slate-500 font-sans">
                        No role recommendations have been calculated yet.
                      </p>
                      <button
                        onClick={handleCalculateOpps}
                        className="mt-3 px-4 py-1.5 bg-white/10 border border-white/10 text-xs font-mono text-slate-300 rounded-lg hover:text-white"
                      >
                        Calculate Recommendations
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ATS Scanner Tab */}
            {activeTab === "ats" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">ATS Scanner & Optimizer</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Directly simulate recruiter applicant filters and optimize keywords to maximize resume pass-through.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Job Description */}
                  <form onSubmit={handleAtsScan} className="p-6 neomorph-card flex flex-col justify-between space-y-4 min-h-[400px]">
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Target Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the target job description here to analyze matched and missing core keywords..."
                        rows={10}
                        required
                        className="w-full neomorph-inset-input px-4 py-3 text-sm focus:outline-none text-slate-300 font-sans leading-relaxed resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={scanningAts}
                      className="w-full py-3.5 neomorph-button-primary text-xs font-mono uppercase tracking-wider font-bold text-white"
                    >
                      {scanningAts ? "Scanning Keywords against ATS..." : "Analyze ATS Compatibility"}
                    </button>
                  </form>

                  {/* ATS Results Output */}
                  <div className="p-6 neomorph-card space-y-6 min-h-[400px] flex flex-col justify-between">
                    {scanningAts ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          Recruiter Simulator active...
                        </span>
                      </div>
                    ) : atsResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6 flex-1 flex flex-col justify-between"
                      >
                        {/* Circle Score Header */}
                        <div className="flex items-center space-x-4 border-b border-white/5 pb-4">
                          <CircularScoreGauge score={atsResult.score} size={80} strokeWidth={6} colorClass="stroke-blue-500" />

                          <div>
                            <h3 className="text-sm font-bold text-slate-200">ATS Match Rating</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                              {atsResult.score >= 85
                                ? "Strong compatibility! Your resume exhibits high-quality project descriptions and aligned skills."
                                : atsResult.score >= 70
                                ? "Moderate match. Optimize using the recommended keyword weights below to improve selection chances."
                                : "Weak compatibility. RESTORE structural components and target missing experience tags."}
                            </p>
                          </div>
                        </div>

                        {/* Extracted Details with Premium Scroll Layout */}
                        <div className="space-y-5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                          
                          {/* Final Recruiter Verdict */}
                          <div className="bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-purple-500/10 rounded-2xl p-4">
                            <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-bold mb-1">
                              Final Recruiter Verdict
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {atsResult.verdict || `Current ATS Score: ${atsResult.score}/100. This resume has a solid base structure and is suitable for target developer profiles.`}
                            </p>
                          </div>

                          {/* Score Breakdown with Dot Leaders */}
                          {(() => {
                            const breakdown = atsResult.breakdown || {
                              formatting: Math.min(20, Math.round(atsResult.score * 0.2)),
                              contactInfo: 9,
                              summary: Math.min(10, Math.round(atsResult.score * 0.1)),
                              skills: Math.min(10, Math.round(atsResult.score * 0.1)),
                              experience: Math.min(10, Math.round(atsResult.score * 0.1)),
                              projects: Math.min(20, Math.round(atsResult.score * 0.2)),
                              education: 4,
                              certifications: 4,
                              keywords: Math.min(10, Math.round(atsResult.score * 0.1))
                            };
                            return (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-3">
                                <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
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
                                    <div key={idx} className="flex justify-between items-center text-[11px] text-slate-300 font-sans">
                                      <span className="shrink-0">{b.name}</span>
                                      <div className="flex-grow border-b border-dotted border-white/10 mx-2 translate-y-1.5" />
                                      <span className="font-mono text-slate-400 shrink-0">{b.val}/{b.max}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Strengths Section */}
                          {(() => {
                            const strengths = atsResult.strengths || [
                              "ATS-friendly layout template structure",
                              "Strong core developer skill metrics matching targets"
                            ];
                            return (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-3">
                                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                                  What's Excellent ✅
                                </span>
                                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                                  {strengths.map((str: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                      <span>{str}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })()}

                          {/* Actionable Improvements with weighted impacts */}
                          {(() => {
                            const improvements = atsResult.improvements || [
                              { text: "Incorporate more quantified metrics in project details", impact: 2 }
                            ];
                            return (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-3">
                                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                                  Improvement Suggestions
                                </span>
                                <div className="space-y-2">
                                  {improvements.map((imp: any, i: number) => (
                                    <div key={i} className="flex items-start justify-between bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs leading-relaxed gap-3">
                                      <span className="text-slate-300 font-sans">{imp.text || imp}</span>
                                      {imp.impact && (
                                        <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/15 text-amber-400 text-[9px] font-mono rounded font-bold shrink-0">
                                          +{imp.impact}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Company Compatibility Predictions */}
                          {(() => {
                            const comp = atsResult.companyCompatibility || {
                              tcsInfosysWipro: "90+/100",
                              accentureCapgemini: "88+/100",
                              startups: "85–90/100",
                              productCompanies: "82–87/100",
                              amazon: "80–85/100",
                              microsoft: "78–83/100",
                              google: "75–80/100"
                            };
                            return (
                              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-3">
                                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-bold">
                                  Estimated Compatibility
                                </span>
                                <div className="space-y-2 text-xs">
                                  {[
                                    { name: "TCS / Infosys / Wipro", val: comp.tcsInfosysWipro },
                                    { name: "Accenture / Capgemini", val: comp.accentureCapgemini },
                                    { name: "Startups", val: comp.startups },
                                    { name: "Product Companies", val: comp.productCompanies },
                                    { name: "Amazon", val: comp.amazon },
                                    { name: "Microsoft", val: comp.microsoft },
                                    { name: "Google", val: comp.google }
                                  ].map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-[11px] text-slate-300 font-sans">
                                      <span className="shrink-0">{item.name}</span>
                                      <div className="flex-grow border-b border-dotted border-white/10 mx-2 translate-y-1.5" />
                                      <span className="font-mono text-slate-400 shrink-0">{item.val}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Keywords Lists */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
                              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                                Keywords Matched
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.keywordsMatched?.map((word: string, i: number) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-emerald-950/20 border border-emerald-900/10 text-emerald-400 rounded text-[9px] font-mono"
                                  >
                                    {word}
                                  </span>
                                )) || <span className="text-[10px] text-slate-500">None</span>}
                              </div>
                            </div>

                            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 space-y-2">
                              <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest block font-bold">
                                Missing Keywords
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {atsResult.missingKeywords?.map((word: string, i: number) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-red-950/20 border border-red-500/10 text-red-400 rounded text-[9px] font-mono"
                                  >
                                    {word}
                                  </span>
                                )) || <span className="text-[10px] text-slate-500">None</span>}
                              </div>
                            </div>
                          </div>

                          {atsResult.score < 80 && (
                            <div className="mt-4 border-t border-white/5 pt-4 space-y-3">
                              <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 space-y-2">
                                <div className="flex items-start space-x-2.5">
                                  <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 text-xs">
                                    💡
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-amber-400">ATS-Friendly Template Recommendation</h5>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-0.5">
                                      Since your score is under 80, formatting errors may be impacting your parsing rate. Copy this industry-standard single-column layout to restructure your details:
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="mt-3">
                                  <textarea
                                    readOnly
                                    value={ATS_FRIENDLY_TEMPLATE}
                                    className="w-full h-32 bg-[#050608] border border-white/10 rounded-xl p-3 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-amber-500/30"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(ATS_FRIENDLY_TEMPLATE);
                                      alert("ATS template copied to clipboard!");
                                    }}
                                    className="mt-2 text-[10px] font-mono font-bold text-amber-400 hover:text-amber-300 transition duration-150 flex items-center space-x-1"
                                  >
                                    <span>[Copy Template]</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <ClipboardList className="w-10 h-10 text-slate-600 mb-2" />
                        <h3 className="text-sm font-bold text-slate-400">Scan Results Pending</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
                          Input the target job description in the form to check matching indices and keyword density.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Job Matcher Tab */}
            {activeTab === "jobs" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Neural Job Matcher</h1>
                    <p className="text-xs text-slate-400 mt-1">
                      Our intelligence matchers examine your profile skills to recommend real roles and companies.
                    </p>
                  </div>
                  <button
                    onClick={handleJobMatching}
                    disabled={matchingJobs}
                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition duration-200"
                  >
                    {matchingJobs ? "Matching..." : "Refresh Job Matches"}
                  </button>
                </div>

                {matchingJobs ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
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
                        whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                        className="p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl flex flex-col justify-between space-y-6 transition duration-300"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-bold rounded">
                              <CountUpText to={job.matchPercentage} suffix="% Match" />
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 uppercase">
                              Rank #{idx + 1}
                            </span>
                          </div>

                          <h3 className="mt-4 text-base font-bold text-slate-200 leading-tight">
                            {job.role}
                          </h3>
                          <p className="text-xs text-blue-400 font-mono font-semibold">{job.company}</p>

                          <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                            {job.description}
                          </p>
                        </div>

                        <div className="space-y-4 border-t border-white/5 pt-4">
                          <div>
                            <h4 className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                              Leveraged Strengths
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {job.strengths?.map((str: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 bg-emerald-950/20 text-emerald-400 rounded text-[9px] font-mono"
                                >
                                  {str}
                                </span>
                              )) || <span className="text-[9px] text-slate-500">None</span>}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-[9px] font-mono text-red-400 uppercase tracking-wider mb-1.5">
                              Unmet Requirements
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {job.missingRequirements?.map((req: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 bg-red-950/20 text-red-400 rounded text-[9px] font-mono"
                                >
                                  {req}
                                </span>
                              )) || <span className="text-[9px] text-slate-500">None</span>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-6">
                    <Briefcase className="w-8 h-8 text-slate-600 mb-2" />
                    <h3 className="text-sm font-bold text-slate-400">No Job Matches Cached</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
                      Trigger neural matching to inspect prospective companies and custom fit analysis.
                    </p>
                    <button
                      onClick={handleJobMatching}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition duration-200"
                    >
                      Trigger Neural Matcher
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Skill Gaps & Roadmap Tab */}
            {activeTab === "roadmap" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Skill Gap & Learning Roadmap</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    State your target career goal, and the system will design a visual learning path to bridge the tech skill gaps.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Goal Input form */}
                  <div className="p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl h-fit space-y-4">
                    <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Configure Target Role
                    </h2>
                    <form onSubmit={handleSkillGapAnalysis} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                          Target Role Title
                        </label>
                        <input
                          type="text"
                          value={targetCareerRole}
                          onChange={(e) => setTargetCareerRole(e.target.value)}
                          placeholder="e.g. Senior Cloud Engineer, Lead Architect"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500/50 text-slate-300"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={analyzingGaps}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xl text-white transition duration-200"
                      >
                        {analyzingGaps ? "Synthesizing Roadmap..." : "Calculate Skill Gaps"}
                      </button>
                    </form>

                    {skillGapResult && (
                      <div className="pt-4 border-t border-white/5 space-y-4">
                        <div>
                          <h4 className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                            Possessed Skills
                          </h4>
                          <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto">
                            {skillGapResult.currentSkills?.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 bg-emerald-950/20 border border-emerald-900/10 text-emerald-400 rounded text-[9px] font-mono"
                              >
                                {skill}
                              </span>
                            )) || <span className="text-[10px] text-gray-500">None</span>}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[9px] font-mono text-red-400 uppercase tracking-wider mb-1.5">
                            Core Skill Deficits
                          </h4>
                          <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto">
                            {skillGapResult.missingSkills?.map((skill: string, i: number) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 bg-red-950/20 border border-red-500/10 text-red-400 rounded text-[9px] font-mono"
                              >
                                {skill}
                              </span>
                            )) || <span className="text-[10px] text-slate-500">None</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Roadmap Timeline */}
                  <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl min-h-[400px]">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-6">
                      <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Tailored Multi-Week Roadmap
                      </h3>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">
                        Timeline Sequence
                      </span>
                    </div>

                    {analyzingGaps ? (
                      <div className="h-64 flex flex-col items-center justify-center space-y-2">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          Assembling educational plan...
                        </span>
                      </div>
                    ) : skillGapResult?.learningRoadmap && skillGapResult.learningRoadmap.length > 0 ? (
                      <div className="space-y-6">
                        {skillGapResult.learningRoadmap.map((step: any, idx: number) => (
                          <div key={idx} className="relative pl-8 border-l border-white/10 pb-2">
                            <div className="absolute w-6 h-6 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold flex items-center justify-center top-0.5 left-[-12px]">
                              {idx + 1}
                            </div>
                            <div className="flex justify-between items-start text-xs">
                              <h4 className="font-bold text-slate-200">{step.title}</h4>
                              <span className="text-[10px] font-mono text-blue-400 shrink-0 bg-blue-500/10 border border-blue-500/10 px-2 py-0.5 rounded">
                                {step.duration}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-sans mt-1.5 leading-relaxed">
                              {step.description}
                            </p>
                            {step.resources && step.resources.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Resources:</span>
                                {step.resources.map((res: string, rIdx: number) => (
                                  <span
                                    key={rIdx}
                                    className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-slate-300"
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
                        <BookOpen className="w-10 h-10 text-slate-600 mb-2" />
                        <h3 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">Plan Offline</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
                          State your career objectives in the sidebar configuration to build a personalized study roadmap.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Career Roadmap Builder Tab */}
            {activeTab === "career-roadmap" && (
              <div className={`premium-theme-container ${isLocalLightMode ? "premium-light-theme" : "premium-dark-theme"} w-full text-[var(--theme-text-primary)] bg-[var(--theme-bg-page)] premium-transition pb-24 rounded-3xl overflow-hidden border border-[var(--theme-border)]`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8 animate-fade-in"
                >
                  {/* Sticky Search Header (Catalog Mode Only) */}
                  {!selectedCareer && (
                    <div className="sticky top-0 z-30 backdrop-blur-md bg-[var(--theme-bg-page)]/85 border-b border-[var(--theme-border)] py-6 px-8 flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--theme-text-primary)] flex items-center gap-2.5">
                            <SparklesIcon className="w-7 h-7 text-[var(--theme-accent)]" />
                            <span>Career Path Navigator</span>
                          </h1>
                          <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5 font-sans">
                            Master industry-aligned technical skillsets, practice assignments, and custom structured projects curated for premium job readiness.
                          </p>
                        </div>

                        {/* Local Theme Toggle Button */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const newTheme = !isLocalLightMode;
                              setIsLocalLightMode(newTheme);
                              localStorage.setItem("premium_roadmap_theme", newTheme ? "light" : "dark");
                            }}
                            className="p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-bg-card)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:border-purple-500/30 transition duration-200 cursor-pointer"
                            title={isLocalLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                          >
                            {isLocalLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                        {/* Search Input with instant autocomplete suggestions */}
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

                          {/* Autocomplete Suggestions Dropdown */}
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

                        {/* Trending careers suggestions */}
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

                      {/* Recent Search history list */}
                      {recentSearches.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                          <span className="text-[var(--theme-text-tertiary)] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Recent:</span>
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
                              className="text-[9px] text-red-400 hover:underline pl-1 cursor-pointer"
                            >
                              Clear History
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!selectedCareer ? (
                    /* CAREER CATALOG VIEW WITH SKELETON LOADING */
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
                              <div className="space-y-2 border-t border-[var(--theme-border)] pt-4">
                                <div className="w-1/2 h-3 rounded bg-[var(--theme-border)] premium-skeleton" />
                                <div className="w-2/3 h-3 rounded bg-[var(--theme-border)] premium-skeleton" />
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
                              <div className="col-span-full neomorph-card p-16 text-center flex flex-col items-center justify-center space-y-4">
                                <AlertCircle className="w-12 h-12 text-[var(--theme-text-tertiary)]" />
                                <h3 className="text-base font-bold text-[var(--theme-text-primary)] font-mono uppercase tracking-wider">
                                  No Career Tracks Found
                                </h3>
                                <p className="text-xs text-[var(--theme-text-secondary)] max-w-sm font-sans">
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
                                  {/* Card Top: Icon & Demand Badge */}
                                  <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--theme-accent-soft)] border border-purple-500/10 text-[var(--theme-accent)]">
                                      {renderCareerIcon(career.icon)}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                      <span className="text-[10px] font-mono text-[var(--theme-accent)] bg-[var(--theme-accent-soft)] border border-purple-500/15 px-2.5 py-0.5 rounded-full font-bold">
                                        {career.demandScore}% Demand
                                      </span>
                                      {completedList.length > 0 && (
                                        <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full">
                                          Active
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Title & Short Clamped Description */}
                                  <div>
                                    <h3 className="text-base font-extrabold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition-colors duration-200 font-sans">
                                      {career.title}
                                    </h3>
                                    <p className="text-xs text-[var(--theme-text-secondary)] mt-2 line-clamp-2 font-sans leading-relaxed">
                                      {career.description}
                                    </p>
                                  </div>

                                  {/* Metadata Rows: Spaced Out cleanly (duration, courses, salary) */}
                                  <div className="space-y-2 border-t border-[var(--theme-border)] pt-4 text-xs font-mono">
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider font-semibold">Est. Salary</span>
                                      <span className="text-emerald-500 font-bold">{career.salaryLPA}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider font-semibold">Est. Duration</span>
                                      <span className="text-blue-400 font-bold">{career.durationMonths} Months</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[var(--theme-text-tertiary)] uppercase text-[9px] tracking-wider font-semibold">Stage Checklist</span>
                                      <span className="text-[var(--theme-text-primary)] font-bold">{career.milestones.length} Phases</span>
                                    </div>
                                  </div>

                                  {/* Overall Progress Indicator (if active) */}
                                  {completedList.length > 0 ? (
                                    <div className="space-y-1 pt-1">
                                      <div className="flex justify-between text-[9px] font-mono text-[var(--theme-text-secondary)]">
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
                                    /* Hiring Companies overlapping avatars block */
                                    <div className="pt-2 flex justify-between items-center">
                                      <span className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-semibold">Top Hiring Tech</span>
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
                                              className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-mono font-bold ${colors[i % colors.length]} bg-[var(--theme-bg-card)]`}
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
                                  className="w-full mt-4 py-2.5 bg-[var(--theme-accent-soft)] hover:bg-[var(--theme-accent)] text-[var(--theme-accent)] hover:text-white border border-[var(--theme-accent)]/15 text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-purple-500/10 cursor-pointer font-sans"
                                >
                                  <span>View Roadmap</span>
                                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                              </motion.div>
                            );
                          });
                        })()}
                      </div>
                    )
                  ) : (
                    /* DEDICATED ROADMAP TIMELINE VIEW */
                    <div className="px-8 space-y-8">
                      {/* Back button & Header Area */}
                      <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-8 space-y-6 shadow-[var(--theme-card-shadow)]">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => setSelectedCareer(null)}
                            className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] border border-[var(--theme-border)] bg-[var(--theme-inner-input)] px-4 py-2 rounded-xl transition duration-200 shadow-sm cursor-pointer"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Directory</span>
                          </button>

                          {/* Light/Dark Toggle */}
                          <button
                            onClick={() => {
                              const newTheme = !isLocalLightMode;
                              setIsLocalLightMode(newTheme);
                              localStorage.setItem("premium_roadmap_theme", newTheme ? "light" : "dark");
                            }}
                            className="p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-inner-input)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition cursor-pointer"
                          >
                            {isLocalLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-t border-[var(--theme-border)] pt-6">
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-[var(--theme-accent)] uppercase tracking-widest bg-[var(--theme-accent-soft)] px-2.5 py-0.5 rounded-full font-bold">
                              Verified Learning Pathway
                            </span>
                            <h2 className="text-2xl font-black text-[var(--theme-text-primary)] font-sans">{selectedCareer.title}</h2>
                            <p className="text-xs text-[var(--theme-text-secondary)] font-sans max-w-2xl leading-relaxed">
                              {selectedCareer.description}
                            </p>
                          </div>

                          {/* Metagrid: MD3 metrics */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] font-mono uppercase tracking-wider font-semibold">Avg Salary</span>
                              <span className="text-xs font-bold text-emerald-500">{selectedCareer.salaryLPA}</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] font-mono uppercase tracking-wider font-semibold">Total Duration</span>
                              <span className="text-xs font-bold text-blue-400">{selectedCareer.durationMonths} Months</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] font-mono uppercase tracking-wider font-semibold">Demand Score</span>
                              <span className="text-xs font-bold text-purple-400">{selectedCareer.demandScore}/100</span>
                            </div>
                            <div className="p-3 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] rounded-2xl text-center shadow-inner">
                              <span className="block text-[8px] text-[var(--theme-text-tertiary)] font-mono uppercase tracking-wider font-semibold">Job Postings</span>
                              <span className="text-xs font-bold text-amber-500">
                                {selectedCareer.id.includes("sde") ? "4,820+" : selectedCareer.id.includes("ai") ? "1,240+" : "2,500+"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Companies hiring info */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[var(--theme-border)] pt-4 text-xs font-sans text-[var(--theme-text-secondary)]">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-[var(--theme-text-tertiary)]">Primary Hiring Entities:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedCareer.hiringCompanies.map((c, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[9px] font-mono text-[var(--theme-text-secondary)] rounded-md"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar & Stage Indicator */}
                        {(() => {
                          const completedList = completedCareerMilestones[selectedCareer.id] || [];
                          const total = selectedCareer.milestones.length;
                          const percentage = total > 0 ? Math.round((completedList.length / total) * 100) : 0;

                          return (
                            <div className="border-t border-[var(--theme-border)] pt-6 space-y-3">
                              <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-[var(--theme-text-secondary)]">SaaS Roadmap Completion</span>
                                <span className="text-[var(--theme-accent)] font-bold">{percentage}% Done ({completedList.length}/{total} Milestones)</span>
                              </div>
                              <div className="w-full h-2.5 bg-[var(--theme-inner-input)] rounded-full overflow-hidden border border-[var(--theme-border)] p-[1px]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Timeline container */}
                      <div className="bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl p-8 space-y-8 shadow-[var(--theme-card-shadow)]">
                        <h3 className="text-xs font-mono text-[var(--theme-text-tertiary)] uppercase tracking-widest font-bold">
                          Sequential Milestone Syllabus
                        </h3>

                        {loadingProgress ? (
                          <div className="py-16 flex flex-col items-center justify-center space-y-2">
                            <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                            <span className="text-[10px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider">Synchronizing client states...</span>
                          </div>
                        ) : (
                          /* Vertical timeline layout with growing colored line */
                          <div className="relative pl-6 sm:pl-10">
                            {/* Background Grey Track Line */}
                            <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-[var(--theme-border)] z-0" />
                            
                            {/* Animated Progress Overlay Track Line */}
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
                                
                                // Locked unless first item or previous is completed
                                const isUnlocked = idx === 0 || completedList.includes(idx - 1);
                                
                                // Pulse highlight current active milestone
                                const currentActiveIdx = selectedCareer.milestones.findIndex((_, i) => !completedList.includes(i));
                                const isCurrent = idx === currentActiveIdx;

                                const isExpanded = expandedMilestones[idx] || false;

                                return (
                                  <div key={idx} className="relative z-20">
                                    {/* Timeline node icon */}
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

                                    {/* Milestone Detail Card */}
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
                                      {/* Header click area */}
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

                                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-[var(--theme-text-tertiary)]">
                                            <span className="text-[var(--theme-accent)] font-bold">{m.duration}</span>
                                            <span>&bull;</span>
                                            <span>Complexity: {m.difficulty}</span>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-3 shrink-0">
                                          {/* Done switch button */}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (isUnlocked) {
                                                handleToggleMilestone(selectedCareer.id, idx);
                                              }
                                            }}
                                            className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider border rounded-xl transition duration-200 font-bold cursor-pointer ${
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

                                      {/* Expand content body */}
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          transition={{ duration: 0.25 }}
                                          className="border-t border-[var(--theme-border)] p-5 space-y-5 text-xs text-[var(--theme-text-secondary)] bg-[var(--theme-inner-input)]/30 font-sans"
                                        >
                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold mb-1.5">
                                              Milestone Briefing
                                            </h5>
                                            <p className="leading-relaxed text-[var(--theme-text-secondary)] font-sans text-xs">
                                              {m.description}
                                            </p>
                                          </div>

                                          {/* Skills badge grid */}
                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold mb-1.5">
                                              Key Capabilities Acquired
                                            </h5>
                                            <div className="flex flex-wrap gap-1.5">
                                              {m.skillsToLearn.map((skill, sIdx) => (
                                                <span
                                                  key={sIdx}
                                                  className="px-2 py-0.5 bg-[var(--theme-accent-soft)] border border-[var(--theme-accent)]/15 text-[var(--theme-accent)] rounded-lg text-[10px] font-mono"
                                                >
                                                  {skill}
                                                </span>
                                              ))}
                                            </div>
                                          </div>

                                          {/* Study questions bullet list */}
                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold mb-1.5">
                                              Self-Assessment Problems
                                            </h5>
                                            <ul className="list-disc pl-4 space-y-1.5 font-sans leading-relaxed text-[var(--theme-text-secondary)]">
                                              {m.practiceQuestions.map((q, qIdx) => (
                                                <li key={qIdx}>{q}</li>
                                              ))}
                                            </ul>
                                          </div>

                                          {/* Clickable Resource links */}
                                          <div>
                                            <h5 className="text-[9px] font-mono text-[var(--theme-text-tertiary)] uppercase tracking-wider font-bold mb-1.5">
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
                                                    className="px-3 py-1 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/30 rounded-xl text-[10px] font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition duration-200 cursor-pointer"
                                                  >
                                                    {res} ↗
                                                  </a>
                                                );
                                              })}
                                            </div>
                                          </div>

                                          {/* Mini Project block inside body */}
                                          {m.practicalProject && (
                                            <div className="p-4 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-2xl space-y-2">
                                              <span className="text-[8px] font-mono text-[var(--theme-accent)] uppercase tracking-widest block font-bold">
                                                Practical Capstone Assignment
                                              </span>
                                              <h4 className="text-xs font-bold text-[var(--theme-text-primary)]">
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
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Floating Action Button (FAB) for AI Career Coach */}
                  <div className="fixed bottom-6 right-6 z-50">
                    <button
                      onClick={() => setIsAiMentorOpen(!isAiMentorOpen)}
                      className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 duration-200 transition-all shadow-purple-500/20 cursor-pointer"
                      title="Consult AI Career Mentor"
                    >
                      {isAiMentorOpen ? <X className="w-5 h-5" /> : <SparklesIcon className="w-6 h-6 animate-pulse" />}
                    </button>

                    {/* Chat dialog panel overlay */}
                    {isAiMentorOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 h-[450px] bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
                      >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border-b border-[var(--theme-border)] flex justify-between items-center">
                          <div>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-bold flex items-center gap-1.5">
                              <SparklesIcon className="w-3.5 h-3.5" />
                              <span>AI Career Mentor</span>
                            </h4>
                            <p className="text-[10px] text-[var(--theme-text-secondary)] font-sans">Ask me about resource materials or exam strategies</p>
                          </div>
                          <button
                            onClick={() => setIsAiMentorOpen(false)}
                            className="text-[var(--theme-text-tertiary)] hover:text-[var(--theme-text-primary)] transition cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                          {aiMentorMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                                  msg.sender === "user"
                                    ? "bg-purple-600 text-white rounded-tr-none font-sans"
                                    : "bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[var(--theme-text-primary)] rounded-tl-none font-sans"
                                }`}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                          {isAiMentorTyping && (
                            <div className="flex justify-start">
                              <div className="bg-[var(--theme-inner-input)] border border-[var(--theme-border)] text-[var(--theme-text-tertiary)] rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-[var(--theme-text-tertiary)] rounded-full animate-bounce [animation-delay:0.4s]" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input Footer */}
                        <form onSubmit={handleSendAiMentorMessage} className="p-3 border-t border-[var(--theme-border)] bg-[var(--theme-inner-input)] flex items-center gap-2">
                          <input
                            type="text"
                            value={aiMentorInput}
                            onChange={(e) => setAiMentorInput(e.target.value)}
                            placeholder="Ask about exam materials, target jobs..."
                            className="flex-1 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-xl px-3 py-2 text-[11px] text-[var(--theme-text-primary)] focus:outline-none focus:border-purple-500/40"
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


            {/* AI Interview Lab Tab */}
            {activeTab === "interview" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">AI Interview Simulator</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Conduct technical and behavioral interview simulations generated dynamically from your work history and profile skills.
                  </p>
                </div>

                {interviewQuestions.length === 0 ? (
                  <div className="p-8 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl flex flex-col items-center justify-center text-center max-w-xl mx-auto my-6">
                    <MessageSquare className="w-12 h-12 text-blue-500/50 mb-4 animate-pulse" />
                    <h2 className="text-lg font-extrabold tracking-tight text-white">Initialize Simulation Session</h2>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                      Specialized AI interviewers will assemble 3 tailored interview questions targeting your parsed resume skills.
                    </p>
                    <button
                      onClick={handleStartInterview}
                      disabled={generatingQuestions}
                      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-xs font-mono uppercase tracking-wider font-bold rounded-xl text-white shadow-xl shadow-blue-600/20 transition duration-200"
                    >
                      {generatingQuestions ? "Agents Preparing Questions..." : "Begin Mock Session"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Active Question panel */}
                    <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl flex flex-col justify-between space-y-6 min-h-[420px]">
                      {currentQuestionIndex < interviewQuestions.length ? (
                        <div className="space-y-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs font-mono">
                              <span className="text-blue-400">
                                Question {currentQuestionIndex + 1} of {interviewQuestions.length}
                              </span>
                              <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded font-bold text-[9px] text-purple-300">
                                {interviewQuestions[currentQuestionIndex].category}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                              {interviewQuestions[currentQuestionIndex].question}
                            </h3>
                          </div>

                          <form onSubmit={handleSubmitInterviewAnswer} className="space-y-4">
                            <div>
                              <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                                Your Response
                              </label>
                              <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type your response here. Try to structure your answer using the STAR method (Situation, Task, Action, Result)..."
                                rows={6}
                                required
                                disabled={evaluatingAnswer || !!currentEvaluation}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 text-slate-300 leading-relaxed font-sans resize-none"
                              />
                            </div>

                            {!currentEvaluation ? (
                              <button
                                type="submit"
                                disabled={evaluatingAnswer || !userAnswer.trim()}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-xs font-mono uppercase tracking-wider font-bold rounded-xl text-white shadow-xl shadow-blue-600/20 transition duration-200 flex items-center justify-center space-x-2"
                              >
                                {evaluatingAnswer ? (
                                  "Evaluation Agent assessing answer..."
                                ) : (
                                  <>
                                    <Send className="w-4 h-4" />
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
                                    className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider font-bold rounded-xl text-slate-300 hover:text-white transition duration-200"
                                  >
                                    Next Question &rarr;
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Trigger complete state
                                      setCurrentQuestionIndex((prev) => prev + 1);
                                    }}
                                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-xs font-mono uppercase tracking-wider font-bold rounded-xl text-white transition duration-200"
                                  >
                                    View Session Report card
                                  </button>
                                )}
                              </div>
                            )}
                          </form>
                        </div>
                      ) : (
                        /* Complete report */
                        <div className="space-y-6 text-center py-6 flex-1 flex flex-col justify-center">
                          <div className="p-4 bg-emerald-950/20 border border-emerald-950/20 text-emerald-400 rounded-full w-fit mx-auto">
                            <ShieldCheck className="w-10 h-10" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-slate-100">Session Completed</h3>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                              Your interview responses have been analyzed. Here is your overall session performance metric:
                            </p>
                          </div>

                          <div className="text-center my-4">
                            <span className="text-5xl font-black text-blue-400">
                              <CountUpText to={getInterviewOverallScore()} suffix="%" />
                            </span>
                            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mt-1">Average Evaluation Rating</span>
                          </div>

                          <button
                            onClick={handleStartInterview}
                            className="px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono uppercase tracking-wider text-slate-300 rounded-xl hover:text-white mx-auto transition duration-200"
                          >
                            Restart Mock Session
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Feedback report side panel */}
                    <div className="p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl flex flex-col justify-between min-h-[420px]">
                      {evaluatingAnswer ? (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
                          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                            Evaluating depth and vocabulary...
                          </span>
                        </div>
                      ) : currentEvaluation ? (
                        <div className="space-y-4 flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-center border-b border-white/5 pb-3">
                            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                              Agent Feedback Report
                            </h3>
                            <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-mono text-xs font-bold rounded">
                              <CountUpText to={currentEvaluation.score} suffix="% Score" />
                            </span>
                          </div>

                          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                            <div>
                              <h4 className="text-[10px] font-mono text-blue-400 uppercase tracking-wider mb-1">
                                Evaluation Feedback
                              </h4>
                              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                {currentEvaluation.feedback}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                                Addressed Expected Points
                              </h4>
                              <div className="space-y-1.5">
                                {currentEvaluation.expectedPointsMatched?.map((pt: string, i: number) => (
                                  <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-300 font-sans">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                    <span>{pt}</span>
                                  </div>
                                ))}
                                {(!currentEvaluation.expectedPointsMatched || currentEvaluation.expectedPointsMatched.length === 0) && (
                                  <span className="text-[10px] text-slate-500 italic">No expected metrics covered.</span>
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1.5">
                                Enhancement Recommendations
                              </h4>
                              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                                {currentEvaluation.suggestions?.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start space-x-1.5">
                                    <span className="text-amber-400 mt-0.5">&bull;</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                          <HelpCircle className="w-10 h-10 text-slate-600 mb-2" />
                          <h3 className="text-sm font-bold text-slate-400">Response Analysis</h3>
                          <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
                            Complete and submit your question response to display grading and constructive feedback.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Hiring Probability Predictor Tab */}
            {activeTab === "probability" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Hiring Predictor</h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Calculate career metrics, predict the probability of success for specific roles, and highlight optimizations.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Job and Company config */}
                  <form onSubmit={handlePredictHiringProbability} className="p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl h-fit space-y-4">
                    <h2 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Specify Application Details
                    </h2>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                        Target Job Title
                      </label>
                      <input
                        type="text"
                        value={probJobTitle}
                        onChange={(e) => setProbJobTitle(e.target.value)}
                        placeholder="e.g. Senior Backend Engineer"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500/50 text-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                        Target Company Name
                      </label>
                      <input
                        type="text"
                        value={probCompany}
                        onChange={(e) => setProbCompany(e.target.value)}
                        placeholder="e.g. Stripe, Netflix"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500/50 text-slate-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={predictingProb}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-[10px] font-mono uppercase tracking-wider font-bold rounded-xl text-white transition duration-200"
                    >
                      {predictingProb ? "Consulting Predictors..." : "Predict Hiring Odds"}
                    </button>
                  </form>

                  {/* Prob Result Output */}
                  <div className="lg:col-span-2 p-6 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl min-h-[400px] flex flex-col justify-between">
                    {predictingProb ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          Analyzing profile strengths...
                        </span>
                      </div>
                    ) : hiringProbability ? (
                      <div className="space-y-6 flex-1 flex flex-col justify-between">
                        {/* Circle Score Header */}
                        <div className="flex items-center space-x-6 border-b border-white/5 pb-4">
                          <CircularScoreGauge score={hiringProbability.probabilityScore} size={96} strokeWidth={7} colorClass="stroke-purple-500" />

                          <div>
                            <h3 className="text-base font-bold text-slate-200">Hiring Probability</h3>
                            <p className="text-xs text-purple-400 font-mono mt-0.5 font-semibold">
                              {hiringProbability.jobTitle} &bull; {hiringProbability.company}
                            </p>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                              Probability model simulated based on background align, missing skills, and tech depth compared against target firm indices.
                            </p>
                          </div>
                        </div>

                        {/* Extracted Strengths & Gaps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[220px] overflow-y-auto pr-1">
                          <div>
                            <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
                              Core Assets / Strengths
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                              {hiringProbability.strengths?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start space-x-1.5">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-2">
                              Identified Gaps / Weaknesses
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                              {hiringProbability.weaknesses?.map((item: string, i: number) => (
                                <li key={i} className="flex items-start space-x-1.5">
                                  <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Recommendation banner */}
                        {hiringProbability.suggestions && hiringProbability.suggestions.length > 0 && (
                          <div className="p-4 bg-blue-950/20 border border-blue-900/30 text-xs text-slate-300 rounded-xl leading-relaxed font-sans">
                            <span className="font-bold text-blue-400 block mb-1">Strategist Tips to Maximize Odds:</span>
                            <ul className="space-y-1 list-disc pl-4 text-slate-300">
                              {hiringProbability.suggestions.map((sug: string, i: number) => (
                                <li key={i}>{sug}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                        <Award className="w-10 h-10 text-slate-600 mb-2" />
                        <h3 className="text-sm font-bold text-slate-400 font-mono uppercase tracking-wider">Simulator Offline</h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs font-sans">
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
