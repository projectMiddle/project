package com.example.project.dto.board;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.example.project.entity.Employee;
import com.example.project.entity.board.FreeBoard;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
    private Long frCommentNo;
    private Long freeBoardNo;
    private Long empNo;
    private String name;
    private String deptName;
    private String frBdCmtContent;
    private Long parentId; // ← 반드시 포함되어야 함

    private LocalDateTime frBdCmtRegDate;
    private LocalDateTime frBdCmtUpdateDate;
}
