export type Config = {
  repo: string;
  command: string;
  maxCommits: number;
  aggregation: "day" | "month" | "year";
};
