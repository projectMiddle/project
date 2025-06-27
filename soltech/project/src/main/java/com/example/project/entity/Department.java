package com.example.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;

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
public class Department {

    @Id
    private Long deptNo;

    @Column(nullable = false, unique = true)
    private String deptName;

    @Column(nullable = false)
    private String deptPhone;

}
