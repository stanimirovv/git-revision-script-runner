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
  const aggregatedCommits: AggregatedCommits = aggregateCommits(
    commits,
    config.aggregation
  );
  const selectedCommits = selectCommitsFromAgg(aggregatedCommits);

  // Switch to the repo directory
  const dirBefore = process.cwd();
  process.chdir(config.repo);

  const gitRepository = new GitRepository();
  gitRepository.getInitialState();

  const reports: Report[] = [];
  selectedCommits.forEach((commit) => {
    const commandOutput = gitRepository.checkoutAndExec(
      commit.hash,
      config.command
    );
    console.error(`[${commit.date} ${commit.hash}]: ${commandOutput}`);
    reports.push({
      date: commit.date.toDateString(),
      commit: commit.hash,
      output: commandOutput,
    });
  });

  console.log(JSON.stringify(reports));
  gitRepository.restoreInitialState();
  process.chdir(dirBefore);
}

spelunkRepository();

type Report = {
  date: string;
  commit: string;
  output: string;
};
