import React, { useState } from "react";
import { Code, Sparkles, Copy, Check, Eye, Download, Layout, RefreshCw } from "lucide-react";
import { ApiService } from "../services/api";

interface PortfolioGeneratorProps {
  user: any;
  resume: any;
}

export default function PortfolioGenerator({ user, resume }: PortfolioGeneratorProps) {
  const [theme, setTheme] = useState("Dark Glassmorphism");
  const [activeTab, setActiveTab] = useState<"html" | "readme">("html");
  const [loading, setLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState<string | null>(null);
  const [readmeMarkdown, setReadmeMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const skills = resume?.parsedData?.skills ? (Array.isArray(resume.parsedData.skills) ? resume.parsedData.skills : Object.values(resume.parsedData.skills).flat()) : ["React", "TypeScript", "Node.js", "Python"];
      const res = await ApiService.generatePortfolio({
        candidateName: resume?.parsedData?.name || user?.displayName || "Professional",
        targetRole: resume?.parsedData?.role || "Software Engineer",
        skills,
        experience: resume?.parsedData?.experience || [],
        projects: resume?.parsedData?.projects || [],
        theme
      });
      setHtmlCode(res.htmlCode);
      setReadmeMarkdown(res.readmeMarkdown);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate portfolio: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = activeTab === "html" ? htmlCode : readmeMarkdown;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToDownload = activeTab === "html" ? htmlCode : readmeMarkdown;
    const fileName = activeTab === "html" ? "index.html" : "README.md";
    const mimeType = activeTab === "html" ? "text/html" : "text/markdown";
    if (!textToDownload) return;

    const blob = new Blob([textToDownload], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <Code className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI Deploy-Ready Portfolio &amp; README Generator</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Generate complete HTML/Tailwind single-page portfolio code and GitHub profile README markdown from your parsed resume.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Control Panel */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-xs font-mono text-[var(--color-text-tertiary)] uppercase font-bold shrink-0">Color Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none w-full sm:w-60"
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
          className="w-full sm:w-auto px-6 py-3 clay-btn clay-btn-primary text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center justify-center space-x-2 cursor-pointer"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Portfolio Code...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Portfolio &amp; README</span>
            </>
          )}
        </button>
      </div>

      {/* Code / Preview Viewer */}
      {(htmlCode || readmeMarkdown) && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("html")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  activeTab === "html"
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                }`}
              >
                index.html (HTML/Tailwind)
              </button>
              <button
                onClick={() => setActiveTab("readme")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                  activeTab === "readme"
                    ? "bg-[#6D5DF6] text-white shadow-md"
                    : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                }`}
              >
                README.md (GitHub Profile)
              </button>
            </div>

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
                className="px-3.5 py-2 clay-btn clay-btn-primary text-[10px] font-mono uppercase font-bold text-white flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>

          <textarea
            value={activeTab === "html" ? (htmlCode || "") : (readmeMarkdown || "")}
            onChange={(e) => activeTab === "html" ? setHtmlCode(e.target.value) : setReadmeMarkdown(e.target.value)}
            rows={18}
            className="w-full bg-gray-950 text-emerald-400 font-mono p-4 rounded-xl text-xs leading-relaxed focus:outline-none border border-gray-800 custom-scrollbar resize-none"
          />
        </div>
      )}
    </div>
  );
}
