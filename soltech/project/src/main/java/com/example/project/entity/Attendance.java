package com.example.project.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.example.project.entity.constant.AttStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Id;

import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString(exclude = "empNo")
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ATT_EMP_NO", nullable = false)
    private Employee empNo;

    @Column(nullable = false)
    private LocalDate attWorkDate;

    @Column(nullable = false)
    private LocalTime attStartTime;

    private LocalTime attEndTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "ATT_STATUS", nullable = false)
    private AttStatus attStatus;

    public void changeAttWorkDate(LocalDate attWorkDate) {
        this.attWorkDate = attWorkDate;
    }

    public void changeAttStartTime(LocalTime attStartTime) {
        this.attStartTime = attStartTime;
    }

    public void changeAttEndTime(LocalTime attEndTime) {
        this.attEndTime = attEndTime;
    }

    public void changeAttStatus(AttStatus attStatus) {
        this.attStatus = attStatus;
    }

}
