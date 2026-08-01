import React, { useState } from "react";
import { FileText, Sparkles, Copy, Download, Check, RefreshCw } from "lucide-react";
import { ApiService } from "../services/api";
import jsPDF from "jspdf";

interface CoverLetterGeneratorProps {
  user: any;
  resume: any;
}

export default function CoverLetterGenerator({ user, resume }: CoverLetterGeneratorProps) {
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [targetTone, setTargetTone] = useState("Professional & Enthusiastic");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError("Please enter the target company name.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await ApiService.generateCoverLetter({
        companyName,
        roleTitle: roleTitle || "Target Role",
        targetTone,
        jobDescription,
        candidateProfile: resume?.parsedData || { name: user?.displayName, email: user?.email }
      });
      setCoverLetter(res.coverLetter);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate cover letter: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!coverLetter) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`Cover Letter - ${companyName}`, 15, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(coverLetter, 180);
    doc.text(splitText, 15, 32);
    doc.save(`Cover_Letter_${companyName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <FileText className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI Cover Letter Generator</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Generate custom, high-converting ATS cover letters tailored specifically to job descriptions using Gemini AI.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="glass-card p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2">
            Target Job Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Company Name *</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Google, Accenture, Stripe"
                required
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Writing Tone</label>
            <select
              value={targetTone}
              onChange={(e) => setTargetTone(e.target.value)}
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none"
            >
              <option value="Professional & Enthusiastic">Professional & Enthusiastic</option>
              <option value="Executive & Strategic">Executive & Strategic</option>
              <option value="Tech Startup Bold">Tech Startup Bold</option>
              <option value="Concise Technical">Concise Technical</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Job Description Details *</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={7}
              placeholder="Paste job description requirements and responsibilities here..."
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
                <span>Crafting Custom Cover Letter...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Cover Letter</span>
              </>
            )}
          </button>
        </form>

        {/* Output Preview */}
        <div className="glass-card p-6 space-y-4 min-h-[420px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
                Generated Preview
              </h3>
              {coverLetter && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] hover:text-[#6D5DF6] transition cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[#6D5DF6]/10 text-[var(--color-text-secondary)] hover:text-[#6D5DF6] transition cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {coverLetter ? (
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={14}
                className="w-full bg-[var(--color-bg-page)]/50 border border-[var(--color-border)] p-4 rounded-xl text-xs font-sans leading-relaxed text-[var(--color-text-primary)] focus:outline-none resize-none"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 opacity-60">
                <FileText className="w-10 h-10 text-[var(--color-text-tertiary)]" />
                <p className="text-xs font-mono">Fill in target job parameters and click Generate Cover Letter.</p>
              </div>
            )}
          </div>

          {coverLetter && (
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 clay-btn clay-btn-secondary text-[10px] font-mono uppercase tracking-wider font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 clay-btn clay-btn-primary text-[10px] font-mono uppercase tracking-wider font-bold text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
