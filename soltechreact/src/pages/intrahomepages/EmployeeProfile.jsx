import React, { useEffect, useState } from "react";

import EmpInfo from "../../components/intrahome/EmpInfo";
import useAuth from "../../hooks/useAuth";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const { userInfo } = useAuth();
  const empNo = userInfo.empNo;

  useEffect(() => {
    fetch(`/empinfo/${empNo}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("받은 employee:", data);
        setEmployee(data);
      })
      .catch((err) => console.error("사원 정보 오류", err));
  }, []);

  return (
    <div>
      <h1>내 정보</h1>
      <EmpInfo employee={employee} />
    </div>
  );
}
