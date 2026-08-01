import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, User, Mail, Phone, Award, Briefcase, FileText, CheckCircle2, ChevronRight, Sun, Moon } from "lucide-react";
import { ApiService } from "../services/api";
import { ResponsiveContainer as RechartsResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import ResponsiveContainer from "../components/ResponsiveContainer";

interface AnalysisPageProps {
  user: any;
  resume: any;
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function AnalysisPage({ user, resume, onNavigate, theme, setTheme }: AnalysisPageProps) {
  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-page)] text-[var(--color-text-primary)]">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">
            No resume parsing active...
          </span>
          <button
            onClick={() => onNavigate("upload")}
            className="px-4 py-2.5 clay-btn clay-btn-primary text-xs font-mono uppercase font-bold text-white shadow-sm"
          >
            Start Parsing
          </button>
        </div>
      </div>
    );
  }

  const parsed = resume.parsedData || {};

  // Mock scoring attributes for graphical visual representation
  const graphData = [
    { name: "Grammar", score: 88, fill: "#6D5DF6" },
    { name: "Formals", score: 92, fill: "#8B5CF6" },
    { name: "Keywords", score: 81, fill: "#22C55E" },
    { name: "Layout", score: 95, fill: "#3B82F6" },
    { name: "Density", score: 78, fill: "#F59E0B" }
  ];

  // Centralized ATS analysis state
  const [analysis, setAnalysis] = useState<any>(() => {
    if (!resume) return null;
    const scoreVal = typeof resume.atsScore === 'number' ? resume.atsScore : (typeof resume.score === 'number' ? resume.score : (typeof resume.qualityScore === 'number' ? resume.qualityScore : undefined));
    if (scoreVal !== undefined) {
      console.log("Frontend received atsScore:", scoreVal);
      console.log("Frontend rendered atsScore:", scoreVal);
      return {
        atsScore: scoreVal,
        resumeHealth: resume.resumeHealth || (scoreVal >= 90 ? "Excellent" : scoreVal >= 75 ? "Good" : scoreVal >= 60 ? "Average" : "Needs Improvement"),
        strengths: Array.isArray(resume.strengths) ? resume.strengths : ["ATS-compatible structure detected", "Technical skills section present"],
        improvements: Array.isArray(resume.recommendations) ? resume.recommendations : (Array.isArray(resume.improvements) ? resume.improvements : [{ text: "Add more role-specific keywords", impact: 3 }]),
        missingKeywords: Array.isArray(resume.missingKeywords) ? resume.missingKeywords : [],
        formattingIssues: Array.isArray(resume.formattingIssues) ? resume.formattingIssues : ["Ensure consistent spacing between sections"],
        raw: resume
      };
    }
    return null;
  });
  const [atsLoading, setAtsLoading] = useState<boolean>(false);
  const [atsError, setAtsError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchAnalysis = async () => {
      if (!resume) {
        setAnalysis(null);
        setAtsLoading(false);
        setAtsError(null);
        return;
      }
      if (!analysis) {
        setAtsLoading(true);
      }
      setAtsError(null);
      try {
        const res = await ApiService.analyzeQuality(resume.id, user?.uid || "");
        if (!mounted) return;
        const fetchedScore = typeof res.atsScore === 'number' ? res.atsScore : (typeof res.score === 'number' ? res.score : (typeof res.qualityScore === 'number' ? res.qualityScore : undefined));
        if (fetchedScore !== undefined) {
          console.log("Frontend received atsScore:", fetchedScore);
          console.log("Frontend rendered atsScore:", fetchedScore);
        }
        const safe = {
          atsScore: fetchedScore,
          resumeHealth: res.resumeHealth || (typeof fetchedScore === 'number' ? (fetchedScore >= 90 ? "Excellent" : fetchedScore >= 75 ? "Good" : fetchedScore >= 60 ? "Average" : "Needs Improvement") : undefined),
          strengths: Array.isArray(res.strengths) ? res.strengths : (res.strengths ? [res.strengths] : []),
          improvements: Array.isArray(res.improvements) ? res.improvements : (res.improvements ? res.improvements : []),
          missingKeywords: Array.isArray(res.missingKeywords) ? res.missingKeywords : (res.missingKeywords ? [res.missingKeywords] : []),
          formattingIssues: Array.isArray(res.formattingIssues) ? res.formattingIssues : (res.formatting ? res.formatting : []),
          raw: res
        };
        setAnalysis(safe);
      } catch (e: any) {
        console.warn("Failed to fetch ATS analysis:", e);
        if (!mounted) return;
        if (!analysis) {
          setAnalysis(null);
          setAtsError(e?.message || "Unable to calculate ATS Score.");
        }
      } finally {
        if (mounted) setAtsLoading(false);
      }
    };
    fetchAnalysis();
    return () => { mounted = false; };
  }, [resume?.id]);

  return (
    <div className="min-h-screen relative bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300 font-sans pb-24 overflow-x-hidden">
      
      {/* Background soft blobs */}
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
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
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

      {/* Header controls */}
      <div className="sticky top-0 z-40 border-b border-[var(--color-glass-border)] backdrop-blur-md bg-[var(--glass-card-bg)] shadow-[var(--glass-card-shadow)] h-16 flex items-center px-6 justify-between">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Report</span>
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2.5 rounded-2xl border border-[var(--color-glass-border)] bg-[var(--glass-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      <main className="pt-10 relative z-10 overflow-x-hidden">
        <ResponsiveContainer className="space-y-8">
        
        {/* Title widget */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>Resume Analysis Report</span>
              <span className="text-[10px] px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/25 text-[#22C55E] rounded-lg font-mono font-bold uppercase tracking-wider">
                Synthesized
              </span>
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium">
              Profile File Name: <span className="font-mono text-[#6D5DF6] font-bold">{resume.fileName}</span>
            </p>
          </div>

          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-3.5 clay-btn clay-btn-primary font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 shadow-md"
          >
            <span>Proceed to Workspace</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ATS Score Card */}
        <ATSSummaryCard analysis={analysis} loading={atsLoading} error={atsError} />

        {/* Bento Summary & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Identity Info Panel */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center text-white font-bold shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">{parsed.name || "Candidate Name"}</h3>
                  <p className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase mt-0.5 font-bold">Synthesized Info</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-[var(--color-text-secondary)] font-medium">
                {parsed.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4.5 h-4.5 text-[#6D5DF6] shrink-0" />
                    <span className="truncate">{parsed.email}</span>
                  </div>
                )}
                {parsed.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4.5 h-4.5 text-[#6D5DF6] shrink-0" />
                    <span>{parsed.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[var(--color-border)]">
              <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase block mb-2 font-black">
                Cognitive Verdict
              </span>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-semibold">
                Profile contains structured tech vectors suitable for ATS query validation. Ready for optimization maps.
              </p>
            </div>
          </div>

          {/* Stats Bar Chart */}
          <div className="lg:col-span-2 glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-bold">
                Attribute Scoring Matrix
              </h3>
              <p className="text-[10px] text-[var(--color-text-tertiary)] mb-4 font-semibold">
                Estimated parsing accuracy score index across critical document filters
              </p>
            </div>

            <div className="h-[180px] w-full mt-4 font-mono text-[10px]">
              <RechartsResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} stroke="var(--color-text-tertiary)" fontSize={9} />
                  <YAxis dataKey="name" type="category" stroke="var(--color-text-tertiary)" fontSize={9} width={60} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--clay-card-bg)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text-primary)",
                      borderRadius: "16px",
                      fontSize: "10px"
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={12} />
                </BarChart>
              </RechartsResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="glass-card p-6">
          <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 font-bold border-b border-[var(--color-border)] pb-3">
            Extracted Technical Stack / Skills
          </h3>
          <div className="w-full">
            {parsed.skills && typeof parsed.skills === "object" && !Array.isArray(parsed.skills) ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Object.entries(parsed.skills).map(([category, items]) => {
                  const arr = items as string[];
                  if (!Array.isArray(arr) || arr.length === 0) return null;
                  const displayName = category
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ");
                  return (
                    <div key={category} className="space-y-2 bg-[var(--color-bg-page)]/40 p-4 border border-[var(--color-border)] rounded-2xl">
                      <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider block">
                        {displayName}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {arr.map((skill: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-text-primary)] rounded-xl font-bold shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : parsed.skills && Array.isArray(parsed.skills) && parsed.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {parsed.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-primary)] rounded-xl font-bold shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs text-[var(--color-text-tertiary)] italic">No skills extracted from this file.</span>
            )}
          </div>
        </div>

        {/* Formatting Issues & Recommendations */}
        <div className="glass-card p-6">
          <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 font-bold border-b border-[var(--color-border)] pb-3">
            Recommendations & Formatting Issues
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase font-black mb-2">Formatting Issues</h4>
              <ul className="list-disc ml-4 text-[11px] text-[var(--color-text-primary)]">
                {(analysis?.formattingIssues || []).slice(0,5).map((f: string, i: number) => (
                  <li key={i}>{f}</li>
                ))}
                {!(analysis?.formattingIssues && analysis.formattingIssues.length) && (
                  <li className="text-[11px] text-[var(--color-text-tertiary)]">No formatting issues detected.</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase font-black mb-2">Recommended Improvements</h4>
              <ul className="list-disc ml-4 text-[11px] text-[var(--color-text-primary)]">
                {(analysis?.improvements || []).slice(0,6).map((imp: any, i: number) => (
                  <li key={i}>{typeof imp === 'string' ? imp : imp.text || JSON.stringify(imp)}</li>
                ))}
                {!(analysis?.improvements && analysis.improvements.length) && (
                  <li className="text-[11px] text-[var(--color-text-tertiary)]">No recommendations available yet.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Timelines grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Experience Timeline */}
          <div className="glass-card p-6 space-y-6 flex flex-col">
            <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-extrabold border-b border-[var(--color-border)] pb-3 flex items-center space-x-2">
              <Briefcase className="w-4.5 h-4.5 text-[#6D5DF6]" />
              <span>Professional History</span>
            </h3>

            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {parsed.experience && parsed.experience.length > 0 ? (
                parsed.experience.map((exp: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l border-[var(--color-border)] space-y-1">
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#6D5DF6] shadow-[0_0_8px_rgba(109,93,246,0.5)]" />
                    <span className="text-[9px] font-mono text-[#6D5DF6] uppercase tracking-wider font-bold block">{exp.duration}</span>
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)]">{exp.role}</h4>
                    <h5 className="text-[11px] font-semibold text-[var(--color-text-secondary)]">{exp.company}</h5>
                    <p className="text-[10px] text-[var(--color-text-tertiary)] leading-relaxed mt-1 font-medium font-sans">
                      {exp.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[var(--color-text-tertiary)] italic">
                  No professional history items found.
                </div>
              )}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="glass-card p-6 space-y-6 flex flex-col">
            <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-extrabold border-b border-[var(--color-border)] pb-3 flex items-center space-x-2">
              <Award className="w-4.5 h-4.5 text-[#8B5CF6]" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {parsed.education && parsed.education.length > 0 ? (
                parsed.education.map((edu: any, idx: number) => (
                  <div key={idx} className="relative pl-6 border-l border-[var(--color-border)] space-y-1">
                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                    <span className="text-[9px] font-mono text-[#8B5CF6] uppercase tracking-wider font-bold block">{edu.duration}</span>
                    <h4 className="text-xs font-bold text-[var(--color-text-primary)]">{edu.degree}</h4>
                    <h5 className="text-[11px] font-semibold text-[var(--color-text-secondary)]">
                      {edu.fieldOfStudy} &bull; {edu.institution}
                    </h5>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[var(--color-text-tertiary)] italic">
                  No educational credentials found.
                </div>
              )}
            </div>
          </div>

        </div>
        </ResponsiveContainer>
      </main>
    </div>
  );
}

function ATSSummaryCard({ analysis, loading, error }: { analysis: any; loading: boolean; error: string | null }) {
  const score = analysis?.atsScore ?? analysis?.score ?? analysis?.qualityScore;

  const getColor = (s: number | undefined) => {
    if (s === undefined || s === null) return "text-gray-400";
    if (s >= 90) return "#16A34A"; // green
    if (s >= 75) return "#6D5DF6"; // blue
    if (s >= 60) return "#F59E0B"; // orange
    return "#EF4444"; // red
  };

  const health = analysis?.resumeHealth;

  const circumference = 2 * Math.PI * 36; // radius 36
  const dashOffset = typeof score === "number" ? circumference * (1 - Math.max(0, Math.min(100, score)) / 100) : circumference;

  // UI states
  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="text-sm font-mono text-[var(--color-text-secondary)]">Calculating ATS Score...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-6">
        <div className="text-sm font-mono text-red-500">Unable to calculate ATS Score.</div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className="w-28 h-28 flex items-center justify-center">
          {typeof score === "number" ? (
            <svg width="84" height="84" viewBox="0 0 84 84">
              <circle cx="42" cy="42" r="36" stroke="#E6E7F2" strokeWidth="8" fill="none" />
              <circle
                cx="42"
                cy="42"
                r="36"
                stroke={getColor(score)}
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 42 42)"
              />
              <text x="42" y="46" textAnchor="middle" fontSize="18" fontWeight={700} fill="var(--color-text-primary)">{score}</text>
              <text x="42" y="60" textAnchor="middle" fontSize="9" fill="var(--color-text-tertiary)">/100</text>
            </svg>
          ) : (
            <div className="text-sm font-mono text-[var(--color-text-secondary)]">Calculating ATS Score...</div>
          )}
        </div>

        <div>
          <div className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black">ATS Score</div>
          <div className="text-xl font-extrabold mt-1" style={{ color: typeof score === "number" ? getColor(score) : undefined }}>{typeof score === "number" ? `${score}/100` : "Calculating ATS Score..."}</div>
          <div className="text-sm mt-1 text-[var(--color-text-secondary)]">{health || (typeof score === "number" ? (score >= 90 ? "Excellent" : score >= 75 ? "Good" : score >= 60 ? "Average" : "Needs Improvement") : "Analyzing...")}</div>
        </div>
      </div>

      <div className="w-full md:w-auto border-l md:border-l-0 md:border-l-transparent md:pl-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase font-black">Strengths</div>
            <ul className="text-sm text-[var(--color-text-primary)] list-disc ml-4">
              {(analysis?.strengths || []).slice(0, 4).map((s: string, i: number) => (
                <li key={i} className="text-[11px]">{s}</li>
              ))}
              {(!(analysis?.strengths && analysis.strengths.length)) && <li className="text-[11px] text-[var(--color-text-tertiary)]">No strengths available yet.</li>}
            </ul>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[var(--color-text-secondary)] uppercase font-black">Missing Keywords</div>
            <ul className="text-sm text-[var(--color-text-primary)] list-disc ml-4">
              {(analysis?.missingKeywords || []).slice(0, 6).map((k: string, i: number) => (
                <li key={i} className="text-[11px]">{k}</li>
              ))}
              {(!(analysis?.missingKeywords && analysis.missingKeywords.length)) && <li className="text-[11px] text-[var(--color-text-tertiary)]">No missing keywords detected.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
