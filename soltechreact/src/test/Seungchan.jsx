import React from "react";
import NoticeForm from "../pages/notice/NoticeForm";
import EditNoticeForm from "../pages/notice/editNoticeForm";
import NoticeList from "../pages/notice/NoticeList";
import { Route, Router, Routes } from "react-router-dom";
import NoticeRead from "../pages/notice/NoticeRead";

const Seungchan = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="List" element={<NoticeList />} />
          <Route path="edit/:id" element={<EditNoticeForm />} />
          <Route path="Form" element={<NoticeForm />} />
          <Route path=":notiNo" element={<NoticeRead />} />
        </Routes>
      </div>
    </>
  );
};
export default Seungchan;
