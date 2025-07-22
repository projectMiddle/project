import React from "react";
import { useNavigate } from "react-router-dom";

const EmpInfo = ({ employee }) => {
  const navigate = useNavigate();
  if (!employee) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 text-lg">
        🔄 직원 정보를 불러오는 중입니다...
      </div>
    );
  }

  const goToAttendance = () => {
    navigate("/intrasoltech/attendance");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      {/* 상단 프로필 영역 */}
      <div className="flex items-start gap-6 border-b pb-6">
        <img src="/ljb.jpg" alt="프로필" className="w-[120px] h-[120px] object-cover rounded-full border shadow" />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {employee.eName}
              <span className="ml-3 text-sm text-gray-500 font-normal">사원번호 {employee.empNo}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {employee.jobNo} / {employee.deptName}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={goToAttendance}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow-sm transition"
            >
              근무관리
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 shadow-sm transition">
              급여명세서
            </button>
          </div>
        </div>
      </div>

      {/* 하단 필드 영역 */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        <ProfileField label="이메일" value={employee.eemail} />
        <ProfileField label="전화번호" value={employee.emobile} />
        <ProfileField label="계좌번호" value={employee.eaccount} />
        <ProfileField label="입사일" value={employee.ehiredate} />
        <ProfileField label="생년월일" value={employee.ebirth} />
        <ProfileField label="주소" value={employee.eaddress} />
        <ProfileField label="성별" value={employee.egender} />
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex">
    <span className="w-24 font-medium text-gray-600">{label}</span>
    <span className="text-gray-900">{value || "-"}</span>
  </div>
);

export default EmpInfo;
