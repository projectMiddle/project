package com.example.project.entity;

import java.time.LocalDate;

import com.example.project.entity.constant.Gender;
import com.example.project.entity.constant.MemberRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
@ToString(exclude = { "deptNo", "jobNo" })
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Employee {

    @Id
    private Long empNo;

    @Column(nullable = false)
    private String eName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender eGender;

    @Column(nullable = false)
    private LocalDate eBirthday;

    @Column(nullable = false, unique = true)
    private String eEmail;

    @Column(nullable = false)
    private String eAddress;

    @Column(nullable = false)
    private String eMobile;

    @Column(nullable = false)
    private String eAccount;

    @Column(nullable = false)
    private String ePassword;

    @Column(nullable = false)
    private LocalDate eHiredate;

    private LocalDate eLeavedate;

    @Column(nullable = false)
    private Long eSalary;

    @Enumerated(EnumType.STRING)
    private MemberRole eMemberRole;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "E_DEPT_NO", nullable = false)
    private Department deptNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "E_JOB_NO", nullable = false)
    private JobRank jobNo;

    public void changeeAddress(String eAddress) {
        this.eAddress = eAddress;
    }

    public void changeeMobile(String eMobile) {
        this.eMobile = eMobile;
    }

    public void changeeAccount(String eAccount) {
        this.eAccount = eAccount;
    }

}
