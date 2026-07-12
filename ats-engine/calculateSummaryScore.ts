/**
 * ATS Engine — Professional Summary Score Calculator
 *
 * Max score: 10 points
 *
 * Evaluates the presence and quality of a professional summary/objective
 * section in the resume.
 *
 * Scoring tiers:
 *   0     → No summary section found
 *   1–3   → Summary present but < 20 words (too brief)
 *   4–5   → Summary present, 20+ words, but no role/tech keywords
 *   6–7   → Summary mentions target role or 1–2 tech keywords
 *   8–9   → Summary mentions role + 3+ tech keywords, well-structured
 *   10    → Excellent: role + keywords + measurable value statement
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES, KEYWORD_PROFILES } from "./constants.js";
import {
  normalizeText,
  detectRole,
  countMatches,
  clamp,
} from "./utils.js";

// Keywords that typically introduce a summary section in resumes
const SUMMARY_SECTION_PATTERNS = [
  /\b(professional\s+)?summary\b/i,
  /\bobject[i]?ve\b/i,
  /\bprofile\b/i,
  /\babout\s+me\b/i,
  /\bcareer\s+(goal|objective|summary)\b/i,
  /\boverview\b/i,
];

// Value-statement phrases indicating an excellent summary
const VALUE_PHRASES = [
  "seeking", "looking to", "passionate about", "experienced in",
  "specializ", "proven track", "result-driven", "driven by",
  "committed to", "with experience", "focused on", "expertise in",
];

/**
 * Attempts to extract the summary text from raw resume text.
 * Returns empty string if no summary section is found.
 */
function extractSummaryText(resumeText: string): string {
  const lines = resumeText.split(/\r?\n/);

  let summaryStartIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (SUMMARY_SECTION_PATTERNS.some((p) => p.test(line))) {
      summaryStartIdx = i;
      break;
    }
  }

  if (summaryStartIdx === -1) return "";

  // Collect lines after the summary heading until the next section heading
  // (typically a short ALL-CAPS or Title Case line)
  const nextSectionPattern = /^[A-Z][A-Z\s&/]{2,}$|^#{1,3}\s/;
  const summaryLines: string[] = [];

  for (let j = summaryStartIdx + 1; j < Math.min(summaryStartIdx + 15, lines.length); j++) {
    const line = lines[j].trim();
    if (line.length === 0) continue;
    if (nextSectionPattern.test(line) && j > summaryStartIdx + 1) break;
    summaryLines.push(line);
  }

  return summaryLines.join(" ");
}

export function calculateSummaryScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  // ------------------------------------------------------------------
  // Determine summary text source (structured data takes priority)
  // ------------------------------------------------------------------
  const summaryFromParsed = parsedData.summary?.trim() ?? "";
  const summaryFromText   = extractSummaryText(resumeText);
  const summaryText       = summaryFromParsed.length > 10
    ? summaryFromParsed
    : summaryFromText;

  // ------------------------------------------------------------------
  // No summary at all → 0
  // ------------------------------------------------------------------
  if (summaryText.length < 5) {
    return 0;
  }

  const wordCount = summaryText.split(/\s+/).filter(Boolean).length;

  // ------------------------------------------------------------------
  // Too brief → 1–3
  // ------------------------------------------------------------------
  if (wordCount < 15) {
    return clamp(2, 0, MAX_SCORES.summary);
  }

  // ------------------------------------------------------------------
  // Keyword analysis
  // ------------------------------------------------------------------
  const normalizedSummary = normalizeText(summaryText);
  const detectedRole      = detectRole(normalizeText(resumeText));
  const roleKeywords      = KEYWORD_PROFILES[detectedRole];

  const { count: keywordMatches } = countMatches(normalizedSummary, roleKeywords);

  // Check for value/impact statements
  const hasValueStatement = VALUE_PHRASES.some((phrase) =>
    normalizedSummary.includes(phrase.toLowerCase())
  );

  // Check if target role title appears in the summary
  const roleInSummary = normalizeText(summaryText)
    .includes(detectedRole.replace(/_/g, " "));

  // ------------------------------------------------------------------
  // Score calculation
  // ------------------------------------------------------------------
  let score = 0;

  // Base score for having a summary of decent length
  if (wordCount >= 15 && wordCount < 30) {
    score = 4;
  } else if (wordCount >= 30) {
    score = 5;
  }

  // Keyword bonuses
  if (keywordMatches >= 1) score += 1;
  if (keywordMatches >= 2) score += 1;
  if (keywordMatches >= 3) score += 1;

  // Role presence bonus
  if (roleInSummary) score += 1;

  // Value statement bonus
  if (hasValueStatement) score += 1;

  return clamp(score, 0, MAX_SCORES.summary);
}
