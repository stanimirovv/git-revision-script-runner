import { execSync } from "child_process";

describe("groupBy", () => {
  it("123should support exit status for CI pipelines", async () => {
    const output = execSync(
      'AGG=day node ./dist/index.js "git ls-files | wc -l"'
    );
    console.log(output.toString());
    expect(output).toBeDefined();
  });
});
