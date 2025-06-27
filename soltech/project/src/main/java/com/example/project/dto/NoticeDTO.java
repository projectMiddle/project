package com.example.project.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;
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
public class NoticeDTO {

    private Long notiNo;

    private Long empNo;

    private Long deptNo;

    private String deptName;

    private String name;

    private String notiTitle;

    private String notiContent;

    private LocalDateTime notiRegDate;

    private LocalDateTime notiUpdateDate;

}
