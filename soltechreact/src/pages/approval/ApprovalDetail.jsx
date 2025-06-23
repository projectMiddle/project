import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApprovalDetail, processApproval } from "../../api/approvalApi";

const ApprovalDetail = () => {

    // 임시용
    const myEmpNo = 1015;

    const { appDocNo } = useParams();
    const [doc, setDoc] = useState(null);
    const [comment, setComment] = useState("");

    // 상세정보 요청
    useEffect(() => {
        fetchApprovalDetail(appDocNo)
            .then((data) => {
                console.log("상세 문서 조회:", data);
                setDoc(data);
            })
            .catch((err) => {
                console.error("문서 조회 실패", err);
            });
    }, [appDocNo]);

    useEffect(() => {
        if (doc) {
            console.log("현재 사번:", myEmpNo);
            console.log("기안자 사번:", doc.empNo);
            console.log("결재자 목록:", doc.approvers);
            console.log("참조자 목록:", doc.references);
            console.log("isApprover:", isApprover);
            console.log("isDrafter:", isDrafter);
            console.log("isReference:", isReference);
        }
    }, [doc]);

    if (!doc) {
        return (
            <div className="flex justify-center items-center h-[400px] text-gray-500 text-lg">
                문서 로딩 중...
            </div>
        );
    }

    // 조건 분기 : 결재자 / 기안자, 참조자
    const isApprover = doc?.approvers?.some(
        (approver) => approver.empNo === myEmpNo && approver.status === "PENDING"
    );
    // 오류용 ===========================================
    doc.approvers.forEach((a, i) => {
        console.log(`🔍 [${i}] empNo: ${a.empNo}, status: ${a.status}`);
    });
    console.log("myEmpNo:", myEmpNo);

    // ===============================================

    const isDrafter = doc?.empNo === myEmpNo;

    const isReference = doc?.references?.some(
        (ref) => ref.empNo === myEmpNo
    );

    // 결재 처리
    const handleApproval = async (status) => {
        try {
            const payload = {
                appDocNo: doc.appDocNo,
                empNo: myEmpNo,
                status: status, // "APPROVED" or "REJECTED"
                comment: currentApprover?.comment || "", // 옵션: 의견 필드 만들면 같이 전달
            };
            console.log("결재 처리 payload:", payload);

            const res = await processApproval(payload);
            console.log("결재 처리 성공:", res.data);
        } catch (err) {
            console.error("결재 처리 실패", err);
        }
    };

    // 코멘트
    const approverCommentsText = doc.approvers
        .map((a) => `${a.empName}: ${a.comment || ""}`)
        .join("\n");

    const currentApprover = doc.approvers.find(
        (a) => a.empNo === myEmpNo && a.status === "PENDING"
    );

    return (
        <div className="flex w-full">
            <div className="flex-1">
                <div className="bg-[#9776eb] text-white font-bold text-[17px] text-center py-[14px]">
                    &nbsp;
                </div>

                <main className="flex-1 bg-white px-10 py-6 relative overflow-auto pb-16">
                    <div className="p-10 w-full bg-white shadow rounded mx-auto mt-6 border border-gray-200 relative">
                        {/* 카테고리명 상단 제목 */}
                        <h1 className="text-2xl font-bold text-center mb-6">
                            {doc.appDocCategory}
                        </h1>
                        {/* 결재자 결재란 박스 - 오른쪽 정렬 & 도장 이미지 자리 확보 */}
                        {doc.approvers && doc.approvers.length > 0 && (
                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-end mt-10 mb-8 items-start">
                                    {/* 왼쪽: 세로 텍스트 "결재" */}
                                    <div className="flex flex-col items-center justify-center w-[40px] h-[90px] border border-gray-300 bg-gray-50 rounded text-sm font-semibold">
                                        <span>결</span>
                                        <span>재</span>
                                    </div>
                                    {/* 결재 박스들 (정사각형) - 서로 붙이기 */}
                                    <div className="flex">
                                        {doc.approvers.map((approver, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                {/* 정사각형 도장 자리 */}
                                                <div className="w-[90px] h-[90px] border border-gray-300 bg-white rounded-r-none rounded-l-none"></div>
                                                {/* 이름 출력 */}
                                                <div className="text-[13px] text-center mt-1 w-[90px]">
                                                    {approver.empName}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* 테이블 방식 문서 정보 출력 */}
                        <table className="w-full table-fixed border border-gray-300 text-sm">
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <th className="w-1/6 bg-gray-100 p-2 text-left">기안자명</th>
                                    <td className="w-2/6 p-2">{doc.eName}</td>
                                    <th className="w-1/6 bg-gray-100 p-2 text-left">부서명</th>
                                    <td className="w-2/6 p-2">{doc.deptName}</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <th className="bg-gray-100 p-2 text-left">문서번호</th>
                                    <td className="p-2">{doc.appDocNo}</td>
                                    <th className="bg-gray-100 p-2 text-left">기안일자</th>
                                    <td className="p-2">{doc.appDocDate}</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <th className="bg-gray-100 p-2 text-left">제목</th>
                                    <td className="p-2" colSpan={3}>{doc.appDocTitle}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* 본문 영역 (div로 분리) */}
                        <table className="w-full table-fixed border border-gray-300 mt-4 rounded text-sm">
                            <tbody>
                                <tr className="border-b border-gray-300 bg-gray-100">
                                    <th className="p-2 text-left w-1/6">본문</th>
                                    <td className="p-0" colSpan={3}></td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className="p-4">
                                        <textarea
                                            value={doc.appDocContent || "내용 없음"}
                                            readOnly
                                            className="w-full h-[400px] resize-none border border-gray-300 rounded p-3 text-sm bg-gray-50 whitespace-pre-wrap leading-relaxed"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <aside className="w-[400px] bg-white border-l border-gray-300 pt-0 flex flex-col relative">
                {/* 상단바 */}
                <div className="bg-[#9776eb] text-white font-bold text-[17px] text-center py-[14px]">
                    &nbsp;
                </div>
                <div className="border-t border-gray-300"></div>

                {/* 내부 컨텐츠 */}
                <div className="p-4 pb-20 flex-grow overflow-y-auto">
                    <div className="text-[15px] font-bold text-gray-700 mb-4">
                        기안 정보
                    </div>

                    <div className="flex justify-center my-4">
                        <div className="bg-gray-300 h-[1.5px] w-full rounded" />
                    </div>

                    {/* 결재자지정 */}
                    <div className="mb-6">
                        <div className="text-[12px] font-semibold text-gray-700 mb-2">
                            결재자
                        </div>
                        <div className="border border-gray-300 rounded p-3 bg-gray-50">
                            <div className="text-[13px] font-semibold text-gray-600 mb-2">
                                결재라인
                            </div>
                            {doc.approvers && doc.approvers.length > 0 ? (
                                doc.approvers.map((emp, i) => (
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
                                                <div className="font-medium text-gray-900 text-[13px]">
                                                    {emp.empName}
                                                </div>
                                                <div className="text-[11px] text-gray-500">{emp.jobName}</div>
                                                <div className="text-[11px] text-gray-500">{emp.deptName}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-center">
                                            <span
                                                className={`px-2 py-[1px] text-[11px] rounded text-white ${emp.status === "APPROVED"
                                                    ? "bg-green-500"
                                                    : emp.status === "REJECTED"
                                                        ? "bg-red-500"
                                                        : "bg-gray-400"
                                                    }`}
                                            >
                                                {emp.status === "APPROVED"
                                                    ? "승인"
                                                    : emp.status === "REJECTED"
                                                        ? "반려"
                                                        : "대기"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[13px] text-gray-500">결재자가 없습니다</div>
                            )}
                        </div>
                    </div>

                    {/* 첨부파일 */}
                    <div className="border border-gray-300 rounded p-3 bg-gray-50">
                        <div className="text-[13px] font-semibold text-gray-600 mb-2">
                            첨부파일
                        </div>
                        <div className="bg-white border border-gray-300 rounded px-3 py-2 mb-2 h-[150px] overflow-y-auto text-[12px] text-gray-800 space-y-1">
                            {(!doc.files || doc.files.length === 0) ? (
                                <div className="text-gray-400">첨부된 파일이 없습니다</div>
                            ) : (
                                doc.files.map((file, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="break-all">
                                            • {file.appFileName} ({file.appFileSize ? (file.appFileSize / 1024).toFixed(2) : "?"} KB)
                                        </span>
                                        <a
                                            href={`/files/${file.appFilePath}/${file.appFileUuid}_${file.appFileName}`}
                                            download
                                            className="text-blue-500 underline text-[11px] ml-2"
                                        >
                                            다운로드
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {doc.approvers.map((approver, index) => {
                        const isMine = approver.empNo === myEmpNo && approver.status === "PENDING";

                        return (
                            <div key={approver.empNo} className="border border-gray-300 rounded p-3 bg-gray-50 mt-6">
                                <div className="text-[13px] font-semibold text-gray-600 mb-2 flex justify-between">
                                    <span>🖋️ {approver.empName} ({approver.jobName})</span>
                                    <span className="text-[11px] text-gray-500">
                                        상태: {approver.status === "APPROVED" ? "승인" : approver.status === "REJECTED" ? "반려" : "대기"}
                                    </span>
                                </div>

                                <textarea
                                    className="bg-white border border-gray-300 rounded w-full px-3 py-2 h-[100px] text-[12px] text-gray-800"
                                    value={approver.comment || ""}
                                    readOnly={!isMine}
                                    onChange={(e) => {
                                        if (!isMine) return;
                                        const updated = [...doc.approvers];
                                        updated[index].comment = e.target.value;
                                        setDoc({ ...doc, approvers: updated });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* 하단 버튼 */}
                {isApprover && !isDrafter && !isReference ? (
                    <div className="absolute bottom-0 left-0 w-full bg-gray-100 px-4 py-3 border-t border-gray-300 flex justify-end gap-2">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded"
                            onClick={() => handleApproval("APPROVED")}
                        >
                            승인
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded"
                            onClick={() => handleApproval("REJECTED")}
                        >
                            반려
                        </button>
                    </div>
                ) : null}
            </aside>
        </div>
    );
};

export default ApprovalDetail;
