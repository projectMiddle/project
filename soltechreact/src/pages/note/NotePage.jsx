import React, { useState } from "react";
import NoteSidebar from "../../components/note/NoteSidebar";
import { Outlet } from "react-router-dom";
import { NoteContext } from "../../contexts/NoteContext";

const NotePage = () => {
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      <div className="flex h-full">
        {/* 사이드 메뉴 */}
        <NoteSidebar />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </NoteContext.Provider>
  );
};

export default NotePage;
