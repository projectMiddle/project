package com.example.project.entity.board;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = { "deptNo", "empNo" })
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class FreeBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long freeBoardNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FREE_BOARD_EMP_NO", nullable = false)
    private Employee empNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FREE_BOARD_DEPT_NO", nullable = false)
    private Department deptNo;

    @Column(name = "FREE_BOARD_TITLE", nullable = false)
    private String frBdTitle;

    @Column(name = "FREE_BOARD_CONTENT", nullable = false)
    private String frBdContent;

    @CreatedDate
    @Column(name = "FREE_BOARD_REG_DATE", nullable = false, updatable = false)
    private LocalDateTime frBdRegDate;

    @Column(name = "FREE_BOARD_UPDATE_DATE")
    private LocalDateTime frBdUpdateDate;

    public void changeBoardContent(String content) {
        this.frBdContent = content;
        this.frBdUpdateDate = LocalDateTime.now();
    }

    public void changeBoardUpdateDate(LocalDateTime updateDate) {
        this.frBdUpdateDate = updateDate;
    }

    public void changeBoardTitle(String title) {
        this.frBdTitle = title;
    }

}
