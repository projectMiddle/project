import React from "react";
import { Outlet } from "react-router-dom";

const IntraLayout = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <FixedBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default IntraLayout;
