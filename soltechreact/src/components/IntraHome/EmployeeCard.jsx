import React from "react";
import { Mail, Phone } from "lucide-react";
import { VscAccount } from "react-icons/vsc"; // 👈 아이콘 추가

const EmployeeCard = ({ employee }) => {
  return (
    <div className="border rounded-lg p-3 shadow-sm flex gap-3 items-start text-sm">
      {/* 기본 프로필 아이콘 */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <VscAccount size={28} />
      </div>

      {/* 사원 정보 */}
      <div className="flex-1">
        <p className="font-semibold text-base">{employee.eName}</p>
        <p className="text-gray-600 mb-1">
          {employee.deptNo?.deptName} / {employee.jobNo?.jobName}
        </p>
        <p className="flex items-center gap-1 text-purple-600">
          <Mail size={14} /> {employee.eEmail}
        </p>
        <p className="flex items-center gap-1 text-purple-600">
          <Phone size={14} /> {employee.eMobile}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
