/**
 * ATS Engine — Certifications & Achievements Score Calculator
 *
 * Max score: 5 points
 *
 * Detects certifications from recognized providers and achievement
 * keywords (hackathons, competitions, research, open source).
 *
 * Scoring:
 *   0 certs / achievements            →  0
 *   1 basic cert                      →  2
 *   2+ certs from known providers     →  3–4
 *   Certs + hackathons/research       →  5
 */

import { CategoryScore } from "./types.js";
import {
  MAX_SCORES,
  CERT_PROVIDERS,
  ACHIEVEMENT_KEYWORDS,
} from "./constants.js";
import { lowercaseText, clamp } from "./utils.js";

// Section header indicators for certifications
const CERT_SECTION_PATTERN = /\b(certif|achievement|award|honor|honour|recogni|accomplishment)\b/i;

export function calculateCertificationScore(resumeText: string): CategoryScore {
  const text = lowercaseText(resumeText);

  // ------------------------------------------------------------------
  // Check for certifications section
  // ------------------------------------------------------------------
  const hasCertSection = CERT_SECTION_PATTERN.test(resumeText);

  // ------------------------------------------------------------------
  // Count certificate provider matches
  // ------------------------------------------------------------------
  let certCount = 0;
  for (const provider of CERT_PROVIDERS) {
    if (text.includes(provider.toLowerCase())) {
      certCount++;
    }
  }

  // ------------------------------------------------------------------
  // Count achievement keyword matches
  // ------------------------------------------------------------------
  let achievementCount = 0;
  for (const keyword of ACHIEVEMENT_KEYWORDS) {
    if (text.includes(keyword.toLowerCase())) {
      achievementCount++;
    }
  }

  // ------------------------------------------------------------------
  // Score assembly
  // ------------------------------------------------------------------
  if (certCount === 0 && achievementCount === 0) {
    // If there's a section but nothing detected → 1 (benefit of the doubt)
    return hasCertSection ? 1 : 0;
  }

  let score = 0;

  if (certCount >= 1) {
    score = 2; // At least one recognized cert
  }

  if (certCount >= 2) {
    score = 3;
  }

  if (certCount >= 3) {
    score = 4;
  }

  // Achievement bonus (hackathons, research, competitions)
  if (achievementCount >= 2) {
    score += 1;
  }

  return clamp(score, 0, MAX_SCORES.certifications);
}
