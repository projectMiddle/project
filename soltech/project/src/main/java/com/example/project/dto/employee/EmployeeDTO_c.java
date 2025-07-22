package com.example.project.dto.employee;

import java.time.LocalDate;

import com.example.project.entity.Department;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.Gender;
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
public class EmployeeDTO_c {

    private Long empNo;

    private String eName;

    private Gender eGender;

    private LocalDate eBirth;

    private String eEmail;

    private String eAddress;

    private String eMobile;

    private String eAccount;

    private String ePassword;

    private LocalDate eHiredate;

    private LocalDate eLeavedate;

    private Long eSalary;

    // private Department deptNo;

    // private JobRank jobNo;
    private Long deptNo;
    private String deptName;

    private String jobNo;

}
