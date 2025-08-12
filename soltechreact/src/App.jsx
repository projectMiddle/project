import { Route, Routes } from "react-router-dom";
import MainHome from "./pages/mainhomepages/MainHome";
import MainSignUp from "./pages/mainhomepages/MainSignUp";
import MainLogin from "./pages/mainhomepages/MainLogin";
import MainMemberLogin from "./pages/mainhomepages/MainMemberLogin";
import MainEmployeeLogin from "./pages/mainhomepages/MainEmployeeLogin";
import OAuth2Success from "./pages/mainhomepages/OAuth2Success";
import MainAboutUs from "./pages/mainhomepages/company/MainAboutUs.jsx";
import MainLayout from "./components/mainhome/MainLayout";
import Intra from "./Intra";

import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx"; // ✅

import Unauthorized from "./pages/errorpages/Unauthorized.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import MainOurTeams from "./pages/mainhomepages/company/MainOurTeams.jsx";
import MainApplyInformation from "./pages/mainhomepages/jobs/MainApplyInformation";
import MainApplyProcess from "./pages/mainhomepages/jobs/MainApplyProcess";
import MainApplyRecruitList from "./pages/mainhomepages/jobs/MainApplyRecruitList";
import MainFaq from "./pages/mainhomepages/faq/MainFaq";
import MainLocationJongro from "./pages/mainhomepages/location/MainLocationJongro.jsx";
import MainLocationGangnam from "./pages/mainhomepages/location/MainLocationGangnam.jsx";
import Report from "./pages/bimatrix/Report.jsx";
import Now from "./pages/bimatrix/Now.jsx";
import MainApplyRecruitDetail from "./pages/mainhomepages/jobs/MainApplyRecruitDetail.jsx";

function App() {
  const { isAuthReady } = useAuth();

  if (!isAuthReady) {
    return <div>로딩 중...</div>; // or SplashScreen
  }
  return (
    // <AuthProvider>
    <Routes>
      {/* 메인화면 관련 기능들 */}
      <Route path="/" element={<MainHome />} />
      <Route element={<MainLayout />}>
        {/* 로그인 관련 */}
        <Route path="signup" element={<MainSignUp />} />
        <Route path="login" element={<MainLogin />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} />
        <Route path="/member/login" element={<MainMemberLogin />} />
        <Route path="/employee/login" element={<MainEmployeeLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Team Soltech */}
        <Route path="/company/aboutus" element={<MainAboutUs />} />
        <Route path="/company/teams" element={<MainOurTeams />} />
        <Route path="/matrix/now" element={<Now />} />

        {/* Jobs 관련 */}
        <Route path="/apply/information" element={<MainApplyInformation />} />
        <Route path="/apply/process" element={<MainApplyProcess />} />
        <Route path="/apply/recruit" element={<MainApplyRecruitList />} />
        <Route path="/apply/recruit/:jobsNo" element={<MainApplyRecruitDetail />} />

        {/* Location 관련 */}
        <Route path="/location/jongro" element={<MainLocationJongro />} />
        <Route path="/location/gangnam" element={<MainLocationGangnam />} />

        {/* Faq 관련 */}
        <Route path="/faq" element={<MainFaq />} />
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
