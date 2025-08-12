import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobDetail, deleteJob } from "../../../api/mainHomeApi";
import useAuth from "../../../hooks/useAuth";
import { Loader2, ChevronLeft, Trash2 } from "lucide-react";

export default function MainApplyRecruitDetail() {
  const { jobsNo } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const isHR = userInfo?.deptNo === 201;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getJobDetail(jobsNo);
        setData(res);
      } catch (e) {
        alert("상세 불러오기에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [jobsNo]);

  const handleDelete = async () => {
    if (!isHR) return alert("권한이 없습니다.");
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteJob(jobsNo);
      navigate("/apply/recruit", { replace: true });
    } catch (e) {
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  if (!data) return null;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <div className="max-w-7xl w-full mt-30 mb-20">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ChevronLeft size={18} /> 목록으로
        </button>

        <div className="mt-4 border-t border-gray-300">
          <div className="flex flex-col border-b border-gray-300 p-5 bg-gray-100">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-semibold">{data.jobsTitle}</h1>
              <div className="text-sm text-gray-500">
                {data.jobsRegDate
                  ? new Date(data.jobsRegDate).toISOString().split("T")[0]
                  : ""}
              </div>
            </div>
          </div>

          {/* HTML 내용 렌더링 */}
          <div
            className="p-5 text-gray-800 leading-7 min-h-200"
            dangerouslySetInnerHTML={{ __html: data.jobsContent || "" }}
          />
        </div>

        {isHR && (
          <div className="mt-6 flex gap-2 justify-end">
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1 rounded border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} /> 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
