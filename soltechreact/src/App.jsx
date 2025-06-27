import { Route, Routes } from "react-router-dom";
import MainHome from "./pages/mainhomepages/MainHome";
import MainSignUp from "./pages/mainhomepages/MainSignUp";
import MainLogin from "./pages/mainhomepages/MainLogin";
import MainMemberLogin from "./pages/mainhomepages/MainMemberLogin";
import MainEmployeeLogin from "./pages/mainhomepages/MainEmployeeLogin";
import OAuth2Success from "./pages/mainhomepages/OAuth2Success";
import MainAboutUs from "./pages/mainhomepages/MainAboutUs";
import MainLayout from "./components/mainhome/MainLayout";
import Intra from "./Intra";

import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx"; // ✅

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <div>로딩 중...</div>; // or SplashScreen
  }
  return (
    // <AuthProvider>
    <Routes>
      {/* 메인화면 관련 기능들 */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainHome />} />
        <Route path="signup" element={<MainSignUp />} />
        <Route path="login" element={<MainLogin />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} />
        <Route path="/member/login" element={<MainMemberLogin />} />
        <Route path="/employee/login" element={<MainEmployeeLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="aboutus" element={<MainAboutUs />} />
      </Route>
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="MEMBER">
            <MainHome />
          </ProtectedRoute>
        }
      />
      {/* 인트라넷 연결 */}
      <Route
        path="/intrasoltech/*"
        element={
          <ProtectedRoute requiredRole="EMPLOYEE">
            <Intra />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
    // </AuthProvider>
  );
}

export default App;
