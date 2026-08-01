import React, { useState } from "react";
import { RefreshCw, Sparkles, Copy, Check, ArrowRight, Zap, Award } from "lucide-react";
import { ApiService } from "../services/api";

interface ResumeRewriterProps {
  user: any;
  resume: any;
}

export default function ResumeRewriter({ user, resume }: ResumeRewriterProps) {
  const [textToRewrite, setTextToRewrite] = useState("");
  const [sectionType, setSectionType] = useState("Work Experience Bullet");
  const [rewriteMode, setRewriteMode] = useState("action-verbs");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<any[]>([]);
  const [improvedVerbs, setImprovedVerbs] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textToRewrite.trim()) {
      setError("Please enter the bullet point or paragraph to rewrite.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const kwList = targetKeywords ? targetKeywords.split(",").map(s => s.trim()).filter(Boolean) : [];
      const res = await ApiService.rewriteResumeContent({
        textToRewrite,
        sectionType,
        rewriteMode,
        targetKeywords: kwList
      });
      setVariations(res.variations || []);
      setImprovedVerbs(res.improvedVerbs || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to rewrite resume content: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <Zap className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI Resume Rewriter & Bullet Optimizer</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Transform weak resume sentences into high-impact, quantified, ATS-keyword-optimized bullet points.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Form Inputs */}
        <form onSubmit={handleRewrite} className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2">
            Input Content to Enhance
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Section Type</label>
              <select
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
              >
                <option value="Work Experience Bullet">Work Experience Bullet</option>
                <option value="Executive Summary">Executive Summary</option>
                <option value="Project Highlight">Project Highlight</option>
                <option value="Achievement / Award">Achievement / Award</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Rewrite Strategy Mode</label>
              <select
                value={rewriteMode}
                onChange={(e) => setRewriteMode(e.target.value)}
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
              >
                <option value="action-verbs">Action Verbs & Impact</option>
                <option value="quantify-impact">Quantify Business Results</option>
                <option value="ats-keywords">Maximize ATS Keywords</option>
                <option value="concise-executive">Concise Executive Tone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Keywords (Comma Separated)</label>
            <input
              type="text"
              value={targetKeywords}
              onChange={(e) => setTargetKeywords(e.target.value)}
              placeholder="e.g. React, Kubernetes, CI/CD, Agile, Microservices"
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Original Bullet / Text *</label>
            <textarea
              value={textToRewrite}
              onChange={(e) => setTextToRewrite(e.target.value)}
              rows={6}
              placeholder="e.g. Responsible for writing React code and fixing bugs in the company web app..."
              required
              className="w-full clay-input px-3.5 py-3 text-xs text-[var(--color-text-primary)] focus:outline-none resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating AI Rewrites...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Rewrite &amp; Boost ATS Score</span>
              </>
            )}
          </button>
        </form>

        {/* Output Results */}
        <div className="glass-card p-6 space-y-4 min-h-[420px] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2 mb-4">
              AI Generated High-Impact Variations ({variations.length})
            </h3>

            {improvedVerbs.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-1.5 p-3 rounded-xl bg-[#6D5DF6]/5 border border-[#6D5DF6]/15">
                <span className="text-[9px] font-mono text-[#6D5DF6] uppercase font-black mr-1">Action Verbs Injected:</span>
                {improvedVerbs.map((verb, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#6D5DF6]/10 text-[#6D5DF6] text-[9.5px] font-mono font-bold">
                    {verb}
                  </span>
                ))}
              </div>
            )}

            {variations.length > 0 ? (
              <div className="space-y-4">
                {variations.map((v, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 space-y-2 hover:border-[#6D5DF6]/30 transition duration-200">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase font-black text-[#6D5DF6] flex items-center space-x-1">
                        <Award className="w-3 h-3 text-[#6D5DF6]" />
                        <span>{v.version}</span>
                      </span>
                      {v.scoreImpact && (
                        <span className="text-[9px] font-mono font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          {v.scoreImpact}
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-sans font-medium text-[var(--color-text-primary)] leading-relaxed">
                      "{v.text}"
                    </p>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopy(v.text, idx)}
                        className="px-3 py-1.5 clay-btn clay-btn-secondary text-[9px] font-mono uppercase font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIndex === idx ? "Copied" : "Copy Bullet"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 opacity-60">
                <Sparkles className="w-10 h-10 text-[var(--color-text-tertiary)]" />
                <p className="text-xs font-mono">Enter a bullet point and click Rewrite &amp; Boost ATS Score.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
