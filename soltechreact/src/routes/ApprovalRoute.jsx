import React from "react";
import ApprovalLayout from "../components/approval/ApprovalLayout";
import ApprovalList from "../pages/approval/ApprovalList";
import ApprovalForm from "../pages/approval/ApprovalForm";
import { Route, Routes } from "react-router-dom";
import ApprovalDetail from "../pages/approval/ApprovalDetail";
import ApprovalUpdateForm from "../pages/approval/ApprovalUpdateForm";

const ApprovalRoute = () => {
  return (
    <Routes>
      <Route element={<ApprovalLayout />}>
        <Route index element={<ApprovalList />} />
        {/* 결재 기안서 작성폼 */}
        <Route path="form" element={<ApprovalForm />} />
        <Route path="form/update" element={<ApprovalUpdateForm />} />
        {/* 결재 상신함 관련 */}
        <Route path="request/submitted" element={<ApprovalList />} />
        <Route path="request/processing" element={<ApprovalList />} />
        <Route path="request/completed" element={<ApprovalList />} />
        <Route path="request/rejected" element={<ApprovalList />} />
        {/* 결재 수신함 관련 */}
        <Route path="confirm/list" element={<ApprovalList />} />
        <Route path="confirm/history" element={<ApprovalList />} />
        <Route path="confirm/reference" element={<ApprovalList />} />
        {/* 결재 보관함 관련 */}
        <Route path="confirm/temporary" element={<ApprovalList />} />
        <Route path="confirm/retrieved" element={<ApprovalList />} />
        {/* 결재 상세 조회 */}
        <Route path="detail/:appDocNo" element={<ApprovalDetail />} />
      </Route>
    </Routes>
  );
};

export default ApprovalRoute;
