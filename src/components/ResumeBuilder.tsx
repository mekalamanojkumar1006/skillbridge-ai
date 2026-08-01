import React, { useState } from "react";
import { FileText, Sparkles, Plus, Trash2, Download, Copy, Check, RefreshCw, Eye, Award } from "lucide-react";
import { ApiService } from "../services/api";
import { jsPDF } from "jspdf";

interface ResumeBuilderProps {
  user: any;
  resume: any;
  onSaveResume?: (newResume: any) => void;
}

export default function ResumeBuilder({ user, resume, onSaveResume }: ResumeBuilderProps) {
  const [formData, setFormData] = useState({
    name: resume?.parsedData?.name || user?.displayName || "",
    email: resume?.parsedData?.email || user?.email || "",
    phone: resume?.parsedData?.phone || "",
    role: resume?.parsedData?.role || "Software Engineer",
    summary: resume?.parsedData?.summary || "Results-driven Software Engineer with hands-on experience building scalable web applications and REST APIs.",
    skills: Array.isArray(resume?.parsedData?.skills) ? resume.parsedData.skills.join(", ") : (typeof resume?.parsedData?.skills === "object" ? Object.values(resume.parsedData.skills).flat().join(", ") : "JavaScript, React, Node.js, TypeScript, Python, HTML/CSS, Git, REST APIs"),
    experience: resume?.parsedData?.experience || [
      { role: "Software Developer", company: "Tech Solutions Inc.", duration: "2023 - Present", description: "Architected scalable frontend modules using React and Redux, reducing page load latency by 35%." }
    ],
    education: resume?.parsedData?.education || [
      { degree: "B.Tech in Computer Science", institution: "State University", duration: "2019 - 2023", fieldOfStudy: "Computer Science" }
    ]
  });

  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAiSummary = async () => {
    setGeneratingSummary(true);
    try {
      const res = await ApiService.rewriteResumeContent({
        textToRewrite: formData.summary,
        sectionType: "Executive Summary",
        rewriteMode: "action-verbs"
      });
      if (res.variations && res.variations[0]) {
        setFormData(prev => ({ ...prev, summary: res.variations[0].text }));
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleAddExp = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { role: "Software Engineer", company: "Company Name", duration: "2023 - 2024", description: "Developed scalable software solutions..." }]
    }));
  };

  const handleRemoveExp = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(formData.name || "Candidate Name", 15, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${formData.email} | ${formData.phone} | ${formData.role}`, 15, 28);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("EXECUTIVE SUMMARY", 15, 40);
    doc.line(15, 42, 195, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const sumLines = doc.splitTextToSize(formData.summary, 180);
    doc.text(sumLines, 15, 48);
    
    let y = 48 + sumLines.length * 5 + 8;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("TECHNICAL SKILLS", 15, y);
    doc.line(15, y + 2, 195, y + 2);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const skillLines = doc.splitTextToSize(formData.skills, 180);
    doc.text(skillLines, 15, y);
    y += skillLines.length * 5 + 8;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("WORK EXPERIENCE", 15, y);
    doc.line(15, y + 2, 195, y + 2);
    y += 8;
    
    formData.experience.forEach((exp: any) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`${exp.role} - ${exp.company}`, 15, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(exp.duration || "", 160, y);
      y += 5;
      if (exp.description) {
        const expLines = doc.splitTextToSize(exp.description, 180);
        doc.text(expLines, 15, y);
        y += expLines.length * 5 + 4;
      }
    });

    doc.save(`${(formData.name || "Resume").replace(/\s+/g, "_")}_ATS_Resume.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6 sm:p-8 space-y-2">
        <h2 className="text-lg font-mono uppercase tracking-wider font-black flex items-center space-x-2.5">
          <FileText className="w-5 h-5 text-[#6D5DF6]" />
          <span>AI ATS-Friendly Resume Builder</span>
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-sans font-medium">
          Create, edit, and export ATS-optimized resumes with real-time score feedback and AI text enhancement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Editor Panel */}
        <div className="glass-card p-6 space-y-5">
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] border-b border-[var(--color-border)] pb-2">
            Resume Form Editor
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Target Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">Executive Summary</label>
              <button
                type="button"
                onClick={handleAiSummary}
                disabled={generatingSummary}
                className="text-[9px] font-mono font-bold text-[#6D5DF6] hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                <span>{generatingSummary ? "Enhancing..." : "AI Enhance"}</span>
              </button>
            </div>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              rows={4}
              className="w-full clay-input px-3.5 py-2.5 text-xs text-[var(--color-text-primary)] focus:outline-none resize-none font-sans"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold block mb-1">Technical Skills (Comma Separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="w-full clay-input px-3.5 py-2 text-xs text-[var(--color-text-primary)] focus:outline-none"
            />
          </div>

          {/* Work Experience Repeater */}
          <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">Work Experience ({formData.experience.length})</label>
              <button
                type="button"
                onClick={handleAddExp}
                className="text-[9px] font-mono font-bold text-emerald-500 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Position</span>
              </button>
            </div>

            {formData.experience.map((exp: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]/40 space-y-2 relative">
                <button
                  type="button"
                  onClick={() => handleRemoveExp(idx)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="grid grid-cols-2 gap-2 pr-6">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const next = [...formData.experience];
                      next[idx].role = e.target.value;
                      setFormData({ ...formData, experience: next });
                    }}
                    placeholder="Role"
                    className="clay-input px-2.5 py-1.5 text-[11px] text-[var(--color-text-primary)]"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const next = [...formData.experience];
                      next[idx].company = e.target.value;
                      setFormData({ ...formData, experience: next });
                    }}
                    placeholder="Company"
                    className="clay-input px-2.5 py-1.5 text-[11px] text-[var(--color-text-primary)]"
                  />
                </div>

                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const next = [...formData.experience];
                    next[idx].description = e.target.value;
                    setFormData({ ...formData, experience: next });
                  }}
                  placeholder="Responsibilities & Accomplishments"
                  rows={2}
                  className="w-full clay-input px-2.5 py-1.5 text-[11px] text-[var(--color-text-primary)] resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="glass-card p-6 space-y-4 flex flex-col justify-between min-h-[550px]">
          <div>
            <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2 mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-[#6D5DF6]" />
                <span>Live ATS Document Preview</span>
              </h3>
              <button
                onClick={handleExportPdf}
                className="px-3 py-1.5 clay-btn clay-btn-primary text-[9.5px] font-mono uppercase font-bold text-white flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Export ATS PDF</span>
              </button>
            </div>

            <div className="p-6 rounded-xl border border-gray-300 dark:border-gray-800 bg-white text-gray-900 font-sans space-y-4 shadow-inner text-xs leading-relaxed">
              <div className="border-b pb-3 border-gray-200">
                <h1 className="text-lg font-black text-gray-900 uppercase tracking-tight">{formData.name || "YOUR NAME"}</h1>
                <p className="text-[10px] font-mono text-gray-600 font-bold mt-0.5">{formData.role || "Target Role"} | {formData.email} | {formData.phone}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1.5">EXECUTIVE SUMMARY</h4>
                <p className="text-[11px] text-gray-700 font-medium">{formData.summary}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1.5">TECHNICAL SKILLS</h4>
                <p className="text-[11px] text-gray-700 font-medium font-mono">{formData.skills}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1.5">WORK EXPERIENCE</h4>
                <div className="space-y-3">
                  {formData.experience.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between font-bold text-gray-900 text-[11px]">
                        <span>{exp.role} - {exp.company}</span>
                        <span className="font-mono text-[10px] text-gray-500">{exp.duration}</span>
                      </div>
                      <p className="text-[10.5px] text-gray-600 font-normal mt-0.5">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
