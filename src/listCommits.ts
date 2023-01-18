import gitlog from "gitlog";
import { Commit } from "./types/commit.type";

export function listCommits(repoPath: string, maxCommits: number): Commit[] {
  const options = {
    repo: repoPath,
    number: maxCommits,
    fields: ["hash", "committerDate"],
    execOptions: { maxBuffer: 1000 * 1024 },
  };

  try {
    const commits: Commit[] = gitlog<any>(options).map((commit) => {
      return { date: new Date(commit.committerDate), hash: commit.hash };
    });

    return commits;
  } catch (e: any) {
    console.error(
      `Error: Could not list commits for repo ${repoPath}. Commit count: ${maxCommits} Error: ${e.message}`
    );
    process.exit(1);
  }
}
