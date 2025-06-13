import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendanceTable from "../components/AttendanceTable";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attList, setAttList] = useState([]); // 서버에서 받아 올거
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();

  const empNo = 1049; // 임시
  const fetchAttendance = () => {
    axios
      .post(`/attendance/login/${empNo}`)
      .then((res) => {
        console.log("출근 작성👉", res.data);
        setAttList([res.data]); // 단일 dto -> 배열ㄹ
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
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="border px-3 py-1 rounded w-24"
        />
      </div>
      {/* 테이블 */}
      <AttendanceTable attList={attList} />
    </div>
  );
};

export default Attendance;
