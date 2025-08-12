package com.example.project.entity;

import java.time.YearMonth;

import com.example.project.converter.YearMonthAttributeConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = "empNo")
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class EmpPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAY_EMP_NO", nullable = false)
    private Employee empNo;

    @Column(nullable = false)
    @Convert(converter = YearMonthAttributeConverter.class)
    private YearMonth payMonth; // 급여 대상 월 (예: 2025-06)

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payBaseSalary; // 기본급

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payBonusWage; // 상여금

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payPositionWage; // 직책수당

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payBenefits; // 복리후생비

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payIncomeTax; // 소득세

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payResidentTax; // 주민세

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payHealthInsurance; // 건강보험

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payNationalPension; // 국민연금

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payEmpInsurance; // 고용보험

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payLongtermCare; // 장기요양보험

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payTotalSalary; // 총 지급액

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payTotalDeduction; // 총 공제액

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int payNetSalary; // 실 수령액

    public void setPayBaseSalary(int payBaseSalary) {
        this.payBaseSalary = payBaseSalary;
    }

    public void setPayBonusWage(int payBonusWage) {
        this.payBonusWage = payBonusWage;
    }

    public void setEmpNo(Employee empNo) {
        this.empNo = empNo;
    }

    public void setPayMonth(YearMonth payMonth) {
        this.payMonth = payMonth;
    }

    public void setPayPositionWage(int payPositionWage) {
        this.payPositionWage = payPositionWage;
    }

    public void setPayBenefits(int payBenefits) {
        this.payBenefits = payBenefits;
    }

    public void setPayIncomeTax(int payIncomeTax) {
        this.payIncomeTax = payIncomeTax;
    }

    public void setPayResidentTax(int payResidentTax) {
        this.payResidentTax = payResidentTax;
    }

    public void setPayHealthInsurance(int payHealthInsurance) {
        this.payHealthInsurance = payHealthInsurance;
    }

    public void setPayNationalPension(int payNationalPension) {
        this.payNationalPension = payNationalPension;
    }

    public void setPayEmpInsurance(int payEmpInsurance) {
        this.payEmpInsurance = payEmpInsurance;
    }

    public void setPayLongtermCare(int payLongtermCare) {
        this.payLongtermCare = payLongtermCare;
    }

    public void setPayTotalSalary(int payTotalSalary) {
        this.payTotalSalary = payTotalSalary;
    }

    public void setPayTotalDeduction(int payTotalDeduction) {
        this.payTotalDeduction = payTotalDeduction;
    }

    public void setPayNetSalary(int payNetSalary) {
        this.payNetSalary = payNetSalary;
    }
}
