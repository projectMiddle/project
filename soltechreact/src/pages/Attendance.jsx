import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTable from "../components/AttendanceTable";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attList, setAttList] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();

  const empNo = 1001; // 임시
  const fetchAttendance = () => {
    axios
      .get(`/attendance/login/${empNo}`)
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
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4">근무 관리</h2>

      {/* 연도 필터 */}
      <div className="flex items-center gap-2 mt-6">
        <label className="text-gray-700">연도: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border px-3 py-1 rounded w-24"
        />
        <label className="text-gray-700">월: </label>
        <input type="number" value={month} onChange={(e) => setMonth(parseInt(e.target.value))} />
      </div>
      {/* 테이블 */}
      <AttendanceTable attList={attList} />
      <button onClick={fetchAttendance} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
        월별 급여명세서 조회
      </button>
    </div>
  );
};

export default Attendance;
