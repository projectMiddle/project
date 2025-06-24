import React from "react";
import IntraHome from "../pages/intrahomepages/IntraHome";
import Attendance from "../pages/attendance/Attendance";
import MailPage from "./../pages/mail/MailPage";

import FixedBar from "../components/intrhome/FixedBar";
import EmployeeProfile from "../pages/intrahomepages/EmployeeProfile";
import MailList from "./../pages/mail/MailList";
import MailCompose from "./../pages/mail/MailCompose";
import MailRead from "./../pages/mail/MailRead";
import { Route, Routes } from "react-router-dom";

const Mikyung = () => {
  return (
    <div>
      <IntraHome />
      <Attendance />
      <EmployeeProfile />
      {/* 메일 */}
      {/* <Routes>
        <Route path="mail" element={<MailPage />}>
          <Route index element={<MailList type="inbox" />} />
          <Route path="compose" element={<MailCompose />} />
          <Route path="read/:mailId" element={<MailRead />} />
          <Route path="trash" element={<MailList type="trash" />} />
          <Route path="sent" element={<MailList type="sent" />} />
        </Route>
      </Routes> */}
    </div>
  );
};

export default Mikyung;
