import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import WelfareMallList from "../pages/welfaremall/WelfareMallList";
import WelfareMallDetail from "../pages/welfaremall/WelfareMallDetail";
import WelfareMallCart from "../pages/welfaremall/WelfareMallCart";
import WelfareMallComplete from "../pages/welfaremall/WelfareMallComplete";
import WelfareMallOrders from "../pages/welfaremall/WelfareMallOrders";
import MallHeader from "../components/mall/MallHeader";

function MallLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MallHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}

const WelfareMallRoute = () => {
  return (
    <Routes>
      <Route element={<MallLayout />}>
        <Route index element={<WelfareMallList />} />
        <Route path="product/:product_id" element={<WelfareMallDetail />} />
        <Route path="cart" element={<WelfareMallCart />} />
        <Route path="complete" element={<WelfareMallComplete />} />
        <Route path="orders" element={<WelfareMallOrders />} />
      </Route>
    </Routes>
  );
};

export default WelfareMallRoute;
