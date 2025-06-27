import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';

const MainLayout = ({ children }) => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <MainHeader />
                <main className="flex-1">
                    {children}
                </main>
                <MainFooter />
            </div>
        </div>
    );
};

export default MainLayout;