import selectCommitsFromAgg from "../src/selectCommitsFromAgg";
import { AggregatedCommits } from "../src/types/aggregatedCommits.type";

describe("groupBy", () => {
  let data: AggregatedCommits;
  beforeEach(() => {
    data = {
      "2023-01-22": [
        {
          date: new Date("2023-01-22T09:08:28.000Z"),
          hash: "ba2c9be5c03876e074dbb49d90dd91758fd41119",
        },
      ],
      "2023-01-18": [
        {
          date: new Date("2023-01-18T08:21:16.000Z"),
          hash: "c771ce9036fd5ee7e2a2bc3477724d8e81d66bbf",
        },
        {
          date: new Date("2023-01-18T08:20:55.000Z"),
          hash: "aad5fffd06d9ed2d7fbe8dd740c84f129642e6c9",
        },
        {
          date: new Date("2023-01-18T08:17:26.000Z"),
          hash: "0255309ab9cf8a75c89c622183565aecd6b740a2",
        },
      ],
      "2023-01-17": [
        {
          date: new Date("2023-01-17T07:59:12.000Z"),
          hash: "8661f6fff4b743d8d9603690b796e278c463b3b6",
        },
      ],
      "2023-01-16": [
        {
          date: new Date("2023-01-16T13:02:23.000Z"),
          hash: "7237c53d04306944ac7f70957f961216df3f5446",
        },
      ],
    };
  });

  it("aggregates correctly for year", () => {
    const result = selectCommitsFromAgg(data);
    expect(result).toEqual([
      {
        date: new Date("2023-01-16T13:02:23.000Z"),
        hash: "7237c53d04306944ac7f70957f961216df3f5446",
      },
      {
        date: new Date("2023-01-17T07:59:12.000Z"),
        hash: "8661f6fff4b743d8d9603690b796e278c463b3b6",
      },
      {
        date: new Date("2023-01-18T08:21:16.000Z"),
        hash: "c771ce9036fd5ee7e2a2bc3477724d8e81d66bbf",
      },
      {
        date: new Date("2023-01-22T09:08:28.000Z"),
        hash: "ba2c9be5c03876e074dbb49d90dd91758fd41119",
      },
    ]);
  });
});
