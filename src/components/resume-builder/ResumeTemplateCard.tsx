import React from "react";
import { Check, Eye, Sparkles, ShieldCheck } from "lucide-react";
import { ResumeTemplate } from "../../data/resumeTemplates";

interface ResumeTemplateCardProps {
  key?: string;
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: (template: ResumeTemplate) => void;
  onPreview: (template: ResumeTemplate) => void;
}

export default function ResumeTemplateCard({
  template,
  isSelected,
  onSelect,
  onPreview
}: ResumeTemplateCardProps) {
  return (
    <div
      className={`glass-card p-5 space-y-4 flex flex-col justify-between transition duration-300 relative group border ${
        isSelected
          ? "border-[#6D5DF6] ring-2 ring-[#6D5DF6]/30 shadow-lg"
          : "hover:border-[#6D5DF6]/40 hover:shadow-md"
      }`}
    >
      {/* Selected Indicator Ribbon */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-[#6D5DF6] text-white px-2 py-0.5 rounded-md text-[9px] font-mono font-black uppercase tracking-wider flex items-center space-x-1 shadow-sm">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Active</span>
        </div>
      )}

      <div>
        {/* SVG Layout Preview Thumbnail */}
        <div
          onClick={() => onPreview(template)}
          className="w-full h-44 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] p-3 relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-inner flex flex-col justify-between select-none"
        >
          {/* Header Bar Simulation */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="h-3 w-1/2 bg-[#6D5DF6]/30 rounded" />
              <div className="h-2 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-1.5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>

          {/* Body Lines Simulation based on Layout Type */}
          <div className="space-y-2 my-2 flex-1">
            {template.layoutType === "two-column" ? (
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="col-span-1 bg-[#6D5DF6]/10 rounded p-1 space-y-1">
                  <div className="h-2 w-full bg-[#6D5DF6]/40 rounded" />
                  <div className="h-1.5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
                <div className="col-span-2 space-y-1">
                  <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-1.5 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              </div>
            ) : template.layoutType === "modern" ? (
              <div className="space-y-1.5">
                <div className="h-2.5 w-full bg-gradient-to-r from-[#6D5DF6]/40 to-[#8B5CF6]/30 rounded" />
                <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="h-1.5 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="h-2 w-1/3 bg-gray-400 dark:bg-gray-600 rounded" />
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-1.5 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-1.5 w-4/6 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            )}
          </div>

          {/* Footer Line Simulation */}
          <div className="h-1.5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />

          {/* Hover Preview Overlay */}
          <div className="absolute inset-0 bg-[#6D5DF6]/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl text-[10px] font-mono font-bold text-[var(--color-text-primary)] shadow-md flex items-center space-x-1">
              <Eye className="w-3 h-3 text-[#6D5DF6]" />
              <span>Full Preview</span>
            </span>
          </div>
        </div>

        {/* Card Header & Badges */}
        <div className="space-y-2 mt-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-xs font-black text-[var(--color-text-primary)] group-hover:text-[#6D5DF6] transition duration-200">
              {template.name}
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-md text-[9px] font-mono font-black shrink-0 flex items-center space-x-0.5">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>{template.atsScore}% ATS</span>
            </span>
          </div>

          <p className="text-[10.5px] text-[var(--color-text-secondary)] leading-relaxed font-sans font-medium line-clamp-2">
            {template.description}
          </p>

          <div className="flex flex-wrap gap-1 text-[8.5px] font-mono font-bold">
            {template.badges.map((b, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 rounded bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-tertiary)]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--color-border)]/50">
        <button
          type="button"
          onClick={() => onPreview(template)}
          className="px-2 py-2 rounded-xl bg-[var(--color-bg-page)] border border-[var(--color-border)] hover:border-[#6D5DF6]/30 text-[10px] font-mono uppercase font-bold text-[var(--color-text-secondary)] hover:text-[#6D5DF6] transition duration-150 cursor-pointer flex items-center justify-center space-x-1"
        >
          <Eye className="w-3 h-3" />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => onSelect(template)}
          className={`px-2 py-2 rounded-xl text-[10px] font-mono uppercase font-bold transition duration-150 cursor-pointer flex items-center justify-center space-x-1 ${
            isSelected
              ? "bg-emerald-500 text-white shadow-sm"
              : "clay-btn clay-btn-primary text-white"
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>{isSelected ? "Selected" : "Use Template"}</span>
        </button>
      </div>
    </div>
  );
}
