#!/usr/bin/env node

import aggregateCommits from "./src/aggregateCommits";
import { GitRepository } from "./src/gitRepository";
import { listCommits } from "./src/listCommits";
import parseConfig from "./src/parseConfig";
import selectCommitsFromAgg from "./src/selectCommitsFromAgg";
import { AggregatedCommits } from "./src/types/aggregatedCommits.type";

function spelunkRepository() {
  const config = parseConfig();
  const commits = listCommits(config.repo, config.maxCommits);
  const aggregatedCommits: AggregatedCommits = aggregateCommits(commits, "day"); // TODO aggregation type
  const selectedCommits = selectCommitsFromAgg(aggregatedCommits); // TODO oldest or newest

  const gitRepository = new GitRepository();
  gitRepository.getInitialState();

  selectedCommits.forEach((commit) => {
    gitRepository.checkoutAndExec(commit.hash, config.command);
  });

  gitRepository.restoreInitialState();
}

spelunkRepository();
