package com.example.project.dto.approval;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
public class AppDocWithFileDTO {

    // 문서 기본 정보
    private String appDocCategory; // 예: 기안서, 보고서, 연차신청서
    private String appDocTitle; // 문서 제목
    private String appDocContent; // 문서 본문 내용
    private boolean appIsUrgent; // 긴급 여부 (체크박스)
    private boolean appIsFinalized;

    // 첨부파일
    private MultipartFile[] uploadFiles; // FormData에서 "uploadFiles"라는 key로 append

    // 임시: 로그인 사원 정보 직접 전달
    private Long empNo;
    private Long deptNo;

    // 결재선 지정
    private List<AppProcessingDTO> approvers;
    private List<AppProcessingDTO> references;

}
