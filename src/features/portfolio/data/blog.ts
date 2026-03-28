import type { Blog } from "../types/blog"

export const blogs: Blog[] = [
  {
    id: "1",
    title: "The Backend Engineer’s Survival Guide to the AI Era",
    category: "System Design / AI",
    source: "Medium",
    author: "Anurag Singh",
    link: "https://medium.com/codetodeploy/the-backend-engineers-survival-guide-to-the-ai-era-technologies-that-will-define-the-next-3-years-4aa953a46ca6",
    readTime: "10 min",
    summary:
      "A deep dive into how backend engineering is evolving in the age of AI. Traditional APIs and databases are no longer enough — engineers now need to integrate LLMs, vector databases, and intelligent pipelines.",
    keyInsights: [
      "Backend roles are shifting from CRUD systems to intelligent systems",
      "Vector databases + LLM pipelines are becoming core infra",
      "AI is augmenting backend logic, not replacing engineers",
      "Future backend = APIs + AI orchestration layer",
    ],
  },

  {
    id: "2",
    title: "Why Agentic AI is the Future of Software Systems",
    category: "Agentic AI",
    source: "Medium",
    author: "Devansh",
    link: "https://machine-learning-made-simple.medium.com/why-ai-agents-are-good-software-0fc97b7a4d25",
    readTime: "8 min",
    summary:
      "Explains how agent-based architectures break complex tasks into smaller, coordinated units instead of relying on a single LLM.",
    keyInsights: [
      "Agentic systems are modular and easier to scale",
      "Multiple agents outperform monolithic LLM prompts",
      "Agents can combine LLMs, APIs, and rule-based logic",
      "This architecture improves reliability and extensibility",
    ],
  },

  {
    id: "3",
    title: "SpecMem: The Future Memory Layer for AI Coding Agents",
    category: "Agentic AI / Developer Tools",
    source: "Dev.to",
    author: "Shashikant",
    link: "https://dev.to/shashikant86/specmem-how-kiroween-in-san-francisco-sparked-the-first-unified-agent-experience-and-pragmatic-2b99",
    readTime: "12 min",
    summary:
      "Introduces the concept of a unified memory layer for AI coding agents to solve context fragmentation and knowledge loss.",
    keyInsights: [
      "AI agents currently lack persistent memory",
      "Context fragmentation is a major bottleneck in AI dev tools",
      "Agent experience (AX) is the next DevEx",
      "Future tools will focus on long-term memory + context optimization",
    ],
  },

  {
    id: "4",
    title: "50 Articles to Master Web Development",
    category: "Web Development",
    source: "Dev.to",
    author: "Florian Rappl",
    link: "https://dev.to/florianrappl/50-articles-to-master-web-dev-4jhl",
    readTime: "20 min",
    summary:
      "A curated collection of high-quality web development articles covering frontend, backend, and real-world engineering challenges.",
    keyInsights: [
      "Learning web dev requires curated, high-signal resources",
      "Real-world debugging teaches more than tutorials",
      "Reading diverse articles accelerates growth",
      "Consistency > intensity in learning",
    ],
  },

  {
    id: "5",
    title: "Competitive Programming vs Real-World Engineering",
    category: "Competitive Programming",
    source: "General / Dev Community Insights",
    author: "Various",
    link: "https://dev.to/",
    readTime: "6 min",
    summary:
      "Explores the gap between competitive programming skills and real-world software engineering practices.",
    keyInsights: [
      "CP improves problem-solving and algorithmic thinking",
      "Real-world engineering requires scalability and maintainability",
      "Clean code matters more than clever tricks in production",
      "Best engineers combine CP skills with system design thinking",
    ],
  },
];