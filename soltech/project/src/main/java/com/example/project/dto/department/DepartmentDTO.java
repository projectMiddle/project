package com.example.project.dto.department;

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
public class DepartmentDTO {
    
    private Long deptNo;
    private String deptName;
    private String deptPhone;

}
