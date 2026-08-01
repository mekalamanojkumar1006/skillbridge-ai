import React, { useState } from "react";
import DashboardCard from "./DashboardCard";
import { Building2, MapPin, Briefcase, DollarSign, ExternalLink, Bookmark, Check } from "lucide-react";

export interface JobMatchItem {
  id: string;
  role: string;
  company: string;
  location: string;
  salary?: string;
  type?: string;
  matchScore: number;
  description: string;
  requirements?: string[];
  applyUrl: string;
  isBookmarked?: boolean;
}

interface JobCardProps {
  job: JobMatchItem;
  onBookmark?: (id: string) => void;
  onApply?: (job: JobMatchItem) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onBookmark, onApply }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (score >= 70) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
  };

  return (
    <DashboardCard
      className="hover:border-[#6D5DF6]/30"
      header={
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#8B5CF6] flex items-center justify-center font-bold text-white shrink-0 shadow-md">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] truncate">{job.role}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] truncate flex items-center gap-1 font-medium">
                <span>{job.company}</span>
                {job.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-[var(--color-text-tertiary)]" />{job.location}</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${getScoreColor(job.matchScore)} shrink-0`}>
            {job.matchScore}% Match
          </span>
        </div>
      }
      footer={
        <div className="flex items-center justify-between gap-2 w-full">
          {onBookmark && (
            <button
              onClick={() => onBookmark(job.id)}
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                job.isBookmarked
                  ? "bg-[#6D5DF6]/10 border-[#6D5DF6]/30 text-[#6D5DF6]"
                  : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
              }`}
              title={job.isBookmarked ? "Remove Bookmark" : "Save Job"}
            >
              <Bookmark className={`w-4 h-4 ${job.isBookmarked ? "fill-current" : ""}`} />
            </button>
          )}
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onApply && onApply(job)}
            className="flex-grow clay-btn clay-btn-primary text-xs py-2.5 px-4 flex items-center justify-center space-x-2"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      }
    >
      <div className="space-y-3 flex-grow flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 text-[10px] font-mono">
          {job.type && (
            <span className="px-2 py-0.5 rounded bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-[#6D5DF6]" />
              {job.type}
            </span>
          )}
          {job.salary && (
            <span className="px-2 py-0.5 rounded bg-[var(--color-bg-page)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-semibold flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-500" />
              {job.salary}
            </span>
          )}
        </div>

        <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <p className={isExpanded ? "" : "line-clamp-3"}>
            {job.description}
          </p>
          {job.description && job.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#6D5DF6] hover:underline text-[11px] font-bold mt-1 inline-block cursor-pointer"
            >
              {isExpanded ? "View Less" : "View More"}
            </button>
          )}
        </div>

        {job.requirements && job.requirements.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]/50">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold block">Key Skills</span>
            <div className="flex flex-wrap gap-1">
              {job.requirements.slice(0, isExpanded ? 10 : 4).map((req, i) => (
                <span key={i} className="px-2 py-0.5 bg-[#6D5DF6]/5 border border-[#6D5DF6]/15 text-[#6D5DF6] text-[10px] font-mono rounded font-medium">
                  {req}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default JobCard;
