import React from "react";

const Unauthorized = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>🚫 접근 권한 없음</h1>
      <p>이 페이지에 접근할 수 있는 권한이 없습니다.</p>
    </div>
  );
};

export default Unauthorized;
