import React from "react";
import { Route, Routes } from "react-router-dom";
import NoticeList from "./../pages/notice/NoticeList";
import NoticeForm from "./../pages/notice/NoticeForm";
import EditNoticeForm from "./../pages/notice/editNoticeForm";
import NoticeRead from "../pages/notice/NoticeRead";
import FreeBoardList from "../pages/notice/FreeboardList";
import FreeBoardForm from "../pages/notice/FreeboardForm";
import FreeBoardRead from "../pages/notice/freeboardRead";
import EditFreeBoardForm from "../pages/notice/EditFreeboardForm";
import FreeboardRead from "../pages/notice/freeboardRead";

const NoticeRoute = () => {
  return (
    <Routes>
      <Route index element={<NoticeList />} />
      <Route path="form" element={<NoticeForm />} />
      <Route path="edit/:id" element={<EditNoticeForm />} />
      <Route path="read/:notiNo" element={<NoticeRead />} />
      <Route path="freeboard" element={<FreeBoardList />} />
      <Route path="freeboard/:fbNo" element={<FreeboardRead />} />
      <Route path="freeboard/form" element={<FreeBoardForm />} />
      <Route path="freeboard/edit/:id" element={<EditFreeBoardForm />} />
    </Routes>
  );
};

export default NoticeRoute;
