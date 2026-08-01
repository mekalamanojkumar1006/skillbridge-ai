import React, { useState } from "react";
import { FileText, Sparkles, Plus, Trash2, Download, Copy, Check, RefreshCw, Eye, Award, Printer, Share2, FileCode, Layers } from "lucide-react";
import { ApiService } from "../services/api";
import { jsPDF } from "jspdf";
import { RESUME_TEMPLATES, ResumeTemplate } from "../data/resumeTemplates";
import ResumeTemplateGallery from "./resume-builder/ResumeTemplateGallery";
import ResumeTemplateSelector, { ResumeTheme } from "./resume-builder/ResumeTemplateSelector";

interface ResumeBuilderProps {
  user: any;
  resume: any;
  onSaveResume?: (newResume: any) => void;
}

export default function ResumeBuilder({ user, resume, onSaveResume }: ResumeBuilderProps) {
  // Template & Theme State
  const initialTemplateId = resume?.selectedTemplateId || "classic-ats";
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(
    () => RESUME_TEMPLATES.find((t) => t.id === initialTemplateId) || RESUME_TEMPLATES[0]
  );
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>("light");
  const [showGallery, setShowGallery] = useState<boolean>(true);

  // Form Data State
  const [formData, setFormData] = useState({
    name: resume?.parsedData?.name || user?.displayName || "",
    email: resume?.parsedData?.email || user?.email || "",
    phone: resume?.parsedData?.phone || "",
    role: resume?.parsedData?.role || selectedTemplate.sampleData.role || "Software Engineer",
    summary:
      resume?.parsedData?.summary ||
      selectedTemplate.sampleData.summary ||
      "Results-driven Engineer with hands-on experience building scalable web applications and REST APIs.",
    skills: Array.isArray(resume?.parsedData?.skills)
      ? resume.parsedData.skills.join(", ")
      : typeof resume?.parsedData?.skills === "object"
      ? Object.values(resume.parsedData.skills).flat().join(", ")
      : selectedTemplate.sampleData.skills,
    experience:
      resume?.parsedData?.experience || selectedTemplate.sampleData.experience || [
        {
          role: "Software Developer",
          company: "Tech Solutions Inc.",
          duration: "2023 - Present",
          description: "Architected scalable frontend modules using React and Redux, reducing page load latency by 35%."
        }
      ],
    education:
      resume?.parsedData?.education || selectedTemplate.sampleData.education || [
        {
          degree: "B.Tech in Computer Science",
          institution: "State University",
          duration: "2019 - 2023",
          fieldOfStudy: "Computer Science"
        }
      ]
  });

  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle template selection without losing user-entered data
  const handleSelectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
  };

  // Optional: fill form with template sample data
  const handleApplyTemplateSamples = () => {
    if (!window.confirm("Replace current inputs with sample data for " + selectedTemplate.name + "?")) return;
    setFormData({
      name: formData.name || user?.displayName || "Candidate Name",
      email: formData.email || user?.email || "candidate@example.com",
      phone: formData.phone || "+1 (555) 019-2834",
      role: selectedTemplate.sampleData.role,
      summary: selectedTemplate.sampleData.summary,
      skills: selectedTemplate.sampleData.skills,
      experience: selectedTemplate.sampleData.experience,
      education: selectedTemplate.sampleData.education
    });
  };

  const handleAiSummary = async () => {
    setGeneratingSummary(true);
    try {
      const res = await ApiService.rewriteResumeContent({
        textToRewrite: formData.summary,
        sectionType: "Executive Summary",
        rewriteMode: "action-verbs"
      });
      if (res.variations && res.variations[0]) {
        setFormData((prev) => ({ ...prev, summary: res.variations[0].text }));
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleAddExp = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { role: "Software Engineer", company: "Company Name", duration: "2023 - 2024", description: "Developed scalable software solutions..." }
      ]
    }));
  };

  const handleRemoveExp = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_: any, i: number) => i !== index)
    }));
  };

  // PDF Export
  const handleExportPdf = () => {
    const doc = new jsPDF();
    
    // Theme Colors
    const isDark = selectedTheme === "dark";
    const isPro = selectedTheme === "professional";
    
    const primaryColor = isPro ? "#1E1B4B" : isDark ? "#1E293B" : "#1E293B";
    const accentColor = isPro ? "#4F46E5" : isDark ? "#818CF8" : "#4F46E5";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text(formData.name || "Candidate Name", 15, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(accentColor);
    doc.text(`${formData.role} | ${formData.email} | ${formData.phone}`, 15, 27);

    doc.setDrawColor(accentColor);
    doc.setLineWidth(0.5);
    doc.line(15, 30, 195, 30);

    // Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text("EXECUTIVE SUMMARY", 15, 38);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor("#334155");
    const sumLines = doc.splitTextToSize(formData.summary, 180);
    doc.text(sumLines, 15, 45);

    let y = 45 + sumLines.length * 5 + 6;

    // Technical Skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text("TECHNICAL SKILLS & COMPETENCIES", 15, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor("#334155");
    const skillLines = doc.splitTextToSize(formData.skills, 180);
    doc.text(skillLines, 15, y);
    y += skillLines.length * 5 + 8;

    // Work Experience
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryColor);
    doc.text("PROFESSIONAL EXPERIENCE", 15, y);
    y += 6;

    formData.experience.forEach((exp: any) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(primaryColor);
      doc.text(`${exp.role} — ${exp.company}`, 15, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor("#64748B");
      doc.text(exp.duration || "", 160, y);
      y += 5;
      if (exp.description) {
        doc.setTextColor("#334155");
        const expLines = doc.splitTextToSize(exp.description, 180);
        doc.text(expLines, 15, y);
        y += expLines.length * 5 + 4;
      }
    });

    // Education
    if (y < 250) {
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(primaryColor);
      doc.text("EDUCATION & CREDENTIALS", 15, y);
      y += 6;
      formData.education.forEach((edu: any) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(primaryColor);
        doc.text(`${edu.degree} — ${edu.institution}`, 15, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor("#64748B");
        doc.text(edu.duration || "", 160, y);
        y += 6;
      });
    }

    doc.save(`${(formData.name || "Resume").replace(/\s+/g, "_")}_${selectedTemplate.id}.pdf`);
  };

  // DOCX Export (Word compatible blob)
  const handleExportDocx = () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>${formData.name}</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.5; color: #1e293b;">
        <h1 style="color: #4f46e5; text-transform: uppercase;">${formData.name}</h1>
        <p><b>${formData.role}</b> | ${formData.email} | ${formData.phone}</p>
        <hr/>
        <h3>EXECUTIVE SUMMARY</h3>
        <p>${formData.summary}</p>
        <h3>TECHNICAL SKILLS</h3>
        <p>${formData.skills}</p>
        <h3>WORK EXPERIENCE</h3>
        ${formData.experience
          .map(
            (exp: any) => `
          <p><b>${exp.role} — ${exp.company}</b> (<i>${exp.duration}</i>)<br/>${exp.description}</p>
        `
          )
          .join("")}
        <h3>EDUCATION</h3>
        ${formData.education
          .map(
            (edu: any) => `
          <p><b>${edu.degree} — ${edu.institution}</b> (<i>${edu.duration}</i>)</p>
        `
          )
          .join("")}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(formData.name || "Resume").replace(/\s+/g, "_")}_${selectedTemplate.id}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Share function
  const handleShare = () => {
    const text = `ATS Resume: ${formData.name} (${formData.role})\nSkills: ${formData.skills}\nSummary: ${formData.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic preview background/text classes based on Theme
  const themeBgClass =
    selectedTheme === "dark"
      ? "bg-slate-900 text-slate-100 border-slate-700"
      : selectedTheme === "professional"
      ? "bg-indigo-950/20 text-indigo-950 border-indigo-200"
      : "bg-white text-gray-900 border-gray-300 dark:border-gray-800";

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Resume Template Gallery (Expandable top section) */}
      {showGallery ? (
        <div className="space-y-4">
          <ResumeTemplateGallery
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />
          <div className="flex justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="text-[11px] font-mono font-bold text-[var(--color-text-secondary)] hover:text-[#6D5DF6] underline cursor-pointer"
            >
              Hide Gallery & Continue Editing ▲
            </button>
          </div>
        </div>
      ) : (
        /* Selector Toolbar when gallery is collapsed */
        <ResumeTemplateSelector
          selectedTemplate={selectedTemplate}
          selectedTheme={selectedTheme}
          onSelectTemplate={handleSelectTemplate}
          onSelectTheme={setSelectedTheme}
          onToggleGallery={() => setShowGallery(true)}
        />
      )}

      {/* 2. Main Editor & Live Preview Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Editor Panel */}
        <div className="glass-card p-6 space-y-5">
          <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)]">
              Resume Form Editor
            </h3>
            <button
              type="button"
              onClick={handleApplyTemplateSamples}
              className="text-[9.5px] font-mono font-bold text-[#6D5DF6] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Fill Template Samples</span>
            </button>
          </div>

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
            {/* Header Toolbar Actions */}
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--color-border)] pb-3 mb-4 gap-2">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-[#6D5DF6]" />
                <span>Live ATS Preview ({selectedTemplate.name})</span>
              </h3>

              {/* Multi-Export Actions */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={handleExportPdf}
                  title="Export ATS PDF"
                  className="px-2.5 py-1.5 clay-btn clay-btn-primary text-[9.5px] font-mono uppercase font-bold text-white flex items-center space-x-1 cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={handleExportDocx}
                  title="Export Word Document"
                  className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-[9.5px] font-mono uppercase font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <FileCode className="w-3 h-3" />
                  <span>DOCX</span>
                </button>

                <button
                  onClick={handlePrint}
                  title="Print Document"
                  className="px-2.5 py-1.5 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:bg-gray-200 dark:hover:bg-gray-800 text-[9.5px] font-mono uppercase font-bold text-[var(--color-text-secondary)] flex items-center space-x-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print</span>
                </button>

                <button
                  onClick={handleShare}
                  title="Share Resume Summary"
                  className="px-2.5 py-1.5 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:bg-gray-200 dark:hover:bg-gray-800 text-[9.5px] font-mono uppercase font-bold text-[var(--color-text-secondary)] flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Share"}</span>
                </button>
              </div>
            </div>

            {/* Document Render Window */}
            <div className={`p-6 rounded-xl border font-sans space-y-4 shadow-inner text-xs leading-relaxed ${themeBgClass}`}>
              
              {/* Header Render by Template Layout */}
              <div className={`border-b pb-3 border-gray-200 ${selectedTemplate.layoutType === "modern" ? "border-l-4 border-l-[#6D5DF6] pl-3" : ""}`}>
                <h1 className="text-lg font-black uppercase tracking-tight">{formData.name || "YOUR NAME"}</h1>
                <p className="text-[10px] font-mono font-bold mt-0.5 opacity-80">
                  {formData.role || "Target Role"} | {formData.email} | {formData.phone}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black uppercase border-b border-gray-200/50 pb-1 mb-1.5">
                  EXECUTIVE SUMMARY
                </h4>
                <p className="text-[11px] font-medium leading-relaxed">{formData.summary}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black uppercase border-b border-gray-200/50 pb-1 mb-1.5">
                  TECHNICAL SKILLS & COMPETENCIES
                </h4>
                <p className="text-[11px] font-mono font-bold">{formData.skills}</p>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black uppercase border-b border-gray-200/50 pb-1 mb-1.5">
                  WORK EXPERIENCE
                </h4>
                <div className="space-y-3">
                  {formData.experience.map((exp: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between font-bold text-[11px]">
                        <span>{exp.role} — {exp.company}</span>
                        <span className="font-mono text-[10px] opacity-70">{exp.duration}</span>
                      </div>
                      <p className="text-[10.5px] font-normal mt-0.5 opacity-90">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-black uppercase border-b border-gray-200/50 pb-1 mb-1.5">
                  ACADEMIC RECORD
                </h4>
                <div className="space-y-1.5">
                  {formData.education.map((edu: any, i: number) => (
                    <div key={i} className="flex justify-between text-[10.5px]">
                      <span className="font-bold">{edu.degree} — {edu.institution}</span>
                      <span className="font-mono text-[9.5px] opacity-70">{edu.duration}</span>
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
