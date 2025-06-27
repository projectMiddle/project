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

        private final EmpPayRepository empPayRepository;
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

        // 명세서 수정
        public EmpPay updatePay(Long empPayId, EmpPayDTO dto) {
                EmpPay empPay = empPayRepository.findById(empPayId)
                                .orElseThrow(() -> new RuntimeException("급여명세서를 찾을 수 없습니다."));

                empPay.setPayBaseSalary(dto.getPayBaseSalary());
                empPay.setPayBonusWage(dto.getPayBonusWage());
                // 필요한 setter만 유지 (필드가 많다면 builder 재생성 고려)

                return empPayRepository.save(empPay);
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

}
