import React from "react";
import { Layout, Palette, ShieldCheck, RefreshCw, Sparkles, ChevronDown } from "lucide-react";
import { ResumeTemplate, RESUME_TEMPLATES } from "../../data/resumeTemplates";

export type ResumeTheme = "light" | "dark" | "professional";

interface ResumeTemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  selectedTheme: ResumeTheme;
  onSelectTemplate: (template: ResumeTemplate) => void;
  onSelectTheme: (theme: ResumeTheme) => void;
  onToggleGallery: () => void;
}

export default function ResumeTemplateSelector({
  selectedTemplate,
  selectedTheme,
  onSelectTemplate,
  onSelectTheme,
  onToggleGallery
}: ResumeTemplateSelectorProps) {
  return (
    <div className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[var(--color-border)] shadow-sm">
      
      {/* Active Template Status */}
      <div className="flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-2xl bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 flex items-center justify-center text-[#6D5DF6] shrink-0">
          <Layout className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono text-[var(--color-text-tertiary)] uppercase font-bold">Active Template</span>
            <span className="px-2 py-0.2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded text-[9px] font-mono font-black flex items-center space-x-0.5">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>{selectedTemplate.atsScore}% ATS</span>
            </span>
          </div>
          <h3 className="text-sm font-black text-[var(--color-text-primary)] leading-snug">
            {selectedTemplate.name}
          </h3>
        </div>
      </div>

      {/* Selector & Theme Control Toolbar */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
        
        {/* Template Dropdown Quick Selector */}
        <div className="relative min-w-[160px]">
          <select
            value={selectedTemplate.id}
            onChange={(e) => {
              const found = RESUME_TEMPLATES.find(t => t.id === e.target.value);
              if (found) onSelectTemplate(found);
            }}
            className="w-full clay-input px-3 py-2 text-xs text-[var(--color-text-primary)] font-mono font-bold appearance-none pr-8 cursor-pointer focus:outline-none"
          >
            {RESUME_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.atsScore}%)
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] absolute right-2.5 top-3 pointer-events-none" />
        </div>

        {/* Theme Selector (Light, Dark, Professional) */}
        <div className="flex items-center bg-[var(--color-bg-page)] p-1 rounded-xl border border-[var(--color-border)] text-xs font-mono font-bold space-x-1">
          <Palette className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] ml-1.5 shrink-0" />
          {(["light", "dark", "professional"] as ResumeTheme[]).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => onSelectTheme(theme)}
              className={`px-2.5 py-1 rounded-lg uppercase tracking-wider text-[9.5px] transition duration-150 cursor-pointer ${
                selectedTheme === theme
                  ? "bg-[#6D5DF6] text-white shadow-xs font-black"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Change Template Gallery Toggle Button */}
        <button
          type="button"
          onClick={onToggleGallery}
          className="px-3.5 py-2 clay-btn clay-btn-secondary text-[10.5px] font-mono uppercase tracking-wider font-bold flex items-center space-x-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#6D5DF6]" />
          <span>Browse Gallery</span>
        </button>

      </div>
    </div>
  );
}
