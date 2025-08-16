package com.example.project.dto.mainhome;

import java.time.LocalDateTime;

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
public class MainJobsDTO {

    private Long jobsNo;

    private Long empNo;

    private String jobsTitle;

    private String jobsContent;

    private LocalDateTime jobsRegDate;
    
}
