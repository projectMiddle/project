import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import IntraHome from "./pages/intrahomepages/IntraHome";
import IntraLayout from "./components/intrahome/IntraLayout";
import ApprovalRoute from "./routes/ApprovalRoute";
import EmployeePayRoute from "./routes/EmployeePayRoute";
import CalenderRoute from "./routes/CalenderRoute";
import NoticeRoute from "./routes/NoticeRoute";
import MailRoute from "./routes/MailRoute";
import AttendanceRoute from "./routes/AttendanceRoute";

import useAuth from "./hooks/useAuth";
const Intra = () => {
  const { isLoggedIn, userInfo } = useAuth();

  useEffect(() => {
    console.log("✅ 로그인 여부:", isLoggedIn);

    if (userInfo) {
      console.log("✅ 사용자 정보:", userInfo);
      console.log("  🔹 역할(role):", userInfo.role);
      console.log("  🔹 이메일(email):", userInfo.email); // 회원인 경우
      console.log("  🔹 사번(empNo):", userInfo.empNo); // 사원인 경우
      console.log("  🔹 부서번호(deptNo):", userInfo.deptNo);
      console.log("  🔹 직책번호(jobNo):", userInfo.jobNo);
    } else {
      console.log("❌ 사용자 정보 없음 (userInfo is null)");
    }
  }, [isLoggedIn, userInfo]);
  return (
    <Routes>
      <Route element={<IntraLayout />}>
        {/* 기본 홈 */}
        <Route index element={<IntraHome />} />

        {/* 각 분기별 라우트 - 반드시 /* 를 붙여야 하위 경로 매칭됨 */}
        <Route path="approval/*" element={<ApprovalRoute />} />
        <Route path="emppay/*" element={<EmployeePayRoute />} />
        <Route path="calendar/*" element={<CalenderRoute />} />
        <Route path="notices/*" element={<NoticeRoute />} />
        <Route path="mail/*" element={<MailRoute />} />
        <Route path="attendance/*" element={<AttendanceRoute />} />
      </Route>
    </Routes>
  );
};

export default Intra;
