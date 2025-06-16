import React from "react";
import MainHome from "../pages/mainhomepages/MainHome";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/mainhomecomponents/MainLayout";
import MainLogin from "../pages/mainhomepages/MainLogin";
import MainEmpty from "../pages/mainhomepages/MainEmpty";
import MainAboutUs from "../pages/mainhomepages/MainAboutUs";

const Yongjae = () => {
  return <div>
    <MainLayout>
      <Routes>
        {/* yongjae 전용 페이지 */}
        <Route path="/" element={<MainHome />} />
        <Route path="mainempty" element={<MainEmpty />} />
        <Route path="login" element={<MainLogin />} />
        <Route path="aboutus" element={<MainAboutUs />} />
      </Routes>
    </MainLayout>
  </div>;
};

export default Yongjae;
