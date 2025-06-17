import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <MainHeader />
                <main className="flex-1">
                    <Outlet />
                </main>
                <MainFooter />
            </div>
        </div>
    );
};

export default MainLayout;