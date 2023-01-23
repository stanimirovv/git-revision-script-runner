import { AggregatedCommits } from "./types/aggregatedCommits.type";
import { Commit } from "./types/commit.type";

export default function selectCommitsFromAgg(
  commits: AggregatedCommits
): Commit[] {
  const selectedCommits: Commit[] = [];
  const sortedAggregations = Object.keys(commits);

  sortedAggregations.forEach((aggregation) => {
    const firstCommit = commits[aggregation][0];
    selectedCommits.push(firstCommit);
  });

  return selectedCommits.sort((a, b) => a.date.getTime() - b.date.getTime());
}
