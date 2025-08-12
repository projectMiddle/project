package com.example.project.repository;

import java.time.YearMonth;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import com.example.project.entity.EmpPay;
import com.example.project.entity.Employee;

@SpringBootTest
class EmpPayRepositoryTest {

    @Autowired
    private EmpPayRepository empPayRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // ⚠️ 필요시 프로파일을 로컬/운영 DB로 맞추세요 (@ActiveProfiles("local") 등)
    // ⚠️ 테스트는 기본 롤백이므로, 커밋 보장하려면 @Transactional + @Commit 사용

    @Test
    @Transactional
    @Commit // 테스트 기본 롤백 방지
    void seedPays2025_AllEmployees() {
        final int year = 2025;

        // 원하는 범위로 바꿔도 됨 (특정 부서만 등)
        var employees = employeeRepository.findAll();

        for (Employee emp : employees) {
            // ✅ 해당 사원의 해당 연도(1~12월) 기존 데이터 미리 가져오기
            var existingOfYear = empPayRepository.findByEmpNoEmpNoAndPayMonthBetween(
                    emp.getEmpNo(),
                    YearMonth.of(year, 1),
                    YearMonth.of(year, 12));

            for (int m = 1; m <= 12; m++) {
                YearMonth ym = YearMonth.of(year, m);

                // 월 기본급 = 연봉/12
                int base = Math.toIntExact(resolveAnnualSalary(emp) / 12L);

                // 예시 계산식 (프로젝트 규칙에 맞게 조정 가능)
                int bonus = Math.round(base * 0.10f);
                int position = Math.round(base * 0.05f);
                int benefits = Math.round(base * 0.05f);

                int incomeTax = Math.round(base * 0.027f);
                int residentTax = Math.round(incomeTax * 0.10f);
                int health = Math.round(base * 0.07090f);
                int pension = Math.round(base * 0.045f);
                int empIns = Math.round(base * 0.009f);
                int longtermCare = Math.round(health * 0.1281f);

                int totalSalary = base + bonus + position + benefits;
                int totalDeduction = incomeTax + residentTax + health + pension + empIns + longtermCare;
                int net = totalSalary - totalDeduction;

                // ✅ 해당 월 기존 레코드 찾기(리스트에서 찾기 or 직접 쿼리)
                var existing = existingOfYear.stream()
                        .filter(p -> ym.equals(p.getPayMonth()))
                        .findFirst();
                // 또는: empPayRepository.findByEmpNoEmpNoAndPayMonth(emp.getEmpNo(), ym)

                EmpPay pay = existing.orElseGet(EmpPay::new);
                if (pay.getPayNo() == null) { // 신규
                    pay.setEmpNo(emp); // EmpPay.empNo는 Employee 연관
                    pay.setPayMonth(ym); // setPayMonth(YearMonth) 추가된 상태여야 함
                }

                pay.setPayBaseSalary(base);
                pay.setPayBonusWage(bonus);
                pay.setPayPositionWage(position);
                pay.setPayBenefits(benefits);
                pay.setPayIncomeTax(incomeTax);
                pay.setPayResidentTax(residentTax);
                pay.setPayHealthInsurance(health);
                pay.setPayNationalPension(pension);
                pay.setPayEmpInsurance(empIns);
                pay.setPayLongtermCare(longtermCare);
                pay.setPayTotalSalary(totalSalary);
                pay.setPayTotalDeduction(totalDeduction);
                pay.setPayNetSalary(net);

                empPayRepository.save(pay);
            }
        }
    }

    /** Employee 엔티티 기준(연봉: eSalary: Long) */
    private int resolveAnnualSalary(Employee emp) {
        Long annual = emp.getESalary();
        return (annual != null) ? Math.toIntExact(annual) : 48_000_000; // 기본 4,800만원
    }
}
