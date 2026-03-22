"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/kibo-ui/contribution-graph";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { GITHUB_USERNAME, UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";
import { format } from "date-fns";
import { LoaderIcon } from "lucide-react";

export function GithubContributionsGraph({
  contributions,
}: {
  contributions: Activity[];
}) {
  return (
    <ContributionGraph
      className="mx-auto py-2"
      data={contributions}
      blockSize={11}
      blockMargin={3}
      blockRadius={2}
    >
      <ContributionGraphCalendar className="no-scrollbar px-2">
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <ContributionGraphBlock
                activity={activity}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
              />
            </TooltipTrigger>

            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution
                {activity.count !== 1 ? "s" : ""} on{" "}
                {format(new Date(activity.date), "dd MMM yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-2">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <a
                className="font-medium underline underline-offset-4"
                href={addQueryParams(
                  `https://github.com/${GITHUB_USERNAME}`,
                  UTM_PARAMS,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GithubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}
