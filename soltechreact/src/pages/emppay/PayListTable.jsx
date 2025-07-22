import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PayListTable = ({ payList = [], year }) => {
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  // 월별 데이터를 키로 하는 map 생성
  const payMap = {};
  payList.forEach((p) => {
    const [y, m] = p.payMonth.split("-");
    const key = `${y}-${m.padStart(2, "0")}`;
    payMap[key] = p;
  });
  console.log(payList)

  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden h-full">
      <table className="w-full table-auto text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left text-xl">날짜</th>
            <th className="px-4 py-3 text-left text-xl">이름</th>
            <th className="px-4 py-3 text-left text-xl">부서</th>
            <th className="px-4 py-3 text-left text-xl">직급</th>
            <th className="px-4 py-3 text-left text-xl">계좌번호</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
    {months.map((m) => {
      const ymKey = `${year}-${m}`;
      const pay = payMap[ymKey];

      return (
        <tr
          key={ymKey}
          className="hover:bg-purple-50 transition cursor-pointer"
          onClick={() => pay?.payNo && navigate(`detail/${pay.payNo}`)}
        >
          <td className="px-4 py-3 text-black text-[16px] font-semibold">{ymKey}</td>
          <td className="px-4 py-3 text-[16px]">{pay?.eName || "-"}</td>
          <td className="px-4 py-3 text-[16px]">{pay?.departmentName || "-"}</td>
          <td className="px-4 py-3 text-[16px]">{pay?.jobName || "-"}</td>
          <td className="px-4 py-3 text-[16px]">{pay?.accountNumber || "-"}</td>
        </tr>
      );
    })}
  </tbody>
      </table>
    </div>
  );
};

export default PayListTable;
