import React from "react";
import { Link } from "react-router-dom";
import { workTime, overTime } from "../../utils/timeUtils";

const AttendanceTable = ({ attList }) => {
  return (
    <div className="border border-purple-300 rounded-md shadow-sm overflow-hidden">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="table-auto w-full text-sm text-center">
          <thead className="bg-purple-300 text-gray-700 sticky top-0 z-10">
            <tr>
              {/* <th className="py-2 px-4">사원번호</th>
              <th className="py-2 px-4">사원명</th>
              <th className="py-2 px-4">부서명</th> */}
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
                <tr key={att.attNo} className="hover:bg-gray-50 border-purple-300 ">
                  {/* <td className="px-4 py-2 text-purple-600 underline">{att.empNo}</td>
                  <td className="px-4 py-2">{att.ename}</td>
                  <td className="px-4 py-2">{att.deptName}</td> */}
                  <td className="px-4 py-2">{att.attWorkDate}</td>
                  <td className="px-4 py-2">{att.attStartTime}</td>
                  <td className="px-4 py-2">{att.attEndTime}</td>
                  <td className="px-4 py-2">{workTime(att.attStartTime, att.attEndTime)}</td>
                  <td className="px-4 py-2">{overTime(att.attStartTime, att.attEndTime)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-4">
                  근무 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
