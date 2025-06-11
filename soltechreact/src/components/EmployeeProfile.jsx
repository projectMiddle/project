import React from "react";
// 💡 커스텀 스타일 적용

const EmployeeProfile = ({ employee }) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/ljb.jpg" alt="프로필" className="profile-image" />
        <div className="profile-info">
          <h2>
            {employee.eName} <span className="emp-no">사원번호 {employee.empNo}</span>
          </h2>
          <div className="button-group">
            <button className="btn btn-main">근무관리</button>
            <button className="btn btn-sub">급여명세서</button>
          </div>
        </div>
      </div>

      <div className="profile-fields">
        <ProfileField label="부서" value={employee.department?.deptName} />
        <ProfileField label="직급" value={employee.jobRank?.jobName} />
        <ProfileField label="이메일" value={employee.eEmail} />
        <ProfileField label="전화번호" value={employee.eMobile} />
        <ProfileField label="계좌번호" value={employee.eAccount} />
        <ProfileField label="입사일" value={employee.eHiredate} />
        <ProfileField label="생년월일" value={employee.eBirthday} />
        <ProfileField label="주소" value={employee.eAddress} />
        <ProfileField label="성별" value={employee.eGender} />
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="profile-field">
    <span className="field-label">{label}</span>
    <span className="field-value">{value || "-"}</span>
  </div>
);

export default EmployeeProfile;
