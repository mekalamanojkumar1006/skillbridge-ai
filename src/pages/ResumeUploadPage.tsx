import React, { useState, useRef } from "react";
import { ApiService } from "../services/api";
import { Upload, FileText, ArrowRight, Clipboard, AlertCircle, Sparkles, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

interface ResumeUploadPageProps {
  userId: string;
  onUploadSuccess: (resume: any) => void;
  onNavigate: (page: string) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function ResumeUploadPage({ userId, onUploadSuccess, onNavigate, theme, setTheme }: ResumeUploadPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [usePasteMode, setUsePasteMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (selectedFile: File) => {
    const ext = selectedFile.name.toLowerCase().split('.').pop();
    const allowedExtensions = ["txt", "md", "pdf", "docx"];
    if (!allowedExtensions.includes(ext || "")) {
      setError("Only plain text (.txt), Markdown (.md), PDF (.pdf), and Word (.docx) files are supported.");
      return;
    }
    setError(null);
    setFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let dataToUpload: string | File = "";
    let nameToUpload = "resume.txt";

    if (usePasteMode) {
      if (!pastedText.trim()) {
        setError("Please paste your resume text before submitting.");
        return;
      }
      dataToUpload = pastedText;
      nameToUpload = "pasted_resume.txt";
    } else {
      if (!file) {
        setError("Please select a file or paste your resume text.");
        return;
      }
      setLoading(true);
      nameToUpload = file.name;
      dataToUpload = file;

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 150);
    }

    setLoading(true);
    try {
      const result = await ApiService.uploadResume(userId, nameToUpload, dataToUpload);
      onUploadSuccess(result);
      onNavigate("analysis");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze resume. Please ensure the file is valid.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-primary)] transition-colors duration-300">
      
      {/* Background Clay Spheres */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-36 h-36 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/10 blur-[3px] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[8%] right-[5%] w-56 h-56 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/10 blur-[5px] pointer-events-none"
      />

      {/* Header controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Workspace Dashboard</span>
        </button>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2.5 rounded-2xl border border-[var(--color-border)] bg-[var(--clay-card-bg)] shadow-[var(--clay-btn-secondary-shadow)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition duration-200 cursor-pointer"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Form container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl clay-card p-8 sm:p-10 relative z-10"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
            <Upload className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">Upload Profile Resume</h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-medium">Let our cognitive agents extract, map, and assess your career matrix</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab selector */}
        <div className="flex border-b border-[var(--color-border)] mb-8">
          <button
            onClick={() => {
              setUsePasteMode(false);
              setError(null);
            }}
            className={`pb-3 text-xs font-mono uppercase tracking-wider font-extrabold border-b-3 px-5 transition duration-200 cursor-pointer ${
              !usePasteMode 
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" 
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Upload File (.PDF, .DOCX)
          </button>
          <button
            onClick={() => {
              setUsePasteMode(true);
              setError(null);
            }}
            className={`pb-3 text-xs font-mono uppercase tracking-wider font-extrabold border-b-3 px-5 transition duration-200 cursor-pointer ${
              usePasteMode 
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" 
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Direct Text Paste
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {!usePasteMode ? (
            /* File Dropzone */
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
              className={`border-3 border-dashed rounded-3xl p-10 text-center cursor-pointer transition duration-300 ${
                isDragActive
                  ? "border-indigo-500 bg-indigo-500/5 text-[var(--color-text-primary)]"
                  : "border-[var(--color-border)] hover:border-indigo-500/30 text-[var(--color-text-secondary)]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                accept=".txt,.md,.pdf,.docx"
                className="hidden"
              />
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-md">
                  <FileText className="w-7 h-7" />
                </div>
                {file ? (
                  <div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)] font-mono">{file.name}</p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-1.5 font-mono">
                      {(file.size / 1024).toFixed(1)} KB &bull; Click/drag to swap
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-extrabold text-[var(--color-text-primary)]">
                      {isDragActive ? "Drop the resume here..." : "Drag & drop your resume file here"}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-2 font-medium leading-relaxed max-w-sm mx-auto">
                      Supports plain text (.txt), Markdown (.md), PDF (.pdf), and Word (.docx) files up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Direct Text Paste Area */
            <div>
              <div className="relative">
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste your complete resume details here, including Name, Contact Info, Skills, Work Experience, and Educational history..."
                  rows={8}
                  disabled={loading}
                  className="w-full clay-input px-4 py-3.5 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none font-sans leading-relaxed resize-y min-h-[160px]"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setPastedText(text);
                    } catch {
                      setError("Clipboard permission denied. Please paste manually.");
                    }
                  }}
                  className="absolute bottom-4 right-4 py-1.5 px-3 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl text-[10px] font-mono text-[var(--color-text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center space-x-1.5 shadow-sm"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  <span>Paste Clipboard</span>
                </button>
              </div>
            </div>
          )}

          {/* Upload Progress Bar */}
          {loading && uploadProgress > 0 && (
            <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden p-[1px]">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 clay-btn clay-btn-primary text-white font-bold text-sm flex items-center justify-center space-x-2.5 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="font-mono text-xs uppercase tracking-wider">Agents parsing profile...</span>
              </span>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
                <span>Initialize AI Resume Synthesis</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
