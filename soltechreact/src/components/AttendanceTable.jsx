import React from "react";
import { Link } from "react-router-dom";

const AttendanceTable = ({ attList }) => {
  return (
    <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
      <table className="table-auto w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4">사원번호</th>
            <th className="py-2 px-4">사원명</th>
            <th className="py-2 px-4">근무일자</th>
            <th className="py-2 px-4">출근시간</th>
            <th className="py-2 px-4">퇴근시간</th>
            <th className="py-2 px-4">근무시간</th>
            <th className="py-2 px-4">초과근무시간</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(attList) && attList.length > 0 ? (
            attList.map((att) => (
              <tr key={att.attNo} className="hover:bg-gray-50 border-t">
                <td className="px-4 py-2 text-blue-600 underline">{att.empNo}</td>
                <td className="px-4 py-2">{att.eName}</td>
                <td className="px-4 py-2">{att.attWorkDate}</td>
                <td className="px-4 py-2">{att.attStartTime}</td>
                <td className="px-4 py-2">{att.attEndTime}</td>
                <td className="px-4 py-2">{att.workTime}</td>
                <td className="px-4 py-2">{att.overTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-4">
                근무 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
