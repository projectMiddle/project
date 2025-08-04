import React from "react";
import { Route, Routes } from "react-router-dom";

import NotePage from "../pages/note/NotePage";
import NoteReceiveList from "../pages/note/NoteReceiveList";
import NoteSendList from "../pages/note/NoteSendList";
import NoteCompose from "../pages/note/NoteCompose";
import NoteDetail from "../pages/note/NoteDetail";
import NoteTrash from "../pages/note/NoteTrash";

const NoteRoute = () => {
  return (
    <Routes>
      <Route element={<NotePage />}>
        <Route index element={<NoteReceiveList />} /> {/* 기본 = 받은 쪽지함 */}
        <Route path="compose" element={<NoteCompose />} /> {/* 쪽지 작성 */}
        <Route path="receiveList" element={<NoteReceiveList />} /> {/* 받은 쪽지함 */}
        <Route path="sendList" element={<NoteSendList />} /> {/* 보낸 쪽지함 */}
        <Route path="receive/:noteReceiveNo" element={<NoteDetail />} /> {/* 받은 쪽지 상세 */}
        <Route path="send/:noteSendNo" element={<NoteDetail />} /> {/* 보낸 쪽지 상세 */}
        <Route path="trash" element={<NoteTrash />} /> {/* 휴지통 */}
      </Route>
    </Routes>
  );
};

export default NoteRoute;
