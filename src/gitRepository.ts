// Checksout a commit and executes a command
import { execSync } from "child_process";

export class GitRepository {
  private initialBranch = "";

  public checkoutAndExec(commitHash: string, command: string): string {
    try {
      // Check out the specific commit
      execSync(`git checkout --quiet ${commitHash}`);

      // Run a command and capture the output
      const output = execSync(command).toString();

      console.log(output); // TODO handle this output somehow
      return output.trim();
    } catch (err: any) {
      console.error(err.stderr.toString());
      process.exit(1);
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
      process.exit(1);
    }
  }

  public restoreInitialState() {
    try {
      execSync(`git checkout ${this.initialBranch}`);
    } catch (err: any) {
      console.error(err.stderr.toString());
      process.exit(1);
    }
  }
}
