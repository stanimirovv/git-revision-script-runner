import gitlog from "gitlog";
import { Commit } from "./types/commit.type";

export function listCommits(path: string): Commit[] {
  const options = {
    repo: path,
    number: 20,
    fields: ["hash", "committerDate"],
    execOptions: { maxBuffer: 1000 * 1024 },
  };

  //TODO error handling
  const commits: Commit[] = gitlog<any>(options).map((commit) => {
    return { date: new Date(commit.committerDate), hash: commit.hash };
  });
  return commits;
}
