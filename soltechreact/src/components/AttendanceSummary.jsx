const AttendanceSummary = ({ totalWorkTime }) => {
  return (
    <div className="mt-4 border border-purple-300 rounded-lg p-4 flex justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className="font-semibold">병가</span>
        <span>2/5</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">연차</span>
        <span>5/12</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">총 근무시간</span>
        <span>{totalWorkTime}</span>
      </div>
    </div>
  );
};

export default AttendanceSummary;
