package com.example.project.dto.mainhome;

import com.example.project.entity.constant.FAQCategory;
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
public class MainFAQDTO {

    private Long faqNo;

    private Long empNo;

    @JsonProperty("eName")
    private String eName;

    private String deptName;

    private String faqTitle;

    private String faqContent;

    private FAQCategory faqCategory;

}
