import React from "react";
import "@fontsource/pretendard";

const MainAboutUs = () => {
    return (
        <div className="bg-white text-gray-800 mt-20 font-[Pretendard]">
            <section className="text-center py-16 px-4">
                <h1 className="text-4xl font-bold text-purple-500">솔테크 주요 기능 소개</h1>
                <p className="mt-2 text-lg text-gray-500">하나의 시스템으로 사내 모든 흐름을 통합 관리합니다</p>
                <div className="mt-10">
                    <img src="/mainImages/aboutUs/about_us_first.png" alt="Intro banner" className="mx-auto max-w-4xl rounded-lg shadow" />
                </div>
            </section>

            <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-20">
                {[
                    { title: "출결 관리", desc: "로그인/로그아웃 시 자동 출퇴근 기록", img: "/mainImages/aboutUs/about_us_Attendance.png" },
                    { title: "공지사항", desc: "AD 이상 직급이 공지 작성 가능", img: "/mainImages/aboutUs/about_us_Notify.png" },
                    { title: "일정 관리", desc: "개인/부서 일정 달력으로 확인", img: "/mainImages/aboutUs/about_us_Calendar.png" },
                    { title: "급여 계산", desc: "연봉 기준 급여명세 자동 계산", img: "/mainImages/aboutUs/about_us_Money.png" },
                    { title: "전자결재", desc: "결재자 지정 및 참조자 공유", img: "/mainImages/aboutUs/about_us_Agreement.png" },
                    { title: "사내메일", desc: "첨부파일, 읽음 여부 포함 전송", img: "/mainImages/aboutUs/about_us_Email.png" },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-left">
                        <img src={item.img} alt={item.title} className="mx-auto mb-4 h-28 object-contain" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </section>

            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-purple-500 mb-4">📁 사용된 테이블 요약</h2>
                    <p className="text-gray-500 mb-8">우리가 설계하고 구현한 테이블은 다음과 같아요:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                        {["Department", "Employee", "JobRank", "Notice", "Schedule", "Attendance", "EmpPay", "ApprovalDocument", "AppRole", "AppFile", "MailSend", "MailAttachment"].map((table, index) => (
                            <div key={index} className="bg-gray-50 py-3 px-4 rounded-md border border-gray-200 shadow-sm">
                                {table}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <img src="/mainImages/aboutUs/about_us_2.png" alt="기능설계" className="rounded-xl shadow-md w-90" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">주요 기능 설계 기반</h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            이번 프로젝트의 모든 기능은 제가 학습한 기술들과 실제 실무 환경에서 자주 쓰이는 구성 방식을 토대로 설계되었습니다.
                            <br className="hidden md:block" /><br className="hidden md:block" />
                            출결, 공지, 결재, 메일, 일정, 급여 등 각각의 기능은 단순한 기능 구현을 넘어서 데이터 흐름과 사용자 경험(UX)을 고려한 구조로 연결되며,
                            Spring Boot + JPA + Oracle DB + React + TailwindCSS 조합의 전형적인 엔터프라이즈 개발 패턴을 따르고 있습니다.
                            <br className="hidden md:block" /><br className="hidden md:block" />
                            지금까지 학습한 ORM 설계, 정규화, 프론트-백 연동, 보안 개념, 화면 흐름 설계까지 모두 녹여낸 결과물입니다.
                        </p>
                        <a href="https://www.notion.so/211f85a884ab81d7b34df550843efa60?v=211f85a884ab8170b1a8000c8a5f1c7a" target="_blank" rel="noopener noreferrer">
                            <button className="mt-6 px-6 py-2 cursor-pointer bg-purple-100 text-purple-700 font-semibold rounded-md hover:bg-purple-200 transition">
                                설계 자세히 보기
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-purple-500 mb-8">🤝 협업 도구 & 개발 환경</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        다양한 도구와 환경을 조합하여 개발했습니다. 팀 간 협업은 GitHub와 Discord를 중심으로 진행하였고,
                        UI 디자인은 Figma, Storyset, API 연동은 Google API를 활용하였습니다.
                        모든 개발은 Visual Studio Code, DBeaver, Git, Postman을 활용해 체계적으로 구성했습니다.
                    </p>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">🚀 Stacks</h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>HTML / CSS / JavaScript</li>
                                <li>React.js / Java</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">🛠 Tools</h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>Visual Studio Code</li>
                                <li>DBeaver</li>
                                <li>Figma / Git</li>
                                <li>Storyset</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">💬 Collaboration</h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li>GitHub / Notion / Discord</li>
                                <li>Google API / ChatGPT</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <img src="/mainImages/aboutUs/about_us_1.png" alt="About Detail" className="rounded-xl shadow-md w-90" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">우리가 이 프로젝트를 설계한 이유</h2>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            기업 내부의 행정·출결·결재·소통 시스템을 하나로 통합하고 싶었습니다. 복잡하게 흩어져 있던 일정 관리, 공지, 출퇴근 기록, 급여 계산, 문서 결재, 사내메일 등을 한 플랫폼 안에서 직관적으로 관리할 수 있도록 설계했습니다.
                            <br className="hidden md:block" /><br className="hidden md:block" />
                            모든 기능은 사용자 중심의 흐름으로 연결되며, 관리자와 일반 사용자 모두가 쉽게 접근하고 활용할 수 있도록 UX/UI에 세심하게 신경을 썼습니다. 실무를 고려한 데이터베이스 설계와 간결한 구조는 유지보수에도 강점을 가집니다.
                        </p>
                        <button className="mt-6 px-6 py-2 bg-purple-100 text-purple-700 font-semibold rounded-md hover:bg-purple-200 transition">
                            더 알아보기
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-purple-500 text-center mb-8">📊 프로젝트 진행 흐름</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {["주제 선정", "자료 조사", "기능 정리", "엔티티/ERD 설계", "피그마 목업", "기능 구현", "프론트 꾸미기", "최종 점검"].map((step, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                                <div className="text-purple-500 font-bold text-lg mb-2">STEP {index + 1}</div>
                                <div className="text-gray-700">{step}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-purple-500 mb-6">💡 사용자가 기대할 수 있는 효과</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <img src="/mainImages/aboutUs/about_us_User_flow.png" alt="업무 자동화" className="h-20 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">업무 자동화</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">출결, 급여, 일정 등 반복되는 업무를 자동화해요.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <img src="/mainImages/aboutUs/about_us_Team_page.png" alt="소통 강화" className="h-20 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">사내 소통 강화</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">공지사항과 사내메일을 통해 모든 부서와 연결돼요.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <img src="/mainImages/aboutUs/about_us_Product_iteration.png" alt="전자결재" className="h-20 mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-800 mb-2">효율적인 승인 체계</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">전자결재를 통해 승인 과정을 빠르고 명확하게 처리해요.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainAboutUs;
