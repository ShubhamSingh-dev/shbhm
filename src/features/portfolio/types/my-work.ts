export type MyWorkIcon =
  /** Icon key used to render the project category in the UI. */
  "code" | "design" | "blockchain" | "ai" | "backend" | "fullstack"

export type MyWorkDetail = {
  id: string
  /** Short label for this detail group, e.g. "Highlights" or "What I built" */
  title: string
  /** Lucide icon key for the detail row */
  icon?: MyWorkIcon
  /**
   * Bullet-point description (markdown-style with "- " prefixes)
   * or a plain multi-line string.
   */
  description: string
  /** Tech tags displayed below the description */
  skills?: string[]
  /** Whether this detail is expanded by default */
  isExpanded?: boolean
}

export type MyWork = {
  id: string
  /** Display name of the project */
  name: string
  /** One-liner tagline shown in the trigger row */
  tagline: string
  /** Icon for the project-level badge */
  icon?: MyWorkIcon
  /** Link to the GitHub repo */
  githubUrl?: string
  /** Link to a live demo / website */
  websiteUrl?: string
  /** Sub-items (detail groups), keeps newest first */
  details: MyWorkDetail[]
  /** Highlights the project with an "active/featured" indicator */
  isFeatured?: boolean
}
