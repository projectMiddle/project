import React, { useLayoutEffect, useRef, useState } from 'react';

import { MdChevronLeft, MdChevronRight } from "react-icons/md"

const IntraBottomSection = () => {

    const [selectedTab, setSelectedTab] = useState("all");
    const [gradientStyle, setGradientStyle] = useState("");

    // ref 설정 (각 탭마다 별도의 ref 선언!)
    const containerRef = useRef(null);
    const allRef = useRef(null);
    const noticeRef = useRef(null);
    const freeRef = useRef(null);
    const suggestRef = useRef(null);
    const dataRef = useRef(null);

    useLayoutEffect(() => {
        if (containerRef.current && allRef.current && noticeRef.current && freeRef.current && suggestRef.current && dataRef.current) {
            const containerWidth = containerRef.current.offsetWidth;

            const refs = {
                all: allRef,
                notice: noticeRef,
                free: freeRef,
                suggest: suggestRef,
                data: dataRef
            };

            const tab = refs[selectedTab].current;

            const tabStart = (tab.offsetLeft / containerWidth) * 100;
            const tabEnd = ((tab.offsetLeft + tab.offsetWidth) / containerWidth) * 100;

            setGradientStyle(
                `linear-gradient(to right,
        #d1d5db 0%,
        #d1d5db ${tabStart}%,
        #6b46c1 ${tabStart}%,
        #6b46c1 ${tabEnd}%,
        #d1d5db ${tabEnd}%,
        #d1d5db 100%)`
            );

            console.log(`현재 탭: ${selectedTab}, 탭 위치: ${tabStart}% ~ ${tabEnd}%`); // 확인용 console.log 추가
        }
    }, [selectedTab]);

    // 오른쪽 섹션
    const [approvalTab, setApprovalTab] = useState("approval");
    const [approvalGradient, setApprovalGradient] = useState("");
    const approvalTabContainerRef = useRef(null);
    const approvalRef = useRef(null);
    const mailRef = useRef(null);
    const noteRef = useRef(null);

    useLayoutEffect(() => {
        if (
            approvalTabContainerRef.current &&
            approvalRef.current &&
            mailRef.current &&
            noteRef.current
        ) {
            const containerWidth = approvalTabContainerRef.current.offsetWidth;

            const refs = {
                approval: approvalRef,
                mail: mailRef,
                note: noteRef,
            };
            const tab = refs[approvalTab].current;
            const tabStart = (tab.offsetLeft / containerWidth) * 100;
            const tabEnd = ((tab.offsetLeft + tab.offsetWidth) / containerWidth) * 100;

            setApprovalGradient(
                `linear-gradient(to right,
        #d1d5db 0%,
        #d1d5db ${tabStart}%,
        #6b46c1 ${tabStart}%,
        #6b46c1 ${tabEnd}%,
        #d1d5db ${tabEnd}%,
        #d1d5db 100%)`
            );
            // 확인용 log
            console.log(`[전자결재탭] 선택: ${approvalTab}, 위치: ${tabStart.toFixed(2)}% ~ ${tabEnd.toFixed(2)}%`);
        }
    }, [approvalTab]);

    return (
        <>
            {/* main 왼쪽 섹션 */}
            <section className="col-span-14 w-full p-10 bg-white border-l border-gray-300">
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4 relative" ref={containerRef}>
                        <div className="flex space-x-5 w-full">
                            <button
                                ref={allRef}
                                onClick={() => setSelectedTab("all")}
                                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "all" ? "text-[#6b46c1]" : "text-gray-500"}`}
                            >
                                전체
                            </button>
                            <button
                                ref={noticeRef}
                                onClick={() => setSelectedTab("notice")}
                                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "notice" ? "text-[#6b46c1]" : "text-gray-500"}`}
                            >
                                공지사항
                            </button>
                            <button
                                ref={freeRef}
                                onClick={() => setSelectedTab("free")}
                                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "free" ? "text-[#6b46c1]" : "text-gray-500"}`}
                            >
                                자유게시판
                            </button>
                            <button
                                ref={suggestRef}
                                onClick={() => setSelectedTab("suggest")}
                                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "suggest" ? "text-[#6b46c1]" : "text-gray-500"}`}
                            >
                                건의게시판
                            </button>
                            <button
                                ref={dataRef}
                                onClick={() => setSelectedTab("data")}
                                className={`text-sm font-semibold pb-2 focus:outline-none ${selectedTab === "data" ? "text-[#6b46c1]" : "text-gray-500"}`}
                            >
                                자료게시판
                            </button>
                        </div>

                        <div className="flex space-x-2">
                            <button className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 hover:bg-gray-100 transition">
                                <MdChevronLeft className="w-6 h-6" />
                            </button>
                            <button className="p-1 mb-2 rounded-full border text-[#6b46c1] border-gray-300 hover:bg-gray-100 transition">
                                <MdChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div
                            className="absolute bottom-0 left-0 h-0.5 w-full"
                            style={{ background: gradientStyle }}
                        ></div>
                    </div>

                    <div className="text-sm text-gray-600">
                        {selectedTab === "all" && "전체 내용입니다."}
                        {selectedTab === "notice" && "공지사항 내용입니다."}
                        {selectedTab === "free" && "자유게시판 내용입니다."}
                        {selectedTab === "suggest" && "건의게시판 내용입니다."}
                        {selectedTab === "data" && "자료게시판 내용입니다."}
                    </div>
                </div>
            </section>

            {/* main 오른쪽 섹션 */}
            <section className="col-span-13 w-full p-10 pt-1 bg-gray-50 border-r border-gray-300">
                <div className=''>
                    {/* 전자결재/메일/쪽지 탭 영역 */}
                    <div className=''>
                        <section className="w-full bg-white rounded-2xl p-6 border border-gray-200 shadow flex flex-col">
                            <div className="flex items-center justify-between relative mb-4" ref={approvalTabContainerRef}>
                                <div className="flex space-x-5 w-full">
                                    <button
                                        ref={approvalRef}
                                        onClick={() => setApprovalTab("approval")}
                                        className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "approval" ? "text-[#6b46c1]" : "text-gray-500"
                                            }`}
                                    >
                                        전자결재
                                    </button>
                                    <button
                                        ref={mailRef}
                                        onClick={() => setApprovalTab("mail")}
                                        className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "mail" ? "text-[#6b46c1]" : "text-gray-500"
                                            }`}
                                    >
                                        메일
                                    </button>
                                    <button
                                        ref={noteRef}
                                        onClick={() => setApprovalTab("note")}
                                        className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "note" ? "text-[#6b46c1]" : "text-gray-500"
                                            }`}
                                    >
                                        쪽지
                                    </button>
                                </div>

                                {/* 하단 gradient bar */}
                                <div
                                    className="absolute bottom-0 left-0 h-0.5 w-full"
                                    style={{ background: approvalGradient, transition: "background 0.3s" }}
                                ></div>
                            </div>
                            {/* 탭별 컨텐츠 (임시) */}
                            <div className="flex-1 text-gray-700 min-h-[80px]">
                                {approvalTab === "approval" && <div>전자결재 내용입니다.</div>}
                                {approvalTab === "mail" && <div>메일함 내용입니다.</div>}
                                {approvalTab === "note" && <div>쪽지함 내용입니다.</div>}
                            </div>
                        </section>
                    </div>
                    {/* 전자결재/메일/쪽지 탭 영역 */}
                    <div className=''>
                        <div className='col-span-1'>
                            <section className="w-full bg-white rounded-2xl mt-4 p-6 border border-gray-200 shadow flex flex-col">
                                <div className="flex items-center justify-between relative mb-4" ref={approvalTabContainerRef}>
                                    <div className="flex space-x-5 w-full">
                                        <button
                                            ref={approvalRef}
                                            onClick={() => setApprovalTab("approval")}
                                            className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "approval" ? "text-[#6b46c1]" : "text-gray-500"
                                                }`}
                                        >
                                            전자결재
                                        </button>
                                        <button
                                            ref={mailRef}
                                            onClick={() => setApprovalTab("mail")}
                                            className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "mail" ? "text-[#6b46c1]" : "text-gray-500"
                                                }`}
                                        >
                                            메일
                                        </button>
                                        <button
                                            ref={noteRef}
                                            onClick={() => setApprovalTab("note")}
                                            className={`text-sm font-semibold pb-2 focus:outline-none transition-colors ${approvalTab === "note" ? "text-[#6b46c1]" : "text-gray-500"
                                                }`}
                                        >
                                            쪽지
                                        </button>
                                    </div>

                                    {/* 하단 gradient bar */}
                                    <div
                                        className="absolute bottom-0 left-0 h-0.5 w-full"
                                        style={{ background: approvalGradient, transition: "background 0.3s" }}
                                    ></div>
                                </div>
                                {/* 탭별 컨텐츠 (임시) */}
                                <div className="flex-1 text-gray-700 min-h-[80px]">
                                    {approvalTab === "approval" && <div>전자결재 내용입니다.</div>}
                                    {approvalTab === "mail" && <div>메일함 내용입니다.</div>}
                                    {approvalTab === "note" && <div>쪽지함 내용입니다.</div>}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IntraBottomSection;