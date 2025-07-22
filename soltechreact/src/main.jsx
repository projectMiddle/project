import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // 반드시 추가

createRoot(document.getElementById("root")).render(
  // StricMode : 하위 컴포넌트들에 대해 React가 검사를 수행(개발시에만 적용, 배포시 적용x)
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
