import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PayForm() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [calculated, setCalculated] = useState(null);
  const [employee, setEmployee] = useState({ empNo: 1021 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/employee/${employee.empNo}`).then((res) => {
      console.log("사원정보 응답 데이터 ✅", res.data);
      setEmployee((prev) => ({ ...prev, ...res.data }));
    });
  }, []);

  const format = (num) => (num != null ? Math.round(num).toLocaleString("ko-KR") : "");

  const handleCalculate = async () => {
    try {
      const payMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
      const res = await axios.post("/pay/calculate", {
        empNo: employee.empNo,
        payMonth: payMonth,
      });
      setCalculated(res.data);
    } catch (err) {
      console.error("계산 실패 ❌", err);
      alert("자동계산 중 오류가 발생했습니다.");
    }
  };

  const handleSave = async () => {
    if (!calculated) {
      alert("자동 계산을 먼저 해주세요.");
      return;
    }

    const payMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

    const saveForm = {
      empNo: employee.empNo,
      payMonth,
      payBaseSalary: calculated.baseSalary || 0,
      payBonusWage: calculated.bonusWage || 0,
      payPositionWage: calculated.positionWage || 0,
      payBenefits: calculated.benefits || 0,
      payIncomeTax: calculated.incomeTax || 0,
      payResidentTax: calculated.residentTax || 0,
      payHealthInsurance: calculated.healthInsurance || 0,
      payNationalPension: calculated.nationalPension || 0,
      payEmpInsurance: calculated.empInsurance || 0,
      payLongtermCare: calculated.longtermCare || 0,
    };

    try {
      await axios.post("/pay/save", saveForm);
      alert("급여명세서가 저장되었습니다.");
      navigate("/pay/list");
    } catch (err) {
      alert("저장 실패: " + err.message);
    }
  };

  return (
    <div className="p-6 border-2 border-purple-400 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">급여명세서 작성</h2>

      {/* 사원 정보 + 월 선택 */}
      <div className="grid grid-cols-6 gap-4 mb-6 items-center">
        <label className="col-span-1">급여자</label>
        <input
          className="border border-purple-400 px-2 py-1 col-span-1 bg-gray-100"
          value={employee.jobName || ""}
          disabled
        />
        <input
          className="border border-purple-400 px-2 py-1 col-span-1 bg-gray-100"
          value={employee.eName || ""}
          disabled
        />
        <label className="col-span-1">지급년도</label>
        <select
          className="border border-purple-400 px-2 py-1 col-span-1"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
        <select
          className="border border-purple-400 px-2 py-1 col-span-1"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </select>
      </div>

      {/* 급여 테이블 */}
      <table className="w-full border-collapse border border-purple-400 mb-6">
        <thead>
          <tr className="text-center bg-purple-50">
            <th className="border border-purple-400 py-2">지급 항목</th>
            <th className="border border-purple-400 py-2">금액</th>
            <th className="border border-purple-400 py-2">공제 항목</th>
            <th className="border border-purple-400 py-2">금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-purple-400 px-4 py-2">기본급</td>
            <td className="border border-purple-400 px-4 py-2">
              <input
                className="w-full border-none outline-none bg-gray-50"
                value={format(calculated?.baseSalary)}
                readOnly
              />
            </td>
            <td className="border border-purple-400 px-4 py-2">소득세</td>
            <td className="border border-purple-400 px-4 py-2">
              <input
                className="w-full border-none outline-none bg-gray-50"
                value={format(calculated?.incomeTax)}
                readOnly
              />
            </td>
          </tr>
          {[
            ["bonusWage", "상여급", "residentTax", "주민세"],
            ["positionWage", "직책수당", "healthInsurance", "건강보험"],
            ["benefits", "복리후생비", "nationalPension", "국민연금"],
            ["", "", "empInsurance", "고용보험"],
            ["", "", "longtermCare", "장기요양보험"],
          ].map(([leftKey, leftLabel, rightKey, rightLabel], i) => (
            <tr key={i}>
              <td className="border border-purple-400 px-4 py-2">{leftLabel}</td>
              <td className="border border-purple-400 px-4 py-2">
                <input
                  className="w-full border-none outline-none bg-gray-50"
                  value={leftKey ? format(calculated?.[leftKey]) : ""}
                  readOnly
                />
              </td>
              <td className="border border-purple-400 px-4 py-2">{rightLabel}</td>
              <td className="border border-purple-400 px-4 py-2">
                <input
                  className="w-full border-none outline-none bg-gray-50"
                  value={format(calculated?.[rightKey])}
                  readOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 버튼 */}
      <div className="text-right">
        <button onClick={handleCalculate} className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded">
          자동 계산
        </button>
        <button onClick={handleSave} className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          작성
        </button>
      </div>
    </div>
  );
}
