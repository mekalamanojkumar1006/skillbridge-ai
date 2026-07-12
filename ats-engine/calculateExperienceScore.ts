/**
 * ATS Engine — Work Experience Score Calculator
 *
 * Max score: 10 points
 *
 * FRESHER-FRIENDLY: Does NOT penalise students for lacking full-time jobs.
 * Quality internships with action verbs and measurable outcomes score well.
 *
 * Scoring factors:
 *   - Number of experience entries (internships count equally)
 *   - Action verb usage in bullet points
 *   - Quantified impact (%, numbers, $, users, etc.)
 *   - Leadership / mentoring mentions
 *   - Technical relevance of roles
 *
 * Score bands:
 *   0  → No experience entries whatsoever
 *   1–3 → Experience section header only / very vague
 *   4–6 → 1 internship with some technical bullets
 *   7–8 → 2+ roles with good action verbs
 *   9–10 → Multiple roles with quantified impact + leadership
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES, ACTION_VERBS } from "./constants.js";
import { normalizeText, clamp } from "./utils.js";

// Patterns that signal quantified, measurable achievements
const QUANTIFIED_PATTERN = /\b(\d+(\.\d+)?)\s*(%|percent|users|customers|ms|seconds|hours|days|x|times|k|million|billion|\$|usd|inr|€|£)/i;
const NUMBER_IMPACT_PATTERN = /\b(reduced|improved|increased|optimized|boosted|saved|grew|decreased)\s+\w+\s+(by\s+)?\d+/i;

// Patterns signalling leadership / mentoring
const LEADERSHIP_PATTERN = /\b(led|managed|mentored|coached|supervised|guided|coordinated|directed|oversaw)\b/i;

// Internship-specific indicators
const INTERNSHIP_PATTERN = /\b(intern|internship|trainee|apprentice)\b/i;

export function calculateExperienceScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const normalizedText = normalizeText(resumeText);
  const experience = parsedData.experience ?? [];

  // ------------------------------------------------------------------
  // Detect experience section existence (even if parser missed entries)
  // ------------------------------------------------------------------
  const hasExperienceSection = /\b(experience|work history|employment|internship|intern)\b/i.test(resumeText);

  if (!hasExperienceSection && experience.length === 0) {
    return 0; // Truly no experience section
  }

  // ------------------------------------------------------------------
  // Count entries (parsedData or raw text detection)
  // ------------------------------------------------------------------
  const entryCount = experience.length > 0
    ? experience.length
    : (resumeText.match(/\b(intern|developer|engineer|analyst|manager|consultant)\b/gi) || []).length > 2
      ? 1
      : 0;

  if (entryCount === 0 && hasExperienceSection) {
    // Section exists but empty / no parseable entries
    return 2;
  }

  // ------------------------------------------------------------------
  // Action verb scoring
  // ------------------------------------------------------------------
  let actionVerbCount = 0;
  if (experience.length > 0) {
    const expText = experience.map((exp) => `${exp.role || ""} ${exp.company || ""} ${exp.description || ""}`).join(" ").toLowerCase();
    for (const verb of ACTION_VERBS) {
      if (expText.includes(verb.toLowerCase())) {
        actionVerbCount++;
      }
    }
  } else {
    for (const verb of ACTION_VERBS) {
      if (normalizedText.includes(verb.toLowerCase())) {
        actionVerbCount++;
      }
    }
  }

  // ------------------------------------------------------------------
  // Quantified impact detection
  // ------------------------------------------------------------------
  const hasQuantifiedImpact =
    QUANTIFIED_PATTERN.test(resumeText) ||
    NUMBER_IMPACT_PATTERN.test(resumeText);

  // ------------------------------------------------------------------
  // Leadership detection
  // ------------------------------------------------------------------
  const hasLeadership = LEADERSHIP_PATTERN.test(resumeText);

  // ------------------------------------------------------------------
  // Internship detection (ensure freshers aren't penalised)
  // ------------------------------------------------------------------
  const hasInternship = INTERNSHIP_PATTERN.test(resumeText) || experience.some((exp) =>
    INTERNSHIP_PATTERN.test(exp.role ?? "") || INTERNSHIP_PATTERN.test(exp.company ?? "")
  );

  // ------------------------------------------------------------------
  // Score assembly
  // ------------------------------------------------------------------
  let score = 0;

  // Base score from entry count
  if (entryCount >= 3) {
    score = 6;
  } else if (entryCount === 2) {
    score = 5;
  } else if (entryCount === 1) {
    score = hasInternship ? 4 : 3;
  } else {
    score = 2;
  }

  // Action verb bonus (up to +2)
  if (actionVerbCount >= 8) {
    score += 2;
  } else if (actionVerbCount >= 4) {
    score += 1;
  }

  // Quantified impact bonus
  if (hasQuantifiedImpact) {
    score += 1;
  }

  // Leadership bonus
  if (hasLeadership) {
    score += 1;
  }

  return clamp(score, 0, MAX_SCORES.experience);
}
