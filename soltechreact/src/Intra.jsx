import React from "react";
import { Route, Routes } from "react-router-dom";
import IntraHome from "./pages/intrahomepages/IntraHome";
import DashboardLayout from "./components/intrhome/DashboardLayout";
import IntraLayout from "./components/intrhome/IntraLayout";
import ApprovalRoute from "./routes/ApprovalRoute";
import EmployeePayRoute from "./routes/EmployeePayRoute";
import CalenderRoute from "./routes/CalenderRoute";
import NoticeRoute from "./routes/NoticeRoute";
import MailRoute from "./routes/MailRoute";
import AttendanceRoute from "./routes/AttendanceRoute";
import DepartmentRoute from "./routes/DepartmentRoute";

const Intra = () => {
  console.log("intra 오픈");
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* 기본 홈 */}
        <Route index element={<IntraHome />} />
      </Route>

      <Route element={<IntraLayout />}>
        {/* 각 분기별 라우트 - 반드시 /* 를 붙여야 하위 경로 매칭됨 */}
        <Route path="approval/*" element={<ApprovalRoute />} />
        <Route path="emppay/*" element={<EmployeePayRoute />} />
        <Route path="calendar/*" element={<CalenderRoute />} />
        <Route path="notices/*" element={<NoticeRoute />} />
        <Route path="mail/*" element={<MailRoute />} />
        <Route path="attendance/*" element={<AttendanceRoute />} />
        <Route path="department/*" element={<DepartmentRoute />} />
      </Route>
    </Routes>
  );
};

export default Intra;
