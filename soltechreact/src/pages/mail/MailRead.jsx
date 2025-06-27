import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { deleteReceivedMail, getDownloadUrl, getMailAttachments, getMailDetail } from "../../api/mailApi";
import useAuth from "../../hooks/useAuth";
// import useAuth from "../../hooks/useAuth";

const MailRead = () => {
  const { userInfo } = useAuth();
  const empNo = userInfo?.empNo;

  const { mailNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isReceiveView = location.pathname.includes("/intrasoltech/mail/receive");
  const [mail, setMail] = useState(null);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const data = await getMailDetail(isReceiveView, mailNo, empNo);

        setMail(data);

        // 첨부파일
        // const attachments = await getMailAttachments(mailNo);

        // setMail((prev) => ({
        //   ...prev,
        //   attachments,
        // }));
        const attachments = await getMailAttachments(mailNo);

        setMail((prev) => ({
          ...prev,
          attachments: attachments.map((name) => ({ mailFileName: name })),
        }));

        console.log("📩 메일 상세:", data);
      } catch (err) {
        console.error("📛 상세 조회 실패:", err);
        alert("메일 불러오기 실패");
      }
    };
    fetchMail();
  }, [mailNo, isReceiveView]);

  if (!mail) {
    return <div className="p-4 text-gray-500">메일 불러오는 중...</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteReceivedMail(mailNo, empNo);
      alert("삭제 완료");
      navigate("/intrasoltech/mail/receiveList");
    } catch (err) {
      console.error("📛 삭제 실패:", err);
      alert("삭제 실패");
    }
  };

  // const handleMoveToTrash = () => {
  //   // TODO: 휴지통 이동 API 연결 필요 시 구현
  //   navigate(isReceiveView ? "/mail/receiveList" : "/mail/sendList");
  // };

  const from = isReceiveView ? `${mail.sender?.name}<${mail.sender?.email}>` : "나";

  const to = !isReceiveView && mail.receivers ? mail.receivers.map((r) => `${r.name}<${r.email}>`).join(", ") : null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{mail.mailTitle}</h2>
      <div className="text-sm text-gray-600 mb-1">From: {from}</div>
      {to && <div className="text-sm text-gray-600 mb-1">To: {to}</div>}
      <div className="text-sm text-gray-500 mb-4">Date: {mail.mailSendDate}</div>

      {mail.attachments?.length > 0 && (
        <div className="mb-6">
          <p className="font-semibold mb-1">📎 첨부파일</p>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {mail.attachments.map((file, idx) => (
              <li key={idx}>
                <a href={getDownloadUrl(mailNo, file.mailFileName)} download className="hover:underline">
                  {file.mailFileName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8 text-gray-800 whitespace-pre-line">{mail.mailContent || "📩 메일 본문이 없습니다."}</div>

      <div className="flex gap-2">
        {/* <button onClick={handleMoveToTrash} className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 rounded">
          휴지통으로 이동
        </button> */}
        {isReceiveView && (
          <button onClick={handleDelete} className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 rounded">
            삭제
          </button>
        )}

        <button
          onClick={() => navigate(isReceiveView ? "/intrasoltech/mail/receiveList" : "/intrasoltech/mail/sendList")}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          목록으로
        </button>
      </div>
    </div>
  );
};

export default MailRead;
