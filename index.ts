#!/usr/bin/env node

import aggregateCommits from "./src/aggregateCommits";
import { GitRepository } from "./src/gitRepository";
import { listCommits } from "./src/listCommits";
import parseConfig from "./src/parseConfig";
import selectCommitsFromAgg from "./src/selectCommitsFromAgg";
import { AggregatedCommits } from "./src/types/aggregatedCommits.type";
import { Commit } from "./src/types/commit.type";

const config = parseConfig();
const commits = listCommits(config.repo, config.maxCommits);
const aggregatedCommits: AggregatedCommits = aggregateCommits(commits, "day"); // TODO aggregation type
const selectedCommits = selectCommitsFromAgg(aggregatedCommits); // TODO oldest or newest

function spelunkRepository(commits: Commit[]) {
  const gitRepository = new GitRepository();
  const initialCommitHash = gitRepository.getInitialState();
  console.log(`Initial commit hash: ${initialCommitHash}`);

  commits.forEach((commit) => {
    gitRepository.checkoutAndExec(commit.hash, config.command);
  });

  gitRepository.restoreInitialState();
}

spelunkRepository(selectedCommits);
