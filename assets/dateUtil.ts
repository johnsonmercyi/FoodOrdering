import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getTimeAgo(timestamp: string) {
  return dayjs(timestamp).fromNow();
}

