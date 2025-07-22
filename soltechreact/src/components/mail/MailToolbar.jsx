// 체크박스, 삭제 등등
import React from 'react';

const MailToolbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded border">
      {/* 왼쪽: 전체 선택 */}
      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <span className="text-sm text-gray-700">전체 선택</span>
      </div>

      {/* 오른쪽: 삭제 버튼 */}
      <button className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
        삭제
      </button>
    </div>
  );
};

export default MailToolbar;