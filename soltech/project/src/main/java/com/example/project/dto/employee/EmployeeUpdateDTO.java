package com.example.project.dto.employee;

import java.time.LocalDate;

import com.example.project.entity.Department;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.Gender;
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
public class EmployeeUpdateDTO {

    private String eMobile;
    private String eAddress;
    private String eAccount;
    private String ePassword;
}
