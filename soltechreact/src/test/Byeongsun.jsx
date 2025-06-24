import React from "react";
import { Route, Routes } from "react-router-dom";
import PayListPage from "./../pages/emppay/PayListPage";
import PayForm from "./../pages/emppay/PayForm";
import PayListTable from "./../pages/emppay/PayListTable";
import PayDetailPage from "./../pages/emppay/PayDetailPage";

const Byeongsun = () => {
  return (
    <Routes>
      <Route index element={<PayListPage />} />
      <Route path="form" element={<PayForm />} />
      <Route path=":payNo" element={<PayListTable />} />
      <Route path="detail/:id" element={<PayDetailPage />} />
    </Routes>
  );
};

export default Byeongsun;
