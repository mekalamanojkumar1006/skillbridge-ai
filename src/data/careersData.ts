export interface PracticalProject {
  title: string;
  description: string;
}

export interface Milestone {
  milestoneTitle: string;
  duration: string;
  description: string;
  learningObjectives: string[];
  recommendedResources: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skillsToLearn: string[];
  practiceQuestions: string[];
  practicalProject: PracticalProject;
}

export interface CareerPath {
  id: string;
  title: string;
  icon: string;
  description: string;
  coursesCount: number;
  salaryLPA: string;
  hiringCompanies: string[];
  demandScore: number;
  durationMonths: number;
  milestones: Milestone[];
}

export const CAREER_ROADMAPS: CareerPath[] = [
  {
    id: "sde",
    title: "Software Development Engineer (SDE)",
    icon: "Code",
    description: "Design, build, and maintain large-scale software applications and systems.",
    coursesCount: 18,
    salaryLPA: "8 - 25 LPA",
    hiringCompanies: ["Google", "Microsoft", "Amazon", "Uber", "Flipkart"],
    demandScore: 95,
    durationMonths: 9,
    milestones: [
      {
        milestoneTitle: "Programming Fundamentals",
        duration: "Weeks 1-2",
        description: "Master the basics of coding using a high-level language like Python or Java.",
        learningObjectives: [
          "Understand variables, data types, and operations",
          "Master control flow (if-else, loops)",
          "Write reusable functions and modular code"
        ],
        recommendedResources: [
          "MDN Web Docs (Programming Basics)",
          "Python.org Tutorial",
          "W3Schools Programming Introduction"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Variables", "Control Flow", "Functions", "Basic Syntax"],
        practiceQuestions: [
          "Write a program to check if a number is prime.",
          "Generate the Fibonacci sequence up to N terms.",
          "Find the maximum number in an array without using built-in methods."
        ],
        practicalProject: {
          title: "Console Calculator",
          description: "Build a command-line calculator that handles basic arithmetic operations and maintains a history of past equations."
        }
      },
      {
        milestoneTitle: "Object-Oriented Programming (OOP)",
        duration: "Weeks 3-4",
        description: "Learn how to structure programs by bundling related properties and behaviors into objects.",
        learningObjectives: [
          "Understand Classes, Objects, and Instantiation",
          "Master Encapsulation, Inheritance, Polymorphism, and Abstraction",
          "Understand interfaces and abstract classes"
        ],
        recommendedResources: [
          "Java Object-Oriented Programming (Oracle docs)",
          "OOP in Python (Real Python Guides)",
          "Head First Design Patterns (Book)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Classes"],
        practiceQuestions: [
          "Design a library management system using class hierarchies.",
          "Create a shape interface and implement it for circles and rectangles.",
          "Simulate a banking transactions account class with private balances."
        ],
        practicalProject: {
          title: "School Management System",
          description: "Develop a system representing students, teachers, and courses using clean inheritance and encapsulation principles."
        }
      },
      {
        milestoneTitle: "Data Structures",
        duration: "Weeks 5-7",
        description: "Organize, store, and manage data efficiently in memory.",
        learningObjectives: [
          "Understand complexity analysis (Big O notation)",
          "Implement Arrays, Lists, Stacks, Queues",
          "Master Hash Maps, Trees, Graphs"
        ],
        recommendedResources: [
          "GeeksforGeeks Data Structures Course",
          "Introduction to Algorithms by CLRS (Book)",
          "NeetCode.io Roadmap"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Arrays", "Stacks & Queues", "Hash Maps", "Binary Trees", "Big O Notation"],
        practiceQuestions: [
          "Reverse a linked list in-place.",
          "Find if a binary tree is balanced.",
          "Implement a custom HashMap with collision handling."
        ],
        practicalProject: {
          title: "Contact Index Directory",
          description: "Build an indexed phone directory using a Trie data structure for fast prefix searching and auto-completion."
        }
      },
      {
        milestoneTitle: "Algorithms",
        duration: "Weeks 8-10",
        description: "Study techniques for sorting, searching, and optimizing computation.",
        learningObjectives: [
          "Master Binary Search and Two Pointers",
          "Implement Recursion and Backtracking",
          "Understand Dynamic Programming and Greedy Algorithms"
        ],
        recommendedResources: [
          "LeetCode Core Algorithms Guide",
          "Algorithms Specialization by Stanford (Coursera)",
          "Abdul Bari's Algorithms Series (YouTube)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Binary Search", "Recursion", "Dynamic Programming", "Greedy Algorithms"],
        practiceQuestions: [
          "Implement QuickSort and MergeSort from scratch.",
          "Solve the 0/1 Knapsack problem using dynamic programming.",
          "Find the shortest path in a graph using Dijkstra's algorithm."
        ],
        practicalProject: {
          title: "Pathfinder visualizer",
          description: "Create an interactive visualizer for BFS, DFS, and Dijkstra's algorithms finding paths through a grid maze."
        }
      },
      {
        milestoneTitle: "Git & GitHub",
        duration: "Week 11",
        description: "Master distributed version control for code tracking and collaboration.",
        learningObjectives: [
          "Understand local vs remote versioning repositories",
          "Master branching, merging, and resolving conflicts",
          "Perform pull requests, code reviews, and remote syncing"
        ],
        recommendedResources: [
          "Git Immersion Tutorial",
          "GitHub Skills Interactive Courses",
          "Pro Git Book (Free Online)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Git CLI", "GitHub", "Branching", "Merge Conflict Resolution", "Pull Requests"],
        practiceQuestions: [
          "Create a new branch, commit changes, and merge it back to main.",
          "Simulate and resolve a merge conflict on a single text file.",
          "Perform a git rebase of commits."
        ],
        practicalProject: {
          title: "Collaborative Open-Source Portfolio",
          description: "Establish a repository, publish setup markdown documentation, and collaborate on a project with a partner by submitting and reviewing pull requests."
        }
      },
      {
        milestoneTitle: "SQL & Databases",
        duration: "Weeks 12-13",
        description: "Learn how to store and query application data persistently.",
        learningObjectives: [
          "Design relational database schemas with primary/foreign keys",
          "Write complex SQL queries, JOINs, and aggregates",
          "Understand indexing, normalization, and ACID transactions"
        ],
        recommendedResources: [
          "PostgreSQL Official Documentation",
          "SQLZoo Interactive Tutorial",
          "Database System Concepts (Book)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["PostgreSQL", "Relational Schema Design", "SQL Queries", "Indexing", "ACID Invariants"],
        practiceQuestions: [
          "Write a query to find the second highest salary from an Employee table.",
          "Implement a database trigger/stored procedure for tracking transaction history.",
          "Optimize a slow query by analyzing query plans and indexing."
        ],
        practicalProject: {
          title: "E-Commerce Database Schema",
          description: "Create and populate a highly normalized PostgreSQL database containing users, products, orders, and payment records."
        }
      },
      {
        milestoneTitle: "HTML & CSS",
        duration: "Weeks 14-15",
        description: "Construct the visual layout and styles of web interfaces.",
        learningObjectives: [
          "Structure pages semantically with HTML5",
          "Apply styles using modern CSS Flexbox and Grid layouts",
          "Create responsive designs utilizing media queries"
        ],
        recommendedResources: [
          "MDN Web Docs (HTML/CSS)",
          "CSS Tricks Guides",
          "Kevin Powell's Responsive Design Series (YouTube)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["HTML5 Semantics", "CSS Flexbox/Grid", "Responsive Layouts", "Media Queries"],
        practiceQuestions: [
          "Design a multi-column responsive grid layout.",
          "Create a centered glassmorphism card element with hover animations.",
          "Build an accessible navigation bar with submenus."
        ],
        practicalProject: {
          title: "Personal Portfolio Webpage",
          description: "Design a responsive personal portfolio page displaying projects, resume, and contact links using semantic HTML and custom CSS."
        }
      },
      {
        milestoneTitle: "JavaScript",
        duration: "Weeks 16-18",
        description: "Add interactivity, logic, and asynchronous capabilities to web applications.",
        learningObjectives: [
          "Understand DOM manipulation and event handling",
          "Master modern ES6+ concepts (Arrow functions, Destructuring, Modules)",
          "Manage asynchronous operations with Promises and async/await"
        ],
        recommendedResources: [
          "javascript.info (Complete Reference)",
          "Eloquent JavaScript (Book)",
          "You Don't Know JS Book Series"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["DOM Manipulation", "Asynchronous JS", "ES6+ Syntax", "Event Delegation", "JSON & Fetch"],
        practiceQuestions: [
          "Fetch and display user details from a public placeholder API.",
          "Implement a custom debounce function to optimize search inputs.",
          "Build a custom carousel slideshow using JavaScript event listeners."
        ],
        practicalProject: {
          title: "Dynamic Weather App",
          description: "Build a weather forecast interface that consumes real-time data from an external OpenWeather API based on user search queries."
        }
      },
      {
        milestoneTitle: "React",
        duration: "Weeks 19-21",
        description: "Build component-driven user interfaces using the leading frontend framework.",
        learningObjectives: [
          "Understand JSX, virtual DOM, and declarative UI",
          "Master state, props, and react lifecycle hooks (useState, useEffect)",
          "Handle routing and shared context state"
        ],
        recommendedResources: [
          "React.dev Official Documentation",
          "Scrimba Learn React Course",
          "Frontend Masters React Pathway"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["React Components", "Hooks", "State Management", "Client Routing", "Context API"],
        practiceQuestions: [
          "Create a custom React hook for handling local storage states.",
          "Build a paginated item table fetching list records from an API.",
          "Manage active user contexts using the React Context API."
        ],
        practicalProject: {
          title: "Task Tracker Dashboard",
          description: "Develop a kanban-style task tracking board where tasks can be created, dragged, edited, and filtered by priority."
        }
      },
      {
        milestoneTitle: "Backend Development",
        duration: "Weeks 22-24",
        description: "Construct server logic, API infrastructure, and process logic behind the scenes.",
        learningObjectives: [
          "Understand HTTP requests, methods, and status codes",
          "Build server instances handling routing and responses",
          "Implement request parsing and custom server middlewares"
        ],
        recommendedResources: [
          "Node.js Docs",
          "ExpressJS Reference Guides",
          "The Odin Project Node.js Course"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Node.js", "Express", "Server Routing", "Middlewares", "File Systems"],
        practiceQuestions: [
          "Build an Express server that responds to query parameter filters.",
          "Create a custom logging middleware that stamps incoming request methods.",
          "Handle multi-format request bodies (JSON, URL encoded)."
        ],
        practicalProject: {
          title: "Blogging Platform Backend",
          description: "Develop an Express server with routes to create, edit, retrieve, and delete blog posts backed by local database models."
        }
      },
      {
        milestoneTitle: "REST APIs",
        duration: "Week 25",
        description: "Design structured endpoints for communication between frontend and backend.",
        learningObjectives: [
          "Understand RESTful routing design conventions",
          "Implement CRUD operations mapped to correct HTTP verbs",
          "Utilize correct HTTP status codes and structured error handling"
        ],
        recommendedResources: [
          "RestfulAPI.net Guidelines",
          "FreeCodeCamp REST APIs guide",
          "Postman Official Academy tutorials"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["REST Design", "HTTP Status Codes", "JSON Payloads", "CRUD Mapping", "Error Handling"],
        practiceQuestions: [
          "Design a RESTful API structure for an online bookstore.",
          "Handle and capture validation errors returning 400 structures.",
          "Test REST API routes using client agents (Postman or curl)."
        ],
        practicalProject: {
          title: "API Storefront Gate",
          description: "Build a complete REST API with structured resources for an inventory catalogue, incorporating paging and schema validation."
        }
      },
      {
        milestoneTitle: "Build Real Projects",
        duration: "Weeks 26-28",
        description: "Combine frontend, backend, and database technologies to construct a full-stack project.",
        learningObjectives: [
          "Connect frontend React apps with Node/Express backends",
          "Integrate real database storage engines",
          "Secure route access using token authorizations"
        ],
        recommendedResources: [
          "Full Stack Open Course (University of Helsinki)",
          "MDN Client-Server Integration guide",
          "Web Dev Simplified Full-Stack Course"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Full-Stack Integration", "JWT Auth", "Cors Config", "CORS & Headers", "API Consumption"],
        practiceQuestions: [
          "Enable CORS headers to allow cross-origin client requests.",
          "Implement JWT authorization verification middleware.",
          "Secure user passwords using bcrypt hashing before storage."
        ],
        practicalProject: {
          title: "SkillBridge Marketplace",
          description: "Create a fully functional full-stack marketplace web app containing catalog listings, user registration, profiles, and order placements."
        }
      },
      {
        milestoneTitle: "System Design",
        duration: "Weeks 29-30",
        description: "Learn concepts to design scalable, reliable, and maintainable systems.",
        learningObjectives: [
          "Understand load balancing, caching, and horizontal scaling",
          "Master vertical/horizontal scaling techniques",
          "Compare Relational vs NoSQL databases in architecture"
        ],
        recommendedResources: [
          "System Design Primer (GitHub Repository)",
          "Grokking the System Design Interview Course",
          "Designing Data-Intensive Applications (Book)"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Load Balancing", "Caching (Redis)", "Microservices", "Scalability", "Sharding & Replication"],
        practiceQuestions: [
          "Design a system layout for a global video streaming platform.",
          "Explain how cache invalidation strategies operate.",
          "Describe how you would design a globally distributed chat platform."
        ],
        practicalProject: {
          title: "URL Shortener Architecture Model",
          description: "Design and draft structural diagrams detailing load balancers, application clusters, write-through caching, and partitioned database schemes to handle 10,000 requests per second."
        }
      },
      {
        milestoneTitle: "Resume Building",
        duration: "Week 31",
        description: "Draft a clear, impactful, and ATS-friendly resume to highlight technical capabilities.",
        learningObjectives: [
          "Optimize resume layouts for automated ATS scanners",
          "Highlight projects, impact, and skills quantitatively",
          "Write strong, active action verbs explaining accomplishments"
        ],
        recommendedResources: [
          "ATS Optimization Guides (SkillBridge Tools)",
          "Harvard Career Resume Writing Guides",
          "Tech Resume Checklist (GitHub)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["ATS Layouts", "Quantifying Impact", "Action Verbs", "Format Guidelines"],
        practiceQuestions: [
          "Rewrite a project description to include metrics (e.g. 'Reduced loading times by 30%').",
          "Review layout parsing using plain-text compiler converters.",
          "Create a bulleted list of 5 key achievements utilizing standard S.T.A.R formatting."
        ],
        practicalProject: {
          title: "ATS-Grade Software Resume",
          description: "Draft and compile a single-column, Markdown-structured resume tailored for software engineer screening pipelines."
        }
      },
      {
        milestoneTitle: "Interview Preparation",
        duration: "Weeks 32-33",
        description: "Study key technical and behavioral formats expected in SDE screening.",
        learningObjectives: [
          "Structure behavioral responses using the S.T.A.R. framework",
          "Review core CS concepts (OS, Computer Networks, DBMS)",
          "Practice live syntax-free code explanations"
        ],
        recommendedResources: [
          "Cracking the Coding Interview (Book)",
          "Pramp Interview Prep Platform",
          "Tech Interview Handbook"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["S.T.A.R Method", "DBMS & OS", "System Basics", "Networking Principles"],
        practiceQuestions: [
          "Explain how the TCP/IP three-way handshake works.",
          "Describe a time you faced a difficult technical challenge and how you resolved it.",
          "Detail the differences between dynamic threads and processes."
        ],
        practicalProject: {
          title: "Interactive CS Fundamentals Handbook",
          description: "Construct a consolidated notebook of core interview topics including cheat sheets on Networking, OS, and Database architectures."
        }
      },
      {
        milestoneTitle: "Mock Interviews",
        duration: "Week 34",
        description: "Participate in simulated interviews to build confidence and polish delivery.",
        learningObjectives: [
          "Deliver structured explanations under time pressure",
          "Optimize verbal debugging/collaboration during programming challenges",
          "Handle follow-up questions from interviewers"
        ],
        recommendedResources: [
          "Pramp.com Mock Interviews",
          "Interviewing.io mock sessions",
          "SkillBridge AI Interview Simulator"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Live Coding", "Verbal Debugging", "Stress Management", "Communication"],
        practiceQuestions: [
          "Complete a peer coding mock session resolving a tree traversal problem.",
          "Expose your thought process verbally while designing a rate limiter.",
          "Answer three random behavioral questions in under 2 minutes each."
        ],
        practicalProject: {
          title: "Mock Session Scorecard Analysis",
          description: "Conduct 3 peer mock interviews, record constructive feedback, compile key error patterns, and outline an action plan for improvements."
        }
      },
      {
        milestoneTitle: "Apply for Jobs",
        duration: "Weeks 35-36",
        description: "Navigate active job applications, network with industry professionals, and secure screenings.",
        learningObjectives: [
          "Optimize online LinkedIn and GitHub professional profiles",
          "Reach out to recruiters and developers for referrals",
          "Establish systematic application tracking systems"
        ],
        recommendedResources: [
          "LinkedIn Networking Academy",
          "Hunter.io tracking templates",
          "GitHub Job Search pipelines"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["LinkedIn Optimization", "Referrals", "Cold Emailing", "Application Pipelines"],
        practiceQuestions: [
          "Draft a personalized cold LinkedIn message requesting an informational interview.",
          "Identify and catalog 20 companies active in hiring SDEs.",
          "Apply to 5 roles tracking statuses on a Kanban board."
        ],
        practicalProject: {
          title: "Job Search Tracker CRM",
          description: "Build or set up a specialized job tracker dashboard cataloging applications, statuses, recruiters, interview dates, and target templates."
        }
      },
      {
        milestoneTitle: "Become a Software Development Engineer",
        duration: "Careers Transition",
        description: "Land a role, join an engineering team, and transition successfully into active production developer workflows.",
        learningObjectives: [
          "Onboard into production codebases and developer tools",
          "Understand Agile, Scrum, and sprint planning routines",
          "Contribute tested, clean modules into active branches"
        ],
        recommendedResources: [
          "The Effective Engineer (Book)",
          "Clean Code by Robert Martin (Book)",
          "Developer Roadmap (roadmap.sh)"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Agile/Scrum", "Codebase Onboarding", "Production Guidelines", "Team Collaboration"],
        practiceQuestions: [
          "Review a team production pull request offering constructive comments.",
          "Formulate task estimates during a sprint simulation.",
          "Debug a production logs issue to identify exception sources."
        ],
        practicalProject: {
          title: "First 90 Days Growth Matrix",
          description: "Establish a clear transition doc outlining sprint goals, technical stack onboarding checklists, and team connection plans to ensure a successful job start."
        }
      }
    ]
  },
  {
    id: "associate-sde",
    title: "Associate Software Engineer",
    icon: "UserCheck",
    description: "Launch your tech career by writing clean code, fixing bugs, and learning production engineering standards.",
    coursesCount: 8,
    salaryLPA: "4 - 8 LPA",
    hiringCompanies: ["TCS", "Infosys", "Wipro", "Cognizant", "Capgemini"],
    demandScore: 88,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Programming Basics & Git",
        duration: "Month 1",
        description: "Acquire basic syntax in a target language and learn how to save your changes with version control.",
        learningObjectives: [
          "Master basic types, operations, and branches",
          "Install and configure Git version control local environments",
          "Create Git commits, stage files, and check historical logs"
        ],
        recommendedResources: [
          "Git Immersion Guides",
          "Python / JS Beginner Documentation",
          "FreeCodeCamp Core Syntax tutorials"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Variables", "Functions", "Git commits", "Basic syntax"],
        practiceQuestions: [
          "Find the sum of all elements inside an array.",
          "Configure a Git repo and commit changes.",
          "Write a function checking for palindrome text."
        ],
        practicalProject: {
          title: "Todo Organizer Console App",
          description: "A terminal task program allowing tasks to be added, completed, and logged persistently in files."
        }
      },
      {
        milestoneTitle: "Intermediate Data Structures & SQL",
        duration: "Month 2",
        description: "Learn how to store variables cleanly in structures and run basic database selections.",
        learningObjectives: [
          "Understand Lists, Arrays, Map structures",
          "Formulate queries with SQLite or PostgreSQL",
          "Join multiple tables using basic foreign references"
        ],
        recommendedResources: [
          "SQLZoo Interactive courses",
          "Introduction to Data Structures (GeeksforGeeks)",
          "SQLite official tutorials"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Arrays", "List Maps", "SQL Select", "JOIN Queries", "Key Constraints"],
        practiceQuestions: [
          "Select employee details sorted by join dates.",
          "Query database tables filtering using WHERE limits.",
          "Find if a list contains duplicate values."
        ],
        practicalProject: {
          title: "Database Contact Sync Tool",
          description: "Build a program that reads client input records and writes them straight to an SQLite database file."
        }
      },
      {
        milestoneTitle: "Web Development Essentials",
        duration: "Month 3",
        description: "Acquire basic HTML, CSS, and vanilla JS skills to design layouts and handle client input validation.",
        learningObjectives: [
          "Construct semantic layout markups using HTML5",
          "Style components responsive using CSS frameworks or flex styles",
          "Wire logic handling form inputs, field selections, and alerts"
        ],
        recommendedResources: [
          "MDN Web Docs HTML/CSS Guides",
          "CSS Tricks Flexbox reference sheets",
          "JavaScript.info beginner paths"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["HTML5 Layouts", "Flex CSS styles", "Event listeners", "Form validations"],
        practiceQuestions: [
          "Create a form checking if emails conform to standard criteria.",
          "Structure a grid matching desktop view sizes.",
          "Manipulate document layouts dynamically on click."
        ],
        practicalProject: {
          title: "Product Search catalog Page",
          description: "Build a responsive catalogue webpage where users can filter inventory items by categories or pricing bands."
        }
      },
      {
        milestoneTitle: "API Integrations & Backend Basics",
        duration: "Month 4",
        description: "Understand server connections, GET/POST pipelines, and REST protocols.",
        learningObjectives: [
          "Create backend instances responding to client requests",
          "Consume JSON APIs using client fetches",
          "Format status payloads returning structured error formats"
        ],
        recommendedResources: [
          "ExpressJS Quickstarts",
          "REST API standard guides",
          "Postman tutorials"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Node Express server", "HTTP verbs", "JSON parsing", "Third-party APIs"],
        practiceQuestions: [
          "Build a route returning mock profiles data lists.",
          "Consume external weather APIs and display forecasts.",
          "Handle exceptions returning 500 server alerts."
        ],
        practicalProject: {
          title: "Movie Review API Engine",
          description: "Build an API allowing users to query, write, and review film ratings persistently stored in text files."
        }
      },
      {
        milestoneTitle: "Mock Assessments & Resumes",
        duration: "Month 5",
        description: "Polish resume items, highlight academic projects, and practice introductory tech questions.",
        learningObjectives: [
          "Quantify achievements on resume using active verbs",
          "Deliver solutions explaining basic complexity checks",
          "Structure career objectives with S.T.A.R guides"
        ],
        recommendedResources: [
          "Harvard Resume Templates",
          "Cracking the Coding Interview book",
          "SkillBridge AI interview trainer"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Resume building", "S.T.A.R guides", "Basic DSA reviews", "Intro questions"],
        practiceQuestions: [
          "Summarize a project emphasizing what tools were used.",
          "Answer general questions explaining OOP inheritance.",
          "Complete coding tests reversing basic arrays."
        ],
        practicalProject: {
          title: "Interview Prep Portfolio page",
          description: "Establish a complete project catalog showcasing code files, links, and detailed markup explanations."
        }
      },
      {
        milestoneTitle: "Applications & Onboarding Prep",
        duration: "Month 6",
        description: "Submit job applications, network on LinkedIn, and study corporate developer environments.",
        learningObjectives: [
          "Publish projects repositories publicly showing clear setup markdown",
          "Establish systematic application records pipelines",
          "Understand sprint plans, Git branching, and agile developer schedules"
        ],
        recommendedResources: [
          "LinkedIn profiles strategies",
          "Hunter.io templates",
          "Agile/Scrum team guides"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["LinkedIn branding", "Git Branching", "Agile pipelines", "Job searches"],
        practiceQuestions: [
          "Reach out to industry peers asking for team referral pathways.",
          "Submit 10 targeted job applications tracking statuses.",
          "Explain Git branches workflows."
        ],
        practicalProject: {
          title: "First Month Onboarding Log",
          description: "Create a career checklist outlining technical onboarding goals, communication guidelines, and tool setup procedures."
        }
      }
    ]
  },
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    icon: "Monitor",
    description: "Craft modern, responsive, and visually stunning web interfaces using HTML, CSS, JavaScript, and React.",
    coursesCount: 10,
    salaryLPA: "5 - 15 LPA",
    hiringCompanies: ["Vercel", "Airtel", "Paytm", "Swiggy", "Zomato"],
    demandScore: 92,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Advanced CSS & Responsive Design",
        duration: "Month 1",
        description: "Master modern layout engines, responsive strategies, and tailwind/sass configurations.",
        learningObjectives: [
          "Understand flex and grid layouts in-depth",
          "Build pixel-perfect responsive layouts mapping device frames",
          "Incorporate preprocessors and frameworks like Sass or Tailwind CSS"
        ],
        recommendedResources: [
          "Tailwind CSS docs",
          "CSS Grid layouts guides",
          "Responsive Design Patterns (web.dev)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Tailwind CSS", "Sass", "Responsive CSS", "Grid & Flexbox"],
        practiceQuestions: [
          "Build a responsive landing page layout utilizing Tailwind utility classes.",
          "Implement custom utility systems in SASS configurations.",
          "Center complex multi-layered card components without absolute offsets."
        ],
        practicalProject: {
          title: "Premium Landing Page Layout",
          description: "Construct a pixel-perfect SaaS marketing landing page with glassmorphism menus, slide animations, and fully responsive layouts."
        }
      },
      {
        milestoneTitle: "JavaScript Essentials & DOM",
        duration: "Month 2",
        description: "Build robust functional interfaces using core JavaScript logic and DOM handlers.",
        learningObjectives: [
          "Manipulate browser documents using clean scripts",
          "Handle dynamic event flows and event delegator systems",
          "Manage client operations using async scripts"
        ],
        recommendedResources: [
          "JavaScript.info DOM paths",
          "Eloquent JavaScript Web chapters",
          "MDN DOM Tutorials"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Event loops", "DOM Methods", "Event bubbling", "JSON requests"],
        practiceQuestions: [
          "Implement drag/drop items handling without external libraries.",
          "Build custom autocomplete search items with debounce limits.",
          "Retrieve profile data using dynamic fetch modules."
        ],
        practicalProject: {
          title: "Interactive Music Player Panel",
          description: "Develop a browser music console that parses metadata lists, handles play/pause scripts, controls audio elements, and tracks durations."
        }
      },
      {
        milestoneTitle: "React Framework fundamentals",
        duration: "Month 3",
        description: "Organize layout components declarative using state handles and lifecycle hooks.",
        learningObjectives: [
          "Construct reusable functional modular elements",
          "Manage component updates using hook structures",
          "Bind UI components to external data fetches"
        ],
        recommendedResources: [
          "React docs guides",
          "Scrimba React pathways",
          "React Router manuals"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Components", "React hooks", "State props", "List mapping"],
        practiceQuestions: [
          "Design forms capturing user details using React states.",
          "Explain the difference between virtual DOM and direct DOM changes.",
          "Implement hook integrations sync data feeds."
        ],
        practicalProject: {
          title: "E-Store Item Catalogue",
          description: "Build a React catalogue page featuring query search filters, category selectors, sorting options, and dynamic cart counters."
        }
      },
      {
        milestoneTitle: "State Management & Routing",
        duration: "Month 4",
        description: "Connect multi-view web apps using advanced routing and context data sync.",
        learningObjectives: [
          "Implement robust navigation routing schemes",
          "Manage complex global shared datasets using Redux Toolkit or Context API",
          "Persist application settings across routes"
        ],
        recommendedResources: [
          "Redux Toolkit manuals",
          "Zustand documentation",
          "React Router routes guides"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Redux Toolkit", "Context API", "React Router", "Global states"],
        practiceQuestions: [
          "Manage active authentication user states globally.",
          "Build subroute components handling URL keys.",
          "Handle API caching inside global store configurations."
        ],
        practicalProject: {
          title: "Multi-User Task Management Board",
          description: "Create a complete React app with global state management tracking boards, tasks, items assignments, and filter statuses."
        }
      },
      {
        milestoneTitle: "Optimization, Testing & Build Tools",
        duration: "Month 5",
        description: "Optimize page loading times, configure build systems, and write component unit tests.",
        learningObjectives: [
          "Set up projects using modern build tools (Vite, ESLint)",
          "Optimize rendering cycles and image payloads",
          "Write component unit tests using Vitest and React Testing Library"
        ],
        recommendedResources: [
          "Vite Guide docs",
          "React Testing Library manuals",
          "Lighthouse Audit checklists"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Vite", "Unit Testing", "Render Optimization", "Lighthouse audits"],
        practiceQuestions: [
          "Write a test verifying button triggers callback actions.",
          "Optimize loading times by lazy loading routes.",
          "Fix common linting issues within React projects."
        ],
        practicalProject: {
          title: "Performance Audited Dashboard",
          description: "Optimize a slow React app by adding dynamic code splitting, memoization, and lazy loading, achieving a 95+ score on Google Lighthouse."
        }
      },
      {
        milestoneTitle: "Portfolio & Job Applications",
        duration: "Month 6",
        description: "Build a stunning portfolio site, publish on Vercel/Netlify, and submit applications.",
        learningObjectives: [
          "Deploy static builds instantly using CI pipelines",
          "Review accessible markup guidelines mapping WCAG criteria",
          "Apply for roles showing complete GitHub projects repositories"
        ],
        recommendedResources: [
          "Vercel Deployments guidelines",
          "Web Accessibility guidelines",
          "LinkedIn Job Search tutorials"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Deployment (Vercel)", "Accessibility", "Portfolio styling", "Cold pitches"],
        practiceQuestions: [
          "Configure automated deployments mapping GitHub branches.",
          "Ensure keyboard navigation works on custom modal dialogs.",
          "Format clear summaries for all major portfolio items."
        ],
        practicalProject: {
          title: "Production Ready Portfolio Portal",
          description: "Publish a fully responsive, highly customized portfolio portal featuring projects, interactive forms, and accessibility-compliant items."
        }
      }
    ]
  },
  {
    id: "backend-python",
    title: "Backend Developer (Python)",
    icon: "Server",
    description: "Build scalable backends, design API endpoints, and structure database systems using Python, Django, and FastAPI.",
    coursesCount: 11,
    salaryLPA: "6 - 16 LPA",
    hiringCompanies: ["Instagram", "Pinterest", "Paypal", "Ola", "Jio"],
    demandScore: 91,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Python OOP & Environments",
        duration: "Month 1",
        description: "Establish Python virtual environments and master object-oriented concepts.",
        learningObjectives: [
          "Configure virtual environments and manage package dependencies",
          "Master Python class structures, properties, and methods",
          "Design clean subclass structures inheriting shared attributes"
        ],
        recommendedResources: [
          "Real Python OOP paths",
          "Python documentation",
          "Pipenv / Virtualenv manuals"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Python", "Virtualenvs", "Classes & Methods", "Inheritance"],
        practiceQuestions: [
          "Implement class decorators managing access limits.",
          "Resolve multi-inheritance paths within code classes.",
          "Handle file parsing errors gracefully using try-except."
        ],
        practicalProject: {
          title: "CLI Inventory Database Manager",
          description: "Build a Python command line program that reads, structures, parses, and logs product items to local files."
        }
      },
      {
        milestoneTitle: "Relational DBs & SQL",
        duration: "Month 2",
        description: "Connect Python programs with database engines and run data queries.",
        learningObjectives: [
          "Design normalized relational database schemes",
          "Write robust Python scripts querying PostgreSQL databases",
          "Integrate Object Relational Mappers (ORMs) to manage database models"
        ],
        recommendedResources: [
          "SQLAlchemy docs",
          "PostgreSQL manuals",
          "Python Database API reference"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["PostgreSQL", "SQLAlchemy", "ORM Models", "Schema Normalization"],
        practiceQuestions: [
          "Build queries joining 3 distinct tables.",
          "Configure database engines mapping model scripts.",
          "Verify constraints mapping database actions."
        ],
        practicalProject: {
          title: "Database Backed Library System",
          description: "Establish an ORM database layout mapping books, authors, and rentals with automated write-to-database capabilities."
        }
      },
      {
        milestoneTitle: "FastAPI Basics & REST APIs",
        duration: "Month 3",
        description: "Design and implement fast API routes using FastAPI and Pydantic models.",
        learningObjectives: [
          "Implement route methods mapping HTTP calls",
          "Verify request formats using Pydantic data schemas",
          "Generate interactive API swagger documents automatically"
        ],
        recommendedResources: [
          "FastAPI Official Docs",
          "Pydantic validation guides",
          "REST Design principles"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["FastAPI", "Pydantic validation", "Swagger Docs", "REST Methods"],
        practiceQuestions: [
          "Create models testing type values conversions.",
          "Build route returning pagination metadata maps.",
          "Handle incorrect query types returning validation alert codes."
        ],
        practicalProject: {
          title: "Recipe Catalogue REST API",
          description: "Create a fully documented REST API using FastAPI that stores recipes, handles tag searches, and validates request inputs."
        }
      },
      {
        milestoneTitle: "Django Web Framework",
        duration: "Month 4",
        description: "Build administrative portals and secure APIs using the batteries-included Django framework.",
        learningObjectives: [
          "Construct Django project models and route configurations",
          "Secure route queries using built-in session authentication systems",
          "Develop APIs using Django REST Framework (DRF) serializers"
        ],
        recommendedResources: [
          "Django Projects tutorials",
          "Django REST Framework docs",
          "Corey Schafer Django paths"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Django", "DRF Serializers", "Session Auth", "Django Admin"],
        practiceQuestions: [
          "Expose Django database tables in the built-in admin dashboard.",
          "Create serializers transforming relational data into JSON.",
          "Protect route accesses checking user login states."
        ],
        practicalProject: {
          title: "Secure Blog Community portal",
          description: "Develop a Django site displaying posts, comments, registration fields, and custom admin dashboard portals."
        }
      },
      {
        milestoneTitle: "Testing, Celery & Caching",
        duration: "Month 5",
        description: "Integrate background task runners, query caching, and write backend unit tests.",
        learningObjectives: [
          "Write unittest and pytest files verifying API outputs",
          "Delegate long-running scripts using Celery task queues",
          "Optimize database search latency using Redis caching"
        ],
        recommendedResources: [
          "Pytest documentation",
          "Celery asynchronous guides",
          "Redis Python manuals"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Pytest", "Celery Tasks", "Redis Cache", "Task queues"],
        practiceQuestions: [
          "Write test suites verifying expected JSON API outputs.",
          "Delegate automated emails tasks asynchronously to Celery workers.",
          "Cache API results lists in Redis."
        ],
        practicalProject: {
          title: "Cached Performance Analytics System",
          description: "Build an API displaying statistics backed by Celery task reports and fast Redis query cache setups."
        }
      },
      {
        milestoneTitle: "Docker Deployment & Cloud",
        duration: "Month 6",
        description: "Containerize applications, set up cloud databases, and deploy to production environments.",
        learningObjectives: [
          "Write Dockerfile layers compiling Python application dependencies",
          "Deploy container configurations onto cloud hosting platforms (Render/AWS)",
          "Implement continuous deployment testing branches pushes"
        ],
        recommendedResources: [
          "Docker docs",
          "Render Deployments quickstarts",
          "Twelve-Factor App guidelines"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Docker containers", "Cloud Hosting", "CI/CD pipelines", "Env configurations"],
        practiceQuestions: [
          "Build Docker containers starting application instances.",
          "Manage application secrets using secure environment configurations.",
          "Verify log stream updates checking active errors."
        ],
        practicalProject: {
          title: "Production Docker App Deployment",
          description: "Deploy a Dockerized FastAPI application paired with a cloud PostgreSQL database to Render, featuring active endpoint validation."
        }
      }
    ]
  },
  {
    id: "backend-java",
    title: "Backend Developer (Java)",
    icon: "Database",
    description: "Develop robust enterprise systems, APIs, and microservices using Java, Spring Boot, and Hibernate.",
    coursesCount: 12,
    salaryLPA: "7 - 18 LPA",
    hiringCompanies: ["Oracle", "J.P. Morgan", "Goldman Sachs", "TCS", "HDFC Bank"],
    demandScore: 90,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Advanced Java & Maven",
        duration: "Month 1",
        description: "Master Java OOP, Collections, Streams, and project build systems.",
        learningObjectives: [
          "Master Java collections frameworks (Lists, Sets, Maps)",
          "Write declarative pipeline filters using Java Streams and Lambdas",
          "Configure Maven or Gradle dependencies, scopes, and build lifecycles"
        ],
        recommendedResources: [
          "Baeldung Java guides",
          "Maven documentation",
          "Effective Java (Book)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Java Collections", "Streams API", "Maven Build", "OOP Principles"],
        practiceQuestions: [
          "Group a list of transactions by currency using Java Streams.",
          "Implement a custom thread-safe database connection pool manager.",
          "Configure profiles inside Maven pom.xml files."
        ],
        practicalProject: {
          title: "Bank Account Transaction Logger",
          description: "Develop a multi-threaded transaction manager that validates accounts and logs statement records securely to files."
        }
      },
      {
        milestoneTitle: "Spring Boot Essentials",
        duration: "Month 2",
        description: "Learn Spring framework core concepts: Dependency Injection, IoC, and REST Controllers.",
        learningObjectives: [
          "Understand Dependency Injection and inversion of control (IoC) containers",
          "Expose HTTP API interfaces using Spring MVC Controllers",
          "Configure properties for development, staging, and production environments"
        ],
        recommendedResources: [
          "Spring Boot Reference Guide",
          "Java Brains Spring Tutorials (YouTube)",
          "Spring Academy courses"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Spring Boot", "Dependency Injection", "REST Controllers", "Spring IOC"],
        practiceQuestions: [
          "Build mapping configurations injecting Bean dependency parameters.",
          "Validate request inputs returning structured response entities.",
          "Handle exceptions globally using @ControllerAdvice."
        ],
        practicalProject: {
          title: "Employee Directory API Service",
          description: "Build an API using Spring Boot with CRUD endpoints to manage employees, including global exception handlers."
        }
      },
      {
        milestoneTitle: "Spring Data JPA & Databases",
        duration: "Month 3",
        description: "Connect to databases and map data relationships using Spring Data JPA and Hibernate.",
        learningObjectives: [
          "Model relational entities using JPA/Hibernate annotations",
          "Implement repositories automatically generating database queries",
          "Design database relationships (OneToMany, ManyToMany) with lazy loading"
        ],
        recommendedResources: [
          "Spring Data JPA manuals",
          "Vlad Mihalcea Hibernate guides",
          "PostgreSQL guides"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Spring Data JPA", "Hibernate ORM", "Relational Mapping", "Transactions"],
        practiceQuestions: [
          "Query entities utilizing derived repository queries.",
          "Resolve lazy loading issues (e.g. N+1 query problem).",
          "Manage database transactions using @Transactional."
        ],
        practicalProject: {
          title: "E-Store Inventory Management DB",
          description: "Build a Spring Boot service with JPA mapping products, orders, and payment records to a PostgreSQL database."
        }
      },
      {
        milestoneTitle: "Spring Security & JWT",
        duration: "Month 4",
        description: "Protect application routes using Spring Security, CORS rules, and JWT authentication.",
        learningObjectives: [
          "Configure security filter chains to protect application routes",
          "Implement JWT authorization filters verifying requests token keys",
          "Secure service methods using role-based parameters (@PreAuthorize)"
        ],
        recommendedResources: [
          "Spring Security documentation",
          "Okta Developer Security blogs",
          "JWT.io tutorials"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Spring Security", "JWT Tokens", "Password Hashing", "CORS Configurations"],
        practiceQuestions: [
          "Configure password hashing utilizing BCryptPasswordEncoder.",
          "Authenticate login credentials returning signature tokens.",
          "Restrict write endpoints to users with 'ADMIN' privileges."
        ],
        practicalProject: {
          title: "Secure Member Portal API Gateway",
          description: "Create an authentication gateway that registers users, hashes passwords, generates JWT tokens, and protects member resources."
        }
      },
      {
        milestoneTitle: "Microservices & Spring Cloud",
        duration: "Month 5",
        description: "Build distributed microservices architectures using Spring Cloud, Eureka, and API Gateways.",
        learningObjectives: [
          "Design service discovery registrations using Eureka Server",
          "Implement routing pipelines with Spring Cloud Gateway",
          "Enable inter-service communication using Feign Clients"
        ],
        recommendedResources: [
          "Spring Cloud manuals",
          "Java Brains Microservices playlists",
          "Microservices Patterns (Book)"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Microservices", "Service Discovery", "API Gateway", "Feign Clients"],
        practiceQuestions: [
          "Register multiple applications with Eureka server instances.",
          "Configure routes filtering request headers inside API Gateways.",
          "Handle service communication failures using circuit breakers."
        ],
        practicalProject: {
          title: "Microservice Product Order System",
          description: "Construct a microservice cluster containing Catalog, Orders, and Discovery services communicating dynamically."
        }
      },
      {
        milestoneTitle: "Testing, Docker & Deployment",
        duration: "Month 6",
        description: "Write integration tests, containerize with Docker, and deploy services.",
        learningObjectives: [
          "Write integration tests using MockMvc and Testcontainers",
          "Write multi-stage Dockerfiles compiling build artifacts",
          "Deploy services with cloud databases using Docker Compose"
        ],
        recommendedResources: [
          "Spring Boot Testing manuals",
          "Docker docs",
          "Testcontainers documentation"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["JUnit & Mockito", "Integration Testing", "Docker Compose", "Deployments"],
        practiceQuestions: [
          "Write tests verifying repository queries mock results.",
          "Build Docker images compiling application jar files.",
          "Configure databases and application nodes inside Compose files."
        ],
        practicalProject: {
          title: "Dockerized Spring Boot Pipeline",
          description: "Deploy a containerized microservice suite with local PostgreSQL databases using Docker Compose configurations."
        }
      }
    ]
  },
  {
    id: "backend-nodejs",
    title: "Backend Developer (Node.js)",
    icon: "Cpu",
    description: "Build lightning-fast backend services, REST APIs, and real-time WebSockets applications using Express, TypeScript, and MongoDB.",
    coursesCount: 10,
    salaryLPA: "6 - 17 LPA",
    hiringCompanies: ["Netflix", "PayPal", "LinkedIn", "Walmart", "Paytm"],
    demandScore: 93,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "JS/TS & Node.js Core",
        duration: "Month 1",
        description: "Master Node.js event loops, asynchronous programming, and TypeScript setup.",
        learningObjectives: [
          "Understand the Node.js event loop, event emitters, and stream buffers",
          "Set up compiling pipelines using ts-node and typescript configurations",
          "Read and write files asynchronously using fs/promises modules"
        ],
        recommendedResources: [
          "Node.js API documentation",
          "TypeScript Handbook",
          "Node.js design patterns (Book)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Node.js Core", "TypeScript", "Event Emitter", "Async/Await"],
        practiceQuestions: [
          "Implement a custom logging pipeline using Stream writing buffers.",
          "Process large files efficiently by piping read-to-write stream nodes.",
          "Write TypeScript modules using type definitions."
        ],
        practicalProject: {
          title: "File Analyzer Command Line Tool",
          description: "Build a TypeScript CLI application that parses, hashes, and records performance metrics of target files."
        }
      },
      {
        milestoneTitle: "Express REST API Design",
        duration: "Month 2",
        description: "Build robust REST APIs using Express routing and error-handling middlewares.",
        learningObjectives: [
          "Design clean modular routing structures using Express Router",
          "Handle routing exceptions using global Express error-handling middlewares",
          "Validate request inputs using schema checkers (Zod or Joi)"
        ],
        recommendedResources: [
          "ExpressJS guidelines",
          "Zod Validation documentation",
          "HTTP API design best practices"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Express Routing", "Middlewares", "Zod Validation", "API design"],
        practiceQuestions: [
          "Build an Express middleware that logs request times.",
          "Implement route parameters filtering request records.",
          "Write validations rejecting incorrect request bodies."
        ],
        practicalProject: {
          title: "Book Tracker REST API",
          description: "Develop a REST API with validation checking parameters and returning formatted responses."
        }
      },
      {
        milestoneTitle: "Databases: MongoDB & PostgreSQL",
        duration: "Month 3",
        description: "Integrate relational (PostgreSQL) and non-relational (MongoDB) databases with your Node backend.",
        learningObjectives: [
          "Integrate MongoDB database models using Mongoose schemas",
          "Connect PostgreSQL databases utilizing Prisma or TypeORM",
          "Write aggregate query functions returning statistical results"
        ],
        recommendedResources: [
          "Prisma documentation",
          "Mongoose Schema guidelines",
          "SQL vs NoSQL architectures"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["MongoDB", "Mongoose ORM", "Prisma ORM", "Database design"],
        practiceQuestions: [
          "Write a database aggregation query grouping user records by locations.",
          "Manage model transactions using Prisma clients.",
          "Implement indexes improving query times on model tables."
        ],
        practicalProject: {
          title: "User Profile Directory Database",
          description: "Establish a dual-backed data database storing profile details in MongoDB and transactions logs in PostgreSQL."
        }
      },
      {
        milestoneTitle: "Authentication & Security",
        duration: "Month 4",
        description: "Secure APIs with JWT, refresh tokens, passport logins, and security middlewares.",
        learningObjectives: [
          "Secure user login credentials utilizing bcrypt hashing",
          "Generate and verify request JWT tokens and refresh cycles",
          "Apply security headers and CORS configurations (Helmet, CORS)"
        ],
        recommendedResources: [
          "Helmet JS guidelines",
          "JWT token security practices",
          "OWASP Top 10 API Security Checklist"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["JWT Tokens", "Password Hashing", "API Security", "CORS configs"],
        practiceQuestions: [
          "Validate incoming request authorization headers.",
          "Configure CORS origins to allow only specific clients.",
          "Rotate expired JWT tokens using refresh tokens."
        ],
        practicalProject: {
          title: "Secure Member Platform Portal",
          description: "Create an auth backend that registers members, verifies login tokens, and secures access to resources."
        }
      },
      {
        milestoneTitle: "WebSockets & Real-Time App",
        duration: "Month 5",
        description: "Build real-time notification pipelines and chat portals using WebSockets and Socket.io.",
        learningObjectives: [
          "Establish real-time event connections using Socket.io",
          "Implement event-driven broadcasts targeting room parameters",
          "Handle socket disconnections and scale instances"
        ],
        recommendedResources: [
          "Socket.io documentation",
          "WebSockets protocol guides",
          "MDN WebSockets reference"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["WebSockets", "Socket.io", "Real-Time Systems", "Broadcasting"],
        practiceQuestions: [
          "Broadcast a notifications list to all connected users.",
          "Implement room joining methods handling socket scopes.",
          "Track list arrays of active connected user sockets."
        ],
        practicalProject: {
          title: "Real-time Support Console Chat",
          description: "Build a real-time support console chat application where support agents and customers can swap message logs instantly."
        }
      },
      {
        milestoneTitle: "Testing & CI/CD Cloud Deploy",
        duration: "Month 6",
        description: "Write backend tests using Jest, containerize with Docker, and deploy.",
        learningObjectives: [
          "Write API tests using Jest and supertest modules",
          "Build Docker layers packaging Node applications",
          "Set up automated CI/CD pipelines deploying to hosting platforms"
        ],
        recommendedResources: [
          "Jest documentation",
          "Docker Node deployment guide",
          "GitHub Actions quickstarts"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Jest & Supertest", "Docker", "CI/CD Actions", "Production Logs"],
        practiceQuestions: [
          "Write tests verifying server return values on incorrect body values.",
          "Build a Docker container packaging Node apps.",
          "Examine logs streams tracking server runtime errors."
        ],
        practicalProject: {
          title: "Production Deployed REST Service",
          description: "Deploy a containerized REST API with active pipelines, databases, tests suites, and error tracking to Render."
        }
      }
    ]
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    icon: "BarChart",
    description: "Analyze datasets, build stunning visualization dashboards, and deliver data-driven business insights using SQL, Excel, and Tableau.",
    coursesCount: 7,
    salaryLPA: "4 - 10 LPA",
    hiringCompanies: ["Deloitte", "Accenture", "Amazon", "Mu Sigma", "Fractal Analytics"],
    demandScore: 89,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Excel Fundamentals & Analysis",
        duration: "Month 1",
        description: "Master Excel logic, pivot tables, data sorting, and statistical formulas.",
        learningObjectives: [
          "Write formulas using VLOOKUP, INDEX/MATCH, and logical operators",
          "Clean datasets, remove duplicate records, and format fields",
          "Build interactive pivot tables and chart reports"
        ],
        recommendedResources: [
          "Excel Easy tutorials",
          "Microsoft Learn Excel course",
          "Chandoo Excel Guides (YouTube)"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["VLOOKUP", "Pivot Tables", "Formulas", "Data Cleaning"],
        practiceQuestions: [
          "Clean a database containing missing values and duplicate rows.",
          "Build a pivot chart displaying monthly sales trends.",
          "Write logical operations evaluating performance metrics."
        ],
        practicalProject: {
          title: "Sales Trends Dashboard",
          description: "Build an Excel dashboard tracking product sales, revenues, and category charts."
        }
      },
      {
        milestoneTitle: "SQL for Data Querying",
        duration: "Month 2",
        description: "Query databases, perform filters, write JOIN queries, and aggregates.",
        learningObjectives: [
          "Query tables, filter ranges, and sort records using SQL",
          "Formulate queries joining multiple tables using JOIN operations",
          "Write aggregate groupings calculating averages, sums, and counts"
        ],
        recommendedResources: [
          "SQLZoo Interactive courses",
          "W3Schools SQL guides",
          "Kaggle Intro to SQL"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["SQL Select", "JOIN Queries", "Aggregations", "Subqueries"],
        practiceQuestions: [
          "Calculate average monthly sales grouped by category.",
          "Query customer details who placed orders in the last 30 days.",
          "Find duplicate records using HAVING statements."
        ],
        practicalProject: {
          title: "Company Analytics Database",
          description: "Establish a local SQLite database, populate it with employee data, and run queries tracking organizational statistics."
        }
      },
      {
        milestoneTitle: "Python Basics & Pandas",
        duration: "Month 3",
        description: "Process and clean tabular data using Python and Pandas libraries.",
        learningObjectives: [
          "Understand Python basics, variables, and list types",
          "Load and parse CSV/Excel files using Pandas DataFrames",
          "Clean data, replace missing entries, and filter rows"
        ],
        recommendedResources: [
          "Kaggle Pandas course",
          "Python for Data Analysis (Book)",
          "Pandas official documentation"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Python basics", "Pandas DataFrames", "Data cleaning", "CSV/Excel parsing"],
        practiceQuestions: [
          "Load a CSV file and output the average of a specific column.",
          "Filter out rows containing null values in a DataFrame.",
          "Convert a data column format from string to integer values."
        ],
        practicalProject: {
          title: "Dataset Cleaner Utility",
          description: "Write a Python script that automatically reads user files, cleans missing data, and exports formatted CSV reports."
        }
      },
      {
        milestoneTitle: "Data Visualization (Tableau/Power BI)",
        duration: "Month 4",
        description: "Create interactive visual reports and dashboard charts using Tableau or Power BI.",
        learningObjectives: [
          "Connect visualization tools to database systems or file datasets",
          "Construct bar, line, scatter, and geographical visual charts",
          "Assemble interactive dashboard layouts with filters and drilldown actions"
        ],
        recommendedResources: [
          "Tableau Training videos",
          "Microsoft Power BI guides",
          "Storytelling with Data (Book)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Tableau", "Power BI", "Visual Charts", "Dashboard Design"],
        practiceQuestions: [
          "Create a geographic map showing customer density.",
          "Configure dashboard actions filtering records on click.",
          "Design a visual report showing year-over-year revenue growth."
        ],
        practicalProject: {
          title: "E-Store Performance Dashboard",
          description: "Design an interactive Tableau/Power BI dashboard showing sales patterns, regional performances, and customer retention metrics."
        }
      },
      {
        milestoneTitle: "Statistics & Business Analytics",
        duration: "Month 5",
        description: "Apply statistical methods to analyze correlations and drive business decisions.",
        learningObjectives: [
          "Understand mean, median, mode, standard deviation, and variance",
          "Calculate correlations and regression lines between variables",
          "Formulate business insights and write executive summaries"
        ],
        recommendedResources: [
          "OpenStax Introductory Statistics",
          "Khan Academy Statistics course",
          "Harvard Business Review Case Studies"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Statistics", "Correlations", "Regression Analysis", "Business Metrics"],
        practiceQuestions: [
          "Find the correlation coefficient between marketing spends and sales.",
          "Formulate an A/B testing hypothesis evaluation.",
          "Draft a summary explaining performance drops based on metrics."
        ],
        practicalProject: {
          title: "Marketing Campaign Report",
          description: "Perform statistical analysis on a marketing campaign dataset, write a report detailing findings, and suggest optimization strategies."
        }
      },
      {
        milestoneTitle: "Resume, Interview & Apply",
        duration: "Month 6",
        description: "Build your portfolio, optimize your resume, and apply for analyst roles.",
        learningObjectives: [
          "Publish visual dashboard reports in a public portfolio",
          "Tailor your resume highlighting data-driven business impact",
          "Practice case studies and SQL challenges for interviews"
        ],
        recommendedResources: [
          "Tableau Public Gallery",
          "SQL Interview Questions guides",
          "LinkedIn Networking strategies"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Portfolio building", "Resume tailoring", "SQL interview questions", "Case studies"],
        practiceQuestions: [
          "Explain a visual dashboard you designed to an interviewer.",
          "Solve 3 medium SQL questions under 15 minutes.",
          "Identify and apply to 10 companies active in hiring Analysts."
        ],
        practicalProject: {
          title: "Analyst Portfolio Portal",
          description: "Publish a portal highlighting your SQL scripts, Python notebooks, and Tableau dashboard reports."
        }
      }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: "Brain",
    description: "Design, build, and deploy intelligent agents, large language models (LLMs), and cognitive systems.",
    coursesCount: 14,
    salaryLPA: "10 - 30 LPA",
    hiringCompanies: ["OpenAI", "Google", "Meta", "Anthropic", "Adobe"],
    demandScore: 98,
    durationMonths: 8,
    milestones: [
      {
        milestoneTitle: "AI Programming & Vector Spaces",
        duration: "Month 1",
        description: "Master Python fundamentals, NumPy operations, and vector embeddings.",
        learningObjectives: [
          "Master NumPy matrix multiplication and vector manipulations",
          "Understand similarity metrics (Cosine, Euclidean distance) inside vector databases",
          "Configure virtual environments and package installations"
        ],
        recommendedResources: [
          "NumPy Reference guide",
          "Kaggle Python tutorials",
          "Vector Databases fundamentals"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["NumPy", "Vector spaces", "Cosine similarity", "Python Basics"],
        practiceQuestions: [
          "Compute the cosine similarity between two vector lists.",
          "Write matrix multiplication from scratch using nested loops.",
          "Normalize a dataset array using NumPy standardizations."
        ],
        practicalProject: {
          title: "Vector Search Console Indexer",
          description: "Build a Python program that reads text records, generates simple index vectors, and retrieves matches based on cosine similarity."
        }
      },
      {
        milestoneTitle: "Machine Learning Basics",
        duration: "Month 2",
        description: "Implement regression models, classifiers, and evaluation metrics.",
        learningObjectives: [
          "Build predictive regressions using Scikit-Learn pipelines",
          "Design classification models grouping target data categories",
          "Evaluate performance metrics using precision, recall, and F1 indices"
        ],
        recommendedResources: [
          "Scikit-Learn documentation",
          "Introduction to Machine Learning (Coursera)",
          "Hands-On ML Book by Aurelien Geron"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Scikit-Learn", "Regression models", "Classifiers", "Performance metrics"],
        practiceQuestions: [
          "Fit a linear regression model tracking price predictions.",
          "Compare confusion matrix reports for classification runs.",
          "Implement validation folds evaluating model performance."
        ],
        practicalProject: {
          title: "House Price Predictor API",
          description: "Train a regression model, save the weights, and expose prediction endpoints using FastAPI."
        }
      },
      {
        milestoneTitle: "Deep Learning Foundations",
        duration: "Month 3",
        description: "Understand neural networks, backpropagation, and build models using PyTorch.",
        learningObjectives: [
          "Understand neural network activation functions (ReLU, Sigmoid, Softmax)",
          "Master backpropagation weight updates and gradient optimization",
          "Build custom layers architectures using PyTorch modules"
        ],
        recommendedResources: [
          "PyTorch Tutorials",
          "Deep Learning Specialization by Andrew Ng (Coursera)",
          "Deep Learning Book (MIT Press)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["PyTorch", "Neural networks", "Backpropagation", "Optimizers (Adam)"],
        practiceQuestions: [
          "Write a simple single-neuron classification layer in PyTorch.",
          "Calculate gradient updates for a basic function.",
          "Compare network performance using SGD and Adam optimizers."
        ],
        practicalProject: {
          title: "Digit Classification Network",
          description: "Build and train a multi-layer neural network in PyTorch to classify handwritten digits from the MNIST dataset."
        }
      },
      {
        milestoneTitle: "Natural Language Processing (NLP)",
        duration: "Month 4",
        description: "Implement tokenization, sentiment models, and text transformers.",
        learningObjectives: [
          "Process text tokenization pipelines using HuggingFace libraries",
          "Train sentiment classification models using recurrent layers",
          "Understand self-attention mechanisms in Transformer layouts"
        ],
        recommendedResources: [
          "Hugging Face Academy tutorials",
          "Speech and Language Processing Book",
          "Attention Is All You Need (Paper)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Tokenization", "HuggingFace Transformers", "Sentiment models", "Attention mechanisms"],
        practiceQuestions: [
          "Tokenize a text file and extract word frequencies.",
          "Fine-tune a sentiment classification transformer on a review dataset.",
          "Explain the mathematical formulation of self-attention."
        ],
        practicalProject: {
          title: "Sentiment Analysis Web Dashboard",
          description: "Build a web dashboard where users input reviews, process sentiment classifications using transformers, and view scores."
        }
      },
      {
        milestoneTitle: "LLMs, LangChain & Vector Databases",
        duration: "Month 5",
        description: "Build agent pipelines using LangChain, vector storage systems, and Gemini API calls.",
        learningObjectives: [
          "Connect applications to LLMs using the Google Gen AI SDK",
          "Build Retrieval-Augmented Generation (RAG) pipelines using LangChain",
          "Manage vector indices using Pinecone, Chroma, or local vectors"
        ],
        recommendedResources: [
          "LangChain Documentation",
          "Google Gen AI SDK documentation",
          "Pinecone / Chroma manuals"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Google Gen AI SDK", "LangChain", "RAG architectures", "Vector Databases"],
        practiceQuestions: [
          "Retrieve context matches from a vector index and pass them to an LLM prompt.",
          "Implement a chatbot that remembers conversation history using LangChain.",
          "Write structured prompts extracting key entities from paragraphs."
        ],
        practicalProject: {
          title: "Cognitive Knowledge Base Search",
          description: "Develop a RAG-backed system that indexes documentation files and answers user questions based on retrieved content."
        }
      },
      {
        milestoneTitle: "Agent Architectures & Multi-Agents",
        duration: "Month 6",
        description: "Design autonomous agent loops, tool bindings, and multi-agent coordination.",
        learningObjectives: [
          "Understand ReAct reasoning loops in autonomous agents",
          "Bind API schemas and code functions as tools for agent execution",
          "Build multi-agent pipelines with LangGraph or CrewAI"
        ],
        recommendedResources: [
          "LangGraph tutorials",
          "CrewAI guidelines",
          "Autonomous Agents survey papers"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["ReAct loop", "Tool call schemas", "LangGraph", "Multi-Agent systems"],
        practiceQuestions: [
          "Bind a calculator function as an executable tool for an agent.",
          "Build a graph containing two agents collaborating on data analysis.",
          "Manage conversation states across agent transitions."
        ],
        practicalProject: {
          title: "Autonomous Code Review Agent",
          description: "Develop a multi-agent system where one agent audits a repository, another suggests improvements, and a third compiles reviews."
        }
      },
      {
        milestoneTitle: "MLOps & Cloud Deployments",
        duration: "Month 7",
        description: "Deploy models as endpoints, set up model registries, and track pipeline metrics.",
        learningObjectives: [
          "Deploy model endpoints using Docker, FastAPI, and Kubernetes",
          "Track experimental runs and metrics with MLflow or Weights & Biases",
          "Configure automated pipeline builds checking performance"
        ],
        recommendedResources: [
          "MLflow Documentation",
          "Kubernetes Guides",
          "MLOps Community roadmap"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["FastAPI deployment", "Docker containers", "MLflow registry", "Kubernetes"],
        practiceQuestions: [
          "Package a trained model and exposure wrapper inside a Docker file.",
          "Register a new model run in an MLflow registry.",
          "Configure scaling thresholds on model hosting nodes."
        ],
        practicalProject: {
          title: "Scale Optimized Inference Service",
          description: "Deploy a RAG service pipeline backed by Kubernetes clusters, Docker layers, and automated query log dashboards."
        }
      },
      {
        milestoneTitle: "AI Portfolio & Applications",
        duration: "Month 8",
        description: "Build high-impact projects, write a technical blog, and apply for AI roles.",
        learningObjectives: [
          "Publish source repositories of advanced multi-agent systems",
          "Write technical explanations of AI design implementations",
          "Apply for AI roles demonstrating production-ready deployments"
        ],
        recommendedResources: [
          "Hugging Face Spaces",
          "Medium/Towards Data Science publishing guides",
          "AI Job boards"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Hugging Face Spaces", "Tech blogging", "GitHub portfolios", "Case studies"],
        practiceQuestions: [
          "Explain a RAG architecture's latency trade-offs to an interviewer.",
          "Optimize prompt token size to minimize API costs.",
          "Submit 5 complete project applications to target teams."
        ],
        practicalProject: {
          title: "Production Ready Agent Portal",
          description: "Publish a portal highlighting your agents, including interactive demos hosted on Hugging Face Spaces."
        }
      }
    ]
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    icon: "TrendingUp",
    description: "Build robust machine learning models, train deep learning networks, and deploy MLOps pipelines.",
    coursesCount: 11,
    salaryLPA: "8 - 22 LPA",
    hiringCompanies: ["Meta", "Apple", "NVIDIA", "Tencent", "Samsung"],
    demandScore: 94,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Math, Statistics & Python",
        duration: "Month 1",
        description: "Master linear algebra, calculus, statistics, and Core Python libraries.",
        learningObjectives: [
          "Understand matrix operations, eigenvalues, and gradients",
          "Master probability distributions, hypothesis testing, and Bayes' theorem",
          "Write clean Python scripts utilizing NumPy and Pandas"
        ],
        recommendedResources: [
          "Mathematics for Machine Learning (Book)",
          "Khan Academy Multivariable Calculus",
          "NumPy Quickstarts"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Linear Algebra", "Calculus & Gradients", "Statistics", "NumPy & Pandas"],
        practiceQuestions: [
          "Calculate the gradients of a multivariable objective function.",
          "Perform hypothesis testing on a sample dataset.",
          "Manipulate multi-dimensional arrays using NumPy."
        ],
        practicalProject: {
          title: "Statistical Data Analyzer",
          description: "Write a Python script that loads raw datasets, performs statistical tests, and visualizes distributions."
        }
      },
      {
        milestoneTitle: "Classical Machine Learning",
        duration: "Month 2",
        description: "Implement classification, regression, and clustering algorithms using Scikit-Learn.",
        learningObjectives: [
          "Understand Decision Trees, Random Forests, and Support Vector Machines (SVM)",
          "Apply k-Means clustering and PCA dimensionality reduction",
          "Evaluate model metrics using Cross-Validation and ROC-AUC curves"
        ],
        recommendedResources: [
          "Scikit-Learn documentation",
          "Kaggle ML courses",
          "Machine Learning by Tom Mitchell (Book)"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Scikit-Learn", "Supervised Learning", "Unsupervised Learning", "Cross-Validation"],
        practiceQuestions: [
          "Train a Random Forest classifier and output feature importances.",
          "Apply PCA to reduce a dataset to 2 principal components.",
          "Optimize SVM hyperparameters using Grid Search."
        ],
        practicalProject: {
          title: "Customer Segment Classifier",
          description: "Clean a transaction dataset, apply k-Means clustering to identify segments, and train a classifier to predict customer tags."
        }
      },
      {
        milestoneTitle: "Deep Learning & PyTorch",
        duration: "Month 3",
        description: "Build neural network architectures, configure optimizers, and train PyTorch models.",
        learningObjectives: [
          "Design Artificial Neural Networks (ANNs) and Convolutional Neural Networks (CNNs)",
          "Master backpropagation, loss functions, and optimization algorithms (Adam, SGD)",
          "Train and validate networks using custom PyTorch loops"
        ],
        recommendedResources: [
          "PyTorch official tutorials",
          "Deep Learning Book (MIT Press)",
          "Fast.ai Practical Deep Learning"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["PyTorch", "CNN Architectures", "Backpropagation", "Training Loops"],
        practiceQuestions: [
          "Implement a custom PyTorch Dataset class.",
          "Build a CNN classifying images into 10 categories.",
          "Monitor loss and accuracy curves during training cycles."
        ],
        practicalProject: {
          title: "Image Recognition Network",
          description: "Train a CNN in PyTorch to classify images from the CIFAR-10 dataset, achieving a 75%+ test accuracy."
        }
      },
      {
        milestoneTitle: "MLOps: Pipelines & Registries",
        duration: "Month 4",
        description: "Configure automated ML pipelines, track experiments, and register models.",
        learningObjectives: [
          "Establish reproducible data pipelines using DVC (Data Version Control)",
          "Track model training metrics and parameters with MLflow",
          "Register models in registries and configure version tracks"
        ],
        recommendedResources: [
          "DVC Documentation",
          "MLflow manuals",
          "MLOps Community guides"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["DVC Data pipelines", "MLflow tracking", "Model Registry", "Experiment tracking"],
        practiceQuestions: [
          "Set up a DVC pipeline tracking data transformations.",
          "Log metrics and confusion matrix graphics during a model run in MLflow.",
          "Promote a registered model from 'Staging' to 'Production' in a registry."
        ],
        practicalProject: {
          title: "Reproducible Training Pipeline",
          description: "Build an automated pipeline that fetches data using DVC, trains a model, logs parameters to MLflow, and registers the output."
        }
      },
      {
        milestoneTitle: "Model Serving & Docker",
        duration: "Month 5",
        description: "Build inference APIs, package applications in Docker, and deploy services.",
        learningObjectives: [
          "Build low-latency inference APIs using FastAPI",
          "Package model weights, dependencies, and code inside Docker images",
          "Configure scaling configurations on cloud deployment platforms"
        ],
        recommendedResources: [
          "FastAPI Quickstarts",
          "Docker docs",
          "Kubernetes basics"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["FastAPI Inference", "Docker", "Model Packaging", "Containerization"],
        practiceQuestions: [
          "Write a FastAPI endpoint that parses inputs and returns model predictions.",
          "Write a Dockerfile optimizing image layers for faster downloads.",
          "Test container API endpoints locally."
        ],
        practicalProject: {
          title: "Dockerized Inference API",
          description: "Package a trained sentiment classification model, build a Docker image, and expose predictions via a FastAPI endpoint."
        }
      },
      {
        milestoneTitle: "ML Portfolio & Applications",
        duration: "Month 6",
        description: "Publish your models, optimize your resume, and apply for ML Engineer roles.",
        learningObjectives: [
          "Publish source repositories of end-to-end MLOps pipelines",
          "Tailor your resume highlighting quantitative ML impact (e.g. 'Improved precision by 15%')",
          "Practice coding challenges and system design questions for interviews"
        ],
        recommendedResources: [
          "Hugging Face Spaces",
          "Kaggle Competitions",
          "LinkedIn Job Search tutorials"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Hugging Face Spaces", "GitHub portfolios", "Tech resume tailoring", "Interview prep"],
        practiceQuestions: [
          "Explain a model's bias-variance tradeoff to an interviewer.",
          "Solve 3 coding challenges under 15 minutes each.",
          "Identify and apply to 10 companies active in hiring ML Engineers."
        ],
        practicalProject: {
          title: "Production Ready ML Portal",
          description: "Publish a portal highlighting your pipeline repos, including interactive demos hosted on Hugging Face Spaces."
        }
      }
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    icon: "Settings",
    description: "Automate software builds, configure CI/CD pipelines, package containers, and manage infrastructure at scale.",
    coursesCount: 13,
    salaryLPA: "6 - 18 LPA",
    hiringCompanies: ["Red Hat", "Atlassian", "HashiCorp", "AWS", "Razorpay"],
    demandScore: 96,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Linux, Shell & Git",
        duration: "Month 1",
        description: "Master terminal commands, bash scripting, and version control structures.",
        learningObjectives: [
          "Navigate file structures and edit configurations using Linux CLI",
          "Write automated bash scripts managing variables, loops, and files",
          "Master branching, merging, and remote repository commands in Git"
        ],
        recommendedResources: [
          "Linux Command Line (Book)",
          "Bash Scripting tutorials",
          "Pro Git Book"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Linux CLI", "Bash Scripting", "Git Version Control", "Permissions"],
        practiceQuestions: [
          "Write a script searching log files for errors and email reports.",
          "Configure custom access permissions on target directories.",
          "Resolve Git merge conflicts."
        ],
        practicalProject: {
          title: "Automated System Audit Tool",
          description: "Build a bash script that audits server statistics (disk space, memory, running processes) and exports summary logs."
        }
      },
      {
        milestoneTitle: "Containers with Docker",
        duration: "Month 2",
        description: "Package applications, write Dockerfiles, and manage container environments.",
        learningObjectives: [
          "Write Dockerfile layers compiling application dependencies",
          "Configure Docker volumes and network bridges locally",
          "Manage multi-container setups using Docker Compose"
        ],
        recommendedResources: [
          "Docker Documentation",
          "Docker Deep Dive (Book)",
          "Docker Compose reference"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Dockerfiles", "Docker Volumes", "Docker Network", "Docker Compose"],
        practiceQuestions: [
          "Optimize Docker builds by structuring cache layers.",
          "Set up networks connecting application containers to databases.",
          "Verify log stream updates checking active errors."
        ],
        practicalProject: {
          title: "Dockerized Multi-Container Web App",
          description: "Package an Express backend and PostgreSQL database inside Docker, managing connection configurations using Compose."
        }
      },
      {
        milestoneTitle: "CI/CD & Automation",
        duration: "Month 3",
        description: "Build automated pipeline workflows, run tests, and publish artifacts.",
        learningObjectives: [
          "Configure automated integration workflows using GitHub Actions",
          "Automate tests suites and build checks on branch pushes",
          "Publish compiled binaries/images directly to cloud registries (DockerHub)"
        ],
        recommendedResources: [
          "GitHub Actions Quickstarts",
          "Jenkins Tutorials",
          "CI/CD Pipeline Best Practices"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["GitHub Actions", "Jenkins", "Continuous Integration", "Cloud Registries"],
        practiceQuestions: [
          "Configure triggers running test tasks on pull requests.",
          "Build pipelines compiling code packages and pushing images.",
          "Resolve failing pipeline steps updating config files."
        ],
        practicalProject: {
          title: "Automated CI/CD Delivery Pipeline",
          description: "Create a GitHub Actions pipeline that automatically triggers tests, builds a Docker image, and publishes it to DockerHub on every main push."
        }
      },
      {
        milestoneTitle: "Infrastructure as Code (Terraform)",
        duration: "Month 4",
        description: "Provision cloud infrastructure and manage states using Terraform.",
        learningObjectives: [
          "Write Terraform files defining cloud compute and storage systems",
          "Manage Terraform state files and configure remote backend states",
          "Plan and apply infrastructure changes using plan/apply stages"
        ],
        recommendedResources: [
          "Terraform Documentation",
          "HashiCorp Learn Tutorials",
          "Terraform Up & Running (Book)"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Terraform HCL", "State Management", "Cloud Provisioning", "Resource Declarations"],
        practiceQuestions: [
          "Provision an AWS EC2 compute instance using Terraform configurations.",
          "Set up remote state file locking using DynamoDB/S3 backends.",
          "Configure inputs and outputs parameters inside HCL files."
        ],
        practicalProject: {
          title: "Cloud VPC & Compute Setup",
          description: "Write Terraform files provisioning a complete Virtual Private Cloud (VPC) with subnets, security groups, and an EC2 instance."
        }
      },
      {
        milestoneTitle: "Container Orchestration: Kubernetes",
        duration: "Month 5",
        description: "Deploy and manage container clusters using Kubernetes.",
        learningObjectives: [
          "Understand Pods, Deployments, Services, and Ingress architectures",
          "Write Kubernetes yaml configurations defining application scaling",
          "Expose applications globally using Services and Ingress routing rules"
        ],
        recommendedResources: [
          "Kubernetes Documentation",
          "Kubernetes Up & Running (Book)",
          "Katacoda Interactive Scenarios"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Pods & Deployments", "YAML manifests", "Kubernetes Services", "Ingress Configs"],
        practiceQuestions: [
          "Write a deployment manifest scaling an application to 3 replicas.",
          "Configure a LoadBalancer service exposing target ports.",
          "Implement rolling updates updating pod container tags."
        ],
        practicalProject: {
          title: "Scalable App Cluster Setup",
          description: "Deploy a multi-replica application cluster in Kubernetes, mapping ports, configuring secrets, and exposing routes via Ingress."
        }
      },
      {
        milestoneTitle: "Monitoring, Logging & Security",
        duration: "Month 6",
        description: "Set up system dashboards, aggregate log streams, and implement pipeline security.",
        learningObjectives: [
          "Collect system metrics using Prometheus and visualize with Grafana",
          "Aggregate application and system logs using ELK (Elasticsearch/Logstash/Kibana) or Loki",
          "Incorporate security scans inside CI pipelines (SonarQube, Trivy)"
        ],
        recommendedResources: [
          "Prometheus & Grafana guides",
          "Elasticsearch Documentation",
          "DevSecOps Community roadmap"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Prometheus", "Grafana", "Log Aggregation", "Security Scanning"],
        practiceQuestions: [
          "Create a Grafana dashboard showing CPU utilization.",
          "Configure logs aggregations searching for HTTP error counts.",
          "Scan Docker images for vulnerabilities inside pipelines."
        ],
        practicalProject: {
          title: "Audited Scalable Pipeline System",
          description: "Establish a complete pipeline incorporating CI/CD workflows, Terraform provisioning, Kubernetes clusters, and Prometheus dashboards."
        }
      }
    ]
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    icon: "Cloud",
    description: "Design cloud architectures, configure secure networking, and deploy serverless systems on AWS, GCP, or Azure.",
    coursesCount: 11,
    salaryLPA: "6 - 17 LPA",
    hiringCompanies: ["AWS", "Google Cloud", "Microsoft", "Intel", "Salesforce"],
    demandScore: 93,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Cloud Fundamentals (AWS/Azure)",
        duration: "Month 1",
        description: "Master basic cloud services: Compute, Storage, and Identity Access Management (IAM).",
        learningObjectives: [
          "Understand cloud service models (IaaS, PaaS, SaaS) and deployment types",
          "Configure cloud compute nodes (e.g. AWS EC2, Azure VM)",
          "Manage storage instances (S3, Blob Storage) and IAM permissions profiles"
        ],
        recommendedResources: [
          "AWS Certified Cloud Practitioner guide",
          "Microsoft Certified Azure Fundamentals",
          "Cloud Engineering Handbook"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["Compute Nodes", "S3 Storage", "IAM Permissions", "Cloud Models"],
        practiceQuestions: [
          "Configure S3 storage buckets with public access restrictions.",
          "Launch and connect to an EC2 instance via SSH.",
          "Write IAM policies allowing write permissions to S3."
        ],
        practicalProject: {
          title: "Cloud Storage Explorer Tool",
          description: "Build a Python command line utility that connects to AWS S3, uploads files, lists contents, and updates access lists."
        }
      },
      {
        milestoneTitle: "Cloud Networking & Security",
        duration: "Month 2",
        description: "Design Virtual Private Networks (VPCs), configure firewalls, and route traffic.",
        learningObjectives: [
          "Design VPC architectures with public and private subnets",
          "Configure Route Tables, Internet Gateways, and NAT instances",
          "Manage firewall rules using Security Groups and Network ACLs"
        ],
        recommendedResources: [
          "AWS VPC Documentation",
          "Azure Virtual Network tutorials",
          "Cloud Networking Primer"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["VPC design", "Subnets", "NAT Gateways", "Security Groups"],
        practiceQuestions: [
          "Configure public/private subnets inside a VPC.",
          "Create NAT gateways routing traffic from private instances to the internet.",
          "Restrict ingress ports on web servers to HTTP/HTTPS only."
        ],
        practicalProject: {
          title: "Secure VPC Architecture Setup",
          description: "Establish a VPC containing public web servers and a private database instance, managing routing paths securely."
        }
      },
      {
        milestoneTitle: "Databases & Storage Integrations",
        duration: "Month 3",
        description: "Set up relational, NoSQL, and cached database systems in the cloud.",
        learningObjectives: [
          "Provision managed relational databases (AWS RDS, Azure SQL)",
          "Integrate NoSQL systems (DynamoDB, CosmosDB) into application code",
          "Optimize database search latency using ElastiCache (Redis/Memcached)"
        ],
        recommendedResources: [
          "AWS RDS Documentation",
          "DynamoDB Developer Guide",
          "Cloud Database Architectures"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Relational (RDS)", "NoSQL (DynamoDB)", "Data Replication", "Cache (ElastiCache)"],
        practiceQuestions: [
          "Deploy an RDS instance with multi-AZ failover configurations.",
          "Read and write records to a DynamoDB table.",
          "Configure query caching for web applications."
        ],
        practicalProject: {
          title: "Cloud Database Integration App",
          description: "Build a Node/Express app that reads/writes product inventory to a managed RDS database, backed by a DynamoDB cache."
        }
      },
      {
        milestoneTitle: "Containers & IaC (Terraform)",
        duration: "Month 4",
        description: "Provision cloud infrastructure using code and manage container deployments.",
        learningObjectives: [
          "Write Terraform configurations provisioning compute nodes and storage",
          "Manage container registries (Amazon ECR) and push images",
          "Deploy containerized workloads using AWS ECS (Fargate) or Azure Container Apps"
        ],
        recommendedResources: [
          "Terraform HCL manuals",
          "AWS ECS guides",
          "Docker docs"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Terraform", "ECR Registries", "ECS Fargate", "Infrastructure Code"],
        practiceQuestions: [
          "Write HCL files provisioning an RDS database.",
          "Deploy application containers to ECS Fargate nodes.",
          "Configure scaling metrics on ECS container profiles."
        ],
        practicalProject: {
          title: "Infrastructure Provisioned Container App",
          description: "Write Terraform files provisioning a VPC, ECR repository, and ECS Fargate cluster, deploying a container app."
        }
      },
      {
        milestoneTitle: "Serverless Architectures",
        duration: "Month 5",
        description: "Build event-driven API backends using cloud serverless runtimes (AWS Lambda, Azure Functions).",
        learningObjectives: [
          "Write application functions executing on cloud serverless systems (Lambda)",
          "Expose serverless routes using API Gateway setups",
          "Configure triggers routing database changes or uploads to functions"
        ],
        recommendedResources: [
          "AWS Lambda Documentation",
          "Serverless Framework manuals",
          "Event-Driven Architectures guides"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["AWS Lambda", "API Gateway", "Event triggers", "Serverless architectures"],
        practiceQuestions: [
          "Write Lambda functions transforming file uploads.",
          "Expose GET/POST routes using API Gateways.",
          "Configure S3 event triggers invoking Lambda runs."
        ],
        practicalProject: {
          title: "Serverless File Processor API",
          description: "Develop an API using Lambda and API Gateway that processes images uploaded to S3 and registers them in a database."
        }
      },
      {
        milestoneTitle: "Cloud Architecture, Cost & Audits",
        duration: "Month 6",
        description: "Design highly-available systems, optimize costs, and prepare for certifications.",
        learningObjectives: [
          "Design multi-tier, highly available architectures mapping Well-Architected Framework guidelines",
          "Analyze billing dashboards and configure cost budgets and alerts",
          "Prepare for certifications (AWS Solutions Architect Associate / Azure Administrator)"
        ],
        recommendedResources: [
          "AWS Well-Architected Framework",
          "AWS Solutions Architect Associate tutorials",
          "Cloud Custodian manuals"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Highly Available design", "Cost optimization", "Certification prep", "Cloud audits"],
        practiceQuestions: [
          "Evaluate cost trends recommending optimizations (e.g. Reserved Instances).",
          "Design systems surviving regional database node failures.",
          "Complete practice exams for Cloud Solutions Architect certifications."
        ],
        practicalProject: {
          title: "Well-Architected System Model",
          description: "Design a multi-region, load-balanced web app diagram detailing cost budgets, databases, serverless setups, and security groups."
        }
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security Engineer",
    icon: "ShieldAlert",
    description: "Secure enterprise systems, audit networks, perform penetration testing, and protect sensitive resources.",
    coursesCount: 11,
    salaryLPA: "6 - 16 LPA",
    hiringCompanies: ["IBM", "PwC", "CrowdStrike", "Cisco", "Quick Heal"],
    demandScore: 92,
    durationMonths: 6,
    milestones: [
      {
        milestoneTitle: "Networking & Security Core",
        duration: "Month 1",
        description: "Master TCP/IP protocols, networking topologies, firewalls, and ports configurations.",
        learningObjectives: [
          "Understand TCP/IP, OSI layers, routing, and DNS systems",
          "Scan networks for open ports using scanner utilities (Nmap)",
          "Configure firewalls and analyze packet captures (Wireshark)"
        ],
        recommendedResources: [
          "Network+ Certification Study Guides",
          "Nmap Documentation",
          "Wireshark packet analysis tutorials"
        ],
        difficulty: "Beginner",
        skillsToLearn: ["TCP/IP protocols", "Port scanning (Nmap)", "Packet analysis", "Firewalls"],
        practiceQuestions: [
          "Perform Nmap scans identifying open ports on local targets.",
          "Capture and analyze HTTP request packages inside Wireshark.",
          "Configure firewall rules blocking incoming ICMP pings."
        ],
        practicalProject: {
          title: "Local Network Vulnerability Scanner",
          description: "Write a Python script utilizing Nmap wrappers that scans a local network subrange, lists active hosts, and flags open ports."
        }
      },
      {
        milestoneTitle: "Linux Security & Scripting",
        duration: "Month 2",
        description: "Configure secure Linux instances, audit access logs, and write automated scanners.",
        learningObjectives: [
          "Audit permissions, sudoer logs, and process states in Linux",
          "Configure SSH key exchanges and disable password authorization interfaces",
          "Write Python scripts automating file changes security checks"
        ],
        recommendedResources: [
          "Linux Security Cookbook",
          "Python for Security Professionals",
          "SSH configuration guidelines"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Linux hardening", "SSH security", "Log auditing", "Automated scripting"],
        practiceQuestions: [
          "Disable root logins within sshd_config.",
          "Audit auth.log files checking for failed access attempts.",
          "Configure UFW (Uncomplicated Firewall) rules."
        ],
        practicalProject: {
          title: "System Integrity Checker Script",
          description: "Build a Python script that tracks file modifications in system folders and emails alerts if modifications are detected."
        }
      },
      {
        milestoneTitle: "Cryptography & Auth Security",
        duration: "Month 3",
        description: "Integrate cryptographic algorithms, secure passwords storage, and manage TLS configurations.",
        learningObjectives: [
          "Compare symmetric (AES) vs asymmetric (RSA) cryptography models",
          "Configure TLS/SSL credentials securing application servers",
          "Implement OAuth2 and MFA authorization workflows in code"
        ],
        recommendedResources: [
          "Applied Cryptography (Book)",
          "Let's Encrypt certificates guide",
          "MFA Authentication guides"
        ],
        difficulty: "Intermediate",
        skillsToLearn: ["Symmetric/Asymmetric Cryptography", "SSL/TLS", "Password hashing", "MFA/OAuth"],
        practiceQuestions: [
          "Encrypt string data utilizing AES-256 modules in Python.",
          "Configure Nginx servers securing routes with TLS certificates.",
          "Verify password strength criteria inside login controllers."
        ],
        practicalProject: {
          title: "Secure Cryptographic Vault App",
          description: "Build a Node/Python app that encrypts sensitive credentials using user passwords, storing encrypted payloads persistently."
        }
      },
      {
        milestoneTitle: "Penetration Testing & Web OWASP",
        duration: "Month 4",
        description: "Audit web applications for OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF).",
        learningObjectives: [
          "Inspect applications for SQL injection and cross-site scripting vulnerabilities",
          "Intercept and alter application request parameters using Burp Suite",
          "Audit API authorization layers checking object-level access"
        ],
        recommendedResources: [
          "OWASP Top 10 API Security Checklist",
          "Burp Suite Tutorials",
          "PortSwigger Web Security Academy"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["OWASP Top 10", "SQL Injection", "XSS & CSRF", "Burp Suite"],
        practiceQuestions: [
          "Identify and exploit SQL injections within test sandboxes.",
          "Protect forms from CSRF using token authentications.",
          "Secure routes preventing SQL injections using parameterized queries."
        ],
        practicalProject: {
          title: "Vulnerability Audit Report",
          description: "Audit a target test sandbox using Burp Suite, identify vulnerabilities, document findings, and compile remediation code patches."
        }
      },
      {
        milestoneTitle: "Threat Intelligence & Cloud Security",
        duration: "Month 5",
        description: "Monitor cloud configurations, secure IAM policies, and analyze system alerts.",
        learningObjectives: [
          "Configure cloud network log streams (AWS VPC Flow Logs)",
          "Audit cloud configurations mapping security benchmark tests",
          "Monitor system events utilizing SIEM platforms (Splunk, ELK)"
        ],
        recommendedResources: [
          "AWS Security Best Practices",
          "Splunk Training courses",
          "CIS Benchmarks guidelines"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Cloud logs (VPC Flow)", "IAM Security auditing", "SIEM (Splunk/ELK)", "CIS Benchmarks"],
        practiceQuestions: [
          "Audit IAM policies checking for wildcards or excessive privileges.",
          "Construct search queries in Splunk filtering for brute force attacks.",
          "Evaluate cloud configurations mapping security benchmarks."
        ],
        practicalProject: {
          title: "Log Analytics Dashboard Setup",
          description: "Configure Splunk/ELK dashboards parsing VPC flow logs and alerting on unusual network patterns."
        }
      },
      {
        milestoneTitle: "Incident Response & Certifications",
        duration: "Month 6",
        description: "Formulate incident response playbooks and prepare for CEH or Security+ certifications.",
        learningObjectives: [
          "Draft incident response checklists containment systems configurations",
          "Prepare for cyber security certifications (CompTIA Security+ / CEH)",
          "Examine logs streams tracking security breach cases studies"
        ],
        recommendedResources: [
          "NIST Incident Response Guides",
          "Security+ Study Guide books",
          "Certified Ethical Hacker (CEH) prep"
        ],
        difficulty: "Advanced",
        skillsToLearn: ["Incident Response", "Playbooks", "Certification prep", "Forensics basics"],
        practiceQuestions: [
          "Complete CEH exam practice scenarios.",
          "Draft playbooks containment strategies during ransomware incidents.",
          "Explain digital forensics data chain of custody rules."
        ],
        practicalProject: {
          title: "Enterprise Incident Playbook",
          description: "Compile a comprehensive security incident containment plan detailing communication, remediation, and audit workflows for a corporate network."
        }
      }
    ]
  }
];
