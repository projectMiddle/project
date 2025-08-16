package com.example.project.dto;

import java.time.LocalDate;

import com.example.project.entity.constant.Gender;
import com.example.project.entity.constant.MemberRole;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AllInformationDTO {

    private Long empNo;

    @JsonProperty("eName")
    private String eName;

    @JsonProperty("eGender")
    private Gender eGender;

    @JsonProperty("eBirthday")
    private LocalDate eBirthday;

    @JsonProperty("eEmail")
    private String eEmail;

    @JsonProperty("eAddress")
    private String eAddress;

    @JsonProperty("eMobile")
    private String eMobile;

    @JsonProperty("eAccount")
    private String eAccount;

    @JsonProperty("mMemberRole")
    private MemberRole mMemberRole;

    @JsonProperty("eHiredate")
    private LocalDate eHiredate;

    @JsonProperty("eLeavedate")
    private LocalDate eLeavedate;

    @JsonProperty("eSalary")
    private Long eSalary;

    private String deptName;

    private String deptPhone;

    private String jobName;

    private Double jobDiscount;

}
