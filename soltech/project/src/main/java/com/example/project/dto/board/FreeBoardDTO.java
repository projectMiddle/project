package com.example.project.dto.board;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class FreeBoardDTO {

    private Long freeBoardNo; // 게시글 번호 (PK)

    private Long empNo; // 작성자 사번
    private Long deptNo; // 부서 번호

    private String name; // 작성자 이름
    private String deptName; // 부서 이름

    private String frBdTitle; // 제목
    private String frBdContent; // 내용

    private LocalDateTime frBdRegDate; // 작성일자
    private LocalDateTime frBdUpdateDate; // 수정일자

    private List<CommentDTO> comments; // 댓글 목록 (선택)
}
