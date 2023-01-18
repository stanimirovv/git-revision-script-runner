import { Config } from "./types/config.type";

export default function parseConfig(): Config {
  const command = process.argv[2];
  const repo = process.env.COMMAND || "./";
  const maxCommitsStr = process.env.MAX_COMMITS || "10";
  const maxCommits = parseInt(maxCommitsStr);

  if (!command) {
    console.error("No command provided");
    process.exit(1);
  }

  const config: Config = {
    repo,
    command,
    maxCommits,
  };
  return config;
}
