import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import { VscAccount } from "react-icons/vsc";

const EmployeeCard = ({ employee }) => {
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    axios
      .get(`/attendance/working/${employee.empNo}`)
      .then((res) => setIsWorking(res.data.attStatus === "WORK"))
      .catch(() => setIsWorking(false));
  }, [employee.empNo]);

  return (
    <div className="border rounded-lg p-3 shadow-sm flex gap-3 items-start text-sm">
      {/* 기본 프로필 아이콘 */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <VscAccount size={28} />
      </div>

      {/* 사원 정보 */}
      <div className="flex-1">
        <p className="font-semibold text-base flex items-center gap-2">
          {employee.ename}
          {isWorking && <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
        </p>
        <p className="text-gray-600 mb-1">
          {employee.deptName} / {employee.jobNo}
        </p>
        <p className="flex items-center gap-1 text-purple-600">
          <Mail size={14} /> {employee.eemail}
        </p>
        <p className="flex items-center gap-1 text-purple-600">
          <Phone size={14} /> {employee.emobile}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;
