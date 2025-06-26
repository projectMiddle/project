import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PayListTable from "./PayListTable";
import { getPayList } from "../../api/emppayApi";
import { getEmployee } from "../../api/emppayApi";

const PayListPage = () => {
  const [payList, setPayList] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const fetchPayList = () => {
    getPayList({ empNo: 1021, year, month })
      .then((res) => {
        setPayList(res.data);
      })
      .catch((err) => {
        console.error("급여 리스트 조회 실패", err);
      });
  };
  useEffect(() => {
    fetchPayList();
  }, [year, month]);

  useEffect(() => {
    // 로그인한 사원번호가 1021
    getEmployee(1021)
      .then((res) => setEmployee(res.data))
      .catch(console.error);
  }, []);
  if (!employee) return <div>사원정보 로딩중…</div>;
  return (
    <div className="mx-auto px-4 w-full">
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
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => navigate("form", { state: { empNo: 1021 } })}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-6"
        >
          + 급여명세서 작성
        </button>
      </div>
    </div>
  );
};

export default PayListPage;
