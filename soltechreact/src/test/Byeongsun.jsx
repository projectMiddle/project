import React from "react";
import { Route, Routes } from "react-router-dom";
import PayListPage from "./../pages/emppay/PayListPage";
import PayForm from "./../pages/emppay/PayForm";
import PayListTable from "./../pages/emppay/PayListTable";
import PayDetailPage from "./../pages/emppay/PayDetailPage";

const Byeongsun = () => {
  return (
    <>
      <div className="pt-24 px-6">
        <Routes>
          <Route path="/" element={<PayListPage />} />
          <Route path="/form" element={<PayForm />} />
          <Route path="/:payNo" element={<PayListTable />} />
          <Route path="/pay/detail/:id" element={<PayDetailPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Byeongsun;
