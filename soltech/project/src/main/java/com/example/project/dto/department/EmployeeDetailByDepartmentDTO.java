package com.example.project.dto.department;

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
public class EmployeeDetailByDepartmentDTO {
    
    private Long empNo;

    @JsonProperty("eName")
    private String eName;

    @JsonProperty("eEmail")
    private String eEmail;

    @JsonProperty("eMobile")
    private String eMobile;

    @JsonProperty("eMemberRole")
    private String eMemberRole;
    
    private String jobName;

}
