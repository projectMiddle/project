import React from "react";
import { Route, Routes } from "react-router-dom";
import MailPage from "./../pages/mail/MailPage";
import MailList from "./../pages/mail/MailList";
import MailCompose from "../pages/mail/MailCompose";
import MailSent from "../pages/mail/MailSent";
import MailRead from "../pages/mail/MailRead";
import MailTrash from "./../pages/mail/MailTrash";

const MailRoute = () => {
  return (
    <Routes>
      <Route element={<MailPage />}>
        <Route index element={<MailList />} />
        <Route path="send" element={<MailCompose />} /> {/* 메일 작성 */}
        <Route path="receiveList" element={<MailList />} /> {/* 받은 메일함 */}
        <Route path="sendList" element={<MailSent />} /> {/* 보낸 메일함 */}
        <Route path="receive/:mailNo" element={<MailRead />} /> {/* 받은 메일 읽기 */}
        <Route path="send/:mailNo" element={<MailRead />} /> {/* 보낸 메일 읽기 */}
        <Route path="trash" element={<MailTrash />} /> {/* 휴지통 */}
      </Route>
    </Routes>
  );
};

export default MailRoute;
