import React from "react";
import DepartmentDetailList from "../pages/department/DepartmentDetailList";
import DepartmentList from "../pages/department/DepartmentList";
import { Route, Routes } from "react-router-dom";

const DepartmentRoute = () => {
  return (
    <Routes>
      <Route index element={<DepartmentList />} />
      <Route path=":deptNo" element={<DepartmentDetailList />} />
    </Routes>
  );
};

export default DepartmentRoute;
