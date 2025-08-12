import React from "react";

const MainApplyInformation = () => {
  return <div>
    <section className="w-full bg-white text-gray-900 mt-20 mb-20">
      {/* 전체 최대 폭 및 좌우 패딩 */}
      <h1 className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-2 sm:py-10 text-black text-4xl font-extrabold leading-snug">채용 안내</h1>
      <div className="relative w-full h-full mx-auto">
        <img
          src="https://talent.hyundai.com/static/images/fairness/banner.jpg"
          alt="채용 안내"
        />
        <div className="absolute bottom-5 right-5 p-2">
          <p className="text-white text-sm drop-shadow-lg">Image from: Hyundai</p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-2 py-8 sm:py-10">
        {/* 헤더 타이틀 */}
        <h1 className="text-2xl sm:text-3xl font-extrabold leading-snug mt-5">
          SOLTech는 채용 과정 전반의 공정성을 확보하기 위해
          <br className="hidden sm:block" />
          <span className="whitespace-nowrap">다음과 같은 기준을 마련하여 운영하고 있습니다.</span>
        </h1>

        {/* 상단 안내 목록 */}
        <ul className="mt-15 space-y-5 text-sm sm:text-[15px] leading-relaxed list-disc pl-5">
          <li>
            SOLTech는 채용을 빌미로 금품이나 향응 또는 그에 준하는 대가를
            명목으로 요구하지 않으며, 채용 과정에서 발생하는 부당한 청탁이나 압력,
            강요 등 부적절한 행위에 대해 엄정히 대응하고 있습니다.
          </li>
          <li>
            SOLTech는 성별, 연령, 종교, 출신 배경, 학력 등을 이유로 지원자를
            차별 대우하지 않으며, 누구에게나 동등한 채용 기회를 제공하고 있습니다.
          </li>
          <li>
            SOLTech는 지원서 접수, 전형 안내, 발표 등 채용 절차와 관련된
            안내는 채용 홈페이지를 통해 공지하고 있으며, 필요 시 SOLTech 채용
            담당자가 직접 연락 드릴 수 있습니다.
          </li>
          <li>
            SOLTech는 채용 전형 중 아래에 해당하는 부정행위 사실이 적발되는
            경우에 지원 자격을 묵과 처리하고, 향후 SOLTech 채용 전형에 대한
            채용을 제한하고 있습니다.
          </li>
        </ul>

        {/* 본문 3섹션: 좌측 인디케이터 + 우측 카드 */}
        <div className="mt-15 space-y-6">
          {/* 공통 섹션 컴포넌트화 없이, 요구사항: 추가 파일 생성 지양 → inline 구성 */}
          {/* 1) 서류전형 */}
          <div className="grid grid-cols-[26px_1fr] gap-4 sm:gap-6">
            {/* 왼쪽 타임라인 점 */}
            <div className="flex justify-center">
              <span
                aria-hidden
                className="mt-2 inline-block h-3.5 w-3.5 rounded-full bg-violet-500 ring-4 ring-violet-100"
                title="서류전형"
              />
            </div>

            {/* 우측 카드 */}
            <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* 섹션 제목 */}
              <header className="px-4 sm:px-6 py-3 border-b border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold">서류전형</h2>
              </header>

              {/* 내용 목록 */}
              <ol className="px-4 sm:px-6 py-4 space-y-2 text-sm sm:text-[15px] leading-relaxed list-decimal pl-5">
                <li>
                  타인의 지원서를 무단으로 표절하거나 대리 작성 후 제출하는 경우
                </li>
                <li>
                  학력 및 경력사항 등의 정보를 허위로 기재하는 경우
                </li>
                <li>
                  증빙 서류(졸업증명서, 자격증 등)를 위조하거나 허위로 발급 받아
                  제출하는 경우
                </li>
                <li>
                  그 외 부적절한 방법으로 전형 결과에 영향을 미칠 수 있는 경우
                </li>
              </ol>
            </article>
          </div>

          {/* 2) 인·적성검사 */}
          <div className="grid grid-cols-[26px_1fr] gap-4 sm:gap-6">
            <div className="flex justify-center">
              <span
                aria-hidden
                className="mt-2 inline-block h-3.5 w-3.5 rounded-full bg-violet-500 ring-4 ring-violet-100"
                title="인·적성검사"
              />
            </div>

            <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <header className="px-4 sm:px-6 py-3 border-b border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold">인 · 적성검사</h2>
              </header>

              <ol className="px-4 sm:px-6 py-4 space-y-2 text-sm sm:text-[15px] leading-relaxed list-decimal pl-5">
                <li>
                  신분증을 위·변조하거나 대리 응시를 통해 신분을 속이고 검사에
                  응시하는 경우
                </li>
                <li>
                  검사 도중 규정에 의해 허용되지 않은 외부 자료(인터넷 등) 및
                  보조 기기를 사용하는 경우
                </li>
                <li>검사 문항 일부 또는 전체를 외부에 유출하는 경우</li>
                <li>
                  그 외 부적절한 방법으로 검사 결과에 영향을 미칠 수 있는 경우
                </li>
              </ol>
            </article>
          </div>

          {/* 3) 면접전형 */}
          <div className="grid grid-cols-[26px_1fr] gap-4 sm:gap-6">
            <div className="flex justify-center">
              <span
                aria-hidden
                className="mt-2 inline-block h-3.5 w-3.5 rounded-full bg-violet-500 ring-4 ring-violet-100"
                title="면접전형"
              />
            </div>

            <article className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <header className="px-4 sm:px-6 py-3 border-b border-gray-100">
                <h2 className="text-base sm:text-lg font-semibold">면접전형</h2>
              </header>

              <ol className="px-4 sm:px-6 py-4 space-y-2 text-sm sm:text-[15px] leading-relaxed list-decimal pl-5">
                <li>
                  신분증을 위·변조하거나 대리 응시를 통해 신분을 속이고 면접에
                  참석하는 경우
                </li>
                <li>
                  전형 도중 규정에 의해 허용되지 않은 외부 자료(인터넷 등) 및 보조
                  기기를 사용하는 경우
                </li>
                <li>면접 문항이나 내용을 외부에 무단으로 공유하는 경우</li>
                <li>
                  그 외 부적절한 방법으로 전형 결과에 영향을 미칠 수 있는 경우
                </li>
              </ol>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>;
};

export default MainApplyInformation;
