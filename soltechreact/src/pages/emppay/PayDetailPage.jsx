import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getPayDetail } from "../../api/emppayApi";

export default function PayDetailPage() {
  const { id } = useParams();
  const [pay, setPay] = useState({});

  useEffect(() => {
    getPayDetail(id).then((res) => {
      setPay(res.data);
      console.log("정보 :", res.data);
    });
  }, [id]);

  const format = (num) => (num != null ? Number(num).toLocaleString("ko-KR") + " 원" : "");

  const [year, month] = pay.payMonth ? pay.payMonth.split("-") : [];

  return (
    <div>
      <div className="bg-[#6b46c1] text-white font-bold text-[17px] pl-5 py-[14px]">급여명세서 - 상세</div>
      <div className="p-6">
        <div className=" mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-300">
          <h2 className="text-center text-2xl font-bold mb-6">2024년 11월 급여명세서</h2>
          {/* 기본 정보 */}
          <section className="grid grid-cols-3 gap-4 text-sm mb-6">
            <div>
              성명: <span className="font-medium">{pay.eName}</span>
            </div>
            <div>
              생년월일: <span className="font-medium">{pay.payMonth}</span>
            </div>
            <div>
              사원번호: <span className="font-medium">{pay.empNo}</span>
            </div>
            <div>
              직급: <span className="font-medium">{pay.jobName}</span>
            </div>
            <div>
              업무: <span className="font-medium">{pay.departmentName}</span>
            </div>
            <div>
              급여계좌: <span className="font-medium">{pay.accountNumber}</span>
            </div>
          </section>
          {/* 급여 및 공제 내역 */}
          <section className="grid grid-cols-2 gap-4 mb-6 h-75">
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="border-b border-gray-300">
                  <th className="px-3 py-2">항목</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-1">기본급</td>
                  <td>{format(pay.payBaseSalary)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">상여금</td>
                  <td>{format(pay.payBonusWage)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">직책수당</td>
                  <td>{format(pay.payPositionWage)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">복리후생비</td>
                  <td>{format(pay.payBenefits)}</td>
                </tr>
                <tr className="font-bold text-blue-700">
                  <td className="px-3 py-1">지급합계</td>
                  <td>{format(pay.payTotalSalary)}</td>
                </tr>
              </tbody>
            </table>
            <table className="w-full text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr className="border-b border-gray-300">
                  <th className="px-3 py-2">공제 항목</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-3 py-1">소득세</td>
                  <td>{format(pay.payIncomeTax)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">지방소득세</td>
                  <td>{format(pay.payResidentTax)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">건강보험</td>
                  <td>{format(pay.payHealthInsurance)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">국민연금</td>
                  <td>{format(pay.payNationalPension)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">고용보험</td>
                  <td>{format(pay.payEmpInsurance)}</td>
                </tr>
                <tr>
                  <td className="px-3 py-1">장기요양보험</td>
                  <td>{format(pay.payLongtermCare)}</td>
                </tr>
                <tr className="font-semibold">
                  <td className="px-3 py-1">공제합계</td>
                  <td>{format(pay.payTotalDeduction)}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* 실제지급액 */}
          <div className="text-right font-bold text-lg text-gray-800 mb-6">
            실지급액: <span className="text-blue-700">{format(pay.payNetSalary)}</span>
          </div>
          {/* 근무시간 요약 */}
          <section className="grid grid-cols-3 text-sm gap-4 border border-gray-200 rounded-md p-4 mb-6">
            <div>
              근로일수: <strong>30</strong>
            </div>
            <div>
              총 근로시간: <strong>209</strong>
            </div>
            <div>
              야간근로수당: <strong>0</strong>
            </div>
            <div>
              휴일근로수당: <strong>0</strong>
            </div>
            <div>
              통상시급: <strong>11,962원</strong>
            </div>
            <div>
              부양가족수: <strong>0</strong>
            </div>
          </section>
          {/* 계산 방법 */}
          <section className="text-sm border border-gray-300">
            <h4 className="text-base font-semibold text-gray-800 mb-3 p-4 bg-gray-100 pl-8">계산방법 (산출식)</h4>

            <div className="bg-white p-5 shadow-sm">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">기본급</span>
                  <span>= 연봉 ÷ 12</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">상여금</span>
                  <span>월급의 10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">직책수당</span>
                  <span>직급별 차등 (MGR: 20%, AM: 10%, JM: 5%) → 중간값 10% 적용</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">복리후생비</span>
                  <span>약 5% 수준의 지원비</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">소득세</span>
                  <span>약 2.7% (근로소득 간이세액 기준)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">주민세</span>
                  <span>소득세의 10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">건강보험</span>
                  <span>7.09% (회사 부담)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">국민연금</span>
                  <span>9% 중 개인부담 4.5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">고용보험</span>
                  <span>0.9% (개인 부담 기준)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-28 font-medium text-gray-900">장기요양보험</span>
                  <span>건강보험료의 12.81%</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
