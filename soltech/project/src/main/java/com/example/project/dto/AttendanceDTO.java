package com.example.project.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.project.entity.constant.AttStatus;

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
public class AttendanceDTO {

    private Long attNo;

    private Long empNo;

    private LocalDate attWorkDate;

    private LocalTime attStartTime;

    private LocalTime attEndTime;

    private AttStatus attStatus;

    private String eName;

    private String deptName;

}
