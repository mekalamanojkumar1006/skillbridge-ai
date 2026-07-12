/**
 * ATS Engine — Technical Skills Score Calculator
 *
 * Max score: 10 points
 *
 * Evaluates skills breadth across 7 tech domains and rewards modern,
 * in-demand technology stacks.
 *
 * Scoring:
 *   0 skills found        →  0
 *   1–2 skill categories  →  2–4
 *   3–4 skill categories  →  5–7
 *   5–6 skill categories  →  8–9
 *   7   skill categories  → 10
 *
 * Additional bonus for total unique skills count:
 *   5–9  skills  → +0
 *   10–19        → +1
 *   20+          → +1 (capped at max)
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES, SKILL_CATEGORIES } from "./constants.js";
import { normalizeText, clamp } from "./utils.js";

type SkillCategoryKey = keyof typeof SKILL_CATEGORIES;

export function calculateSkillsScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const normalizedText = normalizeText(resumeText);

  // ------------------------------------------------------------------
  // Build combined skills set from parsedData.skills + raw text scanning
  // ------------------------------------------------------------------
  const parsedSkills = (parsedData.skills ?? [])
    .map((s) => s.toLowerCase().trim());

  // Count which categories have at least one matching skill
  let categoriesFound = 0;
  let totalSkillHits  = 0;

  for (const [, keywords] of Object.entries(SKILL_CATEGORIES) as [SkillCategoryKey, readonly string[]][]) {
    const hitsInCategory = keywords.filter((kw) =>
      normalizedText.includes(kw.toLowerCase())
    );

    if (hitsInCategory.length > 0) {
      categoriesFound++;
      totalSkillHits += hitsInCategory.length;
    }
  }

  // Also count parsed skills that might not match our categories
  // (helps resumes with unusual or niche technologies)
  const parsedUniqueSkills = new Set(parsedSkills).size;
  const effectiveSkillCount = Math.max(totalSkillHits, parsedUniqueSkills);

  // ------------------------------------------------------------------
  // Base score from category coverage
  // ------------------------------------------------------------------
  let score = 0;

  if (categoriesFound === 0 && effectiveSkillCount === 0) {
    return 0;
  } else if (categoriesFound <= 1) {
    score = 2;
  } else if (categoriesFound === 2) {
    score = 4;
  } else if (categoriesFound === 3) {
    score = 5;
  } else if (categoriesFound === 4) {
    score = 6;
  } else if (categoriesFound === 5) {
    score = 7;
  } else if (categoriesFound === 6) {
    score = 8;
  } else {
    // All 7+ categories
    score = 9;
  }

  // ------------------------------------------------------------------
  // Bonus: raw skill count depth
  // ------------------------------------------------------------------
  if (effectiveSkillCount >= 20) {
    score += 1;
  } else if (effectiveSkillCount >= 10) {
    score += 0; // No extra bonus; category score already reflects this
  }

  return clamp(score, 0, MAX_SCORES.skills);
}
