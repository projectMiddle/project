import React from "react";
import { Link } from "react-router-dom";

const PayListTable = ({ payList }) => {
  const year = new Date().getFullYear(); // 혹은 props.year로 받아도 됨
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));

  // 월별 데이터를 키로 하는 map 생성
  const payMap = {};
  payList.forEach((p) => {
    const [y, m] = p.payMonth.split("-");
    const key = `${y}-${m.padStart(2, "0")}`;
    payMap[key] = p;
  });

  return (
    <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <table className="table-auto w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4">날짜</th>
            <th className="py-2 px-4">이름</th>
            <th className="py-2 px-4">부서</th>
            <th className="py-2 px-4">직급</th>
            <th className="py-2 px-4">계좌번호</th>
          </tr>
        </thead>
        <tbody>
          {months.map((m) => {
            const ymKey = `${year}-${m}`;
            const pay = payMap[ymKey];

            return (
              <tr key={ymKey} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2 text-blue-600 underline">
                  {pay?.payNo ? <Link to={`/byeongsun/detail/${pay.payNo}`}>{ymKey}</Link> : ymKey}
                </td>
                <td className="px-4 py-2">{pay?.ename || "작성되지 않음"}</td>
                <td className="px-4 py-2">{pay?.departmentName || "-"}</td>
                <td className="px-4 py-2">{pay?.jobName || "-"}</td>
                <td className="px-4 py-2">{pay?.accountNumber || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PayListTable;
