export const profile = {
  name: "Frank Donald Kamga Fontcha",
  shortName: "Frank Fontcha",
  title: "Senior Full Stack Developer · Lead Software Engineer",
  location: "Dubai, UAE",
  availability: "Founder, MboaSoft Solutions",
  email: "franckfontcha@gmail.com",
  phone: "+971 55 935 8866",
  linkedin: "https://www.linkedin.com/in/kamga-fontcha-frank-donald-485933ba",
  github: "https://github.com/Frank14b",
  cv: "/cv/frank-fontcha-cv.pdf",
  siteUrl: "https://frankfontcha.tech",
  summary:
    "I architect and ship high-concurrency web, mobile and real-time platforms. For 8+ years I've led teams in Dubai, scaled systems to 500,000+ users and put distributed .NET and Node.js backends, plus applied AI/RAG, into production.",
};

export const stats = [
  { value: "8+", label: "years shipping production software" },
  { value: "500K+", label: "active users on a platform I re-architected" },
  { value: "10K+", label: "Google Play downloads for E-Farmer" },
  { value: "4", label: "engineers led on architecture and delivery" },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Backend & systems architecture",
    items: [
      "ASP.NET Core", "Node.js", "NestJS", "PHP / CakePHP", "Django", "FastAPI",
      "REST", "GraphQL", "WebSocket", "SignalR", "RabbitMQ", "BullMQ", "Hangfire",
      "Microservices", "Transactional outbox", "System design",
    ],
  },
  {
    group: "Real-time & media",
    items: ["WebRTC", "SFU", "PeerJS", "TURN / STUN", "HLS streaming", "VoIP push (PushKit / CallKit)", "LiveKit", "Client-side encryption"],
  },
  {
    group: "Frontend & mobile",
    items: ["Next.js", "React", "React Native", "Expo", "Ionic", "Angular", "Flutter", "Electron", "TypeScript"],
  },
  {
    group: "Data & caching",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "ChromaDB"],
  },
  {
    group: "Cloud, DevOps & CI/CD",
    items: [
      "Docker", "Kubernetes", "ArgoCD", "GitHub Actions", "Bitbucket Pipelines", "Azure Pipelines",
      "Vercel", "Expo EAS", "Nginx", "OVH / VPS", "Grafana", "Sentry", "SonarQube",
    ],
  },
  {
    group: "Applied AI & ML",
    items: ["RAG", "Ollama", "Hugging Face Transformers", "sentence-transformers", "QLoRA / LoRA", "PEFT"],
  },
];

export type Role = {
  title: string;
  company: string;
  period: string;
  place: string;
  points: string[];
};

export const experience: Role[] = [
  {
    title: "Senior Full Stack Developer / Lead Software Engineer",
    company: "LMNTO Performance Information Technology L.L.C.",
    period: "May 2022 — Present",
    place: "Dubai, UAE",
    points: [
      "Grew from Frontend Developer to Full Stack Developer to Lead Software Engineer. I now own architecture, technical planning and delivery for a team of 4 engineers.",
      "Led the architecture and modernization of a flagship platform and moved it from outsourced development to fully in-house engineering, serving 500,000+ active users.",
      "Re-engineered core infrastructure: tuned Docker worker clusters, indexed PostgreSQL and MongoDB, and reworked Redis caching to remove platform bottlenecks.",
      "Designed asynchronous message queues that replaced brittle third-party API dependencies, improving resilience and throughput.",
      "Architected reward engines, momentum challenges, and Web3 non-custodial wallet deposit and withdrawal for NodeLink, HUBLINK and HorysTech.",
      "Own CI/CD and deployments across Docker, Kubernetes and ArgoCD, with uptime monitoring in Grafana and Sentry.",
    ],
  },
  {
    title: "Independent Software Consultant / Contract Developer",
    company: "Four and Square · Afro Holdings LTD · VMeals",
    period: "Nov 2021 — May 2022",
    place: "UAE",
    points: [
      "Built cross-platform mobile gameplay interfaces with React, Ionic and Expo, and ran releases through Google Play Console tracks.",
      "Delivered a full-stack real-estate portal: a headless WordPress API with Next.js and Ionic web and mobile frontends.",
      "Integrated multiple payment gateways and custom checkout flows for local e-commerce businesses.",
    ],
  },
  {
    title: "Full Stack Developer / Team Lead / Analyst",
    company: "KTJC",
    period: "Mar 2019 — Sep 2021",
    place: "Bafoussam, Cameroon · Remote",
    points: [
      "Delivered full-stack web applications and contributed to software architecture, database administration and VPS configuration.",
      "Planned and coordinated development work and handled production troubleshooting.",
    ],
  },
  {
    title: "Lead Full Stack Developer / Web & Mobile",
    company: "Hello Docteur",
    period: "Apr 2020 — Aug 2021",
    place: "Remote · Part-time",
    points: [
      "Built the medical video-consultation mobile apps (Angular, Ionic, Node.js, WebSocket, PeerJS, WebRTC, STUN/TURN) and the blog/news site.",
      "Implemented real-time chat, ringing and video consultation between patients and licensed doctors.",
    ],
  },
  {
    title: "IT Web Developer",
    company: "EREC Cameroon",
    period: "Dec 2017 — Feb 2019",
    place: "Bafoussam, Cameroon · Part-time",
    points: [
      "Built and maintained websites with CodeIgniter, HTML, CSS and jQuery, and handled network administration.",
    ],
  },
];

export const education = {
  degree: "Bachelor's Degree in Software Engineering",
  school: "African Institute of Informatics (IAI-Cameroon)",
  period: "2014 — 2017",
};

export const certifications = [
  { name: "Full Stack Engineer Certificate", issuer: "Pro5.ai", date: "Jun 2024" },
  { name: "Developing ASP.NET MVC Web Applications", issuer: "Udemy", date: "Feb 2023" },
];

export const languages = [
  { name: "French", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
];
