import React, { useState } from "react";
import { Code, Sparkles, Copy, Check, Eye, Download, Layout, RefreshCw, AlertCircle } from "lucide-react";
import { ApiService } from "../services/api";

interface PortfolioGeneratorProps {
  user: any;
  resume: any;
}

export default function PortfolioGenerator({ user, resume }: PortfolioGeneratorProps) {
  const [theme, setTheme] = useState("Dark Glassmorphism");
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "readme">("preview");
  const [loading, setLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState<string | null>(null);
  const [readmeMarkdown, setReadmeMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const skills = resume?.parsedData?.skills
        ? Array.isArray(resume.parsedData.skills)
          ? resume.parsedData.skills
          : Object.values(resume.parsedData.skills).flat()
        : ["React", "TypeScript", "Node.js", "Python"];

      const res = await ApiService.generatePortfolio({
        candidateName: resume?.parsedData?.name || user?.displayName || "Professional Candidate",
        targetRole: resume?.parsedData?.role || "Software Engineer",
        skills,
        experience: resume?.parsedData?.experience || [],
        projects: resume?.parsedData?.projects || [],
        theme
      });

      if (!res || !res.htmlCode) {
        throw new Error("API returned empty portfolio code");
      }

      setHtmlCode(res.htmlCode);
      setReadmeMarkdown(res.readmeMarkdown);
      setActiveTab("preview");
      setRetryCount(0);
    } catch (err: any) {
      console.error("Portfolio Generator Error:", err);
      const msg = err.message || "Failed to generate portfolio code";
      setError(msg);

      // Auto retry once if network or transient failure
      if (retryCount < 1) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => {
          handleGenerate();
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = activeTab === "readme" ? readmeMarkdown : htmlCode;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToDownload = activeTab === "readme" ? readmeMarkdown : htmlCode;
    const fileName = activeTab === "readme" ? "README.md" : "index.html";
    const mimeType = activeTab === "readme" ? "text/markdown" : "text/html";
    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <Code className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI Deploy-Ready Portfolio &amp; README Generator</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Generate complete HTML/Tailwind single-page portfolio code and GitHub profile README markdown from your parsed candidate profile.
        </p>
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-semibold">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-red-500 text-white rounded-xl text-[10.5px] font-mono uppercase font-bold shrink-0 hover:bg-red-600 transition cursor-pointer"
          >
            Retry Portfolio Generation
          </button>
        </div>
      )}

      {/* Control Panel */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-xs font-mono text-[var(--color-text-tertiary)] uppercase font-bold shrink-0">Color Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none w-full sm:w-60 cursor-pointer"
          >
            <option value="Dark Glassmorphism">Dark Glassmorphism (Default)</option>
            <option value="Cyberpunk Neon">Cyberpunk Neon</option>
            <option value="Minimal Executive Light">Minimal Executive Light</option>
            <option value="Emerald Tech Modern">Emerald Tech Modern</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Portfolio Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{htmlCode ? "Regenerate Portfolio" : "Generate Portfolio & README"}</span>
            </>
          )}
        </button>
      </div>

      {/* Code / Live Preview Viewer */}
      {(htmlCode || readmeMarkdown) && (
        <div className="glass-card p-6 space-y-4">
          
          {/* Viewer Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === "preview"
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live View</span>
              </button>
              <button
                onClick={() => setActiveTab("html")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === "html"
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>index.html</span>
              </button>
              <button
                onClick={() => setActiveTab("readme")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer flex items-center space-x-1.5 ${
                  activeTab === "readme"
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>README.md</span>
              </button>
            </div>

            {/* Actions: Copy & Download */}
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 clay-btn clay-btn-secondary text-[10px] font-mono uppercase font-bold flex items-center space-x-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3.5 py-2 clay-btn clay-btn-primary text-[10px] font-mono uppercase font-bold text-white flex items-center space-x-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{activeTab === "readme" ? "Download README.md" : "Download index.html"}</span>
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === "preview" ? (
            <div className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl bg-slate-950">
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="ml-2 font-bold text-slate-300">Live Single Page App Viewport</span>
                </span>
                <span>Stand-alone HTML + Tailwind CSS</span>
              </div>
              <iframe
                title="Portfolio Live Preview"
                srcDoc={htmlCode || ""}
                className="w-full h-[520px] bg-slate-950 border-0"
              />
            </div>
          ) : (
            <textarea
              value={activeTab === "html" ? htmlCode || "" : readmeMarkdown || ""}
              onChange={(e) =>
                activeTab === "html" ? setHtmlCode(e.target.value) : setReadmeMarkdown(e.target.value)
              }
              rows={18}
              className="w-full bg-slate-950 text-emerald-400 font-mono p-4 rounded-xl text-xs leading-relaxed focus:outline-none border border-slate-800 custom-scrollbar resize-none shadow-inner"
            />
          )}

        </div>
      )}
    </div>
  );
}
