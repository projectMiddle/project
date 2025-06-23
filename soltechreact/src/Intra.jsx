import React from 'react';
import { Route, Routes } from 'react-router-dom';
import IntraHome from './pages/intrahomepages/IntraHome';
import IntraLayout from './components/intrahome/IntraLayout';
import ApprovalRoute from './routes/ApprovalRoute';

const Intra = () => {
    return (
        <Routes>
            <Route element={<IntraLayout />}>
                {/* 공통 기능 페이지 */}
                <Route index element={<IntraHome />} />
                {ApprovalRoute()}
            </Route>
        </Routes>
    );
};

export default Intra;