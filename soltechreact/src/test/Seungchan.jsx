import React from "react";
import NoticeForm from "../pages/notice/NoticeForm";
import EditNoticeForm from "../pages/notice/editNoticeForm";
import NoticeList from "../pages/notice/NoticeList";
import "../css/boardform.css";
import { Route, Router, Routes } from "react-router-dom";

const Seungchan = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="" element={<NoticeList />} />
          <Route path="Form" element={<NoticeForm />} />
          <Route path="edit/:id" element={<EditNoticeForm />} />
        </Routes>
      </div>
    </>
  );
};
export default Seungchan;
