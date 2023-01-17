import { Commit } from "./types/commit.type";

export default function aggregateCommits(
  data: Commit[],
  aggregation: AggregationType
): { [key: string]: Commit[] } {
  const groupedData: { [key: string]: Commit[] } = {};

  data.forEach((item) => {
    let key: string;

    switch (aggregation) {
      case "year":
        key = item.date.getFullYear().toString();
        break;
      case "month":
        key = `${item.date.getFullYear()}-${item.date.toLocaleString(
          "default",
          { month: "long" }
        )}`;
        break;
      case "day":
        key = `${item.date.getFullYear()}-${item.date.toLocaleString(
          "default",
          { month: "long" }
        )}-${item.date.getDate()}`;
        break;
      default:
        throw new Error(`Invalid aggregation type: ${aggregation}`);
    }

    if (!groupedData[key]) {
      groupedData[key] = [];
    }

    groupedData[key].push(item);
  });

  return groupedData;
}
