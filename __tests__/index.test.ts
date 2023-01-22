import { execSync } from "child_process";

describe("groupBy", () => {
  it("should support exit status for CI pipelines", async () => {
    const output = execSync(' node ./dist/index.js "ls -la"');
    expect(output).toBeDefined();
  });
});
