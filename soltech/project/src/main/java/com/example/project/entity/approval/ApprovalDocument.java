package com.example.project.entity.approval;

import java.time.LocalDate;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;

import jakarta.persistence.Column;
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
@ToString(exclude = { "deptNo", "empNo" })
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class ApprovalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appDocNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APP_DEPT_NO", nullable = false)
    private Department deptNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APP_EMP_NO", nullable = false)
    private Employee empNo;

    @Column(nullable = false)
    private String appDocCategory;

    @Column(nullable = false)
    private String appDocTitle;

    @Column(nullable = false)
    private String appDocContent;

    @Column(nullable = false)
    private boolean appIsUrgent;

    @Column(nullable = false)
    private boolean appIsFinalized;

    @Column(nullable = false)
    private LocalDate appDocDate;

    private Boolean appIsTemporary;

    public void changeAppDocContent(String appDocContent) {
        this.appDocContent = appDocContent;
    }

    public void changeAppIsUrgent(boolean appIsUrgent) {
        this.appIsUrgent = appIsUrgent;
    }

    public void changeAppIsFinalized(boolean appIsFinalized) {
        this.appIsFinalized = appIsFinalized;
    }

}
