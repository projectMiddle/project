package com.example.project.service;

import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.project.dto.EmpPayDTO;
import com.example.project.entity.EmpPay;
import com.example.project.entity.Employee;
import com.example.project.repository.EmpPayRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.util.SalaryCalculator;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class EmpPayService {

        private final EmpPayRepository empPayRepository;

        private final EmployeeRepository employeeRepository;

        public EmpPay calPay(EmpPayDTO dto) {

                // 사원 조회
                Employee employee = employeeRepository.findById(dto.getEmpNo())
                                .orElseThrow(() -> new RuntimeException("사원 정보가 없습니다."));

                // 기본급
                int base = dto.getPayBaseSalary();

                // 지급 항목
                int bonus = SalaryCalculator.calcBonusWage(base);
                int position = SalaryCalculator.calcPositionWage(base);
                int benefits = SalaryCalculator.calcBenefits(base);

                // 공제 항목
                int incomeTax = SalaryCalculator.calcIncomeTax(base);
                int residentTax = SalaryCalculator.calcResidentTax(incomeTax);
                int health = SalaryCalculator.calcHealthInsurance(base);
                int pension = SalaryCalculator.calcNationalPension(base);
                int empIns = SalaryCalculator.calcEmpInsurance(base);
                int longtermCare = SalaryCalculator.calcLongtermCare(health);

                // 총액 계산
                int totalPay = base + bonus + position + benefits;
                int totalDeduction = incomeTax + residentTax + health + pension + empIns + longtermCare;
                int netPay = totalPay - totalDeduction;

                EmpPay empPay = EmpPay.builder()
                                .empNo(employee)
                                .payMonth(dto.getPayMonth())
                                .payBaseSalary(dto.getPayBaseSalary())
                                .payBonusWage(dto.getPayBonusWage())
                                .payPositionWage(dto.getPayPositionWage())
                                .payBenefits(dto.getPayBenefits())
                                .payIncomeTax(dto.getPayIncomeTax())
                                .payResidentTax(dto.getPayResidentTax())
                                .payHealthInsurance(dto.getPayHealthInsurance())
                                .payNationalPension(dto.getPayNationalPension())
                                .payEmpInsurance(dto.getPayEmpInsurance())
                                .payLongtermCare(dto.getPayLongtermCare())
                                .payTotalSalary(totalPay)
                                .payTotalDeduction(totalDeduction)
                                .payNetSalary(netPay)
                                .build();

                return empPayRepository.save(empPay);
        }

        // 월별 리스트
        public List<EmpPayDTO> getPayListByMonth(int year, int month) {
                YearMonth ym = YearMonth.of(year, month);
                List<EmpPay> result = empPayRepository.findByPayMonth(ym);

                return result.stream()
                                .map((EmpPay empPay) -> EmpPayDTO.builder()
                                                .payNo(empPay.getPayNo())
                                                .empNo(empPay.getEmpNo().getEmpNo())
                                                .payMonth(empPay.getPayMonth())
                                                .payBaseSalary(empPay.getPayBaseSalary())
                                                .payBonusWage(empPay.getPayBonusWage())
                                                .payPositionWage(empPay.getPayPositionWage())
                                                .payNetSalary(empPay.getPayNetSalary())
                                                .build())
                                .collect(Collectors.toList());

        }

        // 명세서 조회
        public EmpPayDTO getPayDto(Long id) {
                EmpPay empPay = empPayRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                return EmpPayDTO.builder()
                                .payNo(empPay.getPayNo())
                                .empNo(empPay.getEmpNo().getEmpNo())
                                .payMonth(empPay.getPayMonth())
                                .payBaseSalary(empPay.getPayBaseSalary())
                                .payBonusWage(empPay.getPayBonusWage())
                                .payPositionWage(empPay.getPayPositionWage())
                                .payBenefits(empPay.getPayBenefits())
                                .payIncomeTax(empPay.getPayIncomeTax())
                                .payResidentTax(empPay.getPayResidentTax())
                                .payHealthInsurance(empPay.getPayHealthInsurance())
                                .payNationalPension(empPay.getPayNationalPension())
                                .payEmpInsurance(empPay.getPayEmpInsurance())
                                .payLongtermCare(empPay.getPayLongtermCare())
                                .payTotalSalary(empPay.getPayTotalSalary())
                                .payTotalDeduction(empPay.getPayTotalDeduction())
                                .payNetSalary(empPay.getPayNetSalary())
                                .build();
        }

        // 명세서 수정
        public EmpPay updatePay(Long empPayId, EmpPayDTO dto) {
                EmpPay empPay = empPayRepository.findById(empPayId)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                empPay.setPayBaseSalary(dto.getPayBaseSalary());
                empPay.setPayBonusWage(dto.getPayBonusWage());

                return empPayRepository.save(empPay);
        }

        // 명세서 삭제
        public void deletePay(Long empPayId) {
                EmpPay empPay = empPayRepository.findById(empPayId)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                empPayRepository.delete(empPay);

        }

}
