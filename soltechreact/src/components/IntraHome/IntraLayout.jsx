import React from "react";
import { Outlet } from "react-router-dom";
import FixedBar from "./FixedBar";

const IntraLayout = () => {
  return (
    <div>
      <div className="">
        <FixedBar />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default IntraLayout;
