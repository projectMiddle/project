// src/routes/EmployeePayRoute.jsx
import { Routes, Route } from "react-router-dom";
import { RequireDept201 } from "./guards";
import HRPayDepartmentList from "../pages/emppay/HRPayDepartmentList";
import HRPayDepartmentDetailList from "../pages/emppay/HRPayDepartmentDetailList";
import PayListPage from "../pages/emppay/PayListPage";
import PayDetailPage from "../pages/emppay/PayDetailPage";
import PayForm from "../pages/emppay/PayForm";

export default function EmployeePayRoute() {
  return (
    <Routes>
      {/* 일반 사원 조회 */}
      <Route index element={<PayListPage />} />
      <Route path="detail/:id" element={<PayDetailPage />} />

      {/* HR 전용 폼 */}
      <Route
        path="form"
        element={
          <RequireDept201>
            <PayForm />
          </RequireDept201>
        }
      />

      {/* 인사팀 전용 흐름 */}
      <Route
        path="HRPayDepartmentList"
        element={
          <RequireDept201>
            <HRPayDepartmentList />
          </RequireDept201>
        }
      />
      <Route
        path="HRPayDepartmentList/HRPayDepartmentDetailList/:deptNo"
        element={
          <RequireDept201>
            <HRPayDepartmentDetailList />
          </RequireDept201>
        }
      />
      <Route
        path="HRPayDepartmentList/HRPayDepartmentDetailList/:deptNo/employees/:empNo/pay"
        element={
          <RequireDept201>
            <PayListPage mode="hr" />
          </RequireDept201>
        }
      />
      <Route
        path="HRPayDepartmentList/HRPayDepartmentDetailList/:deptNo/employees/:empNo/pay/detail/:id"
        element={
          <RequireDept201>
            <PayDetailPage />
          </RequireDept201>
        }
      />
    </Routes>
  );
}
