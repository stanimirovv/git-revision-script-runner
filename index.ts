#!/usr/bin/env node

import aggregateCommits from "./src/aggregateCommits";
import checkoutAndExec from "./src/checkoutAndExec";
import { listCommits } from "./src/listCommits";
import parseConfig from "./src/parseConfig";
import selectCommitsFromAgg from "./src/selectCommitsFromAgg";
import { AggregatedCommits } from "./src/types/aggregatedCommits.type";

const config = parseConfig();
const commits = listCommits(config.repo, config.maxCommits);
const aggregatedCommits: AggregatedCommits = aggregateCommits(commits, "day"); // TODO aggregation type
const selectedCommits = selectCommitsFromAgg(aggregatedCommits); // TODO oldest or newest

console.log("Aggregated commits:", aggregatedCommits);
console.log("Selected commits:", selectedCommits);
commits.forEach((commit) => {
  checkoutAndExec(commit.hash, config.command);
});
