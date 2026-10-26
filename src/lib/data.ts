import { site } from "./site";

export type Accent = "gfp" | "cyan" | "dapi" | "cherry" | "amber" | "bone";

export const accentHex: Record<Accent, string> = {
  gfp: "#5cffb0",
  cyan: "#44e1ff",
  dapi: "#7c8cff",
  cherry: "#ff5c8a",
  amber: "#ffc857",
  bone: "#e8efea",
};

/* ------------------------------------------------------------------ Work */

export type Project = {
  slug: "hireplume" | "booknook" | "portfolio";
  href: string;
  index: string;
  title: string;
  kicker: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  stack: string[];
  accent: Accent;
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "hireplume",
    href: "/work/hireplume",
    index: "01",
    title: "HirePlume",
    kicker: "Applicant-tracking platform",
    year: "2026",
    role: "Founder & full-stack developer",
    status: "Live",
    summary:
      "One calm workspace for the whole hiring process — applications, interviews, scorecards and decisions — with an AI screening assistant that advises while people decide.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Gemini AI", "Vercel"],
    accent: "gfp",
    live: "https://hireplume-app.vercel.app",
    repo: "https://github.com/Daveoski/hireplume_official",
  },
  {
    slug: "booknook",
    href: "/work/booknook",
    index: "02",
    title: "BookNook",
    kicker: "Cloud reading-tracker API",
    year: "2026",
    role: "Cloud & back-end developer",
    status: "Azure capstone",
    summary:
      "A reading-tracker REST API on Microsoft Azure — Express on App Service, Azure SQL, Key Vault secrets through managed identity and Blob Storage for covers, shipped by GitHub Actions.",
    stack: ["Node.js", "Express", "Azure SQL", "Key Vault", "Blob Storage", "GitHub Actions"],
    accent: "cyan",
    repo: "https://github.com/Daveoski/david-booknook",
  },
  {
    slug: "portfolio",
    href: "/work/portfolio",
    index: "03",
    title: "This site",
    kicker: "Portfolio & design system",
    year: "2026",
    role: "Designer & developer",
    status: "You're here",
    summary:
      "A fluorescence-microscopy-inspired portfolio with a hand-written canvas DNA helix, a custom page-transition system and fully prerendered pages.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Motion", "Canvas 2D"],
    accent: "dapi",
    repo: site.repo,
  },
];

export function getProject(slug: Project["slug"]) {
  const index = projects.findIndex((p) => p.slug === slug);
  return { project: projects[index], next: projects[(index + 1) % projects.length] };
}

export type ArchiveItem = {
  title: string;
  note: string;
  year: string;
  stack: string[];
  href: string;
  kind: "Live" | "Code";
};

export const archive: ArchiveItem[] = [
  {
    title: "JKJ Exchange Services",
    note: "Corporate website and enquiry platform with a private admin dashboard",
    year: "2026",
    stack: ["Next.js 15", "FastAPI", "Neon Postgres", "Resend"],
    href: "https://jkj-exchange-service.vercel.app",
    kind: "Live",
  },
  {
    title: "INEC Smart Voting System",
    note: "Voting app with a live leaderboard and qualified-voter checks",
    year: "2026",
    stack: ["Next.js", "TypeScript"],
    href: "https://next-js-voting-system.vercel.app",
    kind: "Live",
  },
  {
    title: "Swift Arrow Couriers",
    note: "Parcel-tracking ledger with indexes, an LRU cache, PBKDF2 sign-in and tamper-evident sealing",
    year: "2026",
    stack: ["Python"],
    href: "https://github.com/Daveoski/swift_arrow_courier_project",
    kind: "Code",
  },
  {
    title: "Task Management API",
    note: "REST API with typed models and SQLite persistence",
    year: "2026",
    stack: ["FastAPI", "SQLModel"],
    href: "https://github.com/Daveoski/task_management_api_project",
    kind: "Code",
  },
  {
    title: "Lagos Route Window",
    note: "Read-only API for querying Lagos bus routes, stops, fares and buses",
    year: "2026",
    stack: ["FastAPI", "Python"],
    href: "https://github.com/Daveoski/lagos_route_window_project",
    kind: "Code",
  },
  {
    title: "TOTC e-learning landing page",
    note: "A Figma design rebuilt as a responsive Next.js page",
    year: "2026",
    stack: ["Next.js", "TypeScript"],
    href: "https://figma-nextjs-project.vercel.app",
    kind: "Live",
  },
];

/* ------------------------------------------------------------ Experience */

export type ExperienceCategory = "engineering" | "science" | "leadership" | "education";

export const experienceCategories: { id: ExperienceCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "engineering", label: "Engineering" },
  { id: "science", label: "Science" },
  { id: "leadership", label: "Leadership & operations" },
  { id: "education", label: "Education" },
];

export type Experience = {
  id: string;
  role: string;
  org: string;
  context?: string;
  period: string;
  category: ExperienceCategory;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    id: "hackathon-africa",
    role: "Full-Stack Developer Trainee",
    org: "Hordanso Group × AfricaPlan Foundation",
    context: "Hackathon Africa Programme",
    period: "2026 — Present",
    category: "engineering",
    points: [
      "Build full-stack web applications with Next.js, React and TypeScript, styling responsive interfaces with Tailwind CSS and shadcn/ui components.",
      "Develop back-end services and REST APIs with Node.js and Python (FastAPI), working with relational (PostgreSQL) and NoSQL (MongoDB) databases.",
      "Manage code with Git and GitHub and apply the programme's software-engineering and career-readiness training to real product work, including HirePlume.",
    ],
    tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "MongoDB", "Git"],
  },
  {
    id: "foretrust",
    role: "Cybersecurity Analyst & Data Entry Officer",
    org: "Foretrust Digital Centre",
    context: "Three Million Technical Talent (3MTT) Nigeria",
    period: "May 2024 — Mar 2025",
    category: "engineering",
    points: [
      "Monitored network traffic, investigated security incidents in real time and wrote detailed incident-response reports.",
      "Installed and operated firewalls, encryption programs and other security software; fixed vulnerabilities and promoted information-security best practice.",
      "Registered students with the Joint Admissions and Matriculation Board (JAMB) for the 2025 examination.",
    ],
    tags: ["Network monitoring", "Incident response", "Firewalls", "Encryption"],
  },
  {
    id: "soteria",
    role: "Project Manager",
    org: "Soteria Tech Global Resources",
    context: "Enugu",
    period: "Apr 2024 — Mar 2025",
    category: "leadership",
    points: [
      "Initiated projects, then recruited and aligned the teams to deliver them.",
      "Set timelines, managed budgets and progress, and monitored and communicated project performance.",
    ],
    tags: ["Planning", "Budgets", "Stakeholders", "Reporting"],
  },
  {
    id: "i-invest",
    role: "Sales Executive",
    org: "i-Invest (Parthian Partners)",
    context: "Enugu",
    period: "2025",
    category: "leadership",
    points: [
      "Promoted digital investment products and guided clients through investment options and account set-up.",
      "Built lasting client relationships through clear communication, education on savings and investment, and consistent follow-up.",
      "Met sales targets and kept accurate records of client interactions, transactions and sales activity.",
    ],
    tags: ["Client relations", "Fintech", "Sales"],
  },
  {
    id: "slimmex",
    role: "Storekeeper",
    org: "Slimmex Unibloom International",
    context: "New Haven, Enugu",
    period: "Jul 2023 — Jan 2024",
    category: "leadership",
    points: [
      "Maintained and reconciled inventory records and carried out physical stock counts across the warehouse and supply yard.",
      "Reported daily product outflow to headquarters through an online Microsoft Excel worksheet.",
      "Contacted customers to confirm orders placed online and offline.",
    ],
    tags: ["Inventory", "Excel", "Reporting"],
  },
  {
    id: "inec",
    role: "Presiding Officer (Ad hoc)",
    org: "Independent National Electoral Commission (INEC)",
    period: "Feb — Mar 2023",
    category: "leadership",
    points: [
      "Conducted polling operations and managed election materials.",
      "Maintained order at the polling unit and ensured an accurate declaration of results.",
    ],
    tags: ["Public service", "Integrity", "Operations"],
  },
  {
    id: "seatop",
    role: "Teacher",
    org: "Seatop Academy Secondary School",
    context: "Ore, Ondo State",
    period: "Feb 2022 — Mar 2023",
    category: "education",
    points: [
      "Planned, prepared and delivered lessons, and created instructional resources for the classroom.",
      "Built a positive learning climate and met course and school-wide student-performance goals.",
    ],
    tags: ["Curriculum", "Facilitation", "Mentoring"],
  },
  {
    id: "gauze",
    role: "Quality Control & Quality Assurance Intern",
    org: "Gauze Pharmaceuticals and Lab",
    context: "Awka, Anambra State",
    period: "Nov 2020 — Dec 2021",
    category: "science",
    points: [
      "Helped ensure manufacturing processes complied with national and international standards.",
      "Worked with operating staff to establish procedures, standards and systems.",
      "Wrote management and technical reports and contributed to customer charters.",
    ],
    tags: ["GMP", "Quality assurance", "Technical writing"],
  },
  {
    id: "unn",
    role: "Computer Assistant Operator",
    org: "University of Nigeria, Nsukka",
    context: "Nsukka Campus, Enugu",
    period: "Apr 2018 — May 2019",
    category: "engineering",
    points: [
      "Delivered online services accurately and answered customer enquiries in person, by phone, email and social media.",
      "Earned an 85% customer-satisfaction rating on completed calls.",
      "Helped grow the customer base by 20% in 2018 through faster service delivery.",
    ],
    tags: ["Customer experience", "Digital services"],
  },
];

export const education = [
  {
    title: "B.Sc. Biochemistry",
    detail: "Second Class Upper Division (2:1)",
    org: "University of Nigeria, Nsukka",
    year: "2021",
  },
  {
    title: "West African Senior School Certificate (WAEC)",
    detail: "Distinction, one sitting",
    org: "Holy Cross Secondary School, Abakpa-Nike, Enugu",
    year: "2015",
  },
  {
    title: "National Youth Service Corps (NYSC)",
    detail: "Discharge certificate",
    org: "Federal Republic of Nigeria",
    year: "2023",
  },
];

export const certifications = [
  {
    title: "Basic Cloud Computing Training",
    issuer: "NCDMB × CypherCrescent",
    year: "2026",
    domain: "Cloud",
    note: "Cloud deployment, virtual machines, networking, storage and security across IaaS, PaaS and SaaS.",
  },
  { title: "Advanced Public Health Certificate", year: "2026", domain: "Health" },
  { title: "Advanced Mental Health Certificate", year: "2026", domain: "Health" },
  { title: "Advanced Caregiver Certificate", year: "2026", domain: "Health" },
  { title: "Cybersecurity Training Certificate & DFA Cybersecurity", year: "2025", domain: "Security" },
  { title: "Basic CertiProf PMP", year: "2025", domain: "Management" },
  {
    title: "Solar Energy & Solar-Powered CCTV Installation",
    issuer: "National Directorate of Employment (NDE)",
    year: "2024 — 2025",
    domain: "Energy",
  },
  { title: "Introduction to Prompt Engineering & Generative AI", year: "2024", domain: "AI" },
  { title: "Leadership Intelligence Course", year: "2023", domain: "Leadership" },
  { title: "Jobberman Soft Skills Training", year: "2020", domain: "Soft skills" },
] as { title: string; issuer?: string; year: string; domain: string; note?: string }[];

export const awards = [
  { title: "Hackathon 2.0 Challenge — Award Winner", year: "2024" },
  { title: "Best Public Relations Officer (PRO) of the Year", org: "University of Nigeria, Nsukka", year: "2021" },
] as { title: string; org?: string; year: string }[];

export const volunteering = [
  {
    title: "Online Volunteer, Health for Humanity",
    note: "Raised COVID-19 awareness in an online community.",
    year: "2017 — 2022",
  },
  { title: "Volunteer, UNICEF Child Birth Registration Exercise", year: "Nov 2022" },
] as { title: string; note?: string; year: string }[];

/* ------------------------------------------------------- Periodic stack */

export type ElementGroup = "frontend" | "backend" | "data" | "cloud" | "security" | "science";

export const elementGroups: Record<ElementGroup, { label: string; accent: Accent }> = {
  frontend: { label: "Frontend", accent: "gfp" },
  backend: { label: "Backend", accent: "cyan" },
  data: { label: "Databases", accent: "dapi" },
  cloud: { label: "Cloud & tooling", accent: "amber" },
  security: { label: "Security", accent: "cherry" },
  science: { label: "Science & craft", accent: "bone" },
};

export type StackElement = {
  n: number;
  sym: string;
  name: string;
  group: ElementGroup;
  note: string;
  usedIn: string[];
};

export const elements: StackElement[] = [
  { n: 1, sym: "Nx", name: "Next.js", group: "frontend", note: "App Router, server components, routing and deployment.", usedIn: ["HirePlume", "This site", "JKJ Exchange"] },
  { n: 2, sym: "Re", name: "React", group: "frontend", note: "Component-driven interfaces with hooks and React 19.", usedIn: ["HirePlume", "This site"] },
  { n: 3, sym: "Ts", name: "TypeScript", group: "frontend", note: "Typed, self-documenting code from UI to API client.", usedIn: ["HirePlume", "This site"] },
  { n: 4, sym: "Js", name: "JavaScript", group: "frontend", note: "The language under it all — modules, async and the DOM.", usedIn: ["BookNook"] },
  { n: 5, sym: "Ht", name: "HTML5", group: "frontend", note: "Semantic, accessible markup comes first.", usedIn: ["Every project"] },
  { n: 6, sym: "Tw", name: "Tailwind CSS", group: "frontend", note: "Design tokens and responsive layouts at speed.", usedIn: ["HirePlume", "This site"] },
  { n: 7, sym: "Sh", name: "shadcn/ui", group: "frontend", note: "Accessible, composable primitives built on Radix.", usedIn: ["Hackathon Africa"] },
  { n: 8, sym: "No", name: "Node.js", group: "backend", note: "JavaScript on the server — APIs, tooling and scripts.", usedIn: ["BookNook"] },
  { n: 9, sym: "Ex", name: "Express", group: "backend", note: "Lean REST APIs with clear status codes.", usedIn: ["BookNook"] },
  { n: 10, sym: "Py", name: "Python", group: "backend", note: "Readable back ends, scripting and data work.", usedIn: ["HirePlume", "Swift Arrow"] },
  { n: 11, sym: "Fa", name: "FastAPI", group: "backend", note: "Typed, documented, high-performance Python APIs.", usedIn: ["HirePlume", "JKJ Exchange"] },
  { n: 12, sym: "Ap", name: "REST APIs", group: "backend", note: "Predictable contracts between client and server.", usedIn: ["HirePlume", "BookNook"] },
  { n: 13, sym: "Pg", name: "PostgreSQL", group: "data", note: "Relational modelling with migrations and integrity.", usedIn: ["HirePlume", "JKJ Exchange"] },
  { n: 14, sym: "Mg", name: "MongoDB", group: "data", note: "Document storage for flexible, NoSQL workloads.", usedIn: ["Hackathon Africa"] },
  { n: 15, sym: "Sq", name: "SQL Server", group: "data", note: "Azure SQL with parameterised queries.", usedIn: ["BookNook"] },
  { n: 16, sym: "Gt", name: "Git", group: "cloud", note: "Version control, branching and clean history.", usedIn: ["Every project"] },
  { n: 17, sym: "Gh", name: "GitHub", group: "cloud", note: "Reviews, Actions CI/CD and scheduled jobs.", usedIn: ["HirePlume", "BookNook"] },
  { n: 18, sym: "Vc", name: "Vercel", group: "cloud", note: "Previews, serverless functions and production hosting.", usedIn: ["HirePlume", "This site"] },
  { n: 19, sym: "Az", name: "Azure", group: "cloud", note: "App Service, SQL, Key Vault and Blob Storage.", usedIn: ["BookNook"] },
  { n: 20, sym: "Vm", name: "Virtual machines", group: "cloud", note: "IaaS fundamentals — compute, networking, storage.", usedIn: ["NCDMB cloud training"] },
  { n: 21, sym: "Ai", name: "Generative AI", group: "cloud", note: "Prompt engineering and human-in-the-loop AI features.", usedIn: ["HirePlume"] },
  { n: 22, sym: "Nm", name: "Network monitoring", group: "security", note: "Watching traffic for anomalies and threats.", usedIn: ["Foretrust · 3MTT"] },
  { n: 23, sym: "Ir", name: "Incident response", group: "security", note: "Investigate, contain and report — in real time.", usedIn: ["Foretrust · 3MTT"] },
  { n: 24, sym: "Fw", name: "Firewalls", group: "security", note: "Perimeter controls, installed and operated.", usedIn: ["Foretrust · 3MTT"] },
  { n: 25, sym: "En", name: "Encryption", group: "security", note: "Protecting data at rest and in transit.", usedIn: ["Foretrust · 3MTT"] },
  { n: 26, sym: "Bc", name: "Biochemistry", group: "science", note: "B.Sc. (2:1), University of Nigeria, Nsukka.", usedIn: ["The Lab"] },
  { n: 27, sym: "Rs", name: "Research", group: "science", note: "Research design, data collection, analysis and writing.", usedIn: ["The Lab"] },
  { n: 28, sym: "Da", name: "Data analysis", group: "science", note: "Turning raw numbers into decisions.", usedIn: ["Gauze Pharma", "Slimmex"] },
  { n: 29, sym: "Pm", name: "Project management", group: "science", note: "Plans, budgets and stakeholders — CertiProf PMP.", usedIn: ["Soteria Tech"] },
  { n: 30, sym: "Cx", name: "Customer experience", group: "science", note: "Front-line service with an 85% satisfaction rating.", usedIn: ["UNN", "i-Invest"] },
];

/* ---------------------------------------------------------- The method */

export type MethodStep = {
  n: string;
  title: string;
  body: string;
  lab: string;
  code: string;
  accent: Accent;
  glyph: "observe" | "hypothesise" | "experiment" | "analyse" | "publish";
};

export const method: MethodStep[] = [
  {
    n: "01",
    title: "Observe",
    body: "Every build starts with listening. I learn who the users are, what they're trying to get done and where the friction lives — before I write a line of code.",
    lab: "Record what you see, not what you expect.",
    code: "User conversations, workflow mapping and reading the existing code and data.",
    accent: "gfp",
    glyph: "observe",
  },
  {
    n: "02",
    title: "Hypothesise",
    body: "I turn findings into a plan anyone can read — requirements, data models and API contracts — each with a clear definition of done.",
    lab: "State a prediction you can test.",
    code: "Product and software requirements, schemas, endpoints and success criteria.",
    accent: "cyan",
    glyph: "hypothesise",
  },
  {
    n: "03",
    title: "Experiment",
    body: "I build in small, reversible slices — a page, an endpoint, a migration — so ideas meet reality early, when changing course is still cheap.",
    lab: "Change one variable at a time.",
    code: "Next.js, TypeScript and FastAPI, shipped as working increments.",
    accent: "dapi",
    glyph: "experiment",
  },
  {
    n: "04",
    title: "Analyse",
    body: "Type checks, automated tests, logs and honest feedback decide what stays. I measure, review and refine — evidence beats opinion.",
    lab: "Let the data argue with you.",
    code: "pytest suites, CI pipelines, code review and real-world monitoring.",
    accent: "amber",
    glyph: "analyse",
  },
  {
    n: "05",
    title: "Publish",
    body: "I ship to production behind automated pipelines and document what I learned. Good science — and good software — is reproducible.",
    lab: "Results only count when others can repeat them.",
    code: "Automated deploys, migrations, READMEs and decision logs.",
    accent: "cherry",
    glyph: "publish",
  },
];

/* --------------------------------------------------------------- Journey */

export type Milestone = {
  year: string;
  title: string;
  place: string;
  note?: string;
  tag: string;
  accent: Accent;
};

export const journey: Milestone[] = [
  {
    year: "2015",
    title: "WAEC — distinction in one sitting",
    place: "Holy Cross Secondary School, Enugu",
    tag: "Education",
    accent: "bone",
  },
  {
    year: "2017",
    title: "Online volunteer, Health for Humanity",
    place: "Five years of health awareness online",
    note: "Raised COVID-19 awareness in an online community through 2022.",
    tag: "Service",
    accent: "cherry",
  },
  {
    year: "2018",
    title: "Computer Assistant Operator",
    place: "University of Nigeria, Nsukka",
    note: "85% customer satisfaction and a 20% larger customer base in 2018.",
    tag: "Technology",
    accent: "cyan",
  },
  {
    year: "2020",
    title: "Quality control & assurance in pharma",
    place: "Gauze Pharmaceuticals and Lab, Awka",
    note: "Kept manufacturing aligned with national and international standards.",
    tag: "Science",
    accent: "gfp",
  },
  {
    year: "2021",
    title: "B.Sc. Biochemistry, Second Class Upper",
    place: "University of Nigeria, Nsukka",
    note: "Also named Best Public Relations Officer of the Year.",
    tag: "Science",
    accent: "gfp",
  },
  {
    year: "2022",
    title: "Secondary-school teacher",
    place: "Seatop Academy, Ore, Ondo State",
    note: "Plus a UNICEF child birth-registration exercise.",
    tag: "Education",
    accent: "amber",
  },
  {
    year: "2023",
    title: "NYSC & INEC presiding officer",
    place: "National service and the 2023 elections",
    note: "Then storekeeping and inventory reporting at Slimmex Unibloom.",
    tag: "Public service",
    accent: "bone",
  },
  {
    year: "2024",
    title: "Cybersecurity analyst & Hackathon 2.0 winner",
    place: "Foretrust Digital Centre · 3MTT Nigeria",
    note: "While running projects as a project manager at Soteria Tech.",
    tag: "Security",
    accent: "cherry",
  },
  {
    year: "2025",
    title: "Sales executive & CertiProf PMP",
    place: "i-Invest (Parthian Partners), Enugu",
    note: "Plus cybersecurity and DFA certifications.",
    tag: "Leadership",
    accent: "amber",
  },
  {
    year: "2026",
    title: "Full-stack developer — HirePlume goes live",
    place: "Hackathon Africa Programme",
    note: "Alongside NCDMB × CypherCrescent cloud-computing training.",
    tag: "Software",
    accent: "gfp",
  },
];

/* ----------------------------------------------------------------- Stats */

export const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years of professional experience",
    note: "Since 2018 — across science, security, education and software.",
  },
  {
    value: 10,
    suffix: "+",
    label: "Certifications & trainings",
    note: "Cloud, cybersecurity, project management, health and AI.",
  },
  {
    value: 2,
    suffix: "",
    label: "Awards",
    note: "Hackathon 2.0 winner and Best PRO of the Year at UNN.",
  },
  {
    value: 1,
    suffix: "",
    label: "Product live in production",
    note: "HirePlume — a Next.js and FastAPI platform on Vercel and Neon.",
  },
];

/* ---------------------------------------------------------- About & Lab */

export const principles = [
  {
    title: "Evidence over assumption",
    body: "I test ideas against users, data and logs before I trust them — a habit from years at the lab bench.",
  },
  {
    title: "Clarity is a feature",
    body: "Readable code, honest copy and interfaces that explain themselves. If it needs a manual, it isn't finished.",
  },
  {
    title: "Secure by default",
    body: "Hashed passwords, least privilege, rate limits and expiring sessions from day one — never as an afterthought.",
  },
  {
    title: "People first",
    body: "Years of front-line service taught me that software is only as good as the experience of the person using it.",
  },
];

export const researchInterests = [
  {
    title: "Digital health",
    body: "How software can make public-health and mental-health information easier to reach, understand and act on.",
    accent: "gfp" as Accent,
  },
  {
    title: "Education & employability",
    body: "Tools and programmes that help young people learn faster and move into meaningful work.",
    accent: "cyan" as Accent,
  },
  {
    title: "Youth transition",
    body: "The path from school to work — and the places where technology can make it smoother and fairer.",
    accent: "dapi" as Accent,
  },
  {
    title: "Data-driven decisions",
    body: "Collecting clean data and analysing it honestly — from laboratory assays to product metrics.",
    accent: "amber" as Accent,
  },
];

export const researchToolkit = [
  "Research design & methodology",
  "Data collection & analysis",
  "Critical thinking & interpretation",
  "Clear, concise technical writing",
  "Curriculum design",
  "Programme implementation",
  "Training & facilitation",
];

export const bridges = [
  {
    lab: "Good manufacturing practice",
    code: "Quality gates",
    body: "In pharmaceutical QA nothing ships until it meets the standard. In software that means type checks, tests and review before every deploy.",
  },
  {
    lab: "The lab notebook",
    code: "Documentation",
    body: "If it isn't written down, it didn't happen. I keep specs, READMEs and work logs the way I kept bench records.",
  },
  {
    lab: "Controlled experiments",
    code: "Debugging",
    body: "Change one variable, observe, conclude. It's still the fastest way I know to corner a bug.",
  },
  {
    lab: "Biosafety",
    code: "Security by default",
    body: "Containment first. Argon2 hashing, role-based access, rate-limited logins and expiring sessions are my fume hood.",
  },
];

export const hobbies = ["Reading", "Swimming", "Football"];
export const interests = ["Education", "Employability", "Youth transition", "Research"];
