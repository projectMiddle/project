import { parseTime } from "./../../node_modules/@internationalized/date/src/string";

const workTime = (startTime, endTime) => {
  if (!startTime || endTime) return "-";

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const startDate = new Date(0, 0, 0, start.hour, start.minute, start.second);
  const endDate = new Date(0, 0, 0, end.hour, end.minute, end.second);

  const diffMs = endDate - startDate;
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} : ${minutes}`;
};
