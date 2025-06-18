import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pay, setPay] = useState(null);

  useEffect(() => {
    axios
      .get(`/pay/detail/${id}`)
      .then((res) => {
        console.log("📦 상세조회 응답 데이터", res.data);
        setPay(res.data);
      })
      .catch((err) => {
        alert("상세 데이터를 불러올 수 없습니다.");
        navigate("/pay/list");
      });
  }, [id]);

  /* 숫자 포맷 도우미 */
  const fmt = (n) => (n != null && !isNaN(n) ? Math.round(n).toLocaleString("ko-KR") : "0");

  if (!pay) return <div className="text-center mt-10">불러오는 중...</div>;

  /* ──────────────── ① 총합 계산 ──────────────── */
  const payTotal =
    (pay.payBaseSalary ?? 0) + (pay.payBonusWage ?? 0) + (pay.payPositionWage ?? 0) + (pay.payBenefits ?? 0);

  const dedTotal =
    (pay.payIncomeTax ?? 0) +
    (pay.payResidentTax ?? 0) +
    (pay.payHealthInsurance ?? 0) +
    (pay.payNationalPension ?? 0) +
    (pay.payEmpInsurance ?? 0) +
    (pay.payLongtermCare ?? 0);

  const realTakeHome = payTotal - dedTotal;

  /* ──────────────── ② 화면 렌더 ──────────────── */
  const [year, month] = pay.payMonth.split("-");
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">
        {pay.eName}님의 {year}년 {parseInt(month)}월 급여명세서
      </h2>

      {/* 상단 정보 박스(선택·비활성화) */}
      {/* … 생략 : 기존 input/select 영역 그대로 유지 … */}

      {/* 요약표 ─ 지급합계 / 실수령액 / 공제합계 */}
      <table className="w-full border border-purple-400 mb-6 text-center">
        <thead>
          <tr>
            <th className="border border-purple-400 py-2">지급합계</th>
            <th className="border border-purple-400 py-2">실수령액</th>
            <th className="border border-purple-400 py-2">공제합계</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fmt(pay.payTotalSalary)}</td>
            <td>{fmt(pay.payNetSalary)}</td>
            <td>{fmt(pay.payTotalDeduction)}</td>
          </tr>
        </tbody>
      </table>

      {/* 상세표(지급·공제 항목별) */}
      <table className="w-full border border-purple-400">
        <thead>
          <tr>
            <th className="border border-purple-400 py-2">지급 항목</th>
            <th className="border border-purple-400 py-2"></th>
            <th className="border border-purple-400 py-2">공제 항목</th>
            <th className="border border-purple-400 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {[
            ["기본급", pay.payBaseSalary, "소득세", pay.payIncomeTax],
            ["상여급", pay.payBonusWage, "주민세", pay.payResidentTax],
            ["직책수당", pay.payPositionWage, "건강보험", pay.payHealthInsurance],
            ["복리후생비", pay.payBenefits, "국민연금", pay.payNationalPension],
            ["기타", pay.payEtc, "고용보험", pay.payEmpInsurance],
            ["", "", "장기요양보험", pay.payLongtermCare],
          ].map(([leftLabel, leftVal, rightLabel, rightVal], i) => (
            <tr key={i}>
              <td className="border border-purple-400 px-4 py-2">{leftLabel}</td>
              <td className="border border-purple-400 px-4 py-2">{fmt(leftVal)}</td>
              <td className="border border-purple-400 px-4 py-2">{rightLabel}</td>
              <td className="border border-purple-400 px-4 py-2">{fmt(rightVal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
