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
import { normalizeText, normalizeSkill, getSynonyms, clamp } from "./utils.js";

type SkillCategoryKey = keyof typeof SKILL_CATEGORIES;

export function calculateSkillsScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const normalizedText = normalizeText(resumeText);

  // ------------------------------------------------------------------
  // Build combined skills set from parsedData (flat array or nested object)
  // ------------------------------------------------------------------
  let parsedSkills: string[] = [];
  if (parsedData.skills) {
    if (Array.isArray(parsedData.skills)) {
      parsedSkills = parsedData.skills;
    } else {
      // SkillsData object structure: gather from all arrays
      const sData = parsedData.skills as any;
      const subArrays = [
        sData.languages,
        sData.frameworks,
        sData.libraries,
        sData.databases,
        sData.cloud,
        sData.devops,
        sData.aiMlTools,
        sData.devTools,
        sData.all,
        sData.programming_languages,
        sData.frontend,
        sData.backend,
        sData.database,
        sData.tools,
        sData.core_concepts,
        sData.ai_ml
      ];
      for (const arr of subArrays) {
        if (Array.isArray(arr)) {
          parsedSkills.push(...arr);
        }
      }
    }
  }

  const normalizedParsedSkills = parsedSkills
    .map((s) => normalizeSkill(s))
    .filter((s) => s.length > 0);

  // Count which categories have at least one matching skill
  let categoriesFound = 0;
  let totalSkillHits  = 0;

  for (const [category, keywords] of Object.entries(SKILL_CATEGORIES) as [SkillCategoryKey, readonly string[]][]) {
    const hitsInCategory = keywords.filter((kw) => {
      const normKw = normalizeSkill(kw);
      const synonyms = getSynonyms(kw);

      // 1. Check raw text using synonyms
      const textMatch = synonyms.some((syn) => normalizedText.includes(syn.toLowerCase()));
      if (textMatch) return true;

      // 2. Check normalized parsed skills
      const parsedMatch = normalizedParsedSkills.some((ps) => {
        return ps === normKw || synonyms.some((syn) => ps === normalizeSkill(syn));
      });
      return parsedMatch;
    });

    if (hitsInCategory.length > 0) {
      categoriesFound++;
      totalSkillHits += hitsInCategory.length;
    }
  }

  // Also include the normalized unique parsed skills count
  const uniqueNormalizedSkills = new Set(normalizedParsedSkills);
  const effectiveSkillCount = Math.max(totalSkillHits, uniqueNormalizedSkills.size);

  // ------------------------------------------------------------------
  // Base score from category coverage
  // ------------------------------------------------------------------
  let score = 0;

  if (categoriesFound === 0 && effectiveSkillCount === 0) {
    return 0;
  } else if (categoriesFound === 1) {
    score = 2;
  } else if (categoriesFound === 2) {
    score = 4;
  } else if (categoriesFound === 3) {
    score = 6;
  } else if (categoriesFound === 4) {
    score = 7;
  } else {
    // 5+ categories found
    score = 8;
  }

  // ------------------------------------------------------------------
  // Bonus: raw skill count depth (depth + variety rewards)
  // ------------------------------------------------------------------
  if (effectiveSkillCount >= 10) {
    score += 2;
  } else if (effectiveSkillCount >= 5) {
    score += 1;
  }

  return clamp(score, 0, MAX_SCORES.skills);
}
