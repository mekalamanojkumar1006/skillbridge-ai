import React, { useState } from "react";
import { FileSearch, Sparkles, RefreshCw, CheckCircle2, AlertCircle, Target, Copy, Check } from "lucide-react";
import { ApiService } from "../services/api";

interface JobDescriptionAnalyzerProps {
  user: any;
  resume: any;
}

export default function JobDescriptionAnalyzer({ user, resume }: JobDescriptionAnalyzerProps) {
  const [jobDescInput, setJobDescInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await ApiService.getAtsScore(
        resume?.id || "demo",
        jobDescInput,
        user?.uid || ""
      );
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError("Failed to analyze job description: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOptimized = () => {
    if (!result) return;
    const keywords = [...(result.keywordsMatched || []), ...(result.missingKeywords || [])].join(", ");
    navigator.clipboard.writeText(keywords).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <FileSearch className="w-5 h-5 text-sky-500" />
          <span>AI Job Description Analyzer &amp; ATS Keyword Intelligence</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Paste any job posting to extract key requirements, ATS keywords, culture signals, and tailor your resume to the role.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2">
            Job Description Input
          </h3>

          {!resume && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-[10px] font-mono font-bold flex items-center space-x-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Upload a resume to enable full ATS resume-to-JD comparison.</span>
            </div>
          )}

          <textarea
            value={jobDescInput}
            onChange={(e) => setJobDescInput(e.target.value)}
            placeholder="Paste the complete job description here — include responsibilities, requirements, and qualifications..."
            rows={14}
            required
            className="w-full clay-input px-4 py-3.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none leading-relaxed resize-none font-sans font-medium"
          />

          <button
            type="submit"
            disabled={loading || !jobDescInput.trim()}
            className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Parsing Job Intelligence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Job Description</span>
              </>
            )}
          </button>
        </form>

        {/* Results Panel */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Match Score Card */}
              <div className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] flex items-center space-x-2">
                    <Target className="w-4 h-4 text-sky-500" />
                    <span>ATS Match Score</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-black ${
                      (result.score || 0) >= 80 ? "text-emerald-500" :
                      (result.score || 0) >= 60 ? "text-[#6D5DF6]" : "text-amber-500"
                    }`}>
                      {result.score || 0}%
                    </span>
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-2 bg-[var(--color-bg-page)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      (result.score || 0) >= 80 ? "bg-emerald-500" :
                      (result.score || 0) >= 60 ? "bg-[#6D5DF6]" : "bg-amber-500"
                    }`}
                    style={{ width: `${result.score || 0}%` }}
                  />
                </div>

                {result.verdict && (
                  <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium leading-relaxed bg-[var(--color-bg-page)]/60 border border-[var(--color-border)] rounded-xl p-3">
                    {result.verdict}
                  </p>
                )}
              </div>

              {/* Keywords Panels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <div className="glass-card p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9.5px] font-mono text-emerald-500 uppercase font-black flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Matched Keywords ({(result.keywordsMatched || []).length})</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto custom-scrollbar">
                    {(result.keywordsMatched || []).length > 0
                      ? result.keywordsMatched.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded text-[9px] font-mono font-bold">
                            {kw}
                          </span>
                        ))
                      : <span className="text-[10px] text-[var(--color-text-tertiary)] italic">None matched</span>
                    }
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="glass-card p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9.5px] font-mono text-red-400 uppercase font-black flex items-center space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Missing Keywords ({(result.missingKeywords || []).length})</span>
                    </span>
                    <button
                      onClick={handleCopyOptimized}
                      className="text-[9px] font-mono font-bold text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] flex items-center space-x-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied!" : "Copy all"}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto custom-scrollbar">
                    {(result.missingKeywords || []).length > 0
                      ? result.missingKeywords.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-[9px] font-mono font-bold">
                            {kw}
                          </span>
                        ))
                      : <span className="text-[10px] text-[var(--color-text-tertiary)] italic">Great coverage!</span>
                    }
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-3 opacity-60 min-h-[400px]">
              <FileSearch className="w-12 h-12 text-[var(--color-text-tertiary)]" />
              <p className="text-xs font-mono">Paste a job description and click Analyze to view keyword intelligence and ATS match scores.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
