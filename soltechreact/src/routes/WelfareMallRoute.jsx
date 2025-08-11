import React from "react";
import { Route, Routes } from "react-router-dom";
import WelfareMallList from "../pages/welfaremall/WelfareMallList";
import WelfareMallDetail from "../pages/welfaremall/WelfareMallDetail";
import WelfareMallCart from "../pages/welfaremall/WelfareMallCart";
import WelfareMallComplete from "../pages/welfaremall/WelfareMallComplete";
import WelfareMallOrders from "../pages/welfaremall/WelfareMallOrders";

const WelfareMallRoute = () => {
  return (
    <Routes>
      <Route path="" element={<WelfareMallList />} />
      <Route path="product/:product_id" element={<WelfareMallDetail />} />
      <Route path="cart" element={<WelfareMallCart />} />
      <Route path="complete" element={<WelfareMallComplete />} />
      <Route path="orders" element={<WelfareMallOrders />} />
    </Routes>
  );
};

export default WelfareMallRoute;
