import React from "react";
import { Route, Routes } from "react-router-dom";
import IntraLayout from "../components/intrahome/IntraLayout";
import ApprovalForm from "../pages/approval/ApprovalForm";
import ApprovalList from "../pages/approval/ApprovalList";

const Yongjae = () => {
  return (
    <div>
      <Routes>
        <Route element={<IntraLayout />}>
          <Route path="approval/form" element={<ApprovalForm />} />
          <Route path="approval" element={<ApprovalList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Yongjae;
