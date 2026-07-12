/**
 * ATS Engine — Main Orchestrator
 *
 * Entry point for deterministic ATS scoring.
 *
 * This function:
 *   1. Calls each individual category scorer
 *   2. Assembles the breakdown object
 *   3. Computes the total as the ARITHMETIC SUM of the breakdown
 *   4. Applies the no-projects hard cap (≤ 60 when projects === 0)
 *   5. Returns { score, breakdown, matchedKeywords, missingKeywords, detectedRole }
 *
 * Gemini / LLMs are NEVER called here.
 * The score returned is 100% deterministic TypeScript logic.
 * The same resume input will ALWAYS produce the same score.
 */

import { ATSResult, ATSBreakdown, ParsedResume } from "./types.js";
import { NO_PROJECTS_SCORE_CAP } from "./constants.js";
import { sumBreakdown, clamp } from "./utils.js";

import { calculateFormattingScore }    from "./calculateFormattingScore.js";
import { calculateContactScore }       from "./calculateContactScore.js";
import { calculateSummaryScore }       from "./calculateSummaryScore.js";
import { calculateSkillsScore }        from "./calculateSkillsScore.js";
import { calculateExperienceScore }    from "./calculateExperienceScore.js";
import { calculateProjectsScore }      from "./calculateProjectsScore.js";
import { calculateEducationScore }     from "./calculateEducationScore.js";
import { calculateCertificationScore } from "./calculateCertificationScore.js";
import { calculateKeywordScore }       from "./calculateKeywordScore.js";

/**
 * Calculates a fully deterministic ATS score for a given resume.
 *
 * @param resumeText   - Raw text content of the resume (from parser or file)
 * @param parsedData   - Structured data extracted by the resume parser
 * @param jobDescription - Optional job description for JD-specific keyword matching
 * @returns ATSResult  - { score, breakdown, matchedKeywords, missingKeywords, detectedRole }
 */
export function calculateATSScore(
  resumeText: string,
  parsedData: ParsedResume,
  jobDescription?: string
): ATSResult {
  // ------------------------------------------------------------------
  // Guard: ensure we have usable input
  // ------------------------------------------------------------------
  const safeText = (resumeText || "").trim();
  const safeData: ParsedResume = parsedData || {};

  // ------------------------------------------------------------------
  // Run all category scorers
  // ------------------------------------------------------------------
  const formattingScore    = calculateFormattingScore(safeText);
  const contactScore       = calculateContactScore(safeText, safeData);
  const summaryScore       = calculateSummaryScore(safeText, safeData);
  const skillsScore        = calculateSkillsScore(safeText, safeData);
  const experienceScore    = calculateExperienceScore(safeText, safeData);
  const projectsScore      = calculateProjectsScore(safeText, safeData);
  const educationScore     = calculateEducationScore(safeText, safeData);
  const certificationScore = calculateCertificationScore(safeText);
  const keywordResult      = calculateKeywordScore(safeText, safeData, jobDescription);

  // ------------------------------------------------------------------
  // Assemble breakdown (all values are integers from their scorers)
  // ------------------------------------------------------------------
  const breakdown: ATSBreakdown = {
    formatting:     formattingScore,
    contactInfo:    contactScore,
    summary:        summaryScore,
    skills:         skillsScore,
    experience:     experienceScore,
    projects:       projectsScore,
    education:      educationScore,
    certifications: certificationScore,
    keywords:       keywordResult.score,
  };

  // ------------------------------------------------------------------
  // Compute total as EXACT arithmetic sum — no rounding drift
  // This guarantees: score === sum(breakdown) ALWAYS
  // ------------------------------------------------------------------
  const rawTotal = sumBreakdown(breakdown);

  // ------------------------------------------------------------------
  // Apply hard cap: no projects → total cannot exceed 60
  // ------------------------------------------------------------------
  const score = breakdown.projects === 0
    ? Math.min(rawTotal, NO_PROJECTS_SCORE_CAP)
    : clamp(rawTotal, 0, 100);

  // ------------------------------------------------------------------
  // Final integrity check: score MUST equal sum(breakdown)
  // If the cap was applied, adjust the formatting score down to
  // maintain the invariant score === sum(breakdown).
  // ------------------------------------------------------------------
  let finalBreakdown = { ...breakdown };

  if (score !== sumBreakdown(finalBreakdown)) {
    const diff = sumBreakdown(finalBreakdown) - score;
    // Distribute the difference by reducing formatting (most flexible category)
    finalBreakdown.formatting = Math.max(0, finalBreakdown.formatting - diff);

    // Edge case: if formatting alone can't absorb the diff, reduce skills too
    const remaining = sumBreakdown(finalBreakdown) - score;
    if (remaining > 0) {
      finalBreakdown.skills = Math.max(0, finalBreakdown.skills - remaining);
    }
  }

  // Final score = exact sum of final breakdown
  const finalScore = sumBreakdown(finalBreakdown);

  // Expose both contact and contactInfo for prompt/frontend compatibility
  finalBreakdown.contact = finalBreakdown.contactInfo;

  return {
    score:           finalScore,
    breakdown:       finalBreakdown,
    matchedKeywords: keywordResult.matchedKeywords,
    missingKeywords: keywordResult.missingKeywords,
    detectedRole:    keywordResult.detectedRole,
  };
}
