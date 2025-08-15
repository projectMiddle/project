// src/pages/CompanyTeam.jsx
import React from "react";
import { motion } from "framer-motion";

const teamData = [
  {
    name: "정용재",
    position: "CEO / 팀장",
    description: "ERD 설계, Notion 제작, 메인/인트라넷 홈페이지 제작, 디자인, 카카오맵 API, 전자결재, 서버, 디버깅",
    image: "/mainImages/company/jyj_pic.png", // 이미지 경로 변경 가능
  },
  {
    name: "이용성",
    position: "수석 연구원",
    description: "인트라넷 흐름 설계, 스케줄, 감사 로그, 사원 검색 기능",
    image: "/team/lys.jpg",
  },
  {
    name: "정동진",
    position: "책임 연구원",
    description: "회원관리, JWT 토큰, Google 로그인 API, Google Meet 화상 회의",
    image: "/team/jdj.jpg",
  },
  {
    name: "박병선",
    position: "책임 연구원",
    description: "급여 명세서, PDF, 복지몰",
    image: "/team/pbs.jpg",
  },
  {
    name: "장미경",
    position: "책임 연구원",
    description: "출결, 사원 정보 관리, 쪽지, 복지몰",
    image: "/team/jmk.jpg",
  },
  {
    name: "신승찬",
    position: "선임 연구원",
    description: "공지/자유 게시판, 댓글",
    image: "/team/ssc.jpg",
  },
];

export default function MainOurTeams() {
  const ceo = teamData[0];
  const members = teamData.slice(1);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="relative w-full h-full mx-auto mb-20">
        <motion.img
          src="/mainImages/company/our_teams.jpg"
          alt="회사 이미지"
          className="w-full h-full object-cover shadow"
          initial={{ scale: 1.15, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: "linear" }}
        />
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 items-center p-50 pt-50 px-80">
          {/* h2 - 1행 2열 */}
          <h2 className="text-white text-4xl font-bold drop-shadow-lg col-start-1 row-start-1">
            Our Future
          </h2>

          {/* p - 2행 4열 */}
          <p className="text-lg text-white font-semibold drop-shadow-lg col-start-4 row-start-2 text-right">
            시대를 앞서가는 사람들의 발걸음
          </p>
        </div>
        <div className="absolute bottom-5 right-5 p-2">
          <p className="text-white text-sm drop-shadow-lg">Image from: Freepik</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        {/* 대표 소개 */}
        <section className="text-center mb-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">Executive Leadership Team</h1>
          <div className="flex flex-col items-center mt-10">
            <img
              src={ceo.image}
              alt={ceo.name}
              className="w-40 h-40 object-cover rounded-full shadow-lg border-4 border-purple-200"
            />
            <h2 className="mt-6 text-2xl font-semibold text-purple-900">{ceo.name}</h2>
            <p className="text-sm text-gray-500">{ceo.position}</p>
            <p className="mt-4 max-w-2xl text-center text-gray-600">{ceo.description}</p>
          </div>
        </section>

        {/* 임원진 / 팀원 소개 */}
        <section>
          <h1 className="text-3xl font-bold text-gray-900 mb-20 text-center">Board of Executives</h1>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 object-cover rounded-full shadow-md border-2 border-purple-200"
                />
                <h2 className="mt-4 text-xl font-semibold text-purple-800">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.position}</p>
                <p className="mt-3 text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="flex flex-col justify-center items-center pb-50"></div>
    </div>
  );
}
