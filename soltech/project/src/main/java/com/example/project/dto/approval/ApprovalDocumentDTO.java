package com.example.project.dto.approval;

import java.time.LocalDate;

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
public class ApprovalDocumentDTO {

    private Long appDocNo;
    private String appDocTitle;
    private String appDocCategory;
    private boolean appIsUrgent;
    private boolean appIsFinalized;
    private LocalDate appDocDate;
    @JsonProperty("eName")
    private String eName;
    private String deptName;

}
