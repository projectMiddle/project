import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ApprovalRoute from "./routes/ApprovalRoute";
import EmployeePayRoute from "./routes/EmployeePayRoute";
import CalenderRoute from "./routes/CalenderRoute";
import NoticeRoute from "./routes/NoticeRoute";
import AttendanceRoute from "./routes/AttendanceRoute";
import DepartmentRoute from "./routes/DepartmentRoute";
import WelfareMallRoute from "./routes/WelfareMallRoute";

import useAuth from "./hooks/useAuth";
import IntraMainComponent from "./components/intrahomecomponents/IntraMainComponent";
import IntraLayout from "./components/intracomponents/IntraLayout";
import NoteRoute from "./routes/NoteRoute";
const Intra = () => {
  const { isLoggedIn, userInfo } = useAuth();

  useEffect(() => {
    if (userInfo) {
      console.log("사용자 정보:", userInfo);
    } else {
      console.log("사용자 정보 없음 (userInfo is null)");
    }
  }, [isLoggedIn, userInfo]);
  return (
    <Routes>
      {/* 기본 홈 */}
      <Route index element={<IntraMainComponent />} />
      <Route path="welfaremall/*" element={<WelfareMallRoute />} />
      <Route element={<IntraLayout />}>
        {/* 각 분기별 라우트 - 반드시 /* 를 붙여야 하위 경로 매칭됨 */}
        <Route path="approval/*" element={<ApprovalRoute />} />
        <Route path="emppay/*" element={<EmployeePayRoute />} />
        <Route path="calendar/*" element={<CalenderRoute />} />
        <Route path="notices/*" element={<NoticeRoute />} />
        <Route path="note/*" element={<NoteRoute />} />
        <Route path="attendance/*" element={<AttendanceRoute />} />
        <Route path="department/*" element={<DepartmentRoute />} />
      </Route>
    </Routes>
  );
};

export default Intra;
