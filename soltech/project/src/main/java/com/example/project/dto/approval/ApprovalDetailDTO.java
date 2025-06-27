package com.example.project.dto.approval;

import java.time.LocalDate;
import java.util.List;

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
public class ApprovalDetailDTO {

    private Long appDocNo;
    private String appDocCategory;
    private String appDocTitle;
    private String appDocContent;
    private LocalDate appDocDate;
    private boolean appIsUrgent;
    private boolean appIsFinalized;

    @JsonProperty("eName")
    private String eName;
    private String deptName;
    private Long empNo;

    private List<AppFileDTO> files;

    private List<AppProcessingDTO> approvers;
    private List<AppProcessingDTO> references;
    
}
