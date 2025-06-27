package com.example.project.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.constant.SchType;
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
public class ScheduleDTO {

    private Long schNo;

    private Employee empNo;

    private Department deptNo;

    private SchType schType;

    private String schTitle;

    private String schContent;

    private LocalDate schStartDate;

    private LocalDate schEndDate;

    private LocalTime schStartTime;

    private LocalTime schEndTime;

}
