/**
 * ATS Engine — Shared Type Definitions
 *
 * These interfaces are used across all scoring modules. They represent
 * structured resume data, per-category breakdown scores, and the final
 * ATS result emitted by the orchestrator.
 */

// ---------------------------------------------------------------------------
// Resume Data
// ---------------------------------------------------------------------------

export interface Education {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  duration?: string;
  cgpa?: string | number;
}

export interface Experience {
  company?: string;
  role?: string;
  duration?: string;
  description?: string;
}

export interface Project {
  title?: string;
  description?: string;
  techStack?: string[];
  githubLink?: string;
  liveDemo?: string;
  impact?: string;
}

/**
 * Structured data extracted by the resume parser (Gemini).
 * Fields are optional since real-world resumes vary in completeness.
 */
export interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
  summary?: string;
  skills?: string[];
  experience?: Experience[];
  projects?: Project[];
  education?: Education[];
  certifications?: string[];
}

// ---------------------------------------------------------------------------
// ATS Scoring
// ---------------------------------------------------------------------------

/**
 * Per-category score breakdown. Every field has a defined maximum:
 *   formatting      → max 20
 *   contactInfo     → max 10
 *   summary         → max 10
 *   skills          → max 10
 *   experience      → max 10
 *   projects        → max 20
 *   education       → max  5
 *   certifications  → max  5
 *   keywords        → max 10
 *   ─────────────────────────
 *   Total           → max 100
 */
export interface ATSBreakdown {
  formatting: number;
  contactInfo: number;
  contact?: number;
  summary: number;
  skills: number;
  experience: number;
  projects: number;
  education: number;
  certifications: number;
  keywords: number;
}

/**
 * Final ATS result returned by the orchestrator.
 * `score` is ALWAYS the arithmetic sum of `breakdown` values.
 */
export interface ATSResult {
  score: number;
  breakdown: ATSBreakdown;
  /** Keywords found in resume that match the detected / provided role profile */
  matchedKeywords: string[];
  /** Role-specific keywords absent from the resume */
  missingKeywords: string[];
  /** The role detected / inferred from resume text */
  detectedRole: string;
}

// ---------------------------------------------------------------------------
// Keyword Scoring Sub-result
// ---------------------------------------------------------------------------

export interface KeywordScoreResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  detectedRole: string;
}

// ---------------------------------------------------------------------------
// Individual scorer return types
// ---------------------------------------------------------------------------

/** Generic scorer result — just the numeric score for that category */
export type CategoryScore = number;
