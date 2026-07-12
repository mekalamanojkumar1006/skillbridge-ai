/**
 * ATS Engine — Formatting Score Calculator
 *
 * Max score: 20 points
 *
 * Evaluates ATS-compatibility of resume formatting using text-based
 * heuristics. Starts at max and applies specific deductions for patterns
 * that indicate ATS-unfriendly formatting.
 *
 * Note: Since resumes are parsed to plain text before this runs,
 * heuristics infer layout signals from textual patterns (pipe characters
 * for tables, long lines for poor spacing, etc.).
 */

import { CategoryScore } from "./types.js";
import {
  MAX_SCORES,
  FORMATTING_DEDUCTIONS,
  EXPECTED_HEADINGS,
} from "./constants.js";
import {
  lowercaseText,
  getLines,
  countPattern,
  hasPattern,
  clamp,
} from "./utils.js";

export function calculateFormattingScore(resumeText: string): CategoryScore {
  const text = lowercaseText(resumeText);
  const lines = getLines(resumeText);
  let score = MAX_SCORES.formatting; // Start at 20
  const deductions: string[] = [];

  // ------------------------------------------------------------------
  // 1. Table detection
  //    Pipe characters used to draw table cells are a strong indicator.
  //    Threshold: 3+ lines with 2+ pipe chars each.
  // ------------------------------------------------------------------
  const pipeLines = lines.filter((line) => (line.match(/\|/g) || []).length >= 2);
  if (pipeLines.length >= 3) {
    score -= FORMATTING_DEDUCTIONS.tables;
    deductions.push(`Tables detected (${pipeLines.length} pipe-separated lines)`);
  }

  // ------------------------------------------------------------------
  // 2. Two-column layout detection
  //    Multiple consecutive short lines side-by-side (tab-separated),
  //    or explicit "column" keyword in metadata / unusual whitespace.
  //    Heuristic: lines with 2+ tab characters suggest columnar layout.
  // ------------------------------------------------------------------
  const tabLines = lines.filter((line) => (line.match(/\t/g) || []).length >= 2);
  if (tabLines.length >= 4) {
    score -= FORMATTING_DEDUCTIONS.twoColumn;
    deductions.push(`Two-column layout detected (${tabLines.length} tab-separated lines)`);
  }

  // ------------------------------------------------------------------
  // 3. Image / icon detection
  //    References to image file extensions or explicit image tokens.
  // ------------------------------------------------------------------
  const imagePatterns = /\.(png|jpg|jpeg|gif|svg|webp|ico)\b|\[image\]|\[photo\]|profile picture/i;
  const symbolIcons = /[☐☑☒✓✗★☆●■□▪▫◆◇►▸]/u;
  if (hasPattern(text, imagePatterns) || hasPattern(resumeText, symbolIcons)) {
    score -= FORMATTING_DEDUCTIONS.images;
    deductions.push("Image or icon references detected");
  }

  // ------------------------------------------------------------------
  // 4. Text box / box-drawing character detection
  //    Unicode box-drawing characters indicate a designer template.
  // ------------------------------------------------------------------
  const boxDrawing = /[│─╔╗╚╝╠╣╦╩╬┌┐└┘├┤┬┴┼]/u;
  if (hasPattern(resumeText, boxDrawing)) {
    score -= FORMATTING_DEDUCTIONS.textBoxes;
    deductions.push("Text boxes or box-drawing characters detected");
  }

  // ------------------------------------------------------------------
  // 5. Spacing check — very long unbroken lines or excessive consecutive newlines.
  //    ATS parsers struggle with lines > 120 chars (no natural word-wrap).
  // ------------------------------------------------------------------
  const longLines = lines.filter((line) => line.trim().length > 120);
  const hasExcessiveSpacing = countPattern(resumeText, /(\r?\n\s*){5,}/g) > 0;
  if (longLines.length >= 5 || hasExcessiveSpacing) {
    score -= 2;
    deductions.push("Poor spacing detected (5+ long lines or excessive empty spacing)");
  } else if (longLines.length >= 1) {
    score -= 1;
    deductions.push("Minor spacing warning (1-4 long lines)");
  }

  // ------------------------------------------------------------------
  // 6. Font readability check
  //    If non-standard/unprofessional fonts are mentioned in the text or metadata, deduct.
  // ------------------------------------------------------------------
  const fancyFontsPattern = /\b(comic sans|papyrus|impact|wingdings|chiller|joker|curlz)\b/i;
  if (fancyFontsPattern.test(text)) {
    score -= FORMATTING_DEDUCTIONS.fancyFont;
    deductions.push("Fancy/unprofessional font family name detected");
  }

  // ------------------------------------------------------------------
  // 7. Margin / Alignment check
  //    Detect lines with excessive leading spaces indicating irregular margins.
  // ------------------------------------------------------------------
  const badIndentationLines = lines.filter((line) => line.startsWith("               "));
  if (badIndentationLines.length >= 5) {
    score -= 2; // Deduct for irregular margins/alignment issues
    deductions.push("Irregular margins / excessive indentation detected");
  }

  // ------------------------------------------------------------------
  // 8. Missing standard section headings
  //    A complete ATS-friendly resume must have all four core sections.
  //    Deduct per missing heading (max −8 if all four are absent).
  // ------------------------------------------------------------------
  for (const heading of EXPECTED_HEADINGS) {
    const headingPattern = new RegExp(`\\b${heading}\\b`, "i");
    if (!headingPattern.test(resumeText)) {
      score -= FORMATTING_DEDUCTIONS.missingHeading;
      deductions.push(`Missing standard section heading: "${heading}"`);
    }
  }

  return clamp(score, 0, MAX_SCORES.formatting);
}
