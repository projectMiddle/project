package com.example.project.dto.approval;

import java.time.LocalDate;

import com.example.project.entity.constant.AppRoleJobNo;
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
public class AppProcessingDTO {

    private Long empNo;
    private Long appDocNo;
    private AppRoleJobNo appRoleJobNo;
    private Integer appOrder; // 참조자는 null 가능

    private String empName; // 이름
    private String jobName; // 직급명 (ex. 대리, 과장)
    private String deptName; // 부서명

    private String appRoleType; // APPROVER 또는 REFERENCE

    @JsonProperty("status")
    private String appStatus; // WAITING, APPROVED, REJECTED 등

    private String comment; // 결재 의견
    private LocalDate processedDate; // 결재 처리 일자

}
