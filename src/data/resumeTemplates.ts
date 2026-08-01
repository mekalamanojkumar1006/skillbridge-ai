export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: "tech" | "corporate" | "minimal" | "creative";
  bestFor: string;
  atsScore: number;
  atsStars: string;
  atsReason: string;
  badges: string[];
  supportedSections: string[];
  exampleLayout: string;
  layoutType: "single" | "compact" | "two-column" | "modern" | "executive" | "minimal" | "google" | "creative";
  sampleData: {
    role: string;
    summary: string;
    skills: string;
    experience: Array<{ role: string; company: string; duration: string; description: string }>;
    education: Array<{ degree: string; institution: string; duration: string; fieldOfStudy: string }>;
    projects?: Array<{ name: string; tech: string; description: string }>;
    achievements?: string[];
  };
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: "classic-ats",
    name: "Classic ATS",
    description: "Standard single-column format optimized for Maximum ATS Parsing accuracy.",
    category: "tech",
    bestFor: "Software Engineers, Freshers, Internships",
    atsScore: 99,
    atsStars: "★★★★★",
    atsReason: "Strict single-column layout, standard sans-serif font, linear hierarchy parseable by all major ATS parsers (Taleo, Workday, Greenhouse).",
    badges: ["ATS Friendly", "Top Rated", "99% Pass Rate"],
    supportedSections: ["Contact Info", "Executive Summary", "Technical Skills", "Work Experience", "Education", "Projects"],
    exampleLayout: "Header → Summary → Skills → Experience → Education",
    layoutType: "single",
    sampleData: {
      role: "Full Stack Software Engineer",
      summary: "High-performing Full Stack Engineer with 3+ years of experience building microservices and responsive web platforms. Proficient in React, Node.js, and cloud infrastructure.",
      skills: "JavaScript, TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, Docker, AWS, Git",
      experience: [
        {
          role: "Senior Frontend Developer",
          company: "NexGen Tech Systems",
          duration: "2023 - Present",
          description: "Architected micro-frontend React dashboard used by 120k active users. Optimized core web vitals, reducing page load latency by 42%."
        },
        {
          role: "Software Development Intern",
          company: "CloudScale Labs",
          duration: "2022 - 2023",
          description: "Developed RESTful backend endpoints in Node.js/Express. Implemented automated CI/CD pipeline using GitHub Actions."
        }
      ],
      education: [
        {
          degree: "B.S. in Computer Science",
          institution: "State Institute of Technology",
          duration: "2019 - 2023",
          fieldOfStudy: "Computer Science & Engineering"
        }
      ],
      projects: [
        {
          name: "SkillBridge AI Career Engine",
          tech: "React, TypeScript, Firebase, Node.js",
          description: "Built real-time career analytics engine with resume keyword extraction."
        }
      ],
      achievements: [
        "1st Place in University Hackathon out of 85 competing engineering teams.",
        "Published technical article on React State Optimization with 50k+ views."
      ]
    }
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean aesthetic with subtle indigo structural accents for high-growth tech companies.",
    category: "tech",
    bestFor: "Product Companies, Tech Startups, Scaleups",
    atsScore: 97,
    atsStars: "★★★★★",
    atsReason: "Modern section headers with ATS-compliant text tagging and structured spacing.",
    badges: ["Modern", "ATS Friendly", "Recommended"],
    supportedSections: ["Header", "Summary", "Core Competencies", "Experience", "Education", "Certifications"],
    exampleLayout: "Indigo Banner Header → Summary Grid → Skills Pills → Timeline → Academic Box",
    layoutType: "modern",
    sampleData: {
      role: "Senior Product Developer",
      summary: "Product-minded Developer with expertise in React, Next.js, and Distributed Cloud Systems. Proven track record scaling applications from 0 to 1M users.",
      skills: "Next.js, React, GraphQL, Tailwind CSS, Node.js, Redis, AWS Lambda, System Design",
      experience: [
        {
          role: "Lead Software Developer",
          company: "Velocity Startup Studio",
          duration: "2023 - Present",
          description: "Led team of 6 engineers to build real-time collaborative workspace app. Increased monthly active user engagement by 65%."
        }
      ],
      education: [
        {
          degree: "B.Tech in Information Technology",
          institution: "National Tech University",
          duration: "2018 - 2022",
          fieldOfStudy: "Information Technology"
        }
      ]
    }
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Authoritative design tailored for senior engineers, engineering managers, and directors.",
    category: "corporate",
    bestFor: "Experienced Professionals, Engineering Managers, Directors",
    atsScore: 98,
    atsStars: "★★★★★",
    atsReason: "Formal bold typography hierarchy emphasizing leadership achievements and quantifiable impact.",
    badges: ["Executive", "ATS Friendly", "Leadership"],
    supportedSections: ["Executive Profile", "Strategic Competencies", "Career History", "Education & Leadership"],
    exampleLayout: "Formal Header → Leadership Profile → Core Competencies → Impact History → Degrees",
    layoutType: "executive",
    sampleData: {
      role: "Engineering Manager / Lead Architect",
      summary: "Strategic Technology Leader with 8+ years managing engineering teams and enterprise software solutions. Managed $2.5M cloud infrastructure budgets.",
      skills: "Engineering Management, Architecture, System Design, Cloud Strategy, Team Mentorship, Agile, Python, Go, Kubernetes",
      experience: [
        {
          role: "Staff Software Architect",
          company: "Enterprise Cloud Solutions",
          duration: "2021 - Present",
          description: "Directed migration of legacy monolith to Kubernetes microservices, achieving 99.99% system availability and cutting cloud costs by $350k annually."
        }
      ],
      education: [
        {
          degree: "M.S. in Computer Science",
          institution: "Tech University Graduate School",
          duration: "2017 - 2019",
          fieldOfStudy: "Distributed Systems"
        }
      ]
    }
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Sleek, minimalist single-page layout designed for maximum clarity and fast scanning.",
    category: "minimal",
    bestFor: "College Students, Campus Placements, Early Career",
    atsScore: 96,
    atsStars: "★★★★½",
    atsReason: "Zero clutter, standard fonts, high contrast ratios ensure 100% reader and parser comprehension.",
    badges: ["Minimalist", "Clean", "Campus Choice"],
    supportedSections: ["Name & Contact", "Objective", "Skills", "Education", "Projects", "Interests"],
    exampleLayout: "Clean Header → Objective → Skill Badges → Projects Grid → Education",
    layoutType: "minimal",
    sampleData: {
      role: "Junior Software Associate",
      summary: "Motivated Computer Science graduate eager to apply strong data structures, algorithms, and web development skills in a fast-paced environment.",
      skills: "Python, C++, Java, HTML5, CSS3, JavaScript, Git, SQL, Problem Solving",
      experience: [
        {
          role: "Web Development Project Intern",
          company: "Digital Innovations Lab",
          duration: "Summer 2023",
          description: "Built responsive landing pages and integrated REST endpoints using React and Express."
        }
      ],
      education: [
        {
          degree: "B.S. in Computer Applications",
          institution: "City College of Science",
          duration: "2020 - 2024",
          fieldOfStudy: "Computer Applications"
        }
      ]
    }
  },
  {
    id: "google-style",
    name: "Google Style",
    description: "Strictly formatted according to Google, Microsoft, and Big Tech recruiter guidelines.",
    category: "tech",
    bestFor: "Google, Microsoft, Amazon, Meta Applications",
    atsScore: 99,
    atsStars: "★★★★★",
    atsReason: "XYZ formula metric format (Accomplished X as measured by Y by doing Z) highly favored by Tier-1 tech screeners.",
    badges: ["Tier-1 Recommended", "Google Style", "99% ATS"],
    supportedSections: ["Header", "Education", "Technical Skills", "Work Experience", "Projects"],
    exampleLayout: "Header → Education Top → Technical Skills → Bullet Metric Experience → Technical Projects",
    layoutType: "google",
    sampleData: {
      role: "Software Engineer II",
      summary: "Results-driven Engineer specializing in distributed computing, data structures, and backend systems performance optimization.",
      skills: "C++, Java, Go, Python, Distributed Systems, gRPC, Protocol Buffers, Algorithms, Linux",
      experience: [
        {
          role: "Software Engineer",
          company: "BigTech Systems",
          duration: "2022 - Present",
          description: "Optimized database query throughput by 48% (Y) by implementing an in-memory Redis caching layer (Z), reducing user p99 latency to 12ms (X)."
        }
      ],
      education: [
        {
          degree: "B.S. in Computer Science & Engineering",
          institution: "Top Tech University",
          duration: "2018 - 2022",
          fieldOfStudy: "Computer Science"
        }
      ]
    }
  },
  {
    id: "creative",
    name: "Creative Modern",
    description: "Visually engaging design for product designers, UI/UX engineers, and digital marketers.",
    category: "creative",
    bestFor: "Designers, UI/UX Engineers, Frontend Specialists",
    atsScore: 94,
    atsStars: "★★★★☆",
    atsReason: "Visually distinctive section badges while retaining standard text nodes for parser accessibility.",
    badges: ["Creative", "UI/UX", "Portfolio Ready"],
    supportedSections: ["Creative Profile", "Design & Code Skills", "Work Highlights", "Portfolio Projects"],
    exampleLayout: "Creative Badge Header → Bio -> Tech & Design Skills -> Project Highlights -> Degree",
    layoutType: "creative",
    sampleData: {
      role: "UI/UX Engineer & Designer",
      summary: "Creative Developer bridging design systems and frontend code. Specializes in Figma to React workflows and motion design.",
      skills: "Figma, React, Tailwind CSS, Framer Motion, UI Systems, Design Tokens, User Testing, HTML/CSS",
      experience: [
        {
          role: "Lead UI Engineer",
          company: "Pixel Craft Studio",
          duration: "2023 - Present",
          description: "Designed and built custom web design system adopted across 14 digital products."
        }
      ],
      education: [
        {
          degree: "B.Des in Interaction Design",
          institution: "Design & Arts Institute",
          duration: "2019 - 2023",
          fieldOfStudy: "Interaction Design"
        }
      ]
    }
  },
  {
    id: "compact-one-page",
    name: "Compact One Page",
    description: "Density-optimized layout ensuring 100% of candidate content fits cleanly on a single page.",
    category: "minimal",
    bestFor: "Freshers, Campus Hiring, 1-Page Requirements",
    atsScore: 98,
    atsStars: "★★★★★",
    atsReason: "High-density single page layout eliminates multi-page trailing lines that confuse ATS parsers.",
    badges: ["Compact", "One Page", "Campus Hiring"],
    supportedSections: ["Compact Header", "Skills Grid", "Experience List", "Education & Awards"],
    exampleLayout: "Header → Compact Skills Bar → Dense Experience List → Academic Degrees",
    layoutType: "compact",
    sampleData: {
      role: "Junior Developer / Associate",
      summary: "Agile Computer Science graduate with strong foundations in JavaScript, React, and Database Management.",
      skills: "JavaScript, React, Node.js, Express, HTML/CSS, Git, SQL, Problem Solving",
      experience: [
        {
          role: "Software Engineering Intern",
          company: "Innovate AI",
          duration: "2023 - 2024",
          description: "Built automated data ingestion pipelines and UI components in React."
        }
      ],
      education: [
        {
          degree: "B.Tech in Computer Engineering",
          institution: "Metropolitan University",
          duration: "2020 - 2024",
          fieldOfStudy: "Computer Engineering"
        }
      ]
    }
  },
  {
    id: "two-column-pro",
    name: "Two Column Professional",
    description: "Structured split-view layout with sidebar contact & skills alongside main experience timeline.",
    category: "corporate",
    bestFor: "Experienced Candidates, Full Stack Engineers, Consultants",
    atsScore: 95,
    atsStars: "★★★★½",
    atsReason: "Structured layout with clear column semantic order for modern parser compatibility.",
    badges: ["Two Column", "Professional", "Structured"],
    supportedSections: ["Sidebar (Contact & Skills)", "Main Area (Summary, Experience, Education)"],
    exampleLayout: "Left Column: Contact, Skills, Languages | Right Column: Profile, Timeline, Degrees",
    layoutType: "two-column",
    sampleData: {
      role: "Senior Tech Lead & Consultant",
      summary: "Versatile Tech Lead with 6+ years driving enterprise digital transformation and cloud migrations.",
      skills: "React, Node.js, Cloud Architecture, AWS, DevOps, Team Leadership, GraphQL, PostgreSQL",
      experience: [
        {
          role: "Senior Consultant Developer",
          company: "Apex Tech Advisory",
          duration: "2022 - Present",
          description: "Consulted for Fortune 500 clients, delivering modern cloud web apps with 99.9% uptime."
        }
      ],
      education: [
        {
          degree: "B.S. in Computer Science",
          institution: "Tech State College",
          duration: "2016 - 2020",
          fieldOfStudy: "Computer Science"
        }
      ]
    }
  }
];
