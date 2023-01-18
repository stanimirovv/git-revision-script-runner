import { Commit } from "./commit.type";

export type AggregatedCommits = {
  [key: string]: Commit[];
};
