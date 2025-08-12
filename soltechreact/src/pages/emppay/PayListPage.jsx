import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PayListTable from "./PayListTable";
import { getPayList, getEmployee } from "../../api/emppayApi";
import useAuth from "../../hooks/useAuth";

const PayListPage = () => {
  const [payList, setPayList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const { userInfo } = useAuth();
  const { empNo: empNoFromParam } = useParams();

  const isHR = Number(userInfo?.deptNo) === 201;
  const empNo = empNoFromParam ?? userInfo?.empNo;

  // empNo 바뀔 때 잔상 제거
  useEffect(() => {
    setPayList([]);
    setEmployee(null);
  }, [empNo]);

  // 연간 급여 리스트
  useEffect(() => {
    if (!empNo) return;
    getPayList({ empNo, year })
      .then((res) => setPayList(res.data))
      .catch((err) => console.error("급여 리스트 조회 실패", err));
  }, [empNo, year]);

  // 사원 정보
  useEffect(() => {
    if (!empNo) return;
    getEmployee(empNo)
      .then((res) => setEmployee(res.data))
      .catch(console.error);
  }, [empNo]);

  // HR만 수정 가능
  const handleEdit = (pay) => {
    navigate("/intrasoltech/emppay/form", {
      state: { mode: "edit", payNo: pay.payNo, empNo },
    });
  };

  if (!employee) return <div>사원정보 로딩중…</div>;

  return (
    <div className="w-full flex flex-col">
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-6 py-[14px]">급여 명세서</div>

      {/* 테이블 */}
      <div className="p-6 flex-1 overflow-auto border border-gray-200 rounded-4xl m-3 h-full shadow">
        {/* 디자인 변경 없음 */}
        <PayListTable payList={payList} year={year} isHR={isHR} onEdit={handleEdit} />

        {/* 연도 필터 */}
        <div className="flex items-center gap-2 mt-6 h-auto">
          <label className="text-gray-700">연도: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border px-3 py-1 rounded w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default PayListPage;
