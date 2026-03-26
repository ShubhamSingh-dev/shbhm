import { unstable_cache } from "next/cache";
import { GITHUB_USERNAME } from "@/config/site";

export interface GitHubPR {
  id: number;
  repo_name: string;
  repo_url: string;
  title: string;
  body: string | null;
  url: string;
  state: string;
  created_at: string;
  merged_at: string | null;
}

export const getGitHubPRs = unstable_cache(
  async (): Promise<GitHubPR[]> => {
    const token = process.env.GITHUB_API_TOKEN;
    const query = `author:${GITHUB_USERNAME}+type:pr+-user:${GITHUB_USERNAME}`;
    const url = `https://api.github.com/search/issues?q=${query}&sort=created&order=desc&per_page=3`;

    try {
      const res = await fetch(url, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!res.ok) {
        console.error(`GitHub PRs search API error: ${res.status}`);
        return [];
      }

      const data = await res.json();
      const items = data.items || [];

      return items.map((item: any) => {
        // Extract repo name from repository_url: "https://api.github.com/repos/org/repo"
        const repoName = item.repository_url.split("/").slice(-2).join("/");

        return {
          id: item.id,
          repo_name: repoName,
          repo_url: `https://github.com/${repoName}`,
          title: item.title,
          body: item.body,
          url: item.html_url,
          state: item.state,
          created_at: item.created_at,
          merged_at: item.pull_request?.merged_at || null,
        } as GitHubPR;
      });
    } catch (error) {
      console.error("Failed to fetch GitHub PRs:", error);
      return [];
    }
  },
  ["github-prs"],
  { revalidate: 3600 } // Cache for 1 hour
);
