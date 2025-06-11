import React from "react";
import { Mail, PenLine, Bell, BarChart3, User2 } from "lucide-react";
import "./IntraHome.css";

function IntraHome() {
  return (
    <div className="container">
      <div className="layout">
        {/* 사이드바 */}
        <aside className="sidebar">
          <div className="avatar-box">
            <User2 className="avatar-icon" />
          </div>

          <div className="profile-info">
            <div className="name-tag">
              <span>이름</span>
              <span className="status-dot" />
            </div>
            <div className="department">부서</div>
            <button className="profile-button">정보 변경</button>
          </div>

          <div className="icon-grid">
            {[Mail, PenLine, Bell, BarChart3].map((Icon, idx) => (
              <div key={idx} className="icon-item">
                <Icon className="icon" />
                {["새 메일", "미결함", "업무 알림", "재경/인사"][idx]}
              </div>
            ))}
          </div>
        </aside>

        {/* 본문 컨텐츠 */}
        <main className="main-content">
          <section className="graph-widget">
            <span className="graph-placeholder">그래프 / 이미지</span>
          </section>

          <div className="widget-spacer" />

          <section className="notice-widget">공지</section>
          <section className="notice-widget">보류</section>

          <section className="schedule-widget">일정</section>

          <section className="table-wrapper">
            <div className="table-box">
              <div className="table-line-top" />
              <div className="table-column-1" />
              <div className="table-column-2" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
export default IntraHome;
