import React, { useState } from "react";
import { Layout, Sparkles, Filter, ShieldCheck, Search } from "lucide-react";
import { RESUME_TEMPLATES, ResumeTemplate } from "../../data/resumeTemplates";
import ResumeTemplateCard from "./ResumeTemplateCard";
import ResumeTemplatePreview from "./ResumeTemplatePreview";

interface ResumeTemplateGalleryProps {
  selectedTemplate: ResumeTemplate;
  onSelectTemplate: (template: ResumeTemplate) => void;
}

export default function ResumeTemplateGallery({
  selectedTemplate,
  onSelectTemplate
}: ResumeTemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  const categories = [
    { id: "all", label: "All Templates (8)" },
    { id: "tech", label: "Software & Tech" },
    { id: "corporate", label: "Corporate & Executive" },
    { id: "minimal", label: "Minimal & Campus" },
    { id: "creative", label: "Creative & UI/UX" }
  ];

  const filteredTemplates = RESUME_TEMPLATES.filter((t) => {
    const matchesCategory = activeCategory === "all" || t.category === activeCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="glass-card p-6 sm:p-8 space-y-6 animate-fade-in border border-[var(--color-border)] shadow-md">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center space-x-2.5">
              <Layout className="w-6 h-6 text-[#6D5DF6]" />
              <span>Choose Resume Template</span>
            </h2>
            <span className="text-[10px] px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg font-mono font-bold uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Free ATS Friendly</span>
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 font-medium leading-relaxed font-sans">
            Select a battle-tested ATS resume format tailored to your target industry. Seamlessly switch templates anytime without losing data.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates or roles..."
            className="w-full clay-input pl-9 pr-4 py-2 text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] mr-1 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#6D5DF6] text-white shadow-xs"
                : "bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[#6D5DF6]/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Responsive Templates Grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {filteredTemplates.map((template) => (
          <ResumeTemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate.id === template.id}
            onSelect={(t) => onSelectTemplate(t)}
            onPreview={(t) => setPreviewTemplate(t)}
          />
        ))}
      </div>

      {/* Empty Search State */}
      {filteredTemplates.length === 0 && (
        <div className="p-8 text-center glass-card border border-[var(--color-border)] space-y-2">
          <p className="text-xs font-mono text-[var(--color-text-secondary)] font-bold">
            No templates match "{searchQuery}" in this category.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-mono font-bold text-[#6D5DF6] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Template Full Preview Modal */}
      <ResumeTemplatePreview
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        onSelect={(t) => onSelectTemplate(t)}
        isCurrentlySelected={Boolean(previewTemplate && selectedTemplate.id === previewTemplate.id)}
      />
    </div>
  );
}
