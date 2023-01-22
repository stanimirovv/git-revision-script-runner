// Checksout a commit and executes a command
import { execSync } from "child_process";

export default function checkoutAndExec(commitHash: string, command: string) {
  try {
    // Check out the specific commit
    execSync(`git checkout ${commitHash}`);

    // Run a command and capture the output
    const output = execSync(command).toString();

    console.log(output);
  } catch (err: any) {
    console.log(err.stdout.toString());
    console.error(err.stderr.toString());
  }
}
