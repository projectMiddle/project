import { parseTime } from "./../../node_modules/@internationalized/date/src/string";

const workTime = (startTime, endTime) => {
  if (!startTime || endTime) return "-";

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const startDate = new Date(0, 0, 0, start.hour, start.minute, start.second);
  const endDate = new Date(0, 0, 0, end.hour, end.minute, end.second);

  const diffMs = endDate - startDate;
  const overMinutes = Math.floor(diffMs / 60000) - 8 * 60;

  if (overMinutes <= 0) return "-";

  const hours = Math.floor(overMinutes / 60);
  const minutes = overMinutes % 60;

  return `${hours} : ${minutes}`;
};
