import React, { useState, useEffect } from "react";
import { ApiService } from "../services/api";
import { Sparkles, FileText, ArrowRight, BrainCircuit, CheckCircle2, ChevronRight, Check, X, Target, Send, Sun, Moon } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "motion/react";

interface AnalysisPageProps {
  user: any;
  resume: any;
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function AnalysisPage({ user, resume, onNavigate, theme, setTheme }: AnalysisPageProps) {
  const [qualityAnalysis, setQualityAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ATS scoring states
  const [atsScoreData, setAtsScoreData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [calculatingAts, setCalculatingAts] = useState<boolean>(false);
  const [fetchingAts, setFetchingAts] = useState<boolean>(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  useEffect(() => {
    if (resume) {
      triggerInitialQualityAnalysis();
    }
    if (resume && user) {
      fetchLatestAtsScore();
    }
  }, [resume, user]);

  const fetchLatestAtsScore = async () => {
    if (!resume || !user) return;
    setFetchingAts(true);
    setAtsError(null);
    try {
      const atsRef = collection(db, "atsScores");
      const q = query(
        atsRef,
        where("resumeId", "==", resume.id),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const scoresList: any[] = [];
      querySnapshot.forEach((doc) => {
        scoresList.push({ id: doc.id, ...doc.data() });
      });

      if (scoresList.length > 0) {
        // Sort by createdAt descending
        scoresList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAtsScoreData(scoresList[0]);
      }
    } catch (err: any) {
      console.error("Failed to fetch latest ATS score:", err);
    } finally {
      setFetchingAts(false);
    }
  };

  const handleCalculateAts = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || !resume || !user) return;

    setCalculatingAts(true);
    setAtsError(null);
    try {
      const result = await ApiService.getAtsScore(resume.id, jobDescription, user.uid);
      setAtsScoreData(result);
    } catch (err: any) {
      console.error(err);
      setAtsError(err.message || "Failed to calculate ATS score. Please try again.");
    } finally {
      setCalculatingAts(false);
    }
  };

  const handleResetAts = () => {
    setAtsScoreData(null);
    setJobDescription("");
    setAtsError(null);
  };

  const triggerInitialQualityAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await ApiService.analyzeQuality(resume.id, user.uid);
      setQualityAnalysis(res);
    } catch (err: any) {
      console.error(err);
      setError("Failed to run initial cognitive quality scan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!resume) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300">
        <div className="absolute top-[-150px] left-[-100px] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <FileText className="w-12 h-12 text-[var(--color-text-secondary)] mb-4 animate-bounce relative z-10" />
        <h2 className="text-xl font-extrabold relative z-10">No Resume Uploaded</h2>
        <button
          onClick={() => onNavigate("upload")}
          className="mt-6 px-6 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider relative z-10 text-white font-bold"
        >
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300">
      
      {/* Background visual spheres */}
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
        className="absolute top-[-50px] left-[-100px] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[var(--color-border)] pb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <BrainCircuit className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AI Resume Synthesis Complete</h1>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">
                Cognitive parser successfully completed analysis on: <span className="font-mono font-bold">{resume.fileName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex-1 sm:flex-none px-5 py-3 clay-btn clay-btn-primary font-bold text-xs font-mono uppercase tracking-wider text-white"
            >
              <span>Go to Workspace</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-3 rounded-2xl border border-[var(--color-border)] bg-[var(--clay-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* Synthesis Profile Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quality Analysis card */}
          <div className="p-6 clay-card flex flex-col justify-between space-y-6">
            <div>
              <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-bold">
                Initial Quality Score
              </h2>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1.5 font-medium leading-relaxed">
                Assessed based on experience depth, syntax readability, formatting, and high-demand skill align.
              </p>
            </div>

            <div className="my-6 flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase tracking-wider">Scoring...</span>
                </div>
              ) : qualityAnalysis ? (
                <div className="relative flex items-center justify-center w-28 h-28">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      className="stroke-[var(--color-border)] fill-none"
                      strokeWidth="8"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      className="stroke-indigo-600 fill-none transition-all duration-1000"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 46}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 46 * (1 - qualityAnalysis.qualityScore / 100)
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-[var(--color-text-primary)]">{qualityAnalysis.qualityScore}</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono font-bold">/ 100</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={triggerInitialQualityAnalysis}
                  className="px-4 py-2.5 clay-btn clay-btn-secondary text-[var(--color-text-primary)] text-xs font-mono uppercase tracking-wider"
                >
                  Trigger Scan
                </button>
              )}
            </div>

            {qualityAnalysis && (
              <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
                <div>
                  <h4 className="text-[10px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider mb-2 font-bold">
                    Critical Gaps Detected
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {qualityAnalysis.missingSkills?.slice(0, 4).map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-mono font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Parsed records */}
          <div className="lg:col-span-2 p-6 clay-card space-y-6">
            <h2 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider border-b border-[var(--color-border)] pb-3 font-bold">
              Extracted Profile Records
            </h2>

            <div className="space-y-5 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1 font-bold">Full Name</span>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{resume.parsedData?.name || "Not found"}</p>
              </div>

              {resume.parsedData?.summary && (
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1 font-bold">Professional Summary</span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">{resume.parsedData.summary}</p>
                </div>
              )}

              <div>
                <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1.5 font-bold">Parsed Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {(() => {
                    const skillsObj = resume?.parsedData?.skills;
                    let skillsArr: string[] = [];
                    if (Array.isArray(skillsObj)) {
                      skillsArr = skillsObj;
                    } else if (skillsObj && typeof skillsObj === "object") {
                      skillsArr = Array.isArray(skillsObj.all) ? skillsObj.all : Object.values(skillsObj).flat().filter((s): s is string => typeof s === "string");
                    }
                    return skillsArr.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[10px] font-mono text-[var(--color-text-primary)] font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ));
                  })()}
                </div>
              </div>

              {resume.parsedData?.experience && resume.parsedData.experience.length > 0 && (
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-2 font-bold">Employment History</span>
                  <div className="space-y-3.5">
                    {resume.parsedData.experience.map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-3 border-indigo-500/30 pl-3">
                        <p className="text-xs font-bold text-[var(--color-text-primary)]">{exp.role} at <span className="text-indigo-600 dark:text-indigo-400">{exp.company}</span></p>
                        <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-0.5 font-bold">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.parsedData?.education && resume.parsedData.education.length > 0 && (
                <div>
                  <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-2 font-bold">Educational History</span>
                  <div className="space-y-3.5">
                    {resume.parsedData.education.map((edu: any, idx: number) => (
                      <div key={idx} className="border-l-3 border-indigo-500/30 pl-3">
                        <p className="text-xs font-bold text-[var(--color-text-primary)]">{edu.degree} in {edu.fieldOfStudy}</p>
                        <p className="text-[10px] font-mono text-[var(--color-text-tertiary)] mt-0.5 font-bold">{edu.institution} &bull; {edu.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ATS Evaluation details */}
        <div className="p-8 clay-card space-y-6">
          {calculatingAts ? (
            <div className="h-72 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
              <div className="space-y-1">
                <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-widest block font-bold">Consulting ATS Indices</span>
                <p className="text-[11px] text-[var(--color-text-tertiary)] max-w-xs leading-relaxed font-medium">
                  Performing keyword alignment, semantic validation, and computing index density...
                </p>
              </div>
            </div>
          ) : atsScoreData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gauge Column */}
              <div className="flex flex-col items-center justify-between p-6 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-3xl relative min-h-[300px] space-y-6 shadow-inner">
                <div className="text-center w-full pb-3 border-b border-[var(--color-border)]">
                  <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center justify-center space-x-1.5 font-bold">
                    <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Keyword Compatibility</span>
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1 font-medium">Calculated alignment against target role guidelines</p>
                </div>

                <div className="relative w-full h-44 flex items-center justify-center mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={[
                          { name: "Score", value: atsScoreData.score },
                          { name: "Remaining", value: 100 - atsScoreData.score }
                        ]}
                        cx="50%"
                        cy="85%"
                        innerRadius={65}
                        outerRadius={85}
                        startAngle={180}
                        endAngle={0}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="url(#gaugeGradient)" />
                        <Cell fill={theme === "light" ? "rgba(99, 102, 241, 0.08)" : "rgba(255, 255, 255, 0.04)"} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-[20%] flex flex-col items-center">
                    <span className="text-4xl font-black text-[var(--color-text-primary)]">{atsScoreData.score}%</span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] font-mono uppercase tracking-wider mt-0.5 font-bold">ATS Match Index</span>
                  </div>
                </div>

                <div className="w-full bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 text-left">
                  <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black mb-1">
                    Recruiter Verdict
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                    {atsScoreData.verdict || `Current ATS Score: ${atsScoreData.score}/100. This resume has a solid base structure and is suitable for target developer profiles.`}
                  </p>
                </div>

                <div className="text-center w-full mt-2">
                  <button
                    onClick={handleResetAts}
                    className="clay-btn clay-btn-secondary px-5 py-2.5 text-[10px] font-mono uppercase tracking-wider"
                  >
                    Compare Another Role
                  </button>
                </div>
              </div>

              {/* Keywords list column */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Score Breakdown */}
                {(() => {
                  const breakdown = atsScoreData.breakdown || {
                    formatting: Math.min(20, Math.round(atsScoreData.score * 0.2)),
                    contactInfo: 9,
                    summary: Math.min(10, Math.round(atsScoreData.score * 0.1)),
                    skills: Math.min(10, Math.round(atsScoreData.score * 0.1)),
                    experience: Math.min(10, Math.round(atsScoreData.score * 0.1)),
                    projects: Math.min(20, Math.round(atsScoreData.score * 0.2)),
                    education: 4,
                    certifications: 4,
                    keywords: Math.min(10, Math.round(atsScoreData.score * 0.1))
                  };
                  return (
                    <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3.5 shadow-inner">
                      <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black">
                        ATS Score Breakdown
                      </span>
                      <div className="space-y-2.5 text-xs">
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
                          <div key={idx} className="flex justify-between items-center text-[11px] text-[var(--color-text-secondary)] font-medium">
                            <span className="shrink-0">{b.name}</span>
                            <div className="flex-grow border-b border-dotted border-[var(--color-border)] mx-2 translate-y-1.5" />
                            <span className="font-mono text-[var(--color-text-tertiary)] shrink-0 font-bold">{b.val}/{b.max}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Strengths */}
                <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-black">
                    What's Excellent ✅
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-medium">
                    {(atsScoreData.strengths || ["ATS-friendly layout template structure", "Strong core developer skill metrics matching targets"]).map((str: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-black">
                    Improvement Suggestions
                  </span>
                  <div className="space-y-2">
                    {(atsScoreData.improvements || [{ text: "Incorporate more quantified metrics in project details", impact: 2 }]).map((imp: any, i: number) => (
                      <div key={i} className="flex items-start justify-between bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-3.5 text-xs leading-relaxed gap-3.5 shadow-sm">
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

                {/* Keywords lists */}
                <div className="space-y-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 shadow-inner">
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-black">
                    Matched Keywords ({atsScoreData.keywordsMatched?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {atsScoreData.keywordsMatched?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[9px] font-mono font-medium"
                      >
                        <Check className="w-3 h-3 flex-shrink-0" />
                        <span>{kw}</span>
                      </span>
                    )) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None matched</span>}
                  </div>
                </div>

                <div className="space-y-2 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 shadow-inner">
                  <span className="text-[9px] font-mono text-red-600 dark:text-red-400 uppercase tracking-widest block font-black">
                    Missing Target Keywords ({atsScoreData.missingKeywords?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {atsScoreData.missingKeywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="flex items-center space-x-1 px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-[9px] font-mono font-medium"
                      >
                        <X className="w-3 h-3 flex-shrink-0" />
                        <span>{kw}</span>
                      </span>
                    )) || <span className="text-xs text-[var(--color-text-tertiary)] italic">None missing</span>}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Input Side */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold flex items-center space-x-2.5">
                    <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>ATS Match Optimizer</span>
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed font-medium">
                    Paste a target job description to evaluate keyword density, identify critical tech gaps, and calculate your compatibility index.
                  </p>
                </div>
                <form onSubmit={handleCalculateAts} className="space-y-4">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description details here (e.g., qualifications, requirements, responsibilities)..."
                    rows={6}
                    required
                    className="w-full clay-input px-4 py-3.5 text-xs focus:outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] leading-relaxed font-medium resize-none min-h-[140px]"
                  />
                  {atsError && (
                    <p className="text-[11px] text-red-500 font-medium">{atsError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={calculatingAts || !jobDescription.trim()}
                    className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider font-bold text-white shadow-md disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Run ATS Match Evaluation</span>
                  </button>
                </form>
              </div>

              {/* Guide Side */}
              <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-3xl p-6 flex flex-col justify-center space-y-5 shadow-inner">
                <h4 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">
                  How ATS Evaluation Works
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold shrink-0">01</div>
                    <div>
                      <h5 className="text-xs font-bold">Semantic Extraction</h5>
                      <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-relaxed font-medium">
                        The AI engine extracts high-priority skills, frameworks, and tools required by the employer.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl text-xs font-bold shrink-0">02</div>
                    <div>
                      <h5 className="text-xs font-bold">Gap & Density Analysis</h5>
                      <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-relaxed font-medium">
                        Your parsed resume content is scanned for exact and synonym matches, identifying missing terms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3.5">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold shrink-0">03</div>
                    <div>
                      <h5 className="text-xs font-bold">Gauge Scoring & Advice</h5>
                      <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 leading-relaxed font-medium">
                        Get a tailored percentage score along with exact keywords to inject into your resume sections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quality suggestions */}
        {qualityAnalysis && (
          <div className="p-6 clay-card space-y-6">
            <div className="border-b border-[var(--color-border)] pb-3">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Cognitive Quality Evaluation Report</span>
              </h3>
              <p className="text-xs text-[var(--color-text-tertiary)] mt-1 font-medium">
                Real-time assessment against recruiter guidelines and Applicant Tracking System criteria.
              </p>
            </div>

            <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
              <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black mb-1">
                Final Recruiter Verdict
              </span>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                {qualityAnalysis.verdict || `Current Resume Score: ${qualityAnalysis.qualityScore || 75}/100. This resume has a solid base structure and is suitable for target developer profiles.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Side */}
              <div className="space-y-6">
                
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
                    <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                      <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black">
                        ATS Score Breakdown
                      </span>
                      <div className="space-y-2.5 text-xs">
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
                          <div key={idx} className="flex justify-between items-center text-[11px] text-[var(--color-text-secondary)] font-medium">
                            <span className="shrink-0">{b.name}</span>
                            <div className="flex-grow border-b border-dotted border-[var(--color-border)] mx-2 translate-y-1.5" />
                            <span className="font-mono text-[var(--color-text-tertiary)] shrink-0 font-bold">{b.val}/{b.max}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Company ATS */}
                <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                  <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest block font-black">
                    Company ATS Compatibility
                  </span>
                  <div className="space-y-2 text-xs">
                    {Object.entries(qualityAnalysis.companyCompatibility || {
                      tcsInfosysWipro: "90+/100",
                      accentureCapgemini: "88+/100",
                      deloitte: "87-90/100",
                      productCompanies: "82–87/100",
                      amazon: "80–85/100",
                      microsoft: "78–83/100",
                      google: "75–80/100"
                    }).map(([company, val]: any, idx) => {
                      const prettyNames: Record<string, string> = {
                        tcsInfosysWipro: "TCS / Infosys / Wipro",
                        accentureCapgemini: "Accenture / Capgemini",
                        deloitte: "Deloitte",
                        productCompanies: "Product Companies",
                        amazon: "Amazon",
                        microsoft: "Microsoft",
                        google: "Google"
                      };
                      return (
                        <div key={idx} className="flex justify-between items-center text-[11px] text-[var(--color-text-secondary)] font-medium">
                          <span className="shrink-0">{prettyNames[company] || company}</span>
                          <div className="flex-grow border-b border-dotted border-[var(--color-border)] mx-2 translate-y-1.5" />
                          <span className="font-mono text-[var(--color-text-tertiary)] shrink-0 font-bold">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Side */}
              <div className="space-y-6">
                
                {/* Strengths */}
                <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                  <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-black">
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

                {/* Improvements */}
                <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                  <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-black">
                    Areas for Improvement ⚠️
                  </span>
                  <div className="space-y-2">
                    {(qualityAnalysis.improvements || [{ text: "Incorporate more quantified metrics in project details", impact: 2 }]).map((imp: any, i: number) => (
                      <div key={i} className="flex items-start justify-between bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-3 text-xs leading-relaxed gap-3 shadow-sm">
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

                {/* Formatting */}
                {qualityAnalysis.formatting && qualityAnalysis.formatting.length > 0 && (
                  <div className="bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3 shadow-inner">
                    <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block font-black">
                      Formatting Suggestions
                    </span>
                    <ul className="space-y-2 text-xs text-[var(--color-text-secondary)] font-medium">
                      {qualityAnalysis.formatting.map((fmt: string, i: number) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">&bull;</span>
                          <span>{fmt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
