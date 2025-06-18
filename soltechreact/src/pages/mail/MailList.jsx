// 받은메일함/보낸메일함/휴지통 화면

import React from 'react';
import MailItem from '../../components/mail/MailItem';
import MailToolbar from '../../components/mail/MailToolbar';

const dummyList = [
  {
    id: 1,
    title: "프로젝트 자료 공유합니다",
    sender: "김대리",
    date: "2025-06-18",
    isRead: false,
  },
  {
    id: 2,
    title: "회의 일정 재조정 건",
    sender: "박사원",
    date: "2025-06-17",
    isRead: true,
  },
  {
    id: 3,
    title: "연차 사용 신청서",
    sender: "홍길동",
    date: "2025-06-16",
    isRead: false,
  },
];

const MailList = () => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <MailToolbar />

      {dummyList.map((mail) => (
        <MailItem key={mail.id} mail={mail} />
      ))}
    </div>
  );
};

export default MailList;