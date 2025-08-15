// src/pages/apply/MainApplyRecruitList.jsx
import React, { useEffect, useState, useCallback } from "react";
import { getJobsList, getJobDetail, createJob, updateJob, deleteJob } from "../../../api/mainHomeApi";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import MainApplyJobModal from "./MainApplyJobModal";

const PAGE_SIZE = 10;

export default function MainApplyRecruitList() {
  const [page, setPage] = useState(1);
  const [pageResult, setPageResult] = useState({});
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, userInfo } = useAuth();
  const isHR = userInfo?.deptNo === 201; // 인사팀만 작성/수정/삭제

  const isNoData = jobsList.length === 0 || !pageResult.pageNumList || pageResult.pageNumList.length === 0;

  const loadList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getJobsList(page, PAGE_SIZE);
      setJobsList(data.dtoList || []);
      setPageResult(data || {});
    } catch (err) {
      console.error("목록 불러오기 실패", err);
      alert("목록 불러오기에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const handleJobClick = (e, jobsNo) => {
    // 로그인 안 했거나 MEMBER가 아니면 로그인 페이지로 이동
    if (!isLoggedIn || userInfo?.role !== "MEMBER") {
      e.preventDefault();
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    }
  };

  // -------------------- 모달(등록/수정 겸용) --------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    jobsTitle: "",
    jobsContent: "",
  });

  const openCreate = () => {
    if (!isHR) return alert("권한이 없습니다.");
    setMode("create");
    setEditingId(null);
    setForm({ jobsTitle: "", jobsContent: "" });
    setModalOpen(true);
  };

  const openEdit = async (jobsNo) => {
    if (!isHR) return alert("권한이 없습니다.");
    try {
      setMode("edit");
      setEditingId(jobsNo);
      setSaving(true);
      const detail = await getJobDetail(jobsNo);
      setForm({
        jobsTitle: detail.jobsTitle || "",
        jobsContent: detail.jobsContent || "",
      });
      setModalOpen(true);
    } catch (e) {
      console.error(e);
      alert("상세 불러오기에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHR) return alert("권한이 없습니다.");
    if (!form.jobsTitle?.trim()) {
      alert("제목을 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      if (mode === "create") {
        const empNo = userInfo?.empNo;
        if (!empNo) throw new Error("empNo가 없습니다(로그인 확인).");
        await createJob({ ...form, empNo }); // POST /apply/recruit/add
        alert("등록되었습니다.");
      } else {
        // PUT /apply/recruit/edit/{jobsNo} — 바디에도 jobsNo 포함 권장
        await updateJob(editingId, { jobsNo: editingId, ...form });
        alert("수정되었습니다.");
      }
      setModalOpen(false);
      loadList();
    } catch (err) {
      console.error(err);
      alert(`저장에 실패했습니다. ${err.response?.data?.message ?? ""}`);
    } finally {
      setSaving(false);
    }
  };

  // -------------------- 단건 삭제 --------------------
  const handleDelete = async (jobsNo) => {
    if (!isHR) return alert("권한이 없습니다.");
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteJob(jobsNo); // DELETE /apply/recruit/delete/{jobsNo}
      const remain = jobsList.length - 1;
      if (remain <= 0 && page > 1) {
        setPage((p) => p - 1);
      } else {
        loadList();
      }
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      {/* 상단 */}
      <div className="max-w-7xl w-full mt-32 flex justify-between items-center">
        <h1 className="text-4xl text-gray-900 font-bold drop-shadow-lg">모집공고</h1>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">
            총 {pageResult?.totalCount?.toLocaleString?.() ?? 0}건의 채용공고가 진행 중입니다.
          </div>
          {isHR && (
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-md bg-violet-800 px-3 py-1.5 text-white text-sm hover:bg-violet-900 transition"
            >
              <Plus size={16} /> 글 작성
            </button>
          )}
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-7xl w-full mt-6">
        <div className="border-t border-black">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
              <span className="mt-6 text-gray-500">불러오는 중…</span>
            </div>
          ) : jobsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="flex flex-col items-center">
                <AlertCircle className="w-14 h-14 text-gray-400" strokeWidth={2} />
                <span className="mt-10 text-2xl text-gray-400">등록된 채용공고가 없습니다.</span>
              </div>
            </div>
          ) : (
            <div>
              {/* 헤더 라인 */}
              <div className="flex flex-col border-b border-gray-300 p-5 bg-gray-100">
                <div className="flex flex-row justify-between items-start">
                  <h1 className="w-10 text-sm font-semibold">번호</h1>
                  <h2 className="w-180 text-sm font-semibold">제목</h2>
                  <h2 className="text-right text-sm font-semibold pr-36">등록일</h2>
                </div>
              </div>

              {jobsList.map((job) => (
                <div key={job.jobsNo} className="group relative flex flex-col border-t border-gray-200 p-5">
                  <div className="flex flex-row justify-between items-start">
                    <h1 className="w-10 text-sm text-gray-700">{job.jobsNo}</h1>

                    <Link
                      to={`/apply/recruit/${job.jobsNo}`}
                      className="w-200 text-lg font-semibold text-gray-600 cursor-pointer hover:text-violet-900"
                      onClick={(e) => handleJobClick(e, job.jobsNo)}
                    >
                      {job.jobsTitle}
                    </Link>

                    <h2 className="text-right text-sm text-gray-600 pr-36">
                      {job.jobsRegDate ? new Date(job.jobsRegDate).toISOString().split("T")[0] : ""}
                    </h2>
                  </div>

                  {/* 관리 액션: hover 시 우측 상단 노출 */}
                  {isHR && (
                    <div className="absolute right-5 top-4 hidden group-hover:flex items-center gap-2">
                      <button
                        onClick={() => openEdit(job.jobsNo)}
                        className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                        title="수정"
                      >
                        <Pencil size={14} />
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(job.jobsNo)}
                        className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                        title="삭제"
                      >
                        <Trash2 size={14} />
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-1 py-8 mb-15">
        <button
          className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
          onClick={() => setPage(1)}
          disabled={isNoData || pageResult.current === 1}
          aria-label="first"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
          onClick={() => setPage(pageResult.prevPage)}
          disabled={isNoData || !pageResult.prev}
          aria-label="prev"
        >
          <ChevronLeft size={18} />
        </button>
        {Array.isArray(pageResult.pageNumList) &&
          pageResult.pageNumList.map((num) => (
            <button
              key={num}
              className={`px-2 mx-1 text-lg transition ${pageResult.current === num
                ? "text-purple-900 font-bold underline underline-offset-4"
                : "text-gray-400 hover:text-gray-500 cursor-pointer"
                }`}
              onClick={() => setPage(num)}
              disabled={isNoData || pageResult.current === num}
            >
              {num}
            </button>
          ))}
        <button
          className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
          onClick={() => setPage(pageResult.nextPage)}
          disabled={isNoData || !pageResult.next}
          aria-label="next"
        >
          <ChevronRight size={18} />
        </button>
        <button
          className="px-2 py-1 text-gray-400 hover:text-gray-600 transition disabled:opacity-40 cursor-pointer"
          onClick={() => setPage(pageResult.totalPage)}
          disabled={isNoData || pageResult.current === pageResult.totalPage}
          aria-label="last"
        >
          <ChevronsRight size={18} />
        </button>
      </div>

      {/* 등록/수정 모달 */}
      {/* 등록/수정 모달 */}
      <MainApplyJobModal
        open={modalOpen}
        mode={mode}
        editingId={editingId}
        form={form}
        onChange={handleChange}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        saving={saving}
      />

    </div>
  );
}
