import React from "react";
import CalendarView from "../pages/calendar/CalendarView";
import { Route, Routes } from "react-router-dom";

const CalenderRoute = () => {
  return (
    <Routes>
      <Route index element={<CalendarView />} />
    </Routes>
  );
};

export default CalenderRoute;
