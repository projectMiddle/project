import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Attendance from "../pages/attendance/Attendance";

const AttendanceRoute = () => {
  return (
    <Routes>
      <Route index element={<Attendance />} />
    </Routes>
  );
};

export default AttendanceRoute;
