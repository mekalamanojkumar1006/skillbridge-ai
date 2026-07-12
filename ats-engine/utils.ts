/**
 * ATS Engine — Utility Functions
 *
 * Pure helper functions shared across all scoring modules.
 * Zero side-effects, fully deterministic, easy to unit-test.
 */

import { ATSBreakdown } from "./types.js";
import { ROLE_SIGNALS, RoleKey } from "./constants.js";

// ---------------------------------------------------------------------------
// Text normalisation
// ---------------------------------------------------------------------------

/**
 * Converts text to lowercase and strips punctuation/special characters,
 * leaving only alphanumeric characters and spaces.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s.+#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Returns the raw lowercase text without stripping — useful when we
 * need to preserve structure (newlines, slashes, etc.) for heuristics.
 */
export function lowercaseText(text: string): string {
  return text.toLowerCase();
}

// ---------------------------------------------------------------------------
// Keyword matching
// ---------------------------------------------------------------------------

/**
 * Counts how many keywords from the list appear in the given text.
 * Returns both the count and the actual matched keyword strings.
 *
 * Matching is whole-word / phrase aware:
 *  - Single words are matched as substrings (fast, handles plural variants)
 *  - Multi-word phrases are matched as substrings of the normalised text
 */
export function getSynonyms(keyword: string): string[] {
  const kw = keyword.toLowerCase().trim();
  const base = [kw];
  
  const synonymMap: Record<string, string[]> = {
    "next.js": ["nextjs", "next.js", "next js"],
    "node.js": ["nodejs", "node.js", "node js"],
    "aws": ["aws", "amazon web services", "amazon webservices"],
    "gcp": ["gcp", "google cloud", "google cloud platform"],
    "azure": ["azure", "microsoft azure"],
    "machine learning": ["machine learning", "ml"],
    "deep learning": ["deep learning", "dl"],
    "nlp": ["nlp", "natural language processing"],
    "cyber security": ["cyber security", "cybersecurity", "netsec", "network security", "infosec", "information security"],
    "ci/cd": ["ci/cd", "cicd", "continuous integration", "continuous deployment", "continuous delivery"],
    "rest api": ["rest api", "restful api", "rest apis", "restful apis"],
    "microservices": ["microservices", "microservice", "micro-services"],
    "unit testing": ["unit testing", "unit test", "unit tests", "jest", "mocha", "junit"],
    "dsa": ["dsa", "data structures", "algorithms"],
    "react": ["react", "react.js", "reactjs", "react js"],
    "vue": ["vue", "vue.js", "vuejs", "vue js"],
    "angular": ["angular", "angularjs", "angular.js", "angular js"],
    "system design": ["system design", "systems design", "architecture design"],
    "agile": ["agile", "scrum", "kanban"],
    "git": ["git", "github", "gitlab", "version control"],
    "ai": ["ai", "artificial intelligence", "genai", "generative ai"],
    "llm": ["llm", "llms", "large language model", "large language models"],
    "rag": ["rag", "retrieval augmented generation"],
    "tailwind": ["tailwind", "tailwindcss"],
    "redux": ["redux", "redux-toolkit"],
    "state management": ["state management", "redux", "mobx", "recoil", "zustand"],
    "responsive design": ["responsive design", "responsive web design", "mobile friendly", "media queries"],
    "web performance": ["web performance", "lighthouse score", "lazy loading", "code splitting"],
    "docker": ["docker", "containerization", "containers"],
    "kubernetes": ["kubernetes", "k8s"],
    "sql": ["sql", "mysql", "postgresql", "sqlite", "oracle sql"],
    "nosql": ["nosql", "mongodb", "cassandra", "dynamodb"],
    "android": ["android", "kotlin", "jetpack compose", "android sdk"],
    "typescript": ["typescript", "ts"],
    "javascript": ["javascript", "js"],
    "python": ["python", "py"],
    "c++": ["c++", "cpp"],
    "c#": ["c#", "csharp"]
  };

  return synonymMap[kw] || base;
}

/**
 * Counts how many keywords from the list appear in the given text,
 * considering synonyms for semantic matching.
 */
export function countMatches(
  normalizedText: string,
  keywords: readonly string[]
): { count: number; matched: string[] } {
  const matched: string[] = [];

  for (const keyword of keywords) {
    const synonyms = getSynonyms(keyword);
    if (synonyms.some(syn => normalizedText.includes(syn.toLowerCase()))) {
      matched.push(keyword);
    }
  }

  return { count: matched.length, matched };
}

/**
 * Returns keywords from the list that are NOT found in the text.
 */
export function findMissing(
  normalizedText: string,
  keywords: readonly string[]
): string[] {
  return keywords.filter((kw) => {
    const synonyms = getSynonyms(kw);
    return !synonyms.some(syn => normalizedText.includes(syn.toLowerCase()));
  });
}

// ---------------------------------------------------------------------------
// Numeric helpers
// ---------------------------------------------------------------------------

/**
 * Clamps a numeric value between [min, max] and rounds to integer.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.round(Math.max(min, Math.min(max, value)));
}

/**
 * Sums all values in an ATSBreakdown object.
 * This is the single source of truth for the total ATS score.
 * Always returns an integer.
 */
export function sumBreakdown(breakdown: ATSBreakdown): number {
  return Math.round(
    breakdown.formatting +
    breakdown.contactInfo +
    breakdown.summary +
    breakdown.skills +
    breakdown.experience +
    breakdown.projects +
    breakdown.education +
    breakdown.certifications +
    breakdown.keywords
  );
}

// ---------------------------------------------------------------------------
// Role detection
// ---------------------------------------------------------------------------

/**
 * Infers the most likely target role from resume text by counting
 * role-signal keyword hits for each role domain.
 *
 * Returns the RoleKey with the highest signal count, defaulting to
 * "software_engineer" when signals are ambiguous.
 */
export function detectRole(normalizedText: string): RoleKey {
  let bestRole: RoleKey = "software_engineer";
  let bestCount = 0;

  for (const [role, signals] of Object.entries(ROLE_SIGNALS) as [RoleKey, string[]][]) {
    const hits = signals.filter((signal) =>
      normalizedText.includes(signal.toLowerCase())
    ).length;

    if (hits > bestCount) {
      bestCount = hits;
      bestRole = role;
    }
  }

  return bestRole;
}

// ---------------------------------------------------------------------------
// Text structure helpers
// ---------------------------------------------------------------------------

/**
 * Splits resume text into lines, strips empty ones.
 */
export function getLines(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line.trim().length > 0);
}

/**
 * Returns true if the text contains a match for the given regex.
 */
export function hasPattern(text: string, pattern: RegExp): boolean {
  return pattern.test(text);
}

/**
 * Counts occurrences of a regex pattern in a string.
 */
export function countPattern(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

/**
 * Extracts numbers from a string (used for CGPA detection).
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Returns a human-readable label for a detected role key.
 */
export function roleLabel(role: RoleKey): string {
  const labels: Record<RoleKey, string> = {
    software_engineer: "Software Engineer",
    frontend:          "Frontend Developer",
    backend:           "Backend Developer",
    ai_engineer:       "AI Engineer",
    machine_learning:  "Machine Learning Engineer",
    data_science:      "Data Scientist",
    cyber_security:    "Cybersecurity Engineer",
    cloud:             "Cloud Engineer",
    devops:            "DevOps Engineer",
    android:           "Android Developer",
  };
  return labels[role] ?? "Software Engineer";
}
