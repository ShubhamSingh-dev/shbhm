import { unstable_cache } from "next/cache";
import { SOURCE_CODE_GITHUB_REPO } from "@/config/site";
import { GitHubStars } from "@/components/common/github-stars";

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json?.stargazers_count) || 0;
    } catch (error) {
      console.error("Error fetching stargazer count:", error);
      return 0;
    }
  },
  ["github-stargazer-count"],
  { revalidate: 86400 } // Cache for 1 day
);

export async function NavItemGitHub() {
  const stargazersCount = await getStargazerCount();

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  );
}