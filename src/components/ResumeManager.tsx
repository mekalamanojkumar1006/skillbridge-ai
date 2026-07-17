import React, { useState, useEffect, useRef } from "react";
import { ApiService } from "../services/api";
import { FileText, Plus, Edit2, Trash2, Copy, Check, CheckCircle2, ChevronRight, AlertCircle, Download, FilePlus, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

interface Resume {
  id: string;
  fileName: string;
  content: string;
  parsedData?: {
    name?: string;
    email?: string;
    skills?: any;
    experience?: any[];
  };
  atsScore?: number;
  createdAt: string;
}

interface ResumeManagerProps {
  userId: string;
  activeResume: any;
  onSelectResume: (resume: any) => void;
}

export default function ResumeManager({ userId, activeResume, onSelectResume }: ResumeManagerProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getFlatSkillsCount = (skillsObj: any): number => {
    if (!skillsObj) return 0;
    if (Array.isArray(skillsObj)) return skillsObj.length;
    if (typeof skillsObj === "object") {
      return Object.values(skillsObj).flat().filter(Boolean).length;
    }
    return 0;
  };

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [usePasteMode, setUsePasteMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await ApiService.getResumes();
      setResumes(res.resumes || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load resumes. Showing mock fallback.");
      // Fallback resumes
      setResumes([
        {
          id: "mock1",
          fileName: "Jane_Doe_React_Developer.txt",
          content: "Jane Doe. Web Developer. Skills: React, Redux, Node, Jest. Experience at AWS.",
          createdAt: new Date().toISOString(),
          parsedData: { name: "Jane Doe", email: "jane@example.com", skills: ["React", "Redux", "Node", "Jest"] }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    let dataToUpload: string | File = "";
    let nameToUpload = "";

    if (usePasteMode) {
      if (!pasteText.trim()) {
        setError("Please paste resume text.");
        return;
      }
      dataToUpload = pasteText;
      nameToUpload = `pasted_resume_${Date.now().toString().slice(-4)}.txt`;
    } else {
      if (!file) {
        setError("Please browse a text or word file.");
        return;
      }
      dataToUpload = file;
      nameToUpload = file.name;
    }

    setUploading(true);
    try {
      const result = await ApiService.uploadResume(userId, nameToUpload, dataToUpload);
      setSuccess("Resume uploaded successfully!");
      setFile(null);
      setPasteText("");
      // Select the new resume as active immediately
      onSelectResume(result);
      fetchResumes();
    } catch (err: any) {
      setError(err.message || "Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResume || !renameValue.trim()) return;
    try {
      await ApiService.renameResume(editingResume.id, renameValue);
      setSuccess("Resume renamed successfully.");
      setEditingResume(null);
      fetchResumes();
    } catch (err) {
      setError("Failed to rename resume.");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await ApiService.duplicateResume(id);
      setSuccess("Resume duplicated successfully.");
      fetchResumes();
    } catch (err) {
      setError("Failed to duplicate resume.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    try {
      await ApiService.deleteResume(id);
      setSuccess("Resume deleted successfully.");
      if (activeResume?.id === id) {
        onSelectResume(null);
      }
      fetchResumes();
    } catch (err) {
      setError("Failed to delete resume.");
    }
  };

  const handleDownloadPDF = (res: Resume) => {
    try {
      const doc = new jsPDF();
      doc.setFont("courier", "normal");
      doc.setFontSize(10);
      
      const contentText = res.content || `Parsed Resume: ${res.fileName}\nSkills: ${res.parsedData?.skills?.join(", ") || ""}`;
      const splitText = doc.splitTextToSize(contentText, 180);
      
      doc.text(splitText, 15, 15);
      doc.save(`${res.fileName.replace(/\.[^/.]+$/, "")}.pdf`);
      setSuccess("PDF download started.");
    } catch (err) {
      setError("Failed to generate PDF.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else if (e.type === "dragleave") setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Panel */}
      <div className="relative glass-card p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-tr from-[#6D5DF6]/12 to-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center space-x-3">
              <span>My Resumes</span>
              <span className="text-[10px] px-2.5 py-0.5 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] rounded-lg font-mono font-bold uppercase tracking-wider">
                Multi-Resume Mode
              </span>
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
              Upload multiple resumes to target different career paths and compare their keyword compatibility.
            </p>
          </div>
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-5 py-3 clay-btn clay-btn-secondary text-xs font-mono uppercase tracking-wider font-semibold shadow-md flex items-center space-x-2"
          >
            <Layers className="w-4 h-4" />
            <span>Compare ATS Scores</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold">
          <AlertCircle className="w-4.5 h-4.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start space-x-2.5 text-xs font-semibold">
          <CheckCircle2 className="w-4.5 h-4.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form Block */}
        <div className="glass-card p-6 space-y-5 h-fit">
          <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black flex items-center space-x-2">
            <Plus className="w-4 h-4 text-[#6D5DF6]" />
            <span>Upload New Resume</span>
          </h3>

          <div className="flex space-x-4 border-b border-[var(--color-border)] pb-2 text-[10px] font-mono">
            <button
              onClick={() => setUsePasteMode(false)}
              className={`pb-1 font-bold ${!usePasteMode ? "text-[#6D5DF6] border-b border-[#6D5DF6]" : "text-[var(--color-text-secondary)]"}`}
            >
              Browse File
            </button>
            <button
              onClick={() => setUsePasteMode(true)}
              className={`pb-1 font-bold ${usePasteMode ? "text-[#6D5DF6] border-b border-[#6D5DF6]" : "text-[var(--color-text-secondary)]"}`}
            >
              Paste Text
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            {!usePasteMode ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition duration-200 flex flex-col items-center justify-center space-y-2.5 ${
                  isDragActive ? "border-[#6D5DF6] bg-[#6D5DF6]/5" : "border-[var(--color-border)] hover:border-[#6D5DF6]/40"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                  accept=".txt,.md,.pdf,.docx"
                />
                <FilePlus className="w-8 h-8 text-[var(--color-text-tertiary)]" />
                <div className="text-[11px] font-mono text-[var(--color-text-secondary)]">
                  {file ? (
                    <span className="text-[#6D5DF6] font-bold">{file.name}</span>
                  ) : (
                    <span>Drag and drop here or <span className="underline">browse</span></span>
                  )}
                </div>
                <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase font-semibold">Supports .txt, .md, .pdf, .docx</span>
              </div>
            ) : (
              <div className="space-y-2 font-mono">
                <textarea
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  rows={6}
                  placeholder="Paste your plain text resume details here..."
                  className="w-full p-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none text-xs resize-none font-sans"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3.5 clay-btn clay-btn-primary text-xs uppercase tracking-wider font-semibold text-white shadow-md flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Upload and Parse</span>
              )}
            </button>
          </form>
        </div>

        {/* Resumes List Block */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider font-black flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#8B5CF6]" />
            <span>All Resumes ({resumes.length})</span>
          </h3>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-3">
              <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-xs font-mono text-[var(--color-text-secondary)]">Fetching resumes...</span>
            </div>
          ) : resumes.length === 0 ? (
            <div className="glass-card p-10 text-center flex flex-col items-center justify-center space-y-3">
              <FileText className="w-10 h-10 opacity-20 text-[var(--color-text-tertiary)]" />
              <span className="text-xs font-mono text-[var(--color-text-secondary)]">No resumes found. Upload one to get started.</span>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map(res => {
                const isActive = activeResume?.id === res.id;
                return (
                  <div
                    key={res.id}
                    className={`glass-card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition duration-200 border ${
                      isActive ? "border-[#6D5DF6]/50 bg-[#6D5DF6]/5 shadow-indigo-500/5" : "border-[var(--color-glass-border)]"
                    }`}
                  >
                    <div className="flex items-center space-x-4 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? "bg-[#6D5DF6]/15 text-[#6D5DF6]" : "bg-transparent text-[var(--color-text-secondary)]"}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 font-mono">
                        <span className="text-xs font-extrabold truncate block text-[var(--color-text-primary)]">{res.fileName}</span>
                        <span className="text-[9px] text-[var(--color-text-tertiary)] block mt-0.5">
                          Uploaded: {new Date(res.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                      {!isActive ? (
                        <button
                          onClick={() => onSelectResume(res)}
                          className="px-3 py-1.5 border border-[var(--color-border)] hover:border-[#6D5DF6]/20 bg-[var(--glass-card-bg)] hover:bg-[#6D5DF6]/5 rounded-xl font-bold cursor-pointer"
                        >
                          Set Primary
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl font-bold flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Primary Active</span>
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setEditingResume(res);
                          setRenameValue(res.fileName);
                        }}
                        className="p-2 border border-[var(--color-border)] hover:border-[#8B5CF6]/20 bg-[var(--glass-card-bg)] hover:bg-[#8B5CF6]/5 rounded-xl cursor-pointer"
                        title="Rename"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDuplicate(res.id)}
                        className="p-2 border border-[var(--color-border)] hover:border-[#8B5CF6]/20 bg-[var(--glass-card-bg)] hover:bg-[#8B5CF6]/5 rounded-xl cursor-pointer"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDownloadPDF(res)}
                        className="p-2 border border-[var(--color-border)] hover:border-emerald-500/20 bg-[var(--glass-card-bg)] hover:bg-emerald-500/5 rounded-xl cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-2 border border-[var(--color-border)] hover:border-red-500/20 bg-[var(--glass-card-bg)] hover:bg-red-500/5 rounded-xl cursor-pointer text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Rename Dialog Modal */}
      <AnimatePresence>
        {editingResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[3px] animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-sm p-6 space-y-4 text-left relative overflow-hidden"
            >
              <button
                onClick={() => setEditingResume(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xs font-mono uppercase tracking-wider font-black">Rename Resume File</h3>

              <form onSubmit={handleRename} className="space-y-4 text-xs font-mono">
                <input
                  type="text"
                  required
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/50 focus:border-[#6D5DF6] focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 clay-btn clay-btn-primary uppercase tracking-wider font-semibold text-white shadow-md"
                >
                  Save Name
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compare ATS Scores Side-by-Side Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[3px] animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-2xl p-6 space-y-5 text-left relative overflow-hidden"
            >
              <button
                onClick={() => setShowCompareModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-red-500/10 text-[var(--color-text-secondary)] hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-[var(--color-border)] pb-3">
                <h3 className="text-sm font-mono uppercase tracking-wider font-black flex items-center space-x-2">
                  <Layers className="w-4.5 h-4.5 text-[#6D5DF6]" />
                  <span>Resume Comparison Matrix</span>
                </h3>
              </div>

              {(() => {
                const sorted = [...resumes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                if (sorted.length < 2) {
                  return (
                    <div className="p-8 text-center space-y-3">
                      <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                      <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
                        Upload another resume to compare ATS improvements.
                      </p>
                    </div>
                  );
                }

                const current = activeResume || sorted[0];
                const previous = sorted.find(r => r.id !== current?.id) || sorted[1];

                const currentSkillsCount = getFlatSkillsCount(current.parsedData?.skills);
                const previousSkillsCount = getFlatSkillsCount(previous.parsedData?.skills);

                const currentScore = current.atsScore !== undefined ? current.atsScore : 50;
                const previousScore = previous.atsScore !== undefined ? previous.atsScore : 50;

                const currentLength = current.content?.length || 0;
                const previousLength = previous.content?.length || 0;

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 border-b border-[var(--color-border)] pb-2 text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase">
                      <div>Metric</div>
                      <div className="text-indigo-500">Current ({current.fileName})</div>
                      <div className="text-[var(--color-text-secondary)] font-bold">Previous ({previous.fileName})</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-b border-[var(--color-border)]/45 py-2 text-[11px] font-mono">
                      <div className="text-[var(--color-text-secondary)] font-bold">ATS Score</div>
                      <div className="text-indigo-500 font-extrabold text-xs">{currentScore}%</div>
                      <div className="text-[var(--color-text-primary)] font-bold">{previousScore}%</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-b border-[var(--color-border)]/45 py-2 text-[11px] font-mono">
                      <div className="text-[var(--color-text-secondary)] font-bold">Skills Count</div>
                      <div className="text-indigo-500 font-extrabold text-xs">{currentSkillsCount} Skills</div>
                      <div className="text-[var(--color-text-primary)] font-bold">{previousSkillsCount} Skills</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-b border-[var(--color-border)]/45 py-2 text-[11px] font-mono">
                      <div className="text-[var(--color-text-secondary)] font-bold">Word Length</div>
                      <div className="text-indigo-500 font-extrabold text-xs">{currentLength} chars</div>
                      <div className="text-[var(--color-text-primary)] font-bold">{previousLength} chars</div>
                    </div>
                    
                    <div className="pt-2 text-[10px] text-[var(--color-text-tertiary)] font-sans italic">
                      * Uploading new resumes automatically computes matching coefficients. Target roles will leverage these comparison models.
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
