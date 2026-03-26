import type { MyWork } from "../types/my-work"

export const MYWORK: MyWork[] = [
  {
    id: "nirvado",
    name: "Nirvado",
    tagline: "A zero-setup browser IDE powered by AI",
    icon: "code",
    githubUrl: "https://github.com/ShubhamSingh-dev/Nirvado",
    websiteUrl: "https://nirvado.vercel.app/",
    isFeatured: true,
    details: [
      {
        id: "1",
        title: "What makes it special",
        icon: "code",
        description:
          "- Built a fully in-browser IDE using WebContainers, enabling real Node.js execution without local setup — achieving sub-100ms I/O performance.\n- Designed a multi-framework playground supporting React, Next.js, Vue, Express, Hono, and Angular, making it a true all-in-one dev environment.\n- Integrated Gemini AI directly into Monaco Editor for inline code completions — reducing developer effort and speeding up coding workflows significantly.\n- Engineered secure authentication with NextAuth (Google + GitHub) and implemented a persistent file system using PostgreSQL with a structured multi-table schema.\n- Focused on developer experience: instant boot, seamless editing, and persistent sessions across devices.",
        skills: [
          "Next.js 15",
          "TypeScript",
          "WebContainers",
          "Monaco Editor",
          "PostgreSQL",
          "NextAuth",
          "Gemini API",
        ],
        isExpanded: true,
      },
    ],
  },

  {
    id: "apilab",
    name: "ApiLab",
    tagline: "AI-powered Postman, but actually smart",
    icon: "ai",
    githubUrl: "https://github.com/ShubhamSingh-dev/ApiLab",
    websiteUrl: "https://api-lab-two.vercel.app/",
    details: [
      {
        id: "1",
        title: "What I built",
        icon: "ai",
        description:
          "- Created an AI-first API testing platform that auto-generates request names and organizes collections, removing repetitive manual setup.\n- Built support for 10+ request configurations including headers, auth, query params, and body editors — delivering a complete Postman-like experience.\n- Optimized performance to achieve sub-200ms response handling across API requests.\n- Containerized the entire backend using Docker + PostgreSQL, reducing developer onboarding time to under 2 minutes.\n- Designed for real-world developer workflows with speed, automation, and clean UX at its core.",
        skills: [
          "Next.js",
          "TypeScript",
          "PostgreSQL",
          "Docker",
          "REST APIs",
          "Gemini API",
        ],
        isExpanded: false,
      },
    ],
  },

  {
    id: "tellgit",
    name: "TellGit",
    tagline: "Understand your GitHub habits, not just your commits",
    icon: "fullstack",
    githubUrl: "https://github.com/ShubhamSingh-dev/TellGit",
    websiteUrl: "https://tell-git.vercel.app/",
    details: [
      {
        id: "1",
        title: "Core idea",
        icon: "fullstack",
        description:
          "- Built a GitHub analytics platform that aggregates and structures activity across 100+ repositories per user.\n- Helps developers uncover contribution patterns, consistency gaps, and productivity insights.\n- Engineered a fully type-safe backend using tRPC + Prisma, eliminating traditional REST overhead and runtime type mismatches.\n- Integrated authentication with NextAuth and built a scalable data pipeline for processing large GitHub datasets efficiently.\n- Focused on turning raw contribution data into meaningful, actionable insights.",
        skills: [
          "Next.js",
          "tRPC",
          "Prisma",
          "PostgreSQL",
          "NextAuth",
          "TypeScript",
        ],
        isExpanded: false,
      },
    ],
  },
]