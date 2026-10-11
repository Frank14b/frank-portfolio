export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  url?: string;
  kind: "Product" | "Client / employer" | "Engineering showcase" | "Proof of concept";
  featured?: boolean;
  highlights: string[];
  stack: string[];
  description: string;
  architecture?: string[];
  images?: { src: string; alt: string; shape: "phone" | "wide" | "square" }[];
};

export const projects: Project[] = [
  {
    slug: "pro-e-farmer",
    name: "Pro E-Farmer",
    tagline: "AI-powered livestock and crop management with social commerce, on mobile, desktop and web.",
    role: "Founder · Lead engineer",
    period: "2025 — Present",
    url: "https://e-farmer.app",
    images: [
      { src: "/projects/efarmer-desktop.jpg", alt: "E-Farmer desktop dashboard: finances, livestock and weather", shape: "wide" },
      { src: "/projects/efarmer-production.jpg", alt: "E-Farmer desktop production view", shape: "wide" },
    ],
    kind: "Product",
    featured: true,
    highlights: [
      "5,000+ downloads and 2,000+ active users on Google Play",
      "Farm-scoped RAG assistant “Sora” on ChromaDB + sentence-transformers",
      "Electron desktop app that runs fully offline on node:sqlite",
      "8 languages including RTL (Arabic, Urdu)",
    ],
    stack: [
      "NestJS", "PostgreSQL", "BullMQ", "Django", "ChromaDB", "Gemini", "Ollama", "QLoRA / PEFT",
      "Expo / React Native", "Electron", "Angular", "Next.js", "Stripe", "FCM / APNs",
    ],
    description:
      "Pro E-Farmer helps smallholder and commercial farmers run their farms. It tracks animals, crop cycles, feed, medication and expenses, forecasts breeding and laying, sells produce on a marketplace and answers questions about the farm through an AI assistant grounded in the farm's own records. I designed and built the whole system: the backend, the AI service, the mobile, desktop and web apps, and the data pipeline in between.",
    architecture: [
      "NestJS API (v1): about 30 domain modules (animals, crops, plots, eggs, wallets, marketplace, vets, chatbot, notifications, Telegram bot) built from use cases, services and adapters.",
      "Django + DRF AI service: RAG question answering over ChromaDB, structure-aware re-indexing, and Gemini vision helpers that turn a product photo into a listing.",
      "Expo mobile app with two storage modes: a local mode on expo-sqlite (54 tables) and a cloud mode on the API, with OTA updates and RevenueCat.",
      "Electron + Angular 22 desktop app: sandboxed renderer, typed IPC, local API in the main process, and a shared farm-science library.",
      "Next.js business panel with next-intl in 7 locales and RTL, plus a Next.js marketing site.",
    ],
  },
  {
    slug: "mboameet",
    name: "MboaMeet",
    tagline: "Social and creator-commerce platform with encrypted chat, calls, lives and an HLS video feed.",
    role: "Founder · Architect",
    period: "2024 — Present",
    url: "https://mboameet.com",
    images: [
      { src: "/projects/mboameet-1.jpg", alt: "MboaMeet community feed", shape: "phone" },
      { src: "/projects/mboameet-14.jpg", alt: "MboaMeet chats and channels", shape: "phone" },
      { src: "/projects/mboameet-16.jpg", alt: "MboaMeet in-chat deal with a seller", shape: "phone" },
    ],
    kind: "Product",
    featured: true,
    highlights: [
      "Live on Google Play and the App Store",
      "1:1 calls go P2P first and fall back to a self-hosted LiveKit SFU mid-call",
      "iOS CallKit and Android ConnectionService ringing from VoIP push, even when the app is killed",
      "Client-side encrypted chat: RSA-OAEP text, AES-GCM media, per-member channel keys",
      "Multi-tier H.264/HEVC HLS feed served from one VPS",
    ],
    stack: [
      "React Native / Expo", "ASP.NET Core (.NET 10)", "PostgreSQL", "Redis", "SignalR", "Hangfire",
      "RabbitMQ", "LiveKit SFU", "WebRTC", "coturn", "FFmpeg / HLS", "RevenueCat", "Stripe", "Next.js", "Gemini",
    ],
    description:
      "MboaMeet is a social and creator-commerce platform. People follow creators, chat, call, join lives, run channel stores and buy from each other in chat. I architected and built all of it: the Expo app, the .NET 10 modular-monolith API (about 20 modules), the Next.js web client, the AI studio service and the infrastructure.",
    architecture: [
      "ASP.NET Core modular monolith: Calls, Chats, Feeds, Lives, Groups, Stores, Wallets, Studio and more, each split into Api, Data and Services.",
      "Real time: SignalR hub for chat, presence and call signalling, with user-to-connection maps in Redis.",
      "Media: react-native-webrtc + coturn for P2P calls, self-hosted LiveKit SFU for lives and call fallback, and an FFmpeg HLS ladder on Hangfire served by Nginx.",
      "Payments: RevenueCat subscriptions and token packs through an idempotent webhook inbox, Stripe PaymentIntents and mobile money for wallet top-ups.",
      "AI Studio: a Django service in front of Gemini image editing and Lyria music, billed in tokens with automatic refunds when a generation fails.",
      "CI/CD: GitHub Actions build and test, then an SSH deploy that runs Docker Compose.",
    ],
  },
  {
    slug: "lmnto-platforms",
    name: "LMNTO platforms",
    tagline: "Bringing a 500,000-user platform in-house, plus reward engines and Web3 wallets for NodeLink, HUBLINK and HorysTech.",
    role: "Lead Software Engineer @ LMNTO",
    period: "2022 — Present",
    kind: "Client / employer",
    featured: true,
    highlights: [
      "500,000+ active users",
      "Moved from outsourced to fully in-house engineering",
      "Async queues replaced brittle third-party API calls",
      "Kubernetes + ArgoCD delivery, Grafana and Sentry monitoring",
    ],
    stack: ["Node.js", "NestJS", "Next.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "ArgoCD", "Grafana", "Sentry", "Web3"],
    description:
      "At LMNTO I lead a team of four engineers. We took over a flagship platform from an outsourced vendor and modernized it while 500,000+ users kept using it. The work: tuning Docker worker clusters, indexing PostgreSQL and MongoDB, reworking Redis caching, and moving fragile synchronous third-party calls onto asynchronous message queues. I also architected reward engines, momentum challenges and non-custodial Web3 wallet deposits and withdrawals for NodeLink, HUBLINK and HorysTech. This is employer work, so the code isn't public.",
  },
  {
    slug: "qashio",
    name: "Qashio Expense Tracker",
    tagline: "Production-grade finance API: transactional outbox, idempotent writes and race-safe auth.",
    role: "Sole engineer",
    period: "2026",
    kind: "Engineering showcase",
    featured: true,
    highlights: [
      "Transactional outbox → BullMQ, one job per handler",
      "End-to-end idempotency keys with duplicate detection",
      "Refresh-token rotation that survives concurrent tabs",
      "Hexagonal modules, concurrency tests, Decimal money math",
    ],
    stack: ["NestJS 11", "TypeORM", "PostgreSQL", "Redis", "BullMQ", "Next.js 15", "MUI", "TanStack Query", "Zod", "Jest", "Docker"],
    description:
      "This started as a take-home brief for a simple expense tracker. I built it as I'd build a real fintech backend: wallets with opening balances, budgets with 80% and 100% alerts, multi-currency, email OTP sign-up, notifications and activity logs, on a hexagonal architecture with a reliable event pipeline. Domain events never get lost and no side effect runs twice.",
  },
  {
    slug: "hellodocteur",
    name: "HelloDocteur",
    tagline: "Telemedicine app: patients consult licensed doctors by chat, audio or video.",
    role: "Lead full stack developer",
    period: "2020 — 2021",
    url: "https://hellodocteur.net",
    kind: "Client / employer",
    highlights: [
      "1:1 video and audio consultations over WebRTC",
      "Socket.io signalling for ringing, accept and hang-up",
      "Short-lived TURN credentials shared per call",
      "Medical records, appointments, health feed, cycle tracking",
    ],
    stack: ["Ionic 5", "Angular", "Cordova", "PeerJS", "WebRTC", "Socket.io", "Node.js", "MySQL", "STUN/TURN"],
    description:
      "HelloDocteur gives patients in Africa 24/7 access to licensed doctors. I built the Ionic/Angular mobile app with real-time chat, call ringing and video consultations, plus the encyclopedia, health feed, appointments and menstrual and pregnancy calendars.",
  },
  {
    slug: "ngo-incident-reporting",
    name: "NGO incident-reporting app",
    tagline: "White-label Flutter app for documenting incidents and supporting victims, built to work on bad networks.",
    role: "Mobile engineer",
    period: "2023 — 2026",
    kind: "Client / employer",
    highlights: [
      "White-labelled for several organisations",
      "Write-ahead offline drafts, so no report is lost",
      "Separate agent and victim self-service roles",
      "FR/EN localisation",
    ],
    stack: ["Flutter", "Dart", "Dio", "Provider", "SQLite", "Secure storage", "JWT"],
    description:
      "A Flutter app for human-rights NGOs. Field agents document incidents, follow up with victims and manage shelters; victims can file reports themselves. The same codebase ships under several organisations' brands. Reports come from places with poor connectivity, so the app writes every submission to SQLite before calling the API.",
  },
  {
    slug: "elex",
    name: "ELEX: solar energy tokenization",
    tagline: "A smart meter's energy readings are minted as ERC-20 tokens on BSC.",
    role: "Sole engineer",
    period: "2026",
    kind: "Proof of concept",
    highlights: [
      "Shelly smart-meter polling over local RPC",
      "Delta accumulation with batched on-chain mints",
      "WalletConnect via Reown AppKit + wagmi/viem",
    ],
    stack: ["Expo 54", "React Native", "wagmi", "viem", "Reown AppKit", "Zustand", "Solidity (ERC-20)", "BSC Testnet"],
    description:
      "A proof of concept that rewards solar energy production. The app pairs with a Shelly energy meter on the home network, accumulates the energy produced and mints an ERC-20 “EnergyToken” to the owner's wallet in batches.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
