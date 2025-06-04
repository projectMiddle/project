package com.example.project.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.project.entity.constant.SchType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = {"deptNo", "empNo"})
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Schedule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCH_EMP_NO", nullable = false)
    private Employee empNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCH_DEPT_NO", nullable = false)
    private Department deptNo;

    @Enumerated(EnumType.STRING)
    @Column(name = "SCH_TYPE", nullable = false)
    private SchType schType;

    @Column(nullable = false)
    private String schTitle;

    private String schContent;

    @Column(nullable = false)
    private LocalDate schStartDate;

    @Column(nullable = false)
    private LocalDate schEndDate;

    @Column(nullable = false)
    private LocalTime schStartTime;

    @Column(nullable = false)
    private LocalTime schEndTime;

    public void changeSchTitle(String schTitle) {
        this.schTitle = schTitle;
    }

    public void changeSchContent(String schContent) {
        this.schContent = schContent;
    }

    public void changeSchStartDate(LocalDate schStartDate) {
        this.schStartDate = schStartDate;
    }

    public void changeSchEndDate(LocalDate schEndDate) {
        this.schEndDate = schEndDate;
    }

    public void changeSchStartTime(LocalTime schStartTime) {
        this.schStartTime = schStartTime;
    }

    public void changeSchEndTime(LocalTime schEndTime) {
        this.schEndTime = schEndTime;
    }

    public void changeSchType(SchType schType) {
        this.schType = schType;
    }

}
