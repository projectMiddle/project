import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApprovalForm = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const category = searchParams.get("category") || "기안서";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isUrgent, setIsUrgent] = useState(false);
    const [employee, setEmployee] = useState(null); // 로그인된 사원 정보
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState("");

    const categoryTemplates = {
        기안서: `※ 기안 목적:\n\n※ 관련 내용:\n\n※ 요청 사항:\n`,
        보고서: `※ 주요 내용:\n\n※ 결론 및 제안:\n`,
        연차신청서: `※ 연차 기간: yyyy-mm-dd ~ yyyy-mm-dd\n\n※ 사유:\n`,
        출장신청서: `※ 출장 일자:\n\n※ 출장 지역:\n\n※ 출장 목적:\n\n※ 비고:\n`,
    };

    // 사원 정보 불러오기
    useEffect(() => {
        axios.get("/api/employees/me")
            .then((res) => setEmployee(res.data))
            .catch((err) => console.error("사원 정보 불러오기 실패", err));
    }, []);

    // 템플릿 세팅
    useEffect(() => {
        setContent(categoryTemplates[category] || "");
    }, [category]);

    const handleSubmit = async () => {
        if (!employee) return alert("사원 정보를 불러오는 중입니다...");

        try {
            await axios.post("/api/approvals", {
                appDocCategory: category,
                appDocTitle: title,
                appDocContent: content,
                appIsUrgent: isUrgent,
                appIsFinalized: false,
                empNo: employee.empNo,
                deptNo: employee.deptNo.deptNo
            });

            alert("문서가 성공적으로 제출되었습니다 ✅");
            navigate("/yongjae/approval/list");
        } catch (error) {
            console.error("문서 제출 실패", error);
            alert("제출 중 오류 발생 ❌");
        }
    };

    // 문서 번호 자동 생성성
    const [nextDocNo, setNextDocNo] = useState(null);

    useEffect(() => {
        axios.get("/api/approvals/next-doc-no")
            .then((res) => setNextDocNo(res.data.nextAppDocNo))
            .catch((err) => {
                console.error("문서번호 불러오기 실패", err);
                setNextDocNo("자동생성");
            });
    }, []);

    return (
        <div className="flex bg-[#fff9fd] min-h-screen text-sm font-semibold text-black">
            <div className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* 상단 버튼 */}
                    <div className="flex gap-2 mb-6">
                        <button className="border border-gray-300 rounded-md px-4 py-1">결재선지정</button>
                        <button className="border border-gray-300 rounded-md px-4 py-1">파일첨부</button>
                        <button onClick={() => setShowPasswordModal(true)} className="border border-gray-300 rounded-md px-4 py-1">보안설정</button>
                        <div className="flex items-center px-4 py-1 border border-gray-300 rounded-md">
                            <input
                                id="urgent"
                                type="checkbox"
                                checked={isUrgent}
                                onChange={(e) => setIsUrgent(e.target.checked)}
                                className="w-4 h-4 text-purple-600"
                            />
                            <label htmlFor="urgent" className="ml-2">긴급결재</label>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-6">전자 결재 - {category}</h2>

                    {/* 입력 폼 */}
                    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-gray-500 mb-1">기안부서</label>
                                <input
                                    type="text"
                                    value={employee?.deptNo?.deptName || ""}
                                    readOnly
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">직위</label>
                                <input
                                    type="text"
                                    value={employee?.jobNo?.jobName || ""}
                                    readOnly
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">기안자</label>
                                <input
                                    type="text"
                                    value={employee?.eName || ""}
                                    readOnly
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">문서분류</label>
                                <input
                                    type="text"
                                    value={category}
                                    readOnly
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">기안일자</label>
                                <input
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 mb-1">문서번호</label>
                                <input
                                    type="text"
                                    value={nextDocNo !== null ? `문서-${nextDocNo}` : "자동생성"}
                                    readOnly
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full bg-gray-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-1">제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 mb-1">문서본문</label>
                            <textarea
                                rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border border-gray-300 px-3 py-2 rounded-md w-full resize-none min-h-[400px]"
                            ></textarea>
                        </div>

                        <div className="text-right pt-4">
                            <button
                                onClick={handleSubmit}
                                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
                            >
                                문서 제출
                            </button>
                        </div>
                    </div>

                    {/* 보안설정 모달 */}
                    {showPasswordModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                                <h3 className="text-lg font-bold mb-4">문서 비밀번호 입력</h3>
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4"
                                />
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowPasswordModal(false)} className="text-gray-600 hover:text-black">취소</button>
                                    <button onClick={() => setShowPasswordModal(false)} className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">확인</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApprovalForm;
