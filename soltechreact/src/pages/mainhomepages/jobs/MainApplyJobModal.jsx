import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '../../../libs/ckeditor';

export default function MainApplyJobModal({
    open,
    mode = "create",
    editingId,
    form,
    onChange,
    onClose,
    onSubmit,
    saving = false
}) {
    const titleRef = useRef(null);

    // open 시 포커스 & body 스크롤 잠금
    useEffect(() => {
        if (!open) return;
        console.log("[MainApplyJobModal] open:", open, "mode:", mode, "editingId:", editingId);

        // 포커스
        setTimeout(() => titleRef.current?.focus(), 0);

        // 스크롤 잠금
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [open, mode, editingId]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경 (저장 중이면 닫기 금지) */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={() => {
                    if (!saving) {
                        console.log("[MainApplyJobModal] backdrop click → onClose()");
                        onClose?.();
                    }
                }}
            />

            {/* 다이얼로그 */}
            <div
                className="relative w-full max-w-7xl rounded-lg bg-white shadow-lg"
                role="dialog"
                aria-modal="true"
                aria-labelledby="main-apply-job-modal-title"
                onClick={(e) => e.stopPropagation()} // 내부 클릭은 전파 방지
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between border-b px-5 py-3">
                    <h3 id="main-apply-job-modal-title" className="text-lg font-semibold">
                        {mode === "create" ? "채용공고 작성" : `채용공고 수정 #${editingId}`}
                    </h3>

                    <button
                        type="button"
                        onClick={() => !saving && onClose?.()}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-60"
                        disabled={saving}
                        aria-label="닫기"
                    >
                        {/* X 아이콘 */}
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* 본문 폼 */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("[MainApplyJobModal] submit with form:", form);
                        onSubmit?.(e);
                    }}
                    className="px-5 py-4 space-y-4"
                >
                    {/* 제목 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">제목</label>
                        <input
                            ref={titleRef}
                            type="text"
                            name="jobsTitle"
                            value={form?.jobsTitle ?? ""}
                            onChange={(e) => {
                                console.log("[MainApplyJobModal] change jobsTitle:", e.target.value);
                                onChange?.(e);
                            }}
                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                            placeholder="채용공고 제목을 입력하세요"
                            required
                        />
                    </div>

                    {/* 내용 */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">내용</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={form?.jobsContent ?? ""}
                            onChange={(_, editor) => {
                                const html = editor.getData();
                                onChange?.({ target: { name: "jobsContent", value: html } });
                            }}
                            config={{
                                toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strikethrough",
                                    "|",
                                    "fontSize",
                                    "fontFamily",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "|",
                                    "alignment",
                                    "highlight",
                                    "|",
                                    "link",
                                    "blockQuote",
                                    "bulletedList",
                                    "numberedList",
                                    "|",
                                    "insertTable",
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                    "|",
                                    "imageUpload",
                                    "mediaEmbed",
                                    "codeBlock",
                                    "|",
                                    "undo",
                                    "redo"
                                ],
                                table: {
                                    contentToolbar: [
                                        "tableColumn",
                                        "tableRow",
                                        "mergeTableCells"
                                    ]
                                },
                                image: {
                                    toolbar: [
                                        "imageStyle:full",
                                        "imageStyle:side",
                                        "|",
                                        "imageTextAlternative"
                                    ]
                                }
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "min-height",
                                        "500px", // 원하는 높이
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        "max-height",
                                        "500px", // 최대 높이
                                        editor.editing.view.document.getRoot()
                                    );
                                    writer.setStyle(
                                        "overflow-y",
                                        "auto", // 세로 스크롤 활성화
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        />
                    </div>


                    {/* 푸터 버튼 */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => onClose?.()}
                            disabled={saving}
                        >
                            취소
                        </button>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:opacity-60"
                            disabled={saving}
                        >
                            {saving && (
                                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            )}
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
