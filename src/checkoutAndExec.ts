// Checksout a commit and executes a command
import { execSync } from "child_process";

// TODO TODO
const commitHash = "abc123"; // The commit hash to check out

try {
  // Check out the specific commit
  execSync(`git checkout ${commitHash}`);

  // Run a command and capture the output
  const output = execSync("ls -la").toString();

  console.log(output);
} catch (err: any) {
  console.log(err.stdout.toString());
  console.error(err.stderr.toString());
}
