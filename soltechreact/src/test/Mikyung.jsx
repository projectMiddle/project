import React from "react";
import IntraHome from "../pages/intrahomepages/IntraHome";
import Attendance from "../pages/attendance/Attendance";
import MailPage from "./../pages/mail/MailPage";

import FixedBar from "../components/IntraHome/FixedBar";
import EmployeeProfile from "../pages/intrahomepages/EmployeeProfile";

const Mikyung = () => {
  return (
    <div>
      {/* <FixedBar />
      <IntraHome />
      <Attendance /> */}
      <EmployeeProfile />
      {/* <MailPage /> */}
    </div>
  );
};

export default Mikyung;
