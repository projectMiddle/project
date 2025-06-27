import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PayListTable from "./PayListTable";
import { getPayList } from "../../api/emppayApi";
import { getEmployee } from "../../api/emppayApi";
import useAuth from "../../hooks/useAuth";

const PayListPage = () => {
  const [payList, setPayList] = useState([]);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const { userInfo } = useAuth();

  const empNo = userInfo?.empNo;

  const fetchPayList = () => {
    getPayList({ empNo, year, month })
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
    <div className="w-full flex flex-col">
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-6 py-[14px]">급여 명세서</div>

      {/* 테이블 */}
      <div className="p-6 flex-1 overflow-auto border border-gray-200 rounded-4xl m-3 h-full shadow">
        <PayListTable payList={payList} year={year} />
        {/* 연도 필터 */}
        <div className="flex items-center gap-2 mt-6 h-auto">
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
            onClick={() => navigate("form", { state: { empNo } })}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 mt-6"
          >
            + 급여명세서 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayListPage;
