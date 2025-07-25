import React from "react";
import EmpInfo from "./EmpInfo";

const EmpInfoModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">
          ✕
        </button>
        <EmpInfo employee={employee} />
      </div>
    </div>
  );
};

export default EmpInfoModal;
