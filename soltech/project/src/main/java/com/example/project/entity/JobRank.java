package com.example.project.entity;

import com.example.project.entity.constant.JobNo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class JobRank {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "JOB_NO", length = 20)
    private JobNo jobNo;

    @Column(nullable = false, unique = true)
    private String jobName;

    @Column(nullable = false)
    private Double jobDiscount;
}
