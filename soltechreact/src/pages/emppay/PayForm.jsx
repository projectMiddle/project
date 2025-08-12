// src/pages/emppay/PayForm.jsx
import React, { useState, useEffect } from "react";
import { getEmployee, calculatePay, createPay, getPayDetail, updatePay } from "../../api/emppayApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function PayForm() {
  const toNum = (v) => {
    if (v === null || v === undefined || v === "") return 0;
    const s = String(v).replace(/[^\d-]/g, ""); // 콤마 등 제거
    const n = Number(s.replace(/^0+(?=\d)/, "")); // 앞자리 0 제거
    return Number.isNaN(n) ? 0 : n;
  };
  const { state } = useLocation(); // { mode, empNo, payNo, payMonth, returnTo }
  const navigate = useNavigate();

  const isEdit = state?.mode === "edit";
  const empNo = state?.empNo ?? 1;
  const payNo = state?.payNo ?? null;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [employee, setEmployee] = useState({ empNo, baseSalary: 0 });

  // 저장/수정 대상 폼 상태
  const [form, setForm] = useState({
    payMonth: "", // "YYYY-MM"
    payBaseSalary: 0,
    payBonusWage: 0,
    payPositionWage: 0,
    payBenefits: 0,
    payIncomeTax: 0,
    payResidentTax: 0,
    payHealthInsurance: 0,
    payNationalPension: 0,
    payEmpInsurance: 0,
    payLongtermCare: 0,
    payTotalSalary: 0,
    payTotalDeduction: 0,
    payNetSalary: 0,
  });

  // 사원 정보 (연봉 → baseSalary)
  useEffect(() => {
    getEmployee(empNo)
      .then((res) => {
        const data = res.data;
        setEmployee((prev) => ({
          ...prev,
          ...data,
          baseSalary: data.eSalary, // 연봉
        }));
      })
      .catch((err) => console.error("사원 정보 조회 실패 ❌", err));
  }, [empNo]);

  // edit 모드면 상세 불러와 프리필 + 연/월 고정
  useEffect(() => {
    if (!isEdit || !payNo) return;
    getPayDetail(payNo)
      .then((res) => {
        const d = res.data;
        // payMonth → 연/월 셀렉터 동기화
        if (d.payMonth) {
          const [y, m] = d.payMonth.split("-").map(Number);
          setSelectedYear(y);
          setSelectedMonth(m);
        }
        setForm({
          payMonth: d.payMonth || "",
          payBaseSalary: toNum(d.payBaseSalary),
          payBonusWage: toNum(d.payBonusWage),
          payPositionWage: toNum(d.payPositionWage),
          payBenefits: toNum(d.payBenefits),
          payIncomeTax: toNum(d.payIncomeTax),
          payResidentTax: toNum(d.payResidentTax),
          payHealthInsurance: toNum(d.payHealthInsurance),
          payNationalPension: toNum(d.payNationalPension),
          payEmpInsurance: toNum(d.payEmpInsurance),
          payLongtermCare: toNum(d.payLongtermCare),
          payTotalSalary: toNum(d.payTotalSalary),
          payTotalDeduction: toNum(d.payTotalDeduction),
          payNetSalary: toNum(d.payNetSalary),
        });
      })
      .catch((e) => console.error("상세 불러오기 실패 ❌", e));
  }, [isEdit, payNo]);

  // 연/월 변경 → payMonth 동기화 (작성 모드에서만)
  useEffect(() => {
    if (isEdit) return; // 수정모드는 payMonth 고정
    const pm = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
    setForm((f) => ({ ...f, payMonth: pm }));
  }, [selectedYear, selectedMonth, isEdit]);

  // 숫자 포맷 (표시는 포맷, 입력은 숫자 그대로)
  const fmt = (n) => (n != null && !isNaN(n) ? Math.round(n).toLocaleString("ko-KR") : "");

  // 입력 변경 핸들러
  const onChangeNumber = (name) => (e) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^\d-]/g, "").replace(/^0+(?=\d)/, "");
    setForm((f) => ({ ...f, [name]: cleaned === "" ? 0 : Number(cleaned) }));
  };

  // 합계/실지급액 자동 갱신 (사용자가 숫자 바꾸면 즉시 반영)
  useEffect(() => {
    const totalSalary =
      (form.payBaseSalary || 0) + (form.payBonusWage || 0) + (form.payPositionWage || 0) + (form.payBenefits || 0);

    const totalDeduction =
      (form.payIncomeTax || 0) +
      (form.payResidentTax || 0) +
      (form.payHealthInsurance || 0) +
      (form.payNationalPension || 0) +
      (form.payEmpInsurance || 0) +
      (form.payLongtermCare || 0);

    const net = totalSalary - totalDeduction;

    setForm((f) =>
      f.payTotalSalary === totalSalary && f.payTotalDeduction === totalDeduction && f.payNetSalary === net
        ? f
        : { ...f, payTotalSalary: totalSalary, payTotalDeduction: totalDeduction, payNetSalary: net }
    );
  }, [
    form.payBaseSalary,
    form.payBonusWage,
    form.payPositionWage,
    form.payBenefits,
    form.payIncomeTax,
    form.payResidentTax,
    form.payHealthInsurance,
    form.payNationalPension,
    form.payEmpInsurance,
    form.payLongtermCare,
  ]);

  // 자동 계산 (백엔드 사용) — 기본급 기준
  const handleCalculate = async () => {
    try {
      const payMonth = isEdit ? form.payMonth : `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;

      const base = form.payBaseSalary > 0 ? form.payBaseSalary : Math.round((employee.baseSalary || 0) / 12);

      const { data } = await calculatePay({
        empNo,
        payMonth,
        payBaseSalary: base,
      });

      setForm((f) => ({
        ...f,
        payMonth,
        payBaseSalary: toNum(data.baseSalary ?? base),
        payBonusWage: toNum(data.bonusWage),
        payPositionWage: toNum(data.positionWage),
        payBenefits: toNum(data.benefits),
        payIncomeTax: toNum(data.incomeTax),
        payResidentTax: toNum(data.residentTax),
        payHealthInsurance: toNum(data.healthInsurance),
        payNationalPension: toNum(data.nationalPension),
        payEmpInsurance: toNum(data.empInsurance),
        payLongtermCare: toNum(data.longtermCare),
      }));
    } catch (err) {
      console.error("계산 실패 ❌", err);
      alert("자동계산 중 오류가 발생했습니다.");
    }
  };

  // 저장
  const handleSave = async () => {
    if (!form.payMonth) {
      alert("지급 년/월을 선택해주세요.");
      return;
    }
    try {
      if (isEdit && payNo) {
        await updatePay(payNo, {
          ...form,
          empNo, // 서버에서 필요하다면 포함
        });
      } else {
        await createPay({
          ...form,
          empNo,
          annualSalary: employee.baseSalary,
        });
      }
      alert(isEdit ? "수정되었습니다." : "급여명세서가 저장되었습니다.");

      // 저장 후 상세로 복귀 & 재조회 트리거
      const returnTo = state?.returnTo;
      if (returnTo) {
        navigate(returnTo, { replace: true, state: { refresh: Date.now() } });
      } else {
        navigate("..");
      }
    } catch (err) {
      console.error("저장 실패 ❌", err);
      alert("저장 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] p-5 py-[14px]">급여명세서</div>
      <div className="p-6 mx-auto">
        <div className="mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-6">{isEdit ? "급여명세서 수정" : "급여명세서 작성"}</h2>

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

          {/* 지급년도/월 */}
          <section className="text-sm mb-6">
            <div className="grid grid-cols-3 gap-0 mb-6 items-center">
              <label className="col-span-1">지급년도</label>
              <select
                className="border px-2 py-1 col-span-1 mr-2"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                disabled={isEdit} // 수정 모드에서는 월 고정
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                className="border  px-2 py-1 col-span-1 ml-2"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                disabled={isEdit}
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
                  {/* 입력 가능하도록 변경 (포맷 없이 숫자 그대로) */}
                  <input
                    className="w-full border-none outline-none"
                    type="number"
                    value={form.payBaseSalary}
                    onChange={onChangeNumber("payBaseSalary")}
                  />
                </td>
                <td className="px-4 py-2">소득세</td>
                <td className="px-4 py-2">
                  <input
                    className="w-full border-none outline-none"
                    type="number"
                    value={form.payIncomeTax}
                    onChange={onChangeNumber("payIncomeTax")}
                  />
                </td>
              </tr>
              {[
                ["payBonusWage", "상여급", "payResidentTax", "주민세"],
                ["payPositionWage", "직책수당", "payHealthInsurance", "건강보험"],
                ["payBenefits", "복리후생비", "payNationalPension", "국민연금"],
                ["", "", "payEmpInsurance", "고용보험"],
                ["", "", "payLongtermCare", "장기요양보험"],
              ].map(([lKey, lLabel, rKey, rLabel], idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{lLabel}</td>
                  <td className="px-4 py-2">
                    <input
                      className="w-full border-none outline-none"
                      type="number"
                      value={lKey ? form[lKey] : ""}
                      onChange={lKey ? onChangeNumber(lKey) : undefined}
                    />
                  </td>
                  <td className="px-4 py-2">{rLabel}</td>
                  <td className="px-4 py-2">
                    <input
                      className="w-full border-none outline-none"
                      type="number"
                      value={form[rKey]}
                      onChange={onChangeNumber(rKey)}
                    />
                  </td>
                </tr>
              ))}
              {/* 합계/실지급액 표시 (읽기용) */}
              <tr>
                <td className="px-4 py-2 font-semibold text-blue-700">지급합계</td>
                <td className="px-4 py-2">{fmt(form.payTotalSalary)}</td>
                <td className="px-4 py-2 font-semibold">공제합계</td>
                <td className="px-4 py-2">{fmt(form.payTotalDeduction)}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">실지급액</td>
                <td className="px-4 py-2" colSpan={3}>
                  {fmt(form.payNetSalary)} 원
                </td>
              </tr>
            </tbody>
          </table>

          {/* 버튼 영역 (디자인 유지) */}
          <div className="text-right mt-5">
            <button
              onClick={handleCalculate}
              className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded"
              type="button"
            >
              자동 계산
            </button>
            <button
              onClick={handleSave}
              className="ml-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              type="button"
            >
              {isEdit ? "저장" : "작성"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
