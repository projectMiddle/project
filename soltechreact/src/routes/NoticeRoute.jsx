import React from "react";
import { Route, Routes } from "react-router-dom";
import EditFreeBoardForm from "../pages/notice/EditFreeBoardForm";
import NoticeList from "../pages/notice/NoticeList";
import NoticeForm from "../pages/notice/NoticeForm";
import EditNoticeForm from "../pages/notice/EditNoticeForm";
import NoticeRead from "../pages/notice/NoticeRead";
import FreeBoardList from "../pages/notice/FreeBoardList";
import FreeBoardRead from "../pages/notice/FreeboardRead";
import FreeBoardForm from "../pages/notice/FreeBoardForm";

const NoticeRoute = () => {
  return (
    <Routes>
      <Route index element={<NoticeList />} />
      <Route path="form" element={<NoticeForm />} />
      <Route path="edit/:id" element={<EditNoticeForm />} />
      <Route path="read/:notiNo" element={<NoticeRead />} />
      
      {/* 자유게시판 */}
      <Route path="freeboard" element={<FreeBoardList />} />
      <Route path="freeboard/:fbNo" element={<FreeBoardRead />} />
      <Route path="freeboard/form" element={<FreeBoardForm />} />

      <Route path="freeboard/edit/:id" element={<EditFreeBoardForm />} />
    </Routes>
  );
};

export default NoticeRoute;
