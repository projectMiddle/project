import React from "react";
import NoticeForm from "../pages/notice/NoticeForm";
import EditNoticeForm from "../pages/notice/editNoticeForm";
import NoticeList from "../pages/notice/NoticeList";
import "../css/board/BoardForm.css";

const Seungchan = () => {
  return (
    <>
      <div>
        <NoticeList />
      </div>
    </>
  );
};

{
  /* <Route path="/notice" element={<NoticeList />} />
<Route path="/notices/edit" element={<EditNoticeForm />} />
<Route path="/NoticeForm" element={<NoticeForm />} /> */
}
export default Seungchan;
