import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/kibo-ui/contribution-graph";
import { GITHUB_USERNAME } from "@/config/site";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async (): Promise<Activity[]> => {
    const url = `${process.env.GITHUB_CONTRIBUTIONS_API_URL}/v4/${GITHUB_USERNAME}?y=last`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        console.error(`GitHub contributions API error: ${res.status}`);
        return [];
      }

      const data = (await res.json()) as GitHubContributionsResponse;
      return data.contributions ?? [];
    } catch (error) {
      console.error("Failed to fetch GitHub contributions:", error);
      return [];
    }
  },
  ["github-contributions"],
  { revalidate: 86400 }
);