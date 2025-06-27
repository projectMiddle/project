import React, { useEffect, useState } from "react";
import { getEmployeesByDepartment } from "../../api/departmentApi";
import { useParams } from "react-router-dom";
import { MessageSquare, User } from "lucide-react";

const DepartmentDetailList = () => {
  const { deptNo } = useParams(); // /department/:deptNo 형식일 때
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (deptNo) {
      getEmployeesByDepartment(deptNo)
        .then((data) => {
          // 직급별 정렬 적용
          const rankPriority = {
            본부장: 1,
            부장: 2,
            과장: 3,
            대리: 4,
            주임: 5,
            사원: 6,
          };

          const sortedData = data.sort((a, b) => {
            return (
              (rankPriority[a.jobName] || 999) -
              (rankPriority[b.jobName] || 999)
            );
          });

          setEmployees([...sortedData]);
        })
        .catch((err) => {
          console.error("부서 사원 불러오기 실패:", err);
        });
    }
  }, [deptNo]);

  return (
    <div>
      <div className="bg-[#6b46c1]">
        <h1 className="ml-10 text-white font-bold text-[20px] text-left py-[14px]">
          부서별 사원
        </h1>
      </div>
      <div className="p-7 bg-white m-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp.empNo}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div className="p-2 bg-white rounded-xl ">
                <h2 className="text-xl font-semibold p-2 pl-4">{emp.eName}</h2>
              </div>
              <div className="bg-purple-50/95 mt-2.5 p-3 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">사원 : {emp.empNo}</p>
                <p className="text-sm text-gray-600 mb-1">{emp.eEmail}</p>
                <p className="text-sm text-gray-600 mb-1">{emp.eMobile}</p>
                <p className="text-sm text-gray-500">직급 : {emp.jobName}</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                    <MessageSquare size={16} /> 채팅
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-purple-400 text-white rounded hover:bg-purple-500 text-sm">
                    <User size={16} /> 프로필
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailList;
