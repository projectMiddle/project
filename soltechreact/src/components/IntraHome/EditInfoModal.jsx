import React from "react";
import EditInfo from "./EditInfo";
const EditInfoModal = ({ isOpen, onClose, empNo, initialData, onUpdated }) => {
  // props 콘솔 확인
  console.log("EditInfoModal props 확인:");
  console.log("empNo:", empNo);
  console.log("initialData:", initialData);
  console.log("isOpen:", isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-lg max-w-xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">정보 수정</h2>
        <EditInfo
          empNo={empNo}
          initialData={initialData}
          onUpdated={() => {
            onUpdated?.();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default EditInfoModal;
