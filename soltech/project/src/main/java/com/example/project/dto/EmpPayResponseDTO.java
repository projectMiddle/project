package com.example.project.dto;

import java.math.BigDecimal;
import java.time.YearMonth;

import com.example.project.entity.EmpPay;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmpPayResponseDTO {

    private YearMonth payMonth;

    private BigDecimal baseSalary;
    private BigDecimal bonusWage;
    private BigDecimal positionWage;
    private BigDecimal benefits;

    private BigDecimal incomeTax;
    private BigDecimal residentTax;
    private BigDecimal healthInsurance;
    private BigDecimal nationalPension;
    private BigDecimal empInsurance;
    private BigDecimal longtermCare;

    public static EmpPayResponseDTO from(EmpPay empPay) {
        return EmpPayResponseDTO.builder()

                .payMonth(empPay.getPayMonth())
                .baseSalary(BigDecimal.valueOf(empPay.getPayBaseSalary()))
                .bonusWage(BigDecimal.valueOf(empPay.getPayBonusWage()))
                .positionWage(BigDecimal.valueOf(empPay.getPayPositionWage()))
                .benefits(BigDecimal.valueOf(empPay.getPayBenefits()))
                .incomeTax(BigDecimal.valueOf(empPay.getPayIncomeTax()))
                .residentTax(BigDecimal.valueOf(empPay.getPayResidentTax()))
                .healthInsurance(BigDecimal.valueOf(empPay.getPayHealthInsurance()))
                .nationalPension(BigDecimal.valueOf(empPay.getPayNationalPension()))
                .empInsurance(BigDecimal.valueOf(empPay.getPayEmpInsurance()))
                .longtermCare(BigDecimal.valueOf(empPay.getPayLongtermCare()))
                .build();
    }

}
