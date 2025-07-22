package com.example.project.dto;

import java.time.YearMonth;

import com.example.project.entity.EmpPay;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class EmpPayDTO {

    private Long payNo;

    // private Employee empNo;
    private Long empNo;

    private String payMonth; // 급여 대상 월 (예: 2025-06)

    private Long annualSalary; // 연봉

    private int payBaseSalary; // 기본급

    private int payBonusWage; // 상여금

    private int payPositionWage; // 직책수당

    private int payBenefits; // 복리후생비

    private int payIncomeTax; // 소득세

    private int payResidentTax; // 주민세

    private int payHealthInsurance; // 건강보험

    private int payNationalPension; // 국민연금

    private int payEmpInsurance; // 고용보험

    private int payLongtermCare; // 장기요양보험

    // 추가 항목

    private int payTotalSalary; // 총 수령액
    private int payTotalDeduction; // 총 공제액
    private int payNetSalary; // 실 수령액

    @JsonProperty("eName")
    private String eName;

    private String departmentName;
    private String jobName;
    private String accountNumber;

    public EmpPay toEntity() {
        return EmpPay.builder()
                .payMonth(YearMonth.parse(this.payMonth))
                .payBaseSalary(this.payBaseSalary)
                .payBonusWage(this.payBonusWage)
                .payPositionWage(this.payPositionWage)
                .payBenefits(this.payBenefits)
                .payIncomeTax(this.payIncomeTax)
                .payResidentTax(this.payResidentTax)
                .payHealthInsurance(this.payHealthInsurance)
                .payNationalPension(this.payNationalPension)
                .payEmpInsurance(this.payEmpInsurance)
                .payLongtermCare(this.payLongtermCare)
                .payTotalSalary(this.payTotalSalary)
                .payTotalDeduction(this.payTotalDeduction)
                .payNetSalary(this.payNetSalary)
                .build();
    }
}
