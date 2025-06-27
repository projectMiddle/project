import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { approvalCategories, isActiveRoute } from "../../utils/Approval";
import { fetchApprovalCategoryCounts } from "../../api/approvalApi";
import useAuth from "../../hooks/useAuth";

const ApprovalSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  console.log("승인 쪽 : ", empNo, userInfo);

  const [openForms, setOpenForms] = useState(false);
  const [category, setCategory] = useState("기안서");

  const [activeSend, setActiveSend] = useState(null);
  const [activeRecv, setActiveRecv] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);

  const [open, setOpen] = useState({
    상신함: false,
    수신함: false,
    보관함: false,
  });

  // 뱃지용 카운트 상태
  const [counts, setCounts] = useState({
    list: 0,
    history: 0,
    reference: 0,
  });

  const myEmpNo = empNo; // 추후 JWT에서 대체

  // 카운트 조회
  useEffect(() => {
    fetchApprovalCategoryCounts(myEmpNo)
      .then((data) => {
        console.log("사이드바 카운트", data);
        setCounts(data);
      })
      .catch((err) => {
        console.error("카운트 조회 실패", err);
      });
  }, []);

  return (
    <aside className="w-[230px] bg-[#f4f4f4] border-r border-gray-300 text-gray-800 flex flex-col min-h-screen">
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] text-center py-[14px]">전자결재</div>

      <button
        onClick={() => navigate(`/intrasoltech/approval/form?category=${category}`)}
        className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition m-3 w-[90%] font-semibold rounded px-2 py-2 text-[14px]"
      >
        + 새 {category} 작성
      </button>

      <nav className="flex-1 px-2 pt-5">
        {/* 결재양식 아코디언 */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between text-[13px] font-medium cursor-pointer px-1 py-2 hover:bg-gray-200 rounded"
            onClick={() => setOpenForms((prev) => !prev)}
          >
            <span className="flex-1">결재양식</span>
            {openForms ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {openForms && (
            <ul className="ml-3 space-y-1 text-[13px] animate-fadeIn mb-4">
              {approvalCategories.map((item) => (
                <li
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`cursor-pointer hover:text-purple-600 ${
                    category === item ? "text-purple-800 font-bold" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 결재 상신함 */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between text-[13px] font-medium cursor-pointer px-1 py-2 hover:bg-gray-200 rounded"
            onClick={() => setOpen((prev) => ({ ...prev, 상신함: !prev.상신함 }))}
          >
            <span className="flex-1">결재 상신함</span>
            {open.상신함 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.상신함 && (
            <ul className="ml-3 space-y-1 text-[13px] animate-fadeIn">
              {[
                { label: "결재상신", path: "submitted" },
                { label: "결재진행", path: "processing" },
                { label: "결재완료", path: "completed" },
              ].map((item) => (
                <li
                  key={item.path}
                  className="flex items-center py-1 cursor-pointer"
                  onClick={() => setActiveSend(activeSend === item.path ? null : item.path)}
                >
                  {activeSend === item.path ? (
                    <FolderOpen className="w-4 h-4 mr-1 text-[#6b46c1]" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1 text-[#6b46c1]" />
                  )}
                  <Link
                    className={`hover:text-purple-600 ${
                      isActiveRoute(location.pathname, item.path) ? "font-bold text-purple-800" : ""
                    }`}
                    to={`/intrasoltech/approval/request/${item.path}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 결재 수신함 */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between text-[13px] font-medium cursor-pointer px-1 py-2 hover:bg-gray-200 rounded"
            onClick={() => setOpen((prev) => ({ ...prev, 수신함: !prev.수신함 }))}
          >
            <span className="flex-1">결재 수신함</span>
            {open.수신함 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.수신함 && (
            <ul className="ml-3 space-y-1 text-[13px] animate-fadeIn">
              {[
                { label: "수신결재", path: "list" },
                { label: "결재내역", path: "history" },
                { label: "수신참조", path: "reference" },
              ].map((item) => (
                <li
                  key={item.path}
                  className="flex items-center py-1 cursor-pointer"
                  onClick={() => setActiveRecv(activeRecv === item.path ? null : item.path)}
                >
                  {activeRecv === item.path ? (
                    <FolderOpen className="w-4 h-4 mr-1 text-[#248CFF]" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1 text-[#248CFF]" />
                  )}
                  <Link
                    className={`hover:text-purple-600 ${
                      isActiveRoute(location.pathname, item.path) ? "font-bold text-purple-800" : ""
                    }`}
                    to={`/intrasoltech/approval/confirm/${item.path}?category=${category}`}
                  >
                    {item.label}
                  </Link>
                  {counts[item.path] > 0 && (
                    <span
                      className={`ml-auto rounded-full px-[7px] text-[11px] text-white ${
                        item.path === "reference" ? "bg-[#6b46c1]" : "bg-[#248CFF]"
                      }`}
                    >
                      {counts[item.path]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 시행 */}
        <div className="mt-2 flex items-center justify-between px-1 py-2 text-[13px] cursor-pointer hover:bg-gray-200 rounded">
          <span>시행</span>
          <span className="ml-2 text-[12px] text-[#6b46c1]">1</span>
        </div>

        {/* 보관함 */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between text-[13px] font-medium cursor-pointer px-1 py-2 hover:bg-gray-200 rounded"
            onClick={() => setOpen((prev) => ({ ...prev, 보관함: !prev.보관함 }))}
          >
            <span className="flex-1">보관함</span>
            {open.보관함 ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {open.보관함 && (
            <ul className="ml-3 space-y-1 text-[13px] animate-fadeIn">
              <li
                className="flex items-center py-1 cursor-pointer"
                onClick={() => setActiveFolder(activeFolder === "soltech" ? null : "soltech")}
              >
                {activeFolder === "soltech" ? (
                  <FolderOpen className="w-4 h-4 mr-1 text-[#248CFF]" />
                ) : (
                  <Folder className="w-4 h-4 mr-1 text-[#248CFF]" />
                )}
                SolTech 공유보관함
                <span className="ml-auto bg-[#248CFF] text-white rounded-full px-[7px] text-[11px]">10</span>
              </li>
              <li
                className="flex items-center py-1 cursor-pointer"
                onClick={() => setActiveFolder(activeFolder === "new" ? null : "new")}
              >
                {activeFolder === "new" ? (
                  <FolderOpen className="w-4 h-4 mr-1 text-[#6b46c1]" />
                ) : (
                  <Folder className="w-4 h-4 mr-1 text-[#6b46c1]" />
                )}
                새로운 보관함
                <span className="ml-auto bg-[#6b46c1] text-white rounded-full px-[7px] text-[11px]">1</span>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <div className="mt-auto bg-gray-100 border-t border-gray-300 px-4 py-3 flex items-center justify-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 text-gray-600 leading-none">&#9881;</span>
        <span className="text-gray-500">서비스관리</span>
      </div>
    </aside>
  );
};

export default ApprovalSidebar;
