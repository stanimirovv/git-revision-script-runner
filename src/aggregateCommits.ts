import { AggregatedCommits } from "./types/aggregatedCommits.type";
import { Commit } from "./types/commit.type";

export default function aggregateCommits(
  data: Commit[],
  aggregation: string
): AggregatedCommits {
  const groupedData: { [key: string]: Commit[] } = {};

  data.forEach((item) => {
    let key: string;

    switch (aggregation) {
      case "year":
        key = item.date.getFullYear().toString();
        break;
      case "month":
        key = `${item.date.getFullYear()}-${(item.date.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        break;
      case "day":
        key = `${item.date.getFullYear()}-${(item.date.getUTCMonth() + 1)
          .toString()
          .padStart(2, "0")}-${item.date.getDate()}`;
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
