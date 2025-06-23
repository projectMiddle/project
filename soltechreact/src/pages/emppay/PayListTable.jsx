import React from "react";
import { Link } from "react-router-dom";

const PayListTable = ({ payList }) => {
  console.log("💬 payList 내용:", payList);
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
          {Array.isArray(payList) && payList.length > 0 ? (
            payList.map((pay) => (
              <tr key={pay.payNo} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2 text-blue-600 underline">
                  <Link to={`/byeongsun/detail/${pay.payNo}`}>{pay.payMonth}</Link>
                </td>
                <td className="px-4 py-2">{pay.ename || "-"}</td>
                <td className="px-4 py-2">{pay.departmentName || "-"}</td>
                <td className="px-4 py-2">{pay.jobName || "-"}</td>
                <td className="px-4 py-2">{pay.accountNumber || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-4">
                급여 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayListTable;
