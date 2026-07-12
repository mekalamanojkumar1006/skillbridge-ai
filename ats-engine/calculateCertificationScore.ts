import { CategoryScore, ParsedResume } from "./types.js";
import {
  MAX_SCORES,
  CERT_PROVIDERS,
  ACHIEVEMENT_KEYWORDS,
} from "./constants.js";
import { lowercaseText, clamp } from "./utils.js";

// Section header indicators for certifications
const CERT_SECTION_PATTERN = /\b(certif|achievement|award|honor|honour|recogni|accomplishment|course|training|license|professional certificate)\b/i;

export function calculateCertificationScore(
  resumeText: string,
  parsedData?: ParsedResume
): CategoryScore {
  const text = lowercaseText(resumeText);

  // ------------------------------------------------------------------
  // Check for certifications section in text
  // ------------------------------------------------------------------
  const hasCertSection = CERT_SECTION_PATTERN.test(resumeText);

  // ------------------------------------------------------------------
  // Gather items from parsedData
  // ------------------------------------------------------------------
  const parsedCerts = parsedData?.certifications || [];
  const parsedHackathons = parsedData?.achievements?.hackathons || [];
  const parsedPapers = parsedData?.achievements?.researchPapers || [];
  const parsedAwards = parsedData?.achievements?.awards || [];
  const parsedVolunteers = parsedData?.volunteerExperience || [];
  const parsedPubs = parsedData?.publications || [];

  const certStrings = [
    ...parsedCerts,
    ...parsedHackathons,
    ...parsedPapers,
    ...parsedAwards,
    ...parsedVolunteers,
    ...parsedPubs
  ].map((s) => s.toLowerCase());

  // ------------------------------------------------------------------
  // Count recognized certificate providers
  // ------------------------------------------------------------------
  let certCount = 0;
  for (const provider of CERT_PROVIDERS) {
    const provLower = provider.toLowerCase();
    const matchesText = text.includes(provLower);
    const matchesParsed = certStrings.some((cs) => cs.includes(provLower));

    if (matchesText || matchesParsed) {
      certCount++;
    }
  }

  // ------------------------------------------------------------------
  // Count achievement keywords (hackathons, competitions, etc.)
  // ------------------------------------------------------------------
  let achievementCount = 0;
  for (const keyword of ACHIEVEMENT_KEYWORDS) {
    const kwLower = keyword.toLowerCase();
    const matchesText = text.includes(kwLower);
    const matchesParsed = certStrings.some((cs) => cs.includes(kwLower));

    if (matchesText || matchesParsed) {
      achievementCount++;
    }
  }

  // Extra check for Campus Ambassador
  const hasCampusAmbassador = text.includes("campus ambassador") || certStrings.some((cs) => cs.includes("campus ambassador"));
  if (hasCampusAmbassador) {
    achievementCount += 2;
  }

  // ------------------------------------------------------------------
  // Score assembly
  // ------------------------------------------------------------------
  if (certCount === 0 && achievementCount === 0) {
    return hasCertSection ? 1 : 0;
  }

  let score = 0;

  if (certCount >= 1) {
    score = 2; // Basic cert
  }
  if (certCount >= 2) {
    score = 4; // Multiple known certs
  }

  // Achievement bonus
  if (achievementCount >= 1) {
    score += 1;
  }
  if (achievementCount >= 2) {
    score += 2; // Extra bonus for hackathons/papers/ambassadors
  }

  return clamp(score, 0, MAX_SCORES.certifications);
}
