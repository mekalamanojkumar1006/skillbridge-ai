/**
 * ATS Engine — Constants
 *
 * Single source of truth for all scoring weights, deductions, and
 * keyword profiles. Changing a value here automatically affects every
 * scorer — no per-file magic numbers.
 */

// ---------------------------------------------------------------------------
// Maximum scores per category
// ---------------------------------------------------------------------------

export const MAX_SCORES = {
  formatting:     20,
  contactInfo:    10,
  summary:        10,
  skills:         10,
  experience:     10,
  projects:       20,
  education:       5,
  certifications:  5,
  keywords:       10,
} as const;

// ---------------------------------------------------------------------------
// Formatting deductions
// ---------------------------------------------------------------------------

export const FORMATTING_DEDUCTIONS = {
  tables:          4,   // Pipe-delimited table patterns detected
  twoColumn:       4,   // Multi-column layout indicators
  images:          3,   // Image / icon references
  textBoxes:       3,   // Box-drawing characters suggesting text boxes
  poorSpacing:     2,   // Excessively long unbroken lines
  missingHeading:  2,   // Per missing standard section heading
  fancyFont:       2,   // File-level font/creative indicators
} as const;

// Standard section headings expected in an ATS-friendly resume
export const EXPECTED_HEADINGS = [
  "education",
  "experience",
  "skills",
  "projects",
] as const;

// ---------------------------------------------------------------------------
// Contact deductions
// ---------------------------------------------------------------------------

export const CONTACT_SCORES = {
  name:     2,
  email:    2,
  phone:    2,
  github:   2,
  linkedin: 1,
  location: 1,
} as const;

export const CONTACT_DEDUCTIONS = {
  missingGitHub:   2,
  missingLinkedIn: 2,
} as const;

// ---------------------------------------------------------------------------
// Skills category buckets — used to detect breadth across tech domains
// ---------------------------------------------------------------------------

export const SKILL_CATEGORIES = {
  languages:  ["python", "java", "javascript", "typescript", "c++", "c#", "c", "kotlin", "swift", "go", "rust", "ruby", "php", "scala", "r", "matlab"],
  frameworks: ["react", "angular", "vue", "next.js", "nextjs", "nuxt", "express", "fastapi", "django", "flask", "spring", "spring boot", "node.js", "nodejs", "rails", "laravel", "flutter", "tensorflow", "pytorch", "keras"],
  databases:  ["sql", "mysql", "postgresql", "mongodb", "redis", "firebase", "dynamodb", "sqlite", "oracle", "cassandra", "elasticsearch"],
  cloud:      ["aws", "azure", "gcp", "google cloud", "heroku", "vercel", "netlify", "digitalocean", "cloud"],
  devops:     ["docker", "kubernetes", "ci/cd", "jenkins", "github actions", "terraform", "ansible", "linux", "nginx", "git", "github", "gitlab", "bitbucket"],
  aiml:       ["machine learning", "deep learning", "nlp", "computer vision", "langchain", "hugging face", "openai", "llm", "rag", "vector", "embedding", "sklearn", "scikit"],
  tools:      ["vscode", "jira", "figma", "postman", "swagger", "intellij", "xcode", "android studio", "tableau", "power bi", "excel"],
} as const;

// ---------------------------------------------------------------------------
// Action verbs — indicate strong, impactful experience bullets
// ---------------------------------------------------------------------------

export const ACTION_VERBS = [
  "developed", "built", "designed", "implemented", "architected", "engineered",
  "optimized", "improved", "reduced", "increased", "deployed", "migrated",
  "automated", "integrated", "led", "managed", "coordinated", "collaborated",
  "created", "launched", "delivered", "maintained", "refactored", "scaled",
  "researched", "analyzed", "evaluated", "monitored", "configured", "established",
  "streamlined", "accelerated", "enhanced", "resolved", "diagnosed", "troubleshot",
  "mentored", "trained", "reviewed", "published", "presented", "contributed",
  "pioneered", "spearheaded", "overhauled", "revamped", "consolidated",
] as const;

// ---------------------------------------------------------------------------
// Certification / Achievement providers and keywords
// ---------------------------------------------------------------------------

export const CERT_PROVIDERS = [
  "aws certified", "aws solution", "google certified", "google cloud",
  "microsoft certified", "azure", "ibm certified", "oracle certified",
  "coursera", "udemy", "edx", "nptel", "linkedin learning",
  "cisco", "comptia", "red hat", "hashicorp", "databricks",
] as const;

export const ACHIEVEMENT_KEYWORDS = [
  "hackathon", "winner", "finalist", "research paper", "published", "patent",
  "open source", "contributor", "leetcode", "codeforces", "codechef",
  "kaggle", "top", "rank", "competition", "award", "scholarship",
] as const;

// ---------------------------------------------------------------------------
// Keyword profiles per target role (for semantic keyword matching)
// ---------------------------------------------------------------------------

export type RoleKey =
  | "software_engineer"
  | "frontend"
  | "backend"
  | "ai_engineer"
  | "machine_learning"
  | "data_science"
  | "cyber_security"
  | "cloud"
  | "devops"
  | "android";

export const KEYWORD_PROFILES: Record<RoleKey, string[]> = {
  software_engineer: [
    "java", "python", "c++", "javascript", "typescript",
    "dsa", "data structures", "algorithms", "oop", "design patterns",
    "sql", "git", "rest api", "system design", "react", "node.js",
    "microservices", "unit testing", "agile", "scrum",
  ],
  frontend: [
    "html", "css", "javascript", "typescript", "react", "vue", "angular",
    "next.js", "tailwind", "redux", "state management", "responsive design",
    "accessibility", "web performance", "webpack", "vite", "figma",
    "rest api", "graphql", "jest", "cypress",
  ],
  backend: [
    "node.js", "express", "java", "spring boot", "python", "fastapi",
    "django", "flask", "sql", "postgresql", "mongodb", "redis",
    "rest api", "graphql", "microservices", "docker", "aws", "authentication",
    "jwt", "oauth", "message queue", "kafka", "rabbitmq",
  ],
  ai_engineer: [
    "python", "machine learning", "deep learning", "tensorflow", "pytorch",
    "nlp", "computer vision", "opencv", "hugging face", "langchain", "rag",
    "fastapi", "docker", "aws", "git", "rest api", "llm", "embedding",
    "vector database", "prompt engineering", "fine-tuning",
  ],
  machine_learning: [
    "python", "scikit-learn", "tensorflow", "pytorch", "xgboost",
    "feature engineering", "model evaluation", "cross-validation",
    "neural network", "cnn", "rnn", "transformer", "nlp",
    "pandas", "numpy", "matplotlib", "jupyter", "mlops", "mlflow",
  ],
  data_science: [
    "python", "r", "sql", "pandas", "numpy", "matplotlib", "seaborn",
    "tableau", "power bi", "statistics", "machine learning", "regression",
    "classification", "clustering", "data wrangling", "eda", "excel",
    "jupyter", "hypothesis testing", "a/b testing",
  ],
  cyber_security: [
    "network security", "penetration testing", "ethical hacking", "kali linux",
    "wireshark", "nmap", "metasploit", "owasp", "vulnerability assessment",
    "siem", "ids", "ips", "firewall", "cryptography", "pki",
    "incident response", "soc", "threat intelligence", "burp suite",
  ],
  cloud: [
    "aws", "azure", "gcp", "cloud architecture", "ec2", "s3", "lambda",
    "kubernetes", "docker", "terraform", "iac", "auto scaling",
    "load balancer", "vpc", "iam", "cloudformation", "serverless",
    "monitoring", "cloudwatch",
  ],
  devops: [
    "docker", "kubernetes", "ci/cd", "jenkins", "github actions", "gitlab ci",
    "terraform", "ansible", "linux", "bash", "python", "aws", "azure",
    "monitoring", "prometheus", "grafana", "elk stack", "nginx",
    "helm", "argocd", "site reliability",
  ],
  android: [
    "android", "kotlin", "java", "jetpack compose", "android studio",
    "mvvm", "room", "retrofit", "hilt", "dagger", "coroutines",
    "livedata", "viewmodel", "firebase", "google play", "rest api",
    "xml", "material design", "unit testing", "espresso",
  ],
};

// Role detection — keywords that signal a particular role domain
export const ROLE_SIGNALS: Record<RoleKey, string[]> = {
  software_engineer: ["software engineer", "swe", "software developer", "full stack", "fullstack"],
  frontend:          ["frontend", "front-end", "front end", "ui developer", "react developer", "web developer"],
  backend:           ["backend", "back-end", "back end", "server side", "api developer"],
  ai_engineer:       ["ai engineer", "artificial intelligence", "llm", "langchain", "rag", "genai"],
  machine_learning:  ["machine learning", "ml engineer", "deep learning", "data scientist"],
  data_science:      ["data science", "data analyst", "data engineer", "business analyst", "analytics"],
  cyber_security:    ["cyber security", "cybersecurity", "security engineer", "penetration", "ethical hacking", "soc"],
  cloud:             ["cloud engineer", "cloud architect", "aws", "azure architect", "gcp"],
  devops:            ["devops", "devsecops", "sre", "site reliability", "platform engineer", "infrastructure"],
  android:           ["android", "mobile developer", "kotlin developer", "android developer"],
};

// ---------------------------------------------------------------------------
// Score interpretation bands (for reference / documentation)
// ---------------------------------------------------------------------------

export const SCORE_BANDS = {
  outstanding:   { min: 93, max: 100, label: "Outstanding" },
  strong:        { min: 85, max: 92,  label: "Strong"       },
  good:          { min: 75, max: 84,  label: "Good"         },
  average:       { min: 60, max: 74,  label: "Needs Improvement" },
  poor:          { min:  0, max: 59,  label: "Major Improvements Required" },
} as const;

// Hard cap: if projects section is empty, total ATS score cannot exceed this
export const NO_PROJECTS_SCORE_CAP = 60;
