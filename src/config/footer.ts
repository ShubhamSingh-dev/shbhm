import { Github, Twitter, Linkedin, Mail, Rss } from "lucide-react";
import { GITHUB_USERNAME, X_USERNAME } from "@/config/site";

export type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, icon: Github },
  { name: "Twitter", href: `https://x.com/${X_USERNAME}`, icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/in/shubhamsingh-dev", icon: Linkedin },
  { name: "Email", href: "mailto:hi@shbhm.com", icon: Mail },
  { name: "RSS", href: "/blog/feed.xml", icon: Rss },
];

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work-experience" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "/resume" },
];