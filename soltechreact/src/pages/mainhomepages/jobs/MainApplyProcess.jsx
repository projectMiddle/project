import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainApplyProcess = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    console.log("[ApplyProcessPage] mounted");
    const onScroll = () => {
      const s = window.scrollY > 24;
      if (s !== scrolled) {
        console.log("[ApplyProcessPage] scrollY:", window.scrollY, "→ scrolled:", s);
        setScrolled(s);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  const sections = [
    {
      kTitle: "신입 채용",
      cta: "FAQ 바로가기",
      processTitle: "신입 채용 프로세스",
      steps: [
        { no: "01", title: "서류 전형" },
        { no: "02", title: "직무 면접/인성 검사" },
        { no: "03", title: "종합 면접" },
        { no: "04", title: "채용 검진 및 입사" },
      ],
      recruitTitle: "모집 시기",
      recruitNotes: ["· 3월, 6월, 9월, 12월"],
      qualTitle: "지원 자격",
      qualifications: [
        "학/석사 졸업예정자 또는 기졸업자 (박사는 경력 채용 지원 권장)",
        "해외여행에 결격 사유가 없으신 분",
        "남성의 경우, 병역을 마치셨거나 면제되신 분",
        "접수 완료일 기준 2년 내 취득한 영어 회화 성적(SPA/OPIC/TOEIC Speaking/TEPS Speaking) 보유",
      ],
      footnote: [
        "※ 최소 요건은 직무별 상이",
        "※ 영어권 해외대학 졸업(예정)자는 영어 성적 제출 면제 (미/영/캐나다(퀘벡 제외)/호주/뉴질랜드/아일랜드)",
        "적용 직군: 일반/연구직, 기술직 (기술직은 공고에 따라 상이할 수 있음)",
      ],
    },
    {
      kTitle: "경력 채용",
      cta: "FAQ 바로가기",
      processTitle: "경력 채용 프로세스",
      steps: [
        { no: "01", title: "서류 전형" },
        { no: "02", title: "면접 전형/인성 검사" },
        { no: "03", title: "채용 검진 및 입사" },
      ],
      recruitTitle: "모집 시기",
      recruitNotes: ["· 매월"],
      qualTitle: "지원 자격",
      qualifications: [
        "학사 이상의 학위를 보유하신 분",
        "해외여행에 결격 사유가 없으신 분",
        "남성의 경우, 병역을 마치셨거나 면제되신 분",
        "모집공고에 부합하는 경력 및 자격 보유",
      ],
      footnote: [
        "적용 직군: 일반/연구직, 기술직",
        "일반/연구직은 필요 시 Pre-Interview/과제 진행 가능",
        "기술직은 공고에 따라 상이할 수 있음",
      ],
    },
    {
      kTitle: "인턴십",
      cta: "FAQ 바로가기",
      processTitle: "인턴 채용 프로세스",
      steps: [
        { no: "01", title: "서류 전형" },
        { no: "02", title: "직무 면접/인성 검사" },
        { no: "03", title: "인턴십 합격 발표" },
        { no: "04", title: "인턴십(5주)" },
        { no: "05", title: "최종 합격 발표" },
        { no: "06", title: "채용 검진 및 입사" },
      ],
      recruitTitle: "모집 시기",
      recruitNotes: ["· 3월, 9월"],
      qualTitle: "지원 자격",
      qualifications: [
        "학/석사 재학생 중 6개월 후 졸업 예정자",
        "해외여행에 결격 사유가 없으신 분",
        "남성의 경우, 병역을 마치셨거나 면제되신 분",
        "접수 완료일 기준 2년 내 취득한 영어 회화 성적(SPA/OPIC/TOEIC Speaking/TEPS Speaking) 보유",
      ],
      footnote: [
        "※ 최소 요건은 직무별 상이",
        "※ 영어권 해외대학 졸업(예정)자는 영어 성적 제출 면제",
        "적용 직군: 일반/연구직, 영업/정비직 (영업/정비직은 공고에 따라 상이할 수 있음)",
      ],
    },
  ];

  return <div className="min-h-screen bg-white mb-20 mt-25">

    {/* 히어로 */}
    <h1 className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-2 sm:py-10 text-black text-4xl font-extrabold leading-snug">채용 프로세스</h1>
    <div className="relative w-full h-full mx-auto">
      <img
        src="https://talent.hyundai.com/static/images/apply/process_top_banner.png"
        alt="채용 프로세스"
      />
      <div className="absolute bottom-5 right-5 p-2">
        <p className="text-white text-sm drop-shadow-lg">Image from: Hyundai</p>
      </div>
    </div>

    {/* 본문 */}
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 space-y-16">
      {sections.map((s, idx) => {
        const anchor = idx === 0 ? "entry" : idx === 1 ? "career" : "intern";
        return (
          <section id={anchor} key={s.kTitle} className="scroll-mt-24">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {s.kTitle}
                </h2>
                <p className="mt-5 text-sm opacity-90">
                  지원 관련 자세한 내용이 궁금하다면?{" "}
                </p>
                {s.cta && (
                  <Link
                    to={"/faq"}
                    className="mt-2 inline-flex items-center gap-2 text-sm text-sky-700 hover:text-sky-900"
                  >
                    <span aria-hidden>{s.cta}</span>
                  </Link>
                )}

              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {s.processTitle}
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {s.steps.map((step) => (
                  <div
                    key={step.no + step.title}
                    className="rounded-xl border border-gray-200 p-5 bg-white hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 font-semibold">
                        {step.no}
                      </span>
                      <span className="text-[15px] font-medium text-gray-800">
                        {step.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 rounded-xl border border-gray-200 p-6">
                <h4 className="text-base font-semibold text-gray-900">
                  {s.recruitTitle}
                </h4>
                <ul className="mt-3 space-y-1 text-sm text-gray-700 list-disc pl-5">
                  {s.recruitNotes.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 rounded-xl border border-gray-200 p-6">
                <h4 className="text-base font-semibold text-gray-900">
                  {s.qualTitle}
                </h4>
                <ul className="mt-3 space-y-2 text-[15px] text-gray-800 list-disc pl-5">
                  {s.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>

                {s.footnote?.length ? (
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    {s.footnote.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  </div>;
};

export default MainApplyProcess;
