package com.example.project.dto;

import java.time.LocalDateTime;

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

    private Employee empNo;

    private Department deptNo;

    private String notiTitle;

    private String notiContent;

    private LocalDateTime notiRegDate;

    private LocalDateTime notiUpdateDate;

}
