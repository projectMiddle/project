import React, { useState, useEffect } from "react";
import axios from "axios";
import PayListTable from "../components/PayListTable";
import { useNavigate } from "react-router-dom";

const PayListPage = () => {
  const [payList, setPayList] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();

  const fetchPayList = () => {
    axios
      .post("/pay/list", {
        params: {
          empNo: 1,
          year,
          month,
        },
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })
      .then((res) => {
        console.log("급여 리스트 응답 👉", res.data);
        setPayList(res.data);
      })
      .catch((err) => {
        console.error("급여 리스트 에러 ❌", err);
      });
  };
  useEffect(() => {
    fetchPayList();
  }, [year, month]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4">급여 명세서</h2>

      {/* 테이블 */}
      <PayListTable payList={payList} />

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
        <button onClick={fetchPayList} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          월별 급여명세서 조회
        </button>
      </div>
    </div>
  );
};

export default PayListPage;
