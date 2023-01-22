import aggregateCommits from "../src/aggregateCommits";
import { Commit } from "../src/types/commit.type";

describe("groupBy", () => {
  let data: Commit[];
  beforeEach(() => {
    data = [
      { hash: "one", date: new Date("2022-01-01") },
      { hash: "two", date: new Date("2022-01-01") },
      { hash: "three", date: new Date("2022-02-01") },
      { hash: "four", date: new Date("2022-02-02") },
      { hash: "five", date: new Date("2023-03-01") },
    ];
  });

  it("aggregates correctly for date", () => {
    const result = aggregateCommits(data, "day");
    expect(result).toEqual({
      "2022-01-1": [
        { hash: "one", date: new Date("2022-01-01") },
        { hash: "two", date: new Date("2022-01-01") },
      ],
      "2022-02-1": [{ hash: "three", date: new Date("2022-02-01") }],
      "2022-02-2": [{ hash: "four", date: new Date("2022-02-02") }],
      "2023-03-1": [{ hash: "five", date: new Date("2023-03-01") }],
    });
  });

  it("aggregates correctly for month", () => {
    const result = aggregateCommits(data, "month");
    expect(result).toEqual({
      "2022-01": [
        { hash: "one", date: new Date("2022-01-01") },
        { hash: "two", date: new Date("2022-01-01") },
      ],
      "2022-02": [
        { hash: "three", date: new Date("2022-02-01") },
        { hash: "four", date: new Date("2022-02-02") },
      ],
      "2023-03": [{ hash: "five", date: new Date("2023-03-01") }],
    });
  });

  it("aggregates correctly for year", () => {
    const result = aggregateCommits(data, "year");
    expect(result).toEqual({
      "2022": [
        { hash: "one", date: new Date("2022-01-01") },
        { hash: "two", date: new Date("2022-01-01") },
        { hash: "three", date: new Date("2022-02-01") },
        { hash: "four", date: new Date("2022-02-02") },
      ],
      "2023": [{ hash: "five", date: new Date("2023-03-01") }],
    });
  });
});
