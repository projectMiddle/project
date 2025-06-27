import React from 'react';
import ApprovalSidebar from './ApprovalSidebar';
import { Outlet } from 'react-router-dom';

const ApprovalLayout = () => {
    return (
        <div className="flex min-h-screen">
            <ApprovalSidebar />
            <main className="flex-1 bg-[#f9fbff]">
                <Outlet />
            </main>
        </div>
    );
};

export default ApprovalLayout;