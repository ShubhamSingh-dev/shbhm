import type { MyWork } from "../types/my-work"

export const MYWORK: MyWork[] = [
  {
    id: "winterfell",
    name: "Winterfell",
    tagline: "Lovable for Anchor smart contracts",
    icon: "ai",
    githubUrl: "https://github.com/bottle-nex/winterfell",
    websiteUrl: "https://winterfell.celestium.xyz/",
    isFeatured: true,
    details: [
      {
        id: "1",
        title: "Learn more",
        icon: "ai",
        description:
          "- Built an interactive dashboard for sending prompts to an LLM backend and visualizing real-time responses.\n- Created a futuristic landing and playground interface, combining high-performance React components with modern design.\n- Developed a parser and extractor system to display the LLM's live reasoning process in an intuitive UI.\n- Designed a custom Kubernetes-based E2B environment to securely run Anchor build, deploy, and test commands in isolated containers.",
        skills: ["React", "TypeScript", "Kubernetes", "Anchor", "LLMs", "E2B"],
        isExpanded: true,
      },
    ],
  },
  {
    id: "nocturn",
    name: "Nocturn",
    tagline: "The quiz app but with pump.fun energy",
    icon: "blockchain",
    githubUrl: "https://github.com/celestium-x/nocturn",
    websiteUrl: "https://nocturn.celestium.xyz/",
    details: [
      {
        id: "1",
        title: "What I built",
        icon: "blockchain",
        description:
          "- Building a blockchain-powered quiz platform inspired by pump.fun, combining gamification with on-chain rewards.\n- Built clean, user-friendly UI pages optimized for fast gameplay and smooth interactions.\n- Developed a WebSocket system with Redis Pub/Sub for horizontally scaled real-time communication between hosts, participants, and spectators.\n- Designed a microservices-based architecture with an orchestrator worker to handle question transitions and ensure fault tolerance.\n- Currently developing smart contracts enabling players to earn and trade rewards securely on-chain.",
        skills: [
          "Next.js",
          "WebSockets",
          "Redis",
          "Microservices",
          "Smart Contracts",
          "TypeScript",
        ],
        isExpanded: false,
      },
    ],
  },
]
