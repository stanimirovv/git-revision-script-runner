// Checksout a commit and executes a command
import { execSync } from "child_process";

export class GitRepository {
  private initialCommitHash = "";

  public checkoutAndExec(commitHash: string, command: string) {
    try {
      // Check out the specific commit
      execSync(`git checkout --quiet ${commitHash}`);

      // Run a command and capture the output
      const output = execSync(command).toString();

      console.log(output); // TODO handle this output somehow
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public getInitialCommitHash() {
    try {
      if (this.initialCommitHash === "") {
        this.initialCommitHash = execSync("git rev-parse HEAD")
          .toString()
          .trim();
      }
      return this.initialCommitHash;
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public restoreInitialCommit() {
    try {
      console.log(`Restoring commit hash: ${this.initialCommitHash}`);
      execSync(`git checkout ${this.initialCommitHash}`);
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }
}
