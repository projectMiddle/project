import React, { useEffect, useState } from "react";
import { getDepartments } from "../../api/departmentApi";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ 추가

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments()
      .then((res) => {
        console.log("부서 목록:", res);
        setDepartments(res);
      })
      .catch((err) => {
        console.error("부서 정보 조회 실패:", err);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-[#6b46c1]">
        <h1 className="ml-10 text-white font-bold text-[20px] text-left py-[14px]">
          부서 정보
        </h1>
      </div>

      <div className="m-6 p-8 bg-white min-h-screen rounded-3xl border-1 border-gray-200 shadow-2xl">
        <div className="grid grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.deptNo}
              to={`${dept.deptNo}`}
              className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-md transition block"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full mr-5 ml-3">
                  <Building2 className="text-purple-600 w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {dept.deptName}
                  </h2>
                  <p className="text-sm mt-2 text-gray-500">
                    부서번호: {dept.deptNo}
                  </p>
                  <p className="text-sm mt-1 text-gray-500">
                    ☎ {dept.deptPhone}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
