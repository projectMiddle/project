import React from "react";
import NoticeForm from "./../pages/NoticeForm";
import EditNoticeForm from "../pages/editNoticeForm";
import NoticeList from "../components/NoticeList";
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
