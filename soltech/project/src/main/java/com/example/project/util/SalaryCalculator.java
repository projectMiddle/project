package com.example.project.util;

import org.springframework.stereotype.Component;

@Component
public class SalaryCalculator {

    // 지급 항목 계산
    public static int calcBonusWage(int base) {
        return (int) (base * 0.10); // 상여금 월급의 10%
    }

    public static int calcPositionWage(int base) {
        return (int) (base * 0.05); // JM 기준 10%
    }

    public static int calcBenefits(int base) {
        return (int) (base * 0.05);
    }

    // 공제 항목 계산
    public static int calcIncomeTax(int base) {
        return (int) (base * 0.027);
    }

    public static int calcResidentTax(int incomeTax) {
        return (int) (incomeTax * 0.10); // 소득의 10%
    }

    public static int calcHealthInsurance(int base) {
        return (int) (base * 0.07090); // 7.09%
    }

    public static int calcNationalPension(int base) {
        return (int) (base * 0.045); // 9% 중 개인 부담분
    }

    public static int calcEmpInsurance(int base) {
        return (int) (base * 0.009); // 0.9%
    }

    public static int calcLongtermCare(int healthInsurance) {
        return (int) (healthInsurance * 0.1281); // 건보료
    }
}
