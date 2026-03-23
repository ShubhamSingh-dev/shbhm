// ─────────────────────────────────────────────────────────────────────────────
// Tech-stack icon URLs for both light and dark modes
//
// Sources used:
//  • Devicon   — https://devicon.dev/  (coloured originals; great default choice)
//  • Simple Icons CDN — https://cdn.simpleicons.org/[slug]/[hex]
//                       (monochrome; colour or theme by appending a hex code)
//
// Rule of thumb:
//  • Icons whose brand colour reads well on both backgrounds → same URL for both.
//  • Black-logotype icons (Next.js, Express, shadcn, Bun, etc.) → invert per mode.
//  • Icons not in devicon (shadcn, Motion/Framer, TanStack, LangChain …) → simple-icons.
// ─────────────────────────────────────────────────────────────────────────────

export type IconMode = "light" | "dark";

export interface TechIconEntry {
  /** URL that works on light backgrounds */
  light: string;
  /** URL that works on dark backgrounds */
  dark: string;
  /** Which icon library provides this asset */
  source: "devicon" | "simple-icons" | "devicon+simple-icons";
  /** Any caveats worth knowing */
  note?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const di = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const si = (slug: string, hex: string) =>
  `https://cdn.simpleicons.org/${slug}/${hex}`;

// ─── Icon map ─────────────────────────────────────────────────────────────────
export const TECH_STACK_ICONS: Record<string, TechIconEntry> = {
  // ── Languages ────────────────────────────────────────────────────────────
  typescript: {
    light: di("typescript/typescript-original.svg"),
    dark:  di("typescript/typescript-original.svg"),
    source: "devicon",
    note: "Coloured — works on both modes",
  },

  js: {
    light: di("javascript/javascript-original.svg"),
    dark:  di("javascript/javascript-original.svg"),
    source: "devicon",
    note: "Yellow badge reads fine on dark bg; devicon is safest choice",
  },

  python: {
    light: di("python/python-original.svg"),
    dark:  di("python/python-original.svg"),
    source: "devicon",
    note: "Blue+yellow dual-tone works on both modes",
  },

  java: {
    light: di("java/java-original.svg"),
    dark:  di("java/java-original.svg"),
    source: "devicon",
    note:
      "Devicon preferred. simple-icons only has OpenJDK (slug: openjdk), not the original Java cup.",
  },

  // ── Runtime environments ─────────────────────────────────────────────────
  nodejs: {
    // ⚠ simple-icons slug is "nodedotjs", not "nodejs"
    light: di("nodejs/nodejs-original.svg"),
    dark:  di("nodejs/nodejs-original.svg"),
    source: "devicon",
    note: "simple-icons slug is 'nodedotjs' if you prefer mono",
  },

  bun: {
    light: di("bun/bun-original.svg"),
    dark:  si("bun", "fbf0df"),         // cream/off-white on dark bg
    source: "devicon+simple-icons",
    note: "Devicon has the original Bun mascot (dark bg shows black outline — swap to simple-icons cream for dark mode)",
  },

  // ── Frontend frameworks & libraries ─────────────────────────────────────
  react: {
    light: di("react/react-original.svg"),
    dark:  di("react/react-original.svg"),
    source: "devicon",
    note: "Cyan atom reads well on both modes",
  },

  nextjs: {
    // Next.js is pure black — must invert for dark mode
    light: si("nextdotjs", "000000"),
    dark:  si("nextdotjs", "ffffff"),
    source: "simple-icons",
    note: "Black-only logo; swap black↔white per mode. Devicon nextjs-original is also black.",
  },

  tailwindcss: {
    light: di("tailwindcss/tailwindcss-original.svg"),
    dark:  di("tailwindcss/tailwindcss-original.svg"),
    source: "devicon",
    note: "Cyan gradient works on both modes",
  },

  "shadcn-ui": {
    // Not in devicon — simple-icons is the only option
    light: si("shadcnui", "000000"),
    dark:  si("shadcnui", "ffffff"),
    source: "simple-icons",
    note: "Slug is 'shadcnui' (no hyphen, no slash). Invert per mode.",
  },

  motion: {
    // Motion (formerly Framer Motion) — simple-icons uses the Framer brand icon
    light: si("framer", "0055FF"),
    dark:  si("framer", "ffffff"),
    source: "simple-icons",
    note: "Motion rebranded from Framer Motion. Uses the Framer logo (slug: framer). Blue on light, white on dark.",
  },

  tanstack: {
    // No dedicated TanStack icon — React Query logo is the closest brand asset
    light: si("reactquery", "FF4154"),
    dark:  si("reactquery", "FF4154"),
    source: "simple-icons",
    note: "No standalone TanStack icon exists. Using React Query (slug: reactquery) as the representative brand icon.",
  },

  // ── Backend ──────────────────────────────────────────────────────────────
  express: {
    light: si("express", "000000"),
    dark:  si("express", "ffffff"),
    source: "simple-icons",
    note: "No colour — pure black logotype. devicon/express-original is also black; invert per mode.",
  },

  websocket: {
    // No official WebSocket icon — Socket.IO is the closest widely recognised icon
    light: si("socketdotio", "010101"),
    dark:  si("socketdotio", "ffffff"),
    source: "simple-icons",
    note: "WebSocket has no icon. Best fallback: Socket.IO (slug: socketdotio). Alternatively use a custom SVG.",
  },

  // ── Databases ────────────────────────────────────────────────────────────
  mongodb: {
    light: di("mongodb/mongodb-original.svg"),
    dark:  di("mongodb/mongodb-original.svg"),
    source: "devicon",
    note: "Green leaf logo reads well on both modes",
  },

  postgresql: {
    light: di("postgresql/postgresql-original.svg"),
    dark:  di("postgresql/postgresql-original.svg"),
    source: "devicon",
    note: "Blue elephant works on both modes",
  },

  redis: {
    light: di("redis/redis-original.svg"),
    dark:  di("redis/redis-original.svg"),
    source: "devicon",
    note: "Red cube reads well on both modes",
  },

  prisma: {
    light: di("prisma/prisma-original.svg"),
    dark:  si("prisma", "ffffff"),
    source: "devicon+simple-icons",
    note: "devicon/prisma-original is dark — fine on light bg. Switch to simple-icons white for dark bg.",
  },

  // ── Build tools / monorepo ───────────────────────────────────────────────
  turborepo: {
    light: si("turborepo", "EF4444"),
    dark:  si("turborepo", "ffffff"),
    source: "simple-icons",
    note: "devicon has turborepo-original but it may not be latest. simple-icons red on light, white on dark.",
  },

  // ── Version control / infrastructure ────────────────────────────────────
  git: {
    light: di("git/git-original.svg"),
    dark:  di("git/git-original.svg"),
    source: "devicon",
    note: "Orange logo reads well on both modes",
  },

  docker: {
    light: di("docker/docker-original.svg"),
    dark:  di("docker/docker-original.svg"),
    source: "devicon",
    note: "Blue whale works on both modes",
  },

  // ── AI frameworks ────────────────────────────────────────────────────────
  langchain: {
    // Very dark teal — invisible on dark backgrounds
    light: si("langchain", "1C3C3C"),
    dark:  si("langchain", "ffffff"),
    source: "simple-icons",
    note: "Brand colour (#1C3C3C) is near-black — MUST lighten to white/cream for dark mode.",
  },

  langgraph: {
    light: si("langgraph", "1C3C3C"),
    dark:  si("langgraph", "ffffff"),
    source: "simple-icons",
    note: "Same brand as LangChain. Invert per mode.",
  },
};

// ─── Convenience getter ───────────────────────────────────────────────────────
/**
 * Returns the correct icon URL for the given key + colour mode.
 *
 * @example
 *   <img src={getIconUrl("nextjs", isDark ? "dark" : "light")} />
 */
export function getIconUrl(key: string, mode: IconMode = "light"): string {
  const entry = TECH_STACK_ICONS[key];
  if (!entry) return "";
  return mode === "dark" ? entry.dark : entry.light;
}