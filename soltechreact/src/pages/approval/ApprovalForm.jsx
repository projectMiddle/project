import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchApprovalDocNoCounts, postApproval, removeAppFile } from "../../api/approvalApi"; // 백엔드에 FormData 전송/삭제용 API
import ApprovalLineModal from "./ApprovalLineModal";
import useAuth from "../../hooks/useAuth";
import { fetchAllEmployeeInfo } from "../../api/informationApi";

const ApprovalForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]); // 첨부파일 상태 추가

  const [modalMode, setModalMode] = useState("APPROVER"); // or "REFERENCE" 모달 재사용

  // 문서번호 자동생성용
  const [appDocNo, setappDocNo] = useState(null);

  // jwt 토큰 값
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;
  const deptNo = userInfo?.deptNo;

  const [information, setEmployee] = useState([]); // 첨부파일 상태 추가

  // 전체 정보 출력용
  useEffect(() => {
    if (!empNo) return;

    fetchAllEmployeeInfo(empNo).then((info) => {
      setEmployee(info);
    });
  }, [empNo]);

  // 카테고리별 내용 변경
  const categoryTemplates = {
    기안서: `※ 기안 목적:\n\n※ 관련 내용:\n\n※ 요청 사항:\n`,
    보고서: `※ 주요 내용:\n\n※ 결론 및 제안:\n`,
    연차신청서: `※ 연차 기간: yyyy-mm-dd ~ yyyy-mm-dd\n\n※ 사유:\n`,
    출장신청서: `※ 출장 일자:\n\n※ 출장 지역:\n\n※ 출장 목적:\n\n※ 비고:\n`,
    영수증: `※ 영수증 내역을 첨부파일로 반드시 첨부\n\n※ 결재 일자:\n\n※ 사용 내역:\n\n※ 비고:\n`,
  };

  // 본문 내용 저장용
  useEffect(() => {
    setContent(categoryTemplates[category] || "");
  }, [category]);

  // 문서 번호용
  useEffect(() => {
    // 문서번호 미리 불러오기
    fetchApprovalDocNoCounts().then((res) => {
      setappDocNo(res); // 문서번호 상태에 저장
    });
  }, []);

  // 전자결재 생성용
  const handleSubmit = async () => {
    if (!empNo || !deptNo) return alert("사번과 부서번호를 입력하세요");
    if (!title) return alert("제목을 입력하세요");

    if (approvalLine.approvers.length === 0) return alert("결재선을 지정해 주세요");

    const formData = new FormData();
    formData.append("appDocCategory", category);
    formData.append("appDocTitle", title);
    formData.append("appDocContent", content);

    console.log("긴급 여부 : ", isUrgent);
    formData.append("appIsUrgent", isUrgent);

    formData.append("appIsFinalized", false);
    formData.append("appIsTemporary", false);
    formData.append("empNo", empNo);
    formData.append("deptNo", deptNo);

    uploadFiles.forEach((file) => formData.append("uploadFiles", file));

    // 결재선 데이터 같이 전송
    approvalLine.approvers.forEach((approver, idx) => {
      formData.append(`approvers[${idx}].empNo`, approver.empNo);
      formData.append(`approvers[${idx}].appRoleJobNo`, approver.appRoleJobNo);
      formData.append(`approvers[${idx}].appOrder`, approver.appOrder);
    });

    approvalLine.references.forEach((reference, idx) => {
      formData.append(`references[${idx}].empNo`, reference.empNo);
      formData.append(`references[${idx}].appRoleJobNo`, reference.appRoleJobNo);

      // null 또는 undefined면 아예 추가 X
      if (reference.appOrder !== null && reference.appOrder !== undefined) {
        formData.append(`references[${idx}].appOrder`, reference.appOrder);
      }
    });

    try {
      await postApproval(empNo, formData);
      alert("문서가 성공적으로 제출되었습니다");
      navigate("/intrasoltech/approval/request/submitted");
      window.location.reload();
    } catch (error) {
      console.error("문서 제출 실패", error);
      alert("제출 중 오류 발생");
    }
  };

  // 임시저장용
  // ✅ 1. 임시저장 처리 함수 추가
  const handleSaveAsTemporary = async () => {
    if (!empNo || !deptNo) return alert("사번과 부서번호를 입력하세요");
    if (!title) return alert("제목을 입력하세요");

    const formData = new FormData();
    formData.append("appDocCategory", category);
    formData.append("appDocTitle", title);
    formData.append("appDocContent", content);
    formData.append("appIsUrgent", isUrgent);
    formData.append("appIsFinalized", false);
    formData.append("appIsTemporary", "true"); // ✅ 임시저장 표시
    formData.append("empNo", empNo);
    formData.append("deptNo", deptNo);

    uploadFiles.forEach((file) => formData.append("uploadFiles", file));

    // 결재선이 없어도 저장 가능하게끔 → optional
    approvalLine.approvers.forEach((approver, idx) => {
      formData.append(`approvers[${idx}].empNo`, approver.empNo);
      formData.append(`approvers[${idx}].appRoleJobNo`, approver.appRoleJobNo);
      formData.append(`approvers[${idx}].appOrder`, approver.appOrder);
    });

    approvalLine.references.forEach((reference, idx) => {
      formData.append(`references[${idx}].empNo`, reference.empNo);
      if (reference.appRoleJobNo) formData.append(`references[${idx}].appRoleJobNo`, reference.appRoleJobNo);
      if (reference.appOrder !== null && reference.appOrder !== undefined)
        formData.append(`references[${idx}].appOrder`, reference.appOrder);
    });

    try {
      await postApproval(empNo, formData);
      alert("임시저장 완료되었습니다.");
      navigate("/intrasoltech/approval/confirm/temporary");
      window.location.reload();
    } catch (error) {
      console.error("임시저장 실패", error);
      alert("임시저장 중 오류 발생");
    }
  };

  const handleFileDelete = (index) => {
    const updated = [...uploadFiles];
    updated.splice(index, 1);
    setUploadFiles(updated);
  };

  // 결재선 지정
  const [approvalLine, setApprovalLine] = useState({
    approvers: [],
    references: [],
  });
  const [showLineModal, setShowLineModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[13px] text-black">
      <div className="bg-[#9776eb] text-white font-bold text-[17px] text-center py-[14px]">&nbsp;</div>
      <div className="flex flex-row flex-1">
        {/* 중앙 영역 */}
        <div className="flex-1">
          <main className="flex-1 bg-white px-10 py-6 relative overflow-auto pb-16">
            {/* 테스트용 임시 입력란 (추후 삭제 예정) */}

            <div className="w-auto mx-auto">
              <div className="mb-1 text-[14px] font-semibold">결재 작성</div>
              <p className="text-[12px] text-gray-500 mb-6">진행중인 결재내역을 확인하고 관리합니다</p>
              <div className="grid grid-cols-2 gap-4">
                {/* 제목 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">제목</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 제목 입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        value={title}
                        placeholder="결재문서의 제목을 입력하세요."
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded h-full text-[15px]"
                      />
                    </div>
                  </div>
                </div>
                {/* 기안자 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">기안자</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 사원명 입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded h-full text-[15px]"
                        defaultValue={information.eName}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* 부서명 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">부서명</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 부서명 입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        defaultValue={information.deptName}
                        className="w-full border border-gray-300 px-3 py-3 rounded h-full text-[15px]"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* 문서번호 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">문서번호</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 문서번호 입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        value={appDocNo || ""}
                        readOnly
                        className="w-full border border-gray-300 px-3 py-3 rounded h-full text-[15px]"
                      />
                    </div>
                  </div>
                </div>
                {/* 문서분류 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">문서분류</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 문서분류 입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        value={category}
                        readOnly
                        className="w-full border border-gray-300 px-3 py-3 rounded h-full text-[15px]"
                      />
                    </div>
                  </div>
                </div>
                {/* 기안일자 */}
                <div className="border border-gray-300 rounded-md bg-[#f9fbff] overflow-hidden text-[13px]">
                  <div className="grid grid-cols-7">
                    <div className="col-span-2 bg-[#f1f2f6] min-h-[64px] p-3 border-r border-gray-200">
                      <div className="text-black text-[14px] font-bold mb-1">기안일자</div>
                      <div className="text-gray-500 text-[12px]">결재문서의 일자입니다.</div>
                    </div>
                    <div className="col-span-5 p-3">
                      <input
                        type="text"
                        value={new Date().toISOString().slice(0, 10)} // 오늘 날짜로 고정
                        readOnly
                        className="w-full border border-gray-300 px-3 py-3 rounded h-full text-[15px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 본문*/}
              <div>&nbsp;</div>
              <div>
                <label className="block text-gray-500 mb-1">문서본문</label>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full resize-none min-h-[400px]"
                ></textarea>
              </div>
            </div>
          </main>
        </div>
        {/* 우측 사이드바 (수정된 구조) */}
        <aside className="w-[400px] bg-white border-l border-gray-300 pt-0 flex flex-col relative">
          {/* 내부 본문 */}
          <div className="p-4 pb-20 flex-grow">
            <div className="text-[15px] font-bold text-gray-700 mb-4">기안정보 등록</div>
            {/* 가운데 회색 선 */}
            <div className="flex justify-center my-4">
              <div className="bg-gray-300 h-[1.5px] w-full rounded" />
            </div>
            {/* 결재자 지정 */}
            <div className="mb-6">
              <div className="text-[12px] font-semibold text-gray-700 mb-2">결재자지정</div>
              <div className="border border-gray-300 rounded p-3 bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="결재자를 검색하세요"
                    className="flex-1 border border-gray-300 px-2 py-1 text-[13px] rounded"
                  />
                  <button
                    className="px-3 py-1 bg-gray-200 border border-gray-300 rounded text-[13px] cursor-pointer"
                    onClick={() => {
                      setModalMode("APPROVER");
                      setShowLineModal(true);
                    }}
                  >
                    결재자 찾기
                  </button>
                </div>
                {Array.isArray(approvalLine.approvers) &&
                  approvalLine.approvers.map((emp, i) => (
                    <div
                      key={emp.empNo}
                      className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-500 w-4">{i + 1}</span>
                        <img
                          src={`https://placehold.co/28x28?text=${i + 1}`}
                          alt="profile"
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="leading-tight flex gap-1 items-center">
                          <div className="font-medium text-gray-900 text-[13px]">{emp.eName}</div>
                          <div className="text-[11px] text-gray-500">{emp.jobName}</div>
                          <div className="text-[11px] text-gray-500">{emp.deptName}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-green-500 text-white px-2 py-[1px] text-[11px] rounded">결재</span>
                        <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* 참조자 지정 */}
            <div className="mb-6">
              <div className="text-[12px] font-semibold text-gray-700 mb-2">참조자지정</div>
              <div className="border border-gray-300 rounded p-3 bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="결재자를 검색하세요"
                    className="flex-1 border border-gray-300 px-2 py-1 text-[13px] rounded"
                  />
                  <button
                    className="px-3 py-1 bg-gray-200 border border-gray-300 rounded text-[13px] cursor-pointer"
                    onClick={() => {
                      setModalMode("REFERENCE");
                      setShowLineModal(true);
                    }}
                  >
                    참조자 찾기
                  </button>
                </div>
                {Array.isArray(approvalLine.references) &&
                  approvalLine.references.map((emp, i) => (
                    <div
                      key={emp.empNo}
                      className="flex items-center justify-between bg-white border border-gray-300 rounded px-3 py-2 mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-gray-500 w-4">{i + 1}</span>
                        <img
                          src={`https://placehold.co/28x28?text=${i + 1}`}
                          alt="profile"
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="leading-tight flex gap-1 items-center">
                          {" "}
                          {/* flex 적용 */}
                          <div className="font-medium text-gray-900 text-[13px]">{emp.eName}</div>
                          <div className="text-[11px] text-gray-500">
                            {emp.jobName} {/* ✅ jobNo → jobName */}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {emp.deptName} {/* ✅ 추가 */}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-green-500 text-white px-2 py-[1px] text-[11px] rounded">참조</span>
                        <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* 첨부파일 영역 전체 */}
            <div className="border border-gray-300 rounded p-3 bg-gray-50">
              {/* 하얀 미리보기 박스 */}
              <div className="bg-white border border-gray-300 rounded px-3 py-2 mb-2 h-[150px] overflow-y-auto text-[12px] text-gray-800 space-y-1">
                {uploadFiles.length === 0 ? (
                  <div className="text-gray-400">첨부된 파일이 없습니다</div>
                ) : (
                  uploadFiles.map((file, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="break-all">
                        • {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <X
                        className="w-4 h-4 text-gray-400 cursor-pointer ml-2"
                        onClick={() => handleFileDelete(index)}
                      />
                    </div>
                  ))
                )}
              </div>
              {/* 내 PC 버튼 */}
              <div className="flex gap-2 w-[150px] mx-auto">
                <label className="flex-1 border border-gray-300 py-1 text-[12px] rounded text-center cursor-pointer">
                  내 PC
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => setUploadFiles([...uploadFiles, ...Array.from(e.target.files)])}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className="absolute bottom-0 left-0 w-full bg-gray-100 px-4 py-3 border-t border-gray-300 flex justify-end gap-2">
            <div className="flex items-center px-4 py-1 border bg-white border-gray-300 rounded-md">
              <input
                id="urgent"
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-4 h-4 text-purple-600"
              />
              <label htmlFor="urgent" className="ml-2">
                긴급결재
              </label>
            </div>

            {/* ✅ 임시저장 버튼 추가 */}
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2.5 rounded cursor-pointer transition-colors"
              onClick={handleSaveAsTemporary}
            >
              임시저장
            </button>

            <button
              className="bg-[#7e5be3] hover:bg-[#6b46c1] text-white px-6 py-2.5 rounded cursor-pointer transition-colors"
              onClick={handleSubmit}
            >
              기안
            </button>
          </div>
        </aside>
      </div>
      <ApprovalLineModal
        isOpen={showLineModal}
        modalMode={modalMode}
        onClose={() => setShowLineModal(false)}
        onSave={(selectedList) => {
          console.log("선택된 리스트:", selectedList);
          setApprovalLine((prev) => ({
            ...prev,
            [modalMode === "APPROVER" ? "approvers" : "references"]: selectedList,
          }));
          setShowLineModal(false);
        }}
        category={category}
      />
    </div>
  );
};

export default ApprovalForm;
