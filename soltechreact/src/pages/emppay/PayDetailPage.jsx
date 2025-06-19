import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PayDetailPage() {
  const { id } = useParams();
  const [pay, setPay] = useState({});

  useEffect(() => {
    axios.get(`/pay/${id}`).then((res) => {
      setPay(res.data);
    });
  }, [id]);

  const format = (num) => (num != null ? Number(num).toLocaleString("ko-KR") + " 원" : "");

  const [year, month] = pay.payMonth ? pay.payMonth.split("-") : [];

  return (
    <div className="max-w-4xl mx-auto p-6 border-2 border-purple-400 mt-10">
      <h2 className="text-xl font-bold mb-6">
        {pay.eName ? `${pay.eName}님의 ` : ""}
        {year}년 {parseInt(month)}월 급여명세서
      </h2>

      <table className="w-full border-collapse border border-purple-400">
        <thead>
          <tr className="bg-purple-100">
            <th className="border border-purple-400 p-2">지급 항목</th>
            <th className="border border-purple-400 p-2">금액</th>
            <th className="border border-purple-400 p-2">공제 항목</th>
            <th className="border border-purple-400 p-2">금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-purple-400 p-2">기본급</td>
            <td className="border border-purple-400 p-2">{format(pay.payBaseSalary)}</td>
            <td className="border border-purple-400 p-2">소득세</td>
            <td className="border border-purple-400 p-2">{format(pay.payIncomeTax)}</td>
          </tr>
          <tr>
            <td className="border border-purple-400 p-2">상여금</td>
            <td className="border border-purple-400 p-2">{format(pay.payBonusWage)}</td>
            <td className="border border-purple-400 p-2">주민세</td>
            <td className="border border-purple-400 p-2">{format(pay.payResidentTax)}</td>
          </tr>
          <tr>
            <td className="border border-purple-400 p-2">직책수당</td>
            <td className="border border-purple-400 p-2">{format(pay.payPositionWage)}</td>
            <td className="border border-purple-400 p-2">건강보험</td>
            <td className="border border-purple-400 p-2">{format(pay.payHealthInsurance)}</td>
          </tr>
          <tr>
            <td className="border border-purple-400 p-2">복리후생비</td>
            <td className="border border-purple-400 p-2">{format(pay.payBenefits)}</td>
            <td className="border border-purple-400 p-2">국민연금</td>
            <td className="border border-purple-400 p-2">{format(pay.payNationalPension)}</td>
          </tr>
          <tr>
            <td className="border border-purple-400 p-2"></td>
            <td className="border border-purple-400 p-2"></td>
            <td className="border border-purple-400 p-2">고용보험</td>
            <td className="border border-purple-400 p-2">{format(pay.payEmpInsurance)}</td>
          </tr>
          <tr>
            <td className="border border-purple-400 p-2"></td>
            <td className="border border-purple-400 p-2"></td>
            <td className="border border-purple-400 p-2">장기요양보험</td>
            <td className="border border-purple-400 p-2">{format(pay.payLongtermCare)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="font-bold bg-purple-50">
            <td className="border border-purple-400 p-2">총 지급액</td>
            <td className="border border-purple-400 p-2">{format(pay.payTotalSalary)}</td>
            <td className="border border-purple-400 p-2">총 공제액</td>
            <td className="border border-purple-400 p-2">{format(pay.payTotalDeduction)}</td>
          </tr>
          <tr className="font-bold bg-purple-100">
            <td className="border border-purple-400 p-2 text-center" colSpan={3}>
              실 수령액
            </td>
            <td className="border border-purple-400 p-2">{format(pay.payNetSalary)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
