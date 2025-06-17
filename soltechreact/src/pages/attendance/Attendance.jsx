import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTable from "./AttendanceTable";
import AttendanceSummary from "./AttendanceSummary";
import { useNavigate } from "react-router-dom";
import { totalWorkTime } from "../../utils/timeUtils";

const Attendance = () => {
  const [attList, setAttList] = useState([]); // 서버에서 받아 올 데이터
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();

  const empNo = 1049; // 임시 사번

  const fetchAttendance = () => {
    axios
      .get(`/attendance/list/${empNo}?year=${year}&month=${month}`)
      .then((res) => {
        console.log("출근 작성👉", res.data);
        setAttList(res.data);
      })
      .catch((err) => {
        console.error("❌", err);
      });
  };

  useEffect(() => {
    fetchAttendance();
  }, [year, month]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4">근무 관리</h2>

      <div className="flex items-center justify-between mt-6 flex-wrap gap-6 text-sm text-gray-700">
        {/* 연도/월 입력 영역  */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700">연도: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border px-3 py-1 rounded w-24"
          />
          <label className="text-gray-700">월: </label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="border px-3 py-1 rounded w-24"
            min="1"
            max="12"
          />
        </div>

        {/* 사원 정보 영역 */}
        <div className={`flex items-center gap-6 ${!attList[0] ? "hidden" : ""}`}>
          <div className="flex items-center gap-1">
            <span className="font-semibold">사원번호 :</span>
            <span>{attList[0]?.empNo}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">사원명 :</span>
            <span>{attList[0]?.ename}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">부서명 :</span>
            <span>{attList[0]?.deptName}</span>
          </div>
        </div>
      </div>
      {/* 근무 테이블 */}
      <AttendanceTable attList={attList} />

      {/* 근무 요약 */}
      <AttendanceSummary totalWorkTime={totalWorkTime(attList)} />
    </div>
  );
};

export default Attendance;
