package com.example.project.dto.approval;

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
public class AppEmployeeAllDTO {

    private Long empNo;
    @JsonProperty("eName")
    private String eName;
    private String jobNo;
    private String jobName;
    private String deptName;
    

}
