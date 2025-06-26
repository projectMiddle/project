import React from "react";
import { Route, Routes } from "react-router-dom";
import NoticeList from "./../pages/notice/NoticeList";
import NoticeForm from "./../pages/notice/NoticeForm";
import EditNoticeForm from "./../pages/notice/editNoticeForm";
import NoticeRead from "../pages/notice/NoticeRead";

const NoticeRoute = () => {
  return (
    <Routes>
      <Route index element={<NoticeList />} />
      <Route path="form" element={<NoticeForm />} />
      <Route path="edit/:id" element={<EditNoticeForm />} />
      <Route path="read/:notiNo" element={<NoticeRead />} />
    </Routes>
  );
};

export default NoticeRoute;
