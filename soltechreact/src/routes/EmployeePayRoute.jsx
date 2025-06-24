import React from "react";
import { Route, Routes } from "react-router-dom";
import PayListPage from "../pages/emppay/PayListPage";
import PayForm from "../pages/emppay/PayForm";
import PayListTable from "../pages/emppay/PayListTable";
import PayDetailPage from "../pages/emppay/PayDetailPage";

const EmployeePayRoute = () => {
  return (
    <Routes>
      <Route index element={<PayListPage />} />
      <Route path="emppay/form" element={<PayForm />} />
      <Route path="emppay/:payNo" element={<PayListTable />} />
      <Route path="emppay/detail/:id" element={<PayDetailPage />} />
    </Routes>
  );
};

export default EmployeePayRoute;
