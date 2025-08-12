package com.example.project.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.project.dto.EmpPayDTO;
import com.example.project.dto.EmpPayResponseDTO;
import com.example.project.entity.EmpPay;
import com.example.project.entity.Employee;
import com.example.project.repository.EmpPayRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.util.SalaryCalculator;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class EmpPayService {

        private final EmployeeRepository employeeRepository;
        private final SalaryCalculator salaryCalculator;

        // 자동 계산 (분리된 기능)
        @Transactional
        public EmpPayResponseDTO calculate(EmpPayDTO dto) {
                // 연봉에서 월급 계산
                BigDecimal annualSalary = BigDecimal.valueOf(dto.getAnnualSalary());
                BigDecimal base = annualSalary.divide(BigDecimal.valueOf(12), 0, RoundingMode.HALF_UP);

                // 각 항목 계산
                BigDecimal bonus = base.multiply(new BigDecimal("0.10"));
                BigDecimal position = base.multiply(new BigDecimal("0.05"));
                BigDecimal benefits = base.multiply(new BigDecimal("0.05"));

                BigDecimal incomeTax = base.multiply(new BigDecimal("0.027"));
                BigDecimal residentTax = incomeTax.multiply(new BigDecimal("0.10"));
                BigDecimal health = base.multiply(new BigDecimal("0.07090"));
                BigDecimal pension = base.multiply(new BigDecimal("0.045"));
                BigDecimal empIns = base.multiply(new BigDecimal("0.009"));
                BigDecimal longtermCare = health.multiply(new BigDecimal("0.1281"));

                // 응답 DTO 구성
                return EmpPayResponseDTO.builder()
                                .payMonth(YearMonth.parse(dto.getPayMonth()))
                                .baseSalary(base)
                                .bonusWage(bonus)
                                .positionWage(position)
                                .benefits(benefits)
                                .incomeTax(incomeTax)
                                .residentTax(residentTax)
                                .healthInsurance(health)
                                .nationalPension(pension)
                                .empInsurance(empIns)
                                .longtermCare(longtermCare)
                                .build();
        }

        // 명세서 저장 (자동계산은 프론트에서 완료된 값 기준)
        public EmpPay save(EmpPayDTO dto) {
                Employee employee = employeeRepository.findById(dto.getEmpNo())
                                .orElseThrow(() -> new RuntimeException("사원 정보가 없습니다."));

                EmpPay empPay = dto.toEntity();
                empPay.setEmpNo(employee);

                return empPayRepository.save(empPay);
        }

        // 월별 리스트
        public List<EmpPayDTO> getPayListByMonth(int year, int month) {
                YearMonth ym = YearMonth.of(year, month);
                List<EmpPay> result = empPayRepository.findByPayMonth(ym);

                return result.stream()
                                .map(empPay -> EmpPayDTO.builder()
                                                .payNo(empPay.getPayNo())
                                                .empNo(empPay.getEmpNo().getEmpNo())
                                                .payMonth(empPay.getPayMonth().toString())
                                                .payBaseSalary(empPay.getPayBaseSalary())
                                                .payBonusWage(empPay.getPayBonusWage())
                                                .payPositionWage(empPay.getPayPositionWage())
                                                .payNetSalary(empPay.getPayNetSalary())
                                                .departmentName(empPay.getEmpNo().getDeptNo().getDeptName())
                                                .jobName(empPay.getEmpNo().getJobNo().getJobName())
                                                .accountNumber(empPay.getEmpNo().getEAccount())
                                                .eName(empPay.getEmpNo().getEName())
                                                .build())
                                .collect(Collectors.toList());

        }

        // 명세서 단건 조회
        public EmpPayDTO getPayDto(Long id) {
                EmpPay empPay = empPayRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                return EmpPayDTO.builder()
                                .payNo(empPay.getPayNo())
                                .empNo(empPay.getEmpNo().getEmpNo())
                                .jobName(empPay.getEmpNo().getJobNo().getJobName())
                                .payMonth(empPay.getPayMonth().toString())
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
                                .eName(empPay.getEmpNo().getEName())
                                .annualSalary(empPay.getEmpNo().getESalary())
                                .departmentName(empPay.getEmpNo().getDeptNo().getDeptName())
                                .accountNumber(empPay.getEmpNo().getEAccount())
                                .build();
        }

        @Transactional
        public EmpPayDTO updatePay(Long empPayId, EmpPayDTO dto) {
                EmpPay e = empPayRepository.findById(empPayId)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                // 필요한 필드 전부 반영 (payMonth/empNo는 일반적으로 수정 안 함)
                e.setPayBaseSalary(dto.getPayBaseSalary());
                e.setPayBonusWage(dto.getPayBonusWage());
                e.setPayPositionWage(dto.getPayPositionWage());
                e.setPayBenefits(dto.getPayBenefits());

                e.setPayIncomeTax(dto.getPayIncomeTax());
                e.setPayResidentTax(dto.getPayResidentTax());
                e.setPayHealthInsurance(dto.getPayHealthInsurance());
                e.setPayNationalPension(dto.getPayNationalPension());
                e.setPayEmpInsurance(dto.getPayEmpInsurance());
                e.setPayLongtermCare(dto.getPayLongtermCare());

                e.setPayTotalSalary(dto.getPayTotalSalary());
                e.setPayTotalDeduction(dto.getPayTotalDeduction());
                e.setPayNetSalary(dto.getPayNetSalary());

                EmpPay saved = empPayRepository.save(e);
                return toDto(saved); // 기존 DTO 매핑 메서드 사용
        }

        // 명세서 삭제
        public void deletePay(Long empPayId) {
                EmpPay empPay = empPayRepository.findById(empPayId)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                empPayRepository.delete(empPay);
        }

        public Optional<Map<String, Object>> getEmployeeInfo(Long empNo) {
                return employeeRepository.findById(empNo).map(emp -> {
                        Map<String, Object> result = new HashMap<>();
                        result.put("empNo", emp.getEmpNo());
                        result.put("name", emp.getEName());
                        result.put("gender", emp.getEGender().toString());
                        result.put("account", emp.getEAccount());
                        result.put("department", emp.getDeptNo().getDeptName());
                        result.put("jobName", emp.getJobNo().getJobName());
                        return result;
                });
        }

        private final EmpPayRepository empPayRepository;

        public List<EmpPayDTO> getPayListByEmpNoAndYear(Long empNo, int year) {
                YearMonth start = YearMonth.of(year, 1);
                YearMonth end = YearMonth.of(year, 12);

                List<EmpPay> list = empPayRepository
                                .findByEmpNoEmpNoAndPayMonthBetween(empNo, start, end);

                // ⬇ 기존에 쓰던 DTO 매핑 그대로 사용
                return list.stream()
                                .map(this::toDto) // 기존 매핑 메서드가 있으면 그거 사용
                                .toList();
        }

        private EmpPayDTO toDto(EmpPay p) {
                // 프로젝트에 있는 방식 그대로. (예시는 필드 일부)
                return EmpPayDTO.builder()
                                .payNo(p.getPayNo())
                                .empNo(p.getEmpNo().getEmpNo())
                                .eName(p.getEmpNo().getEName())
                                .departmentName(p.getEmpNo().getDeptNo().getDeptName())
                                .jobName(p.getEmpNo().getJobNo().getJobName())
                                .payMonth(p.getPayMonth().toString())
                                .payBaseSalary(p.getPayBaseSalary())
                                .payBonusWage(p.getPayBonusWage())
                                .payPositionWage(p.getPayPositionWage())
                                .payBenefits(p.getPayBenefits())
                                .payIncomeTax(p.getPayIncomeTax())
                                .payResidentTax(p.getPayResidentTax())
                                .payHealthInsurance(p.getPayHealthInsurance())
                                .payNationalPension(p.getPayNationalPension())
                                .payEmpInsurance(p.getPayEmpInsurance())
                                .payLongtermCare(p.getPayLongtermCare())
                                .payTotalSalary(p.getPayTotalSalary())
                                .payTotalDeduction(p.getPayTotalDeduction())
                                .payNetSalary(p.getPayNetSalary())
                                .accountNumber(p.getEmpNo().getEAccount())
                                .annualSalary(p.getEmpNo().getESalary())
                                .build();
        }
}
