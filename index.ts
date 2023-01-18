#!/usr/bin/env node

import aggregateCommits from "./src/aggregateCommits";
import { listCommits } from "./src/listCommits";
import parseConfig from "./src/parseConfig";
import selectCommitsFromAgg from "./src/selectCommitsFromAgg";
import { AggregatedCommits } from "./src/types/aggregatedCommits.type";

const config = parseConfig();
const commits = listCommits(config.repo, config.maxCommits);
const aggregatedCommits: AggregatedCommits = aggregateCommits(commits, "day"); // TODO aggregation type
const selectedCommits = selectCommitsFromAgg(aggregatedCommits);

console.log("Selected commits:", selectedCommits);
commits.forEach((commit) => {
  console.log(commit.date.getMonth() + 1, commit.date.getDate());
});

console.log("Hello, world!");
