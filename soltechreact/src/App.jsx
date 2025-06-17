import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Yongjae from "./test/yongjae";
import Mikyung from "./test/Mikyung";
import Byeongsun from "./test/Byeongsun";
import Seungchan from "./test/Seungchan";
import Yongsung from "./test/Yongsung";

import NoticeForm from "./pages/NoticeForm";
import EditNoticeForm from "./pages/editNoticeForm";
import NoticeList from "./components/NoticeList";
import EditNoticeWrapper from "./pages/EditNoticeWrapper";

function App() {
  return (
    <Routes>
      <Route path="/yongjae" element={<Yongjae />} />
      <Route path="/mikyung" element={<Mikyung />} />
      <Route path="/byeongsun" element={<Byeongsun />} />
      <Route path="/seungchan" element={<Seungchan />} />
      <Route path="/yongsung" element={<Yongsung />} />
      <Route path="/notice" element={<NoticeList />} />
      <Route path="/notice/new" element={<NoticeForm />} />
      <Route path="/notice/edit" element={<EditNoticeForm />} />
      <Route path="/notice/edit/:notiNo" element={<EditNoticeWrapper />} />
    </Routes>
  );
}

export default App;
