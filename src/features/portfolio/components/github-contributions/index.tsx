import { Suspense } from "react";
import { GithubContributionsFallback, GithubContributionsGraph } from "./graph";
import { getGitHubContributions } from "../../data/github-contributions";
import { Panel } from "../panel";

export function GithubContributions() {
  const contributions = getGitHubContributions();
  return (
    <Panel>
      <h2 className="sr-only">Github Contributions</h2>

      <Suspense fallback={<GithubContributionsFallback />}>
        <GithubContributionsGraph contributions={contributions} />
      </Suspense>
    </Panel>
  );
}
