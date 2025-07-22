import {parseTime} from "@internationalized/date";

export const workTime = (startTime, endTime) => {
  if (!startTime || !endTime) return "-";

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
export const overTime = (startTime, endTime) => {
  if (!startTime || !endTime) return "-";

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


// 시간 => 분 
const getMinutesBetween = (start, end) => {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return (eh * 60 + em) - (sh * 60 + sm);
};

export const totalWorkTime = (attList) => {
  let totalMinutes = 0;

  attList.forEach((att) => {
    if (!att.attStartTime || !att.attEndTime) return;

    const start = att.attStartTime;
    const end = att.attEndTime;
    const diffMinutes = getMinutesBetween(start, end);
    totalMinutes += diffMinutes;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}시간 ${minutes}분`;
};
