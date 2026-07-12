/**
 * ATS Engine — Contact Information Score Calculator
 *
 * Max score: 10 points
 *
 * Checks for the presence of key contact fields. Each field contributes
 * a specific number of points. Missing GitHub and LinkedIn each deduct
 * from the final total.
 *
 * Points:
 *   Name     → +2
 *   Email    → +2
 *   Phone    → +2
 *   GitHub   → +2
 *   LinkedIn → +1
 *   Location → +1
 *
 * Deductions (applied separately):
 *   Missing GitHub   → −2
 *   Missing LinkedIn → −2
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES, CONTACT_SCORES, CONTACT_DEDUCTIONS } from "./constants.js";
import { lowercaseText, hasPattern, clamp } from "./utils.js";

// Regex patterns for contact field detection
const EMAIL_PATTERN    = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_PATTERN    = /(\+?\d[\s\-.]?){7,14}\d/;
const GITHUB_PATTERN   = /github\.com\/[a-zA-Z0-9_-]+|github\s*:\s*[a-zA-Z0-9_/-]+/i;
const LINKEDIN_PATTERN = /linkedin\.com\/in\/[a-zA-Z0-9_-]+|linkedin\s*:\s*[a-zA-Z0-9_/-]+/i;
const LOCATION_PATTERN = /\b(new york|san francisco|bangalore|hyderabad|mumbai|delhi|chennai|pune|india|usa|uk|remote|[a-z]{3,},\s*[a-z]{2,})\b/i;

export function calculateContactScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const text = resumeText;
  let score = 0;

  // ------------------------------------------------------------------
  // Name — check parsedData first (more reliable), fallback to text
  // ------------------------------------------------------------------
  const hasName =
    Boolean(parsedData.name && parsedData.name.trim().length > 1) ||
    // Heuristic: first non-empty line of a resume is typically the name
    resumeText.trim().split(/\r?\n/)[0]?.trim().length > 2;

  if (hasName) {
    score += CONTACT_SCORES.name;
  }

  // ------------------------------------------------------------------
  // Email
  // ------------------------------------------------------------------
  const hasEmail =
    Boolean(parsedData.email && EMAIL_PATTERN.test(parsedData.email)) ||
    EMAIL_PATTERN.test(text);

  if (hasEmail) {
    score += CONTACT_SCORES.email;
  }

  // ------------------------------------------------------------------
  // Phone
  // ------------------------------------------------------------------
  const hasPhone =
    Boolean(parsedData.phone && parsedData.phone.trim().length > 5) ||
    PHONE_PATTERN.test(text);

  if (hasPhone) {
    score += CONTACT_SCORES.phone;
  }

  // ------------------------------------------------------------------
  // GitHub (Award points if present, deduct if missing)
  // ------------------------------------------------------------------
  const hasGitHub =
    Boolean(parsedData.github && parsedData.github.trim().length > 0) ||
    GITHUB_PATTERN.test(text);

  if (hasGitHub) {
    score += CONTACT_SCORES.github;
  } else {
    score -= CONTACT_DEDUCTIONS.missingGitHub;
  }

  // ------------------------------------------------------------------
  // LinkedIn (Award points if present, deduct if missing)
  // ------------------------------------------------------------------
  const hasLinkedIn =
    Boolean(parsedData.linkedin && parsedData.linkedin.trim().length > 0) ||
    LINKEDIN_PATTERN.test(text);

  if (hasLinkedIn) {
    score += CONTACT_SCORES.linkedin;
  } else {
    score -= CONTACT_DEDUCTIONS.missingLinkedIn;
  }

  // ------------------------------------------------------------------
  // Location
  // ------------------------------------------------------------------
  const hasLocation =
    Boolean(parsedData.location && parsedData.location.trim().length > 0) ||
    LOCATION_PATTERN.test(text);

  if (hasLocation) {
    score += CONTACT_SCORES.location;
  }

  return clamp(score, 0, MAX_SCORES.contactInfo);
}
