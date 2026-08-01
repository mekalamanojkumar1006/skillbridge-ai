import React from "react";
import { X, ShieldCheck, Check, Sparkles, Star, Layers, Briefcase, FileText } from "lucide-react";
import { ResumeTemplate } from "../../data/resumeTemplates";

interface ResumeTemplatePreviewProps {
  template: ResumeTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: ResumeTemplate) => void;
  isCurrentlySelected: boolean;
}

export default function ResumeTemplatePreview({
  template,
  isOpen,
  onClose,
  onSelect,
  isCurrentlySelected
}: ResumeTemplatePreviewProps) {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col justify-between shadow-2xl border border-[var(--color-border)] rounded-3xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-card)] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 flex items-center justify-center text-[#6D5DF6]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-black text-[var(--color-text-primary)]">{template.name}</h2>
                <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md text-[10px] font-mono font-black">
                  {template.atsScore}% ATS Optimized
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] font-medium font-sans">
                {template.bestFor}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:bg-gray-200 dark:hover:bg-gray-800 text-[var(--color-text-secondary)] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content - Split View */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Full Resume Preview Document (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--color-text-secondary)] flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#6D5DF6]" />
              <span>Full Layout Structure</span>
            </h3>

            {/* Simulated Printed Resume Document */}
            <div className="p-6 rounded-2xl border border-gray-300 dark:border-gray-800 bg-white text-gray-900 font-sans shadow-lg space-y-4 text-xs leading-relaxed">
              
              {/* Document Header */}
              <div className={`pb-3 border-b border-gray-200 ${template.layoutType === "modern" ? "border-l-4 border-l-[#6D5DF6] pl-3" : ""}`}>
                <h1 className="text-lg font-black text-gray-900 tracking-tight uppercase">
                  {template.sampleData.role.toUpperCase()} CANDIDATE
                </h1>
                <p className="text-[10px] font-mono text-gray-600 font-bold mt-0.5">
                  candidate@email.com | +1 (555) 019-2834 | San Francisco, CA
                </p>
              </div>

              {/* Layout Content Body */}
              <div className="space-y-3.5">
                <div>
                  <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1">
                    EXECUTIVE SUMMARY
                  </h4>
                  <p className="text-[11px] text-gray-700 font-medium leading-relaxed">
                    {template.sampleData.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1">
                    CORE COMPETENCIES & TECHNICAL STACK
                  </h4>
                  <p className="text-[10.5px] text-gray-800 font-mono font-bold">
                    {template.sampleData.skills}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1">
                    WORK EXPERIENCE
                  </h4>
                  <div className="space-y-2">
                    {template.sampleData.experience.map((exp, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-gray-900 text-[11px]">
                          <span>{exp.role} — {exp.company}</span>
                          <span className="font-mono text-[9.5px] text-gray-500">{exp.duration}</span>
                        </div>
                        <p className="text-[10.5px] text-gray-600 font-normal leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-black text-gray-900 uppercase border-b border-gray-200 pb-1 mb-1">
                    ACADEMIC CREDENTIALS
                  </h4>
                  {template.sampleData.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between text-[10.5px]">
                      <span className="font-bold text-gray-900">{edu.degree} — {edu.institution}</span>
                      <span className="font-mono text-gray-500 text-[9.5px]">{edu.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: ATS Compatibility & Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* ATS Compatibility Box */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-black text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ATS Compatibility Index</span>
                  </span>
                  <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {template.atsStars} {template.atsScore}%
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed font-sans">
                  {template.atsReason}
                </p>
              </div>

              {/* Best For / Recommended Use Cases */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold flex items-center space-x-1">
                  <Briefcase className="w-3 h-3 text-[#6D5DF6]" />
                  <span>Recommended Use Cases</span>
                </h4>
                <div className="p-3 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-primary)]">
                  {template.bestFor}
                </div>
              </div>

              {/* Supported Sections */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                  Supported Resume Sections
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {template.supportedSections.map((sec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 text-[#6D5DF6] text-[10px] font-mono font-bold"
                    >
                      ✓ {sec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Example Flow */}
              <div className="space-y-1.5">
                <h4 className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">
                  Layout Sequence
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] font-mono font-semibold bg-[var(--color-bg-page)] p-2.5 rounded-xl border border-[var(--color-border)]">
                  {template.exampleLayout}
                </p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[var(--color-border)] flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[var(--color-bg-page)] border border-[var(--color-border)] text-xs font-mono uppercase font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition cursor-pointer"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelect(template);
                  onClose();
                }}
                className={`flex-1 py-3 rounded-2xl text-xs font-mono uppercase font-bold text-white shadow-md transition cursor-pointer flex items-center justify-center space-x-1.5 ${
                  isCurrentlySelected
                    ? "bg-emerald-500"
                    : "clay-btn clay-btn-primary"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCurrentlySelected ? "Template Active" : "Use This Template"}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
