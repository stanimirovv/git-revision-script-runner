import { execSync } from "child_process";

describe("groupBy", () => {
  it("should support day aggregation", async () => {
    const output = execSync(
      'AGG=day node ./dist/index.js "git ls-files | wc -l"'
    );
    const outputObject = JSON.parse(output.toString());
    expect(outputObject).toBeDefined();
    console.log("outputObject", outputObject);
    expect(parseInt(outputObject[0].output)).toEqual(8);
    expect(outputObject[0].commit).toEqual(
      "7237c53d04306944ac7f70957f961216df3f5446"
    );
    expect(parseInt(outputObject[1].output)).toEqual(16);
    expect(outputObject[1].commit).toEqual(
      "8661f6fff4b743d8d9603690b796e278c463b3b6"
    );
    expect(outputObject).toBeDefined();
  });

  it("should support day aggregation and chunked commands", async () => {
    const output = execSync(
      'AGG=day node ./dist/index.js "git ls-files |" wc -l'
    );
    const outputObject = JSON.parse(output.toString());
    expect(outputObject).toBeDefined();
    // expect(parseInt(outputObject[0].output)).toEqual(8);
    console.log("outputObject2", outputObject);
    expect(outputObject[0].commit).toEqual(
      "7237c53d04306944ac7f70957f961216df3f5446"
    );
    expect(parseInt(outputObject[1].output)).toEqual(16);
    expect(outputObject[1].commit).toEqual(
      "8661f6fff4b743d8d9603690b796e278c463b3b6"
    );
    expect(outputObject).toBeDefined();
  });

  it("should support month aggregation and repo", async () => {
    const output = execSync(
      'AGG=month REPO=./ node ./dist/index.js "git ls-files | wc -l"'
    );
    const outputObject = JSON.parse(output.toString());
    expect(outputObject).toBeDefined();
    expect(parseInt(outputObject[0].output) > 15).toBeTruthy();
  });
});
