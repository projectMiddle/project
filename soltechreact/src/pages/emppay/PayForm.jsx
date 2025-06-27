// src/pages/emppay/PayForm.jsx
import React, { useState, useEffect } from "react";
import { getEmployee, calculatePay, createPay } from "../../api/emppayApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function PayForm() {
  const { state } = useLocation();
  const empNo = state?.empNo ?? 1; // state로 넘어온 empNo, 없으면 1
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [employee, setEmployee] = useState({ empNo, baseSalary: 0 });
  const [calculated, setCalculated] = useState(null);

  // 사원 정보 & 연봉(eSalary → baseSalary) 가져오기
  useEffect(() => {
    getEmployee(empNo)
      .then((res) => {
        const data = res.data;
        console.log("▶ getEmployee 응답", res.data);
        setEmployee((prev) => ({
          ...prev,
          ...data,
          baseSalary: data.eSalary,
        }));
      })
      .catch((err) => console.error("사원 정보 조회 실패 ❌", err));
  }, [empNo]);

  // 숫자 포맷 헬퍼 (원 단위, 반올림)
  const fmt = (n) => (n != null && !isNaN(n) ? Math.round(n).toLocaleString("ko-KR") : "");

  // 자동 계산
  const handleCalculate = async () => {
    try {
      const payMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
      const annual = employee.baseSalary;
      const baseSalary = Math.round(annual / 12);
      const res = await calculatePay({
        empNo: employee.empNo,
        payMonth,
        payBaseSalary: baseSalary,
      });
      setCalculated(res.data);
    } catch (err) {
      console.error("계산 실패 ❌", err);
      alert("자동계산 중 오류가 발생했습니다.");
    }
  };

  // 저장
  const handleSave = async () => {
    if (!calculated) {
      alert("자동 계산을 먼저 해주세요.");
      return;
    }
    const toNum = (v) => Number(v ?? 0);
    const payMonth = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
    const totalSalary =
      toNum(calculated.baseSalary) +
      toNum(calculated.bonusWage) +
      toNum(calculated.positionWage) +
      toNum(calculated.benefits);
    const totalDeduction =
      toNum(calculated.incomeTax) +
      toNum(calculated.residentTax) +
      toNum(calculated.healthInsurance) +
      toNum(calculated.nationalPension) +
      toNum(calculated.empInsurance) +
      toNum(calculated.longtermCare);

    const saveForm = {
      empNo: employee.empNo,
      payMonth,
      annualSalary: employee.baseSalary,
      payBaseSalary: toNum(calculated.baseSalary),
      payBonusWage: toNum(calculated.bonusWage),
      payPositionWage: toNum(calculated.positionWage),
      payBenefits: toNum(calculated.benefits),
      payIncomeTax: toNum(calculated.incomeTax),
      payResidentTax: toNum(calculated.residentTax),
      payHealthInsurance: toNum(calculated.healthInsurance),
      payNationalPension: toNum(calculated.nationalPension),
      payEmpInsurance: toNum(calculated.empInsurance),
      payLongtermCare: toNum(calculated.longtermCare),
      payTotalSalary: totalSalary,
      payTotalDeduction: totalDeduction,
      payNetSalary: totalSalary - totalDeduction,
    };

    try {
      await createPay(saveForm);
      alert("급여명세서가 저장되었습니다.");
      navigate(".."); // 작성 후 리스트로 돌아가기
    } catch (err) {
      console.error("저장 실패 ❌", err);
      alert("저장 실패: " + err.message);
    }
  };

  return (
    <div>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] p-5 py-[14px]">급여명세서</div>
      <div className="p-6 mx-auto">
        <div className="mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-6">급여명세서 작성</h2>
          {/* 기본 정보 */}
          <section className="text-sm mb-6">
            <div className="grid grid-cols-3 gap-0 mb-6 items-center">
              <label className="col-span-1">급여자</label>
              <input className=" px-2 py-1 col-span-1" value={employee.jobName || ""} disabled />
              <input className=" px-2 py-1 col-span-1" value={employee.name || ""} disabled />
            </div>
          </section>
          <div className="flex justify-center my-6">
            <div className="bg-gray-300 h-[1px] w-full rounded" />
          </div>
          <section className="text-sm mb-6">
            <div className="grid grid-cols-3 gap-0 mb-6 items-center">
              <label className="col-span-1">지급년도</label>
              <select
                className="border px-2 py-1 col-span-1 mr-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <select
                className="border  px-2 py-1 col-span-1 ml-2"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </select>
            </div>
          </section>
          {/* 급여 및 공제 내역 */}
          <table className="w-full border">
            <thead>
              <tr className="text-center bg-gray-100 border-b border-gray-300 text-gray-700">
                <th className="py-2">지급 항목</th>
                <th className="py-2">금액</th>
                <th className="py-2">공제 항목</th>
                <th className="py-2">금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">기본급</td>
                <td className="px-4 py-2">
                  <input className="w-full border-none outline-none" value={fmt(calculated?.baseSalary)} readOnly />
                </td>
                <td className="px-4 py-2">소득세</td>
                <td className="px-4 py-2">
                  <input className="w-full border-none outline-none" value={fmt(calculated?.incomeTax)} readOnly />
                </td>
              </tr>
              {/* bonusWage ~ longtermCare 항목들 */}
              {[
                ["bonusWage", "상여급", "residentTax", "주민세"],
                ["positionWage", "직책수당", "healthInsurance", "건강보험"],
                ["benefits", "복리후생비", "nationalPension", "국민연금"],
                ["", "", "empInsurance", "고용보험"],
                ["", "", "longtermCare", "장기요양보험"],
              ].map(([lKey, lLabel, rKey, rLabel], idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{lLabel}</td>
                  <td className="px-4 py-2">
                    <input
                      className="w-full border-none outline-none"
                      value={lKey ? fmt(calculated?.[lKey]) : ""}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-2">{rLabel}</td>
                  <td className="px-4 py-2">
                    <input className="w-full border-none outline-none" value={fmt(calculated?.[rKey])} readOnly />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ───── 버튼 영역 (디자인 유지) ───── */}
          <div className="text-right mt-5">
            <button
              onClick={handleCalculate}
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded"
            >
              자동 계산
            </button>
            <button onClick={handleSave} className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
