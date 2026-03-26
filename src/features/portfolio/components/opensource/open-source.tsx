import { getGitHubPRs } from "../../data/github-prs";
import { OpenSourceList } from "./open-source-list";
import { Suspense } from "react";

export async function OpenSource() {
  const prs = await getGitHubPRs();

  if (!prs || prs.length === 0) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <OpenSourceList prs={prs} />
    </Suspense>
  );
}
