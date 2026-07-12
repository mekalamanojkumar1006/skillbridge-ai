/**
 * ATS Engine — Education Score Calculator
 *
 * Max score: 5 points
 *
 * Evaluates completeness and quality of the education section.
 *
 * Scoring:
 *   No education section              →  0
 *   Partial info (degree only)        →  1–2
 *   Degree + university + year        →  3
 *   All fields, CGPA < 7.5            →  4
 *   All fields, CGPA ≥ 7.5 / no CGPA →  5
 *
 * Fields checked:
 *   - Degree name (B.Tech, B.E., B.Sc, MCA, M.Tech, MBA, etc.)
 *   - University / institution name
 *   - Graduation year
 *   - CGPA / percentage
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES } from "./constants.js";
import { clamp } from "./utils.js";

// Degree patterns
const DEGREE_PATTERN = /\b(b\.?tech|b\.?e|b\.?sc|b\.?com|bca|mca|m\.?tech|m\.?sc|mba|ph\.?d|master|bachelor|associate degree|diploma)\b/i;

// University / college indicator
const UNIVERSITY_PATTERN = /\b(university|college|institute|institution|school of|iit|nit|bits|vit|srm|manipal|anna|amity|lpuniversity|lpuniv)\b/i;

// Graduation year — 4-digit year between 1990 and 2035
const YEAR_PATTERN = /\b(19[9]\d|20[0-3]\d)\b/;

// CGPA pattern: 7.5/10 or 8.2 or 75% etc.
const CGPA_PATTERN = /\b(\d+(\.\d+)?)\s*(\/\s*10|cgpa|gpa|%|percent|percentage)\b/i;

/**
 * Attempts to extract a CGPA value from the text.
 * Returns null if no CGPA / percentage can be reliably found.
 */
function extractCGPA(text: string): number | null {
  // Check for 4.0 scale: e.g., 3.9/4 or 3.9/4.0
  const scale4Match = text.match(/(\d+(\.\d+)?)\s*\/\s*4(\.0)?/);
  if (scale4Match) {
    return parseFloat(scale4Match[1]) * 2.5;
  }

  const match = text.match(/(\d+(\.\d+)?)\s*\/\s*10/);
  if (match) return parseFloat(match[1]);

  const percentMatch = text.match(/(\d+(\.\d+)?)\s*(%|percent)/i);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    // Convert percentage to 10-scale: 75% ≈ 7.5
    return pct / 10;
  }

  const cgpaMatch = text.match(/cgpa\s*[:\-]?\s*(\d+(\.\d+)?)/i);
  if (cgpaMatch) {
    const val = parseFloat(cgpaMatch[1]);
    // If the value is <= 4.0, assume it is on a 4.0 scale
    if (val <= 4.0) {
      return val * 2.5;
    }
    return val;
  }

  return null;
}

export function calculateEducationScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const education = parsedData.education ?? [];

  // ------------------------------------------------------------------
  // Check raw text for education section presence
  // ------------------------------------------------------------------
  const hasEducationSection = /\b(education|academic|qualification)\b/i.test(resumeText);

  if (!hasEducationSection && education.length === 0) {
    return 0;
  }

  // ------------------------------------------------------------------
  // Field detection (from parsedData first, then raw text)
  // ------------------------------------------------------------------
  const hasDegree =
    education.some((e) => e.degree && e.degree.trim().length > 0) ||
    DEGREE_PATTERN.test(resumeText);

  const hasUniversity =
    education.some((e) => e.institution && e.institution.trim().length > 0) ||
    UNIVERSITY_PATTERN.test(resumeText);

  const hasYear =
    education.some((e) => e.duration && /\d{4}/.test(e.duration)) ||
    YEAR_PATTERN.test(resumeText);

  const hasCGPAText = CGPA_PATTERN.test(resumeText);
  const cgpaValue   = extractCGPA(resumeText);
  const isGoodCGPA  = cgpaValue !== null ? cgpaValue >= 7.5 : false;

  // ------------------------------------------------------------------
  // Score assembly
  // ------------------------------------------------------------------
  let score = 0;

  if (!hasDegree) {
    // No degree found at all
    return hasEducationSection ? 1 : 0;
  }

  score = 1; // Has degree

  if (hasUniversity) score += 1;
  if (hasYear)       score += 1;

  // CGPA-based bonus
  if (hasCGPAText) {
    if (isGoodCGPA) {
      score += 2; // Good CGPA → max 5
    } else {
      score += 1; // Low / borderline CGPA
    }
  } else {
    // No CGPA mentioned — give benefit of the doubt (not penalised)
    score += 1;
  }

  return clamp(score, 0, MAX_SCORES.education);
}
