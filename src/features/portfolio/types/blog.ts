export type BlogSource = "Medium" | "Dev.to" | "General / Dev Community Insights" | string

export type Blog = {
  id: string
  /** Full article title */
  title: string
  /** Broad category label, e.g. "Agentic AI / Developer Tools" */
  category: string
  /** Publishing platform, e.g. "Medium" or "Dev.to" */
  source: BlogSource
  /** Original author of the article */
  author: string
  /** External URL to the article */
  link: string
  /** Approximate reading time, e.g. "10 min" */
  readTime: string
  /** One-paragraph summary of the article */
  summary: string
  /** 3–5 bullet-point takeaways */
  keyInsights: string[]
}
