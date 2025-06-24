import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Yongjae from "./test/Yongjae";
import Mikyung from "./test/Mikyung";
import Byeongsun from "./test/Byeongsun";
import Seungchan from "./test/Seungchan";
import Yongsung from "./test/Yongsung";
import MainHome from "./pages/mainhomepages/MainHome";
import MainEmpty from "./pages/mainhomepages/MainEmpty";
import MainLogin from "./pages/mainhomepages/MainLogin";
import MainAboutUs from "./pages/mainhomepages/MainAboutUs";
import MainLayout from "./components/mainhome/MainLayout";
import Intra from "./Intra";

function App() {
  return (
    <Routes>
      <Route path="/yongjae/*" element={<Yongjae />} />
      <Route path="/mikyung" element={<Mikyung />} />
      <Route path="/byeongsun" element={<Byeongsun />} />
      <Route path="/notices/*" element={<Seungchan />} />
      <Route path="/yongsung" element={<Yongsung />} />
      {/* 메인화면 관련 기능들 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainHome />} />
        <Route path="mainempty" element={<MainEmpty />} />
        <Route path="login" element={<MainLogin />} />
        <Route path="aboutus" element={<MainAboutUs />} />
      </Route>
      {/* 인트라넷 연결 */}
      <Route path="/intrasoltech/*" element={<Intra />} />
    </Routes>
  );
}

export default App;
