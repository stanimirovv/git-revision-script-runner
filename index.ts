#!/usr/bin/env node

import { listCommits } from "./src/listCommits";

const commits = listCommits("./");
commits.forEach((commit) => {
  console.log(commit.date.getMonth() + 1, commit.date.getDate());
});

console.log("Hello, world!");
