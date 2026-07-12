/**
 * ATS Engine — Keyword Score Calculator
 *
 * Max score: 10 points
 *
 * Implements semantic keyword matching:
 * 1. Detects the target role from resume text (or uses provided job description)
 * 2. Loads the role-specific keyword profile
 * 3. If a job description is provided, also scores against JD keywords
 * 4. Applies a soft scoring curve to avoid harsh penalties for partial matches
 *
 * Score mapping (matchRatio = matched / total expected):
 *   0.00–0.19  →  2
 *   0.20–0.34  →  4
 *   0.35–0.49  →  5
 *   0.50–0.64  →  6
 *   0.65–0.74  →  7
 *   0.75–0.84  →  8
 *   0.85–0.94  →  9
 *   0.95–1.00  →  10
 */

import { ParsedResume, KeywordScoreResult } from "./types.js";
import {
  MAX_SCORES,
  KEYWORD_PROFILES,
  RoleKey,
} from "./constants.js";
import {
  normalizeText,
  detectRole,
  countMatches,
  findMissing,
  clamp,
  roleLabel,
} from "./utils.js";

/**
 * Maps a keyword match ratio (0–1) to a score (0–10) using a soft curve.
 * This prevents a single missing keyword from catastrophically dropping the score.
 */
function ratioToScore(ratio: number): number {
  if (ratio >= 0.95) return 10;
  if (ratio >= 0.85) return 9;
  if (ratio >= 0.75) return 8;
  if (ratio >= 0.65) return 7;
  if (ratio >= 0.50) return 6;
  if (ratio >= 0.35) return 5;
  if (ratio >= 0.20) return 4;
  if (ratio >= 0.10) return 3;
  return 2; // Minimum: at least attempting some keywords
}

/**
 * Extracts unique meaningful words from a job description for matching.
 * Filters out stop words and very short tokens.
 */
function extractJDKeywords(jobDescription: string): string[] {
  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to",
    "for", "of", "with", "by", "from", "is", "are", "was", "were",
    "be", "been", "being", "have", "has", "had", "do", "does", "did",
    "will", "would", "could", "should", "may", "might", "must", "can",
    "this", "that", "these", "those", "your", "our", "we", "you",
    "experience", "work", "working", "candidate", "role", "position",
    "team", "company", "job", "skills", "ability", "strong", "good",
  ]);

  return [...new Set(
    jobDescription
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 3 && !stopWords.has(word))
  )];
}

export function calculateKeywordScore(
  resumeText: string,
  parsedData: ParsedResume,
  jobDescription?: string
): KeywordScoreResult {
  const normalizedResumeText = normalizeText(resumeText);

  // ------------------------------------------------------------------
  // Step 1: Detect role and load keyword profile
  // ------------------------------------------------------------------
  const detectedRole: RoleKey = detectRole(normalizedResumeText);
  const profileKeywords = KEYWORD_PROFILES[detectedRole];

  // ------------------------------------------------------------------
  // Step 2: Match profile keywords against resume
  // ------------------------------------------------------------------
  const { matched: profileMatched } = countMatches(normalizedResumeText, profileKeywords);
  const profileMissing = findMissing(normalizedResumeText, profileKeywords);

  let matchedKeywords = [...profileMatched];
  let missingKeywords = [...profileMissing];

  // ------------------------------------------------------------------
  // Step 3: If JD provided, blend JD keyword matching
  // ------------------------------------------------------------------
  let jdScore = 0;

  if (jobDescription && jobDescription.trim().length > 20) {
    const jdKeywords = extractJDKeywords(jobDescription);
    const { matched: jdMatched } = countMatches(normalizedResumeText, jdKeywords);

    // JD-specific missing keywords (non-redundant with profile missing)
    const jdMissing = jdKeywords
      .filter((kw) => !normalizedResumeText.includes(kw))
      .slice(0, 10); // Cap at 10 for readability

    // Blend: add unique JD matches to matched list
    for (const kw of jdMatched) {
      if (!matchedKeywords.includes(kw)) {
        matchedKeywords.push(kw);
      }
    }

    // Surface JD-specific missing keywords (most important ones first)
    for (const kw of jdMissing) {
      if (!missingKeywords.includes(kw) && missingKeywords.length < 15) {
        missingKeywords.push(kw);
      }
    }

    // JD score: separate ratio calculation
    const jdRatio = jdKeywords.length > 0
      ? jdMatched.length / Math.min(jdKeywords.length, 20)
      : 0;
    jdScore = ratioToScore(jdRatio);
  }

  // ------------------------------------------------------------------
  // Step 4: Profile-based score
  // ------------------------------------------------------------------
  const profileRatio = profileKeywords.length > 0
    ? profileMatched.length / profileKeywords.length
    : 0;
  const profileScore = ratioToScore(profileRatio);

  // ------------------------------------------------------------------
  // Step 5: Combine scores
  //   - Without JD: use profile score only
  //   - With JD: weighted blend (60% JD, 40% profile)
  // ------------------------------------------------------------------
  let finalScore: number;

  if (jobDescription && jobDescription.trim().length > 20) {
    finalScore = Math.round(jdScore * 0.6 + profileScore * 0.4);
  } else {
    finalScore = profileScore;
  }

  return {
    score:          clamp(finalScore, 0, MAX_SCORES.keywords),
    matchedKeywords: matchedKeywords.slice(0, 20), // Cap list length
    missingKeywords: missingKeywords.slice(0, 15),
    detectedRole:   roleLabel(detectedRole),
  };
}
