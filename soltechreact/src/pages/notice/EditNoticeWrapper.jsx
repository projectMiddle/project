import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 정확한 경로로 수정하세요
import EditNoticeForm from "./editNoticeForm";

const EditNoticeWrapper = () => {
  const { notiNo } = useParams();
  const navigate = useNavigate();
  const [noticeData, setNoticeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/notices/${notiNo}`);
        if (!res.ok) throw new Error("공지사항 조회 실패");
        const data = await res.json();
        setNoticeData(data);
      } catch (err) {
        console.error(err);
        alert("공지사항 조회 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [notiNo]);

  const handleUpdate = () => {
    // 수정 완료 후 공지사항 목록으로 이동
    navigate("/notice");
  };

  if (loading) return <div className="text-center mt-10">로딩 중...</div>;

  if (!noticeData) return <div className="text-center mt-10 text-red-500">공지사항을 찾을 수 없습니다.</div>;

  return <EditNoticeForm noticeData={noticeData} onUpdate={handleUpdate} />;
};

export default EditNoticeWrapper;
