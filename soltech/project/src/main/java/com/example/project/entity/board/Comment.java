package com.example.project.entity.board;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.example.project.entity.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "FREE_BOARD_COMMENT")
@ToString(exclude = { "freeBoardNo", "empNo" })
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long frCommentNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FREE_BOARD_COMMENT_NO", nullable = false)
    private FreeBoard freeBoardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FREE_BOARD_COMMENT_EMP_NO", nullable = false)
    private Employee empNo;

    // 대댓글 (자기참조 관계, nullable)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FREE_BOARD_COMMENT_PARENT_NO")
    private Comment frBdParentComment;

    @Column(name = "FREE_BOARD_COMMENT_COMMENT", nullable = false)
    private String frBdCmtContent;

    @CreatedDate
    @Column(name = "FREE_BOARD_COMMENT_REG_DATE", nullable = false, updatable = false)
    private LocalDateTime frBdCmtRegDate;

    @Column(name = "FREE_BOARD_COMMENT_UPDATE_DATE")
    private LocalDateTime frBdCmtUpdateDate;

    public void changeBoardContent(String content) {
        this.frBdCmtContent = content;
        this.frBdCmtUpdateDate = LocalDateTime.now();
    }

    public void changeBoardUpdateDate(LocalDateTime updateDate) {
        this.frBdCmtUpdateDate = updateDate;
    }

}
