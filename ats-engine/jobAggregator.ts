import fs from "fs";

export interface NormalizedJob {
  id: string;
  role: string;
  company: string;
  applyUrl: string;
  logo: string;
  description: string;
  skills: string[];
  salary: string;
  location: string;
  jobType: "Remote" | "Hybrid" | "Onsite";
  employmentType: "Full Time" | "Part Time" | "Contract" | "Internship";
  experienceLevel: "Junior" | "Mid" | "Senior";
  postedDate: string;
  provider: string;
}

export interface MatchResult {
  job: NormalizedJob;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  reason: string;
}

interface CacheStore {
  timestamp: number;
  jobs: NormalizedJob[];
}

let jobsCache: CacheStore | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes cache TTL

// Helper to sanitize HTML tags
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Helper to fetch with retry
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 2): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 6000); // 6s timeout
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      if (res.ok) return res;
    } catch (err) {
      if (i === retries) throw err;
    }
  }
  throw new Error(`Fetch failed for URL: ${url}`);
}

export class JobAggregatorService {
  // Configured company lists for Greenhouse / Lever public APIs
  private static GREENHOUSE_COMPANIES = ["github", "reddit", "hashicorp", "cloudflare"];
  private static LEVER_COMPANIES = ["lever", "figma", "vercel", "stripe"];

  // Normalize Location to Remote/Hybrid/Onsite
  private static getJobType(location: string, description: string): "Remote" | "Hybrid" | "Onsite" {
    const locLower = (location || "").toLowerCase();
    const descLower = (description || "").toLowerCase();
    if (locLower.includes("remote") || descLower.includes("remote") || locLower.includes("anywhere") || locLower.includes("telecommute")) {
      return "Remote";
    }
    if (locLower.includes("hybrid") || descLower.includes("hybrid")) {
      return "Hybrid";
    }
    return "Onsite";
  }

  // Normalize Employment Type
  private static getEmploymentType(title: string, desc: string): "Full Time" | "Part Time" | "Contract" | "Internship" {
    const text = `${title} ${desc}`.toLowerCase();
    if (text.includes("intern") || text.includes("internship")) return "Internship";
    if (text.includes("contract") || text.includes("contractor") || text.includes("temporary")) return "Contract";
    if (text.includes("part-time") || text.includes("part time")) return "Part Time";
    return "Full Time";
  }

  // Normalize Experience Level
  private static getExperienceLevel(title: string, desc: string): "Junior" | "Mid" | "Senior" {
    const text = `${title} ${desc}`.toLowerCase();
    if (text.includes("senior") || text.includes("lead") || text.includes("staff") || text.includes("principal") || text.includes("sr.")) {
      return "Senior";
    }
    if (text.includes("junior") || text.includes("entry") || text.includes("associate") || text.includes("jr.")) {
      return "Junior";
    }
    return "Mid";
  }

  // Extract skills from text based on a normalized keyword dictionary
  private static extractSkillsFromText(text: string): string[] {
    const skillKeywords = [
      "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "go", "golang", "rust", "php", "swift", "kotlin",
      "react", "angular", "vue", "next.js", "nextjs", "nuxt", "svelte", "express", "node.js", "nodejs", "nest.js", "nestjs",
      "spring", "django", "flask", "rails", "laravel", "fastapi", "html", "css", "tailwind", "sass",
      "postgres", "postgresql", "mysql", "mongodb", "redis", "dynamodb", "sqlite", "oracle", "cassandra", "neo4j",
      "aws", "amazon web services", "azure", "gcp", "google cloud", "docker", "kubernetes", "k8s", "terraform", "ansible",
      "git", "ci/cd", "github actions", "gitlab", "jenkins", "graphql", "rest api", "restful", "grpc", "websockets",
      "pytorch", "tensorflow", "keras", "scikit-learn", "numpy", "pandas", "openai", "gemini", "langchain", "llm"
    ];

    const textLower = text.toLowerCase();
    const foundSkills = new Set<string>();
    
    skillKeywords.forEach(skill => {
      // Word boundary match
      const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      if (regex.test(textLower)) {
        foundSkills.add(skill === "golang" ? "go" : skill === "nextjs" ? "next.js" : skill === "nodejs" ? "node.js" : skill === "nestjs" ? "nest.js" : skill);
      }
    });

    return Array.from(foundSkills);
  }

  // Provider 1: Remotive API (No Key Required)
  private static async fetchRemotive(): Promise<NormalizedJob[]> {
    try {
      const url = "https://remotive.com/api/remote-jobs?limit=40";
      const res = await fetchWithRetry(url);
      const data = await res.json();
      const list = data.jobs || [];
      return list.map((job: any) => {
        const descText = stripHtml(job.description || "");
        const skills = [...new Set([...(job.tags || []), ...this.extractSkillsFromText(descText)])];
        return {
          id: `remotive-${job.id}`,
          role: job.title,
          company: job.company_name,
          applyUrl: job.url,
          logo: job.company_logo || "",
          description: descText.substring(0, 400) + "...",
          skills,
          salary: job.salary || "Competitive",
          location: job.candidate_required_location || "Remote",
          jobType: "Remote",
          employmentType: this.getEmploymentType(job.title, descText),
          experienceLevel: this.getExperienceLevel(job.title, descText),
          postedDate: job.publication_date ? new Date(job.publication_date).toISOString() : new Date().toISOString(),
          provider: "Remotive"
        };
      });
    } catch (err) {
      console.error("Remotive provider failure skipped:", err);
      return [];
    }
  }

  // Provider 2: Arbeitnow API (No Key Required)
  private static async fetchArbeitnow(): Promise<NormalizedJob[]> {
    try {
      const url = "https://www.arbeitnow.com/api/job-board-api";
      const res = await fetchWithRetry(url);
      const data = await res.json();
      const list = data.data || [];
      return list.slice(0, 30).map((job: any) => {
        const descText = stripHtml(job.description || "");
        const skills = [...new Set([...(job.tags || []), ...this.extractSkillsFromText(descText)])];
        return {
          id: `arbeitnow-${job.slug}`,
          role: job.title,
          company: job.company_name,
          applyUrl: job.url,
          logo: "",
          description: descText.substring(0, 400) + "...",
          skills,
          salary: "Competitive",
          location: job.location || "Europe",
          jobType: this.getJobType(job.location, descText),
          employmentType: this.getEmploymentType(job.title, descText),
          experienceLevel: this.getExperienceLevel(job.title, descText),
          postedDate: new Date().toISOString(), // Arbeitnow uses dynamic indexing
          provider: "Arbeitnow"
        };
      });
    } catch (err) {
      console.error("Arbeitnow provider failure skipped:", err);
      return [];
    }
  }

  // Provider 3: Greenhouse Job Boards (Vercel, Figma, reddit etc. No Key Required)
  private static async fetchGreenhouse(): Promise<NormalizedJob[]> {
    const aggregated: NormalizedJob[] = [];
    for (const company of this.GREENHOUSE_COMPANIES) {
      try {
        const url = `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`;
        const res = await fetchWithRetry(url);
        const data = await res.json();
        const list = data.jobs || [];
        list.slice(0, 15).forEach((job: any) => {
          const locationName = job.location?.name || "Global";
          aggregated.push({
            id: `greenhouse-${company}-${job.id}`,
            role: job.title,
            company: company.charAt(0).toUpperCase() + company.slice(1),
            applyUrl: job.absolute_url,
            logo: "",
            description: `Join our team in a ${job.title} capacity. We look for passionate individuals skilled in modern technologies.`,
            skills: this.extractSkillsFromText(job.title),
            salary: "Market Rate",
            location: locationName,
            jobType: this.getJobType(locationName, job.title),
            employmentType: "Full Time",
            experienceLevel: this.getExperienceLevel(job.title, ""),
            postedDate: job.updated_at || new Date().toISOString(),
            provider: `Greenhouse (${company})`
          });
        });
      } catch (err) {
        console.warn(`Greenhouse board fetch failed for ${company}, skipping:`, err);
      }
    }
    return aggregated;
  }

  // Provider 4: Lever Job Postings (Vercel, Figma etc. No Key Required)
  private static async fetchLever(): Promise<NormalizedJob[]> {
    const aggregated: NormalizedJob[] = [];
    for (const company of this.LEVER_COMPANIES) {
      try {
        const url = `https://api.lever.co/v0/postings/${company}?limit=15`;
        const res = await fetchWithRetry(url);
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        list.forEach((job: any) => {
          const location = job.categories?.location || "Remote";
          const commitment = job.categories?.commitment || "Full-time";
          const descText = stripHtml(job.description || "");
          const skills = [...new Set([...this.extractSkillsFromText(job.title), ...this.extractSkillsFromText(descText)])];
          aggregated.push({
            id: `lever-${company}-${job.id}`,
            role: job.title,
            company: company.charAt(0).toUpperCase() + company.slice(1),
            applyUrl: job.hostedUrl,
            logo: "",
            description: descText.substring(0, 400) + "...",
            skills,
            salary: "Competitive",
            location,
            jobType: this.getJobType(location, descText),
            employmentType: commitment.toLowerCase().includes("intern") ? "Internship" : this.getEmploymentType(job.title, commitment),
            experienceLevel: this.getExperienceLevel(job.title, descText),
            postedDate: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
            provider: `Lever (${company})`
          });
        });
      } catch (err) {
        console.warn(`Lever board fetch failed for ${company}, skipping:`, err);
      }
    }
    return aggregated;
  }

  // Provider 5: Adzuna API (Key Check Fallback)
  private static async fetchAdzuna(): Promise<NormalizedJob[]> {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;
    if (!appId || !appKey) {
      return []; // Return empty if keys are not configured, bypass gracefully
    }
    try {
      const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=30&content-type=application/json&what=developer`;
      const res = await fetchWithRetry(url);
      const data = await res.json();
      const list = data.results || [];
      return list.map((job: any) => {
        const descText = stripHtml(job.description || "");
        const skills = this.extractSkillsFromText(`${job.title} ${descText}`);
        return {
          id: `adzuna-${job.id}`,
          role: job.title,
          company: job.company?.display_name || "Enterprise Corp",
          applyUrl: job.redirect_url,
          logo: "",
          description: descText.substring(0, 400) + "...",
          skills,
          salary: job.salary_min ? `$${Math.round(job.salary_min / 1000)}k - $${Math.round(job.salary_max / 1000)}k` : "Competitive",
          location: job.location?.display_name || "United States",
          jobType: this.getJobType(job.location?.display_name || "", descText),
          employmentType: this.getEmploymentType(job.title, descText),
          experienceLevel: this.getExperienceLevel(job.title, descText),
          postedDate: job.created ? new Date(job.created).toISOString() : new Date().toISOString(),
          provider: "Adzuna"
        };
      });
    } catch (err) {
      console.error("Adzuna provider fail, skipped:", err);
      return [];
    }
  }

  // Main aggregator method to fetch all and cache
  public static async fetchAllJobs(): Promise<NormalizedJob[]> {
    const now = Date.now();
    if (jobsCache && now - jobsCache.timestamp < CACHE_TTL) {
      return jobsCache.jobs;
    }

    // Run all fetches concurrently with error protection
    const results = await Promise.allSettled([
      this.fetchRemotive(),
      this.fetchArbeitnow(),
      this.fetchGreenhouse(),
      this.fetchLever(),
      this.fetchAdzuna()
    ]);

    const allJobs: NormalizedJob[] = [];
    const seenUrls = new Set<string>();

    results.forEach(res => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        res.value.forEach(job => {
          if (!seenUrls.has(job.applyUrl)) {
            seenUrls.add(job.applyUrl);
            allJobs.push(job);
          }
        });
      }
    });

    // Save to Cache
    jobsCache = {
      timestamp: now,
      jobs: allJobs
    };

    return allJobs;
  }

  // Match resume profile against jobs list using Heuristic Weights
  public static matchResumeToJobs(resumeParsed: any, jobs: NormalizedJob[]): MatchResult[] {
    const resumeSkillsObj = resumeParsed?.skills || {};
    let resumeSkills: string[] = [];

    if (Array.isArray(resumeSkillsObj)) {
      resumeSkills = resumeSkillsObj;
    } else if (typeof resumeSkillsObj === "object") {
      resumeSkills = [
        ...(resumeSkillsObj.languages || []),
        ...(resumeSkillsObj.frameworks || []),
        ...(resumeSkillsObj.libraries || []),
        ...(resumeSkillsObj.databases || []),
        ...(resumeSkillsObj.cloud || []),
        ...(resumeSkillsObj.devops || []),
        ...(resumeSkillsObj.aiMlTools || []),
        ...(resumeSkillsObj.devTools || []),
        ...(resumeSkillsObj.all || [])
      ];
    }
    // De-duplicate and lowercase resume skills
    resumeSkills = [...new Set(resumeSkills.map(s => s.toLowerCase()))];

    const educationList = resumeParsed?.education || [];
    const experienceList = resumeParsed?.experience || [];
    const projectsList = resumeParsed?.projects || [];
    const certifications = resumeParsed?.certifications || [];

    return jobs.map(job => {
      let score = 0;
      const jobSkills = job.skills.map(s => s.toLowerCase());
      
      // 1. Skills Match (45%)
      let skillsScore = 0;
      let matchedSkills: string[] = [];
      let missingSkills: string[] = [];

      if (jobSkills.length > 0) {
        matchedSkills = job.skills.filter(s => resumeSkills.includes(s.toLowerCase()));
        missingSkills = job.skills.filter(s => !resumeSkills.includes(s.toLowerCase()));
        const overlapRatio = matchedSkills.length / jobSkills.length;
        skillsScore = Math.round(overlapRatio * 45);
      } else {
        // If job has no parsed skills, check keyword matching in title / description
        const roleLower = job.role.toLowerCase();
        const descLower = job.description.toLowerCase();
        const intersections = resumeSkills.filter(s => roleLower.includes(s) || descLower.includes(s));
        skillsScore = intersections.length > 0 ? 35 : 15;
        matchedSkills = intersections;
      }
      score += skillsScore;

      // 2. Experience Match (20%)
      let experienceScore = 0;
      const jobLevel = job.experienceLevel;
      const candidateHasSeniorKeywords = experienceList.some((exp: any) => {
        const title = (exp.role || "").toLowerCase();
        return title.includes("senior") || title.includes("lead") || title.includes("staff") || title.includes("manager");
      });
      const experienceYears = experienceList.length * 2.5; // Heuristic estimate

      if (jobLevel === "Junior") {
        experienceScore = 20; // Full match for entry level
      } else if (jobLevel === "Mid") {
        experienceScore = experienceYears >= 2 ? 20 : 12;
      } else if (jobLevel === "Senior") {
        experienceScore = candidateHasSeniorKeywords || experienceYears >= 4 ? 20 : 8;
      }
      score += experienceScore;

      // 3. Projects Match (15%)
      let projectsScore = 0;
      const projectTechStack = projectsList.flatMap((p: any) => p.techStack || []).map((t: string) => t.toLowerCase());
      if (projectTechStack.length > 0) {
        const overlaps = jobSkills.filter(s => projectTechStack.includes(s));
        projectsScore = overlaps.length > 0 ? 15 : 6;
      } else {
        projectsScore = 8;
      }
      score += projectsScore;

      // 4. Education Match (10%)
      let educationScore = 0;
      const descLower = job.description.toLowerCase();
      const requiresDegree = descLower.includes("degree") || descLower.includes("bachelor") || descLower.includes("master") || descLower.includes("bs") || descLower.includes("ms");
      if (requiresDegree) {
        educationScore = educationList.length > 0 ? 10 : 4;
      } else {
        educationScore = 10; // No strict requirement
      }
      score += educationScore;

      // 5. Certifications Match (10%)
      let certScore = 5; // Default base score
      if (certifications.length > 0) {
        const certTexts = certifications.map((c: string) => c.toLowerCase());
        const hasMatchingCert = certTexts.some((c: string) => descLower.includes(c) || job.role.toLowerCase().includes(c));
        certScore = hasMatchingCert ? 10 : 8;
      }
      score += certScore;

      // Format custom recommendation explanation
      let reason = `Matches your focus in ${matchedSkills.slice(0, 3).join(", ") || "software engineering"}.`;
      if (missingSkills.length > 0) {
        reason += ` Suggest learning ${missingSkills.slice(0, 2).join(", ")} to boost selection rates.`;
      } else {
        reason += " Your profile technical parameters perfectly overlap with the role requirements.";
      }

      return {
        job,
        matchScore: Math.min(Math.max(score, 10), 99), // Cap between 10% and 99%
        matchedSkills,
        missingSkills,
        reason
      };
    });
  }
}
