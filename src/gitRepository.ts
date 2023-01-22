// Checksout a commit and executes a command
import { execSync } from "child_process";

export class GitRepository {
  private initialBranch = "";

  public checkoutAndExec(commitHash: string, command: string) {
    try {
      // Check out the specific commit
      execSync(`git checkout --quiet ${commitHash}`);

      // Run a command and capture the output
      const output = execSync(command).toString();

      console.error(`hash: ${commitHash} output: ${output.trim()}`);
      console.log(output); // TODO handle this output somehow
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public getInitialState() {
    try {
      if (this.initialBranch === "") {
        this.initialBranch = execSync("git rev-parse --abbrev-ref HEAD")
          .toString()
          .trim();
      }
      return this.initialBranch;
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }

  public restoreInitialState() {
    try {
      console.log(`Restoring commit hash: ${this.initialBranch}`);
      execSync(`git checkout ${this.initialBranch}`);
    } catch (err: any) {
      console.error(err.stderr.toString());
    }
  }
}
