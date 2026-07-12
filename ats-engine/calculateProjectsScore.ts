/**
 * ATS Engine — Projects Score Calculator
 *
 * Max score: 20 points
 *
 * Projects are the most heavily weighted section for freshers and
 * recent graduates. This scorer rewards complexity, real-world impact,
 * GitHub links, live demos, and quantified outcomes.
 *
 * Hard rule: If NO projects are detected, this returns 0.
 * The orchestrator will then apply the no-projects total score cap (≤60).
 *
 * Scoring:
 *   0 projects                       →  0
 *   1 project, basic                 →  5–8
 *   2–3 projects with tech + detail  →  10–15
 *   4+ strong projects               →  16–20
 *
 * Per-project bonuses:
 *   GitHub link                       +2
 *   Live demo / deployed URL          +2
 *   Quantified impact                 +3
 *   Tech stack listed (3+ techs)      +2
 *   Problem statement described       +1
 *   Documentation / README mention    +1
 */

import { ParsedResume, CategoryScore } from "./types.js";
import { MAX_SCORES } from "./constants.js";
import { normalizeText, clamp } from "./utils.js";

// Patterns for detecting project indicators in raw text
const PROJECT_SECTION_PATTERN = /\b(projects?|personal projects?|side projects?|open[- ]source)\b/i;
const GITHUB_LINK_PATTERN     = /github\.com\/[a-zA-Z0-9_\-/.]+/i;
const LIVE_DEMO_PATTERN       = /\b(live demo|deployed|vercel\.app|netlify\.app|heroku\.com|render\.com|railway\.app|glitch\.me|demo link|https?:\/\/(?!github)[\w.-]+\.(com|io|app|dev|net|org)\/\S+)\b/i;
const QUANTIFIED_PATTERN      = /\b(\d+(\.\d+)?)\s*(%|percent|users|downloads|stars|forks|k|ms|seconds|x|times|faster|improved|reduced)/i;
const TECH_STACK_PATTERN      = /\b(built with|tech stack|technologies|using|developed using|powered by)\b.{0,80}(react|node|python|java|tensorflow|docker|aws|firebase|mongodb|sql)/i;
const PROBLEM_PATTERN         = /\b(solves?|addresses?|automates?|simplif|enables?|allows?|helps?|provides?)\b/i;
const DOC_PATTERN             = /\b(readme|documentation|wiki|api docs?|setup guide)\b/i;

/**
 * Attempts to count projects from parsedData and raw text.
 */
function countProjects(resumeText: string, parsedData: ParsedResume): number {
  // If the parser returned projects, use that count
  if (parsedData.projects && parsedData.projects.length > 0) {
    return parsedData.projects.length;
  }

  // Heuristic: count bold/header project-like entries in the projects section
  // Look for lines that start with strong indicators after the "Projects" heading
  const lines = resumeText.split(/\r?\n/);
  let inProjectsSection = false;
  let projectCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (PROJECT_SECTION_PATTERN.test(line) && line.split(/\s+/).length <= 4) {
      inProjectsSection = true;
      continue;
    }

    if (inProjectsSection) {
      // Detect next main section — stop counting
      const isNewSection = /^[A-Z][A-Z\s&/]{2,}$/.test(line) ||
        /\b(education|experience|certif|skill|summary|contact|objective)\b/i.test(line);

      if (isNewSection && line.split(/\s+/).length <= 4) {
        break;
      }

      // Project entry indicator: line is a project title (starts with capital, short, not a bullet)
      const isTitleLine =
        /^[A-Z][a-zA-Z0-9\s\-:()]+$/.test(line) &&
        line.length > 3 && line.length < 80 &&
        !line.startsWith("•") && !line.startsWith("-") && !line.startsWith("*");

      if (isTitleLine) {
        projectCount++;
      }
    }
  }

  // Fallback: just check if projects section exists
  return projectCount > 0 ? projectCount : (PROJECT_SECTION_PATTERN.test(resumeText) ? 1 : 0);
}

export function calculateProjectsScore(
  resumeText: string,
  parsedData: ParsedResume
): CategoryScore {
  const projectCount = countProjects(resumeText, parsedData);

  // ------------------------------------------------------------------
  // Hard rule: 0 projects → 0 score
  // ------------------------------------------------------------------
  if (projectCount === 0) {
    return 0;
  }

  // ------------------------------------------------------------------
  // Per-project quality signals (scanned from full resume text)
  // We can't isolate per-project text, so we check globally.
  // This means a single great project can score well.
  // ------------------------------------------------------------------
  let qualityScore = 0;

  const hasGitHub        = GITHUB_LINK_PATTERN.test(resumeText);
  const hasLiveDemo      = LIVE_DEMO_PATTERN.test(resumeText);
  const hasQuantified    = QUANTIFIED_PATTERN.test(resumeText);
  const hasTechStack     = TECH_STACK_PATTERN.test(resumeText) ||
    // Simpler fallback: multiple tech keywords near project section
    (() => {
      const normalized = normalizeText(resumeText);
      const techTerms  = ["react", "node", "python", "java", "mongodb", "firebase", "docker", "aws"];
      return techTerms.filter(t => normalized.includes(t)).length >= 3;
    })();
  const hasProblemStatement = PROBLEM_PATTERN.test(resumeText);
  const hasDocumentation    = DOC_PATTERN.test(resumeText);

  if (hasGitHub)            qualityScore += 2;
  if (hasLiveDemo)          qualityScore += 2;
  if (hasQuantified)        qualityScore += 3;
  if (hasTechStack)         qualityScore += 2;
  if (hasProblemStatement)  qualityScore += 1;
  if (hasDocumentation)     qualityScore += 1;

  // Max quality bonus per spec = 11 (2+2+3+2+1+1)

  // ------------------------------------------------------------------
  // Base score from project count
  // ------------------------------------------------------------------
  let baseScore: number;

  if (projectCount >= 4) {
    baseScore = 11; // Strong base for 4+ projects
  } else if (projectCount === 3) {
    baseScore = 9;
  } else if (projectCount === 2) {
    baseScore = 7;
  } else {
    baseScore = 5; // 1 project
  }

  const rawScore = baseScore + qualityScore;

  return clamp(rawScore, 0, MAX_SCORES.projects);
}
