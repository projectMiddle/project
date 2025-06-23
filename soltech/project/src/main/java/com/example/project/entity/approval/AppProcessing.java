package com.example.project.entity.approval;

import java.time.LocalDate;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.AppRoleJobNo;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@ToString(exclude = { "appDocNo", "empNo" })
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class AppProcessing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appApprovalNo;

    @ManyToOne
    @JoinColumn(name = "APP_DOC_NO", nullable = false)
    private ApprovalDocument appDocNo;

    @ManyToOne
    @JoinColumn(name = "APP_EMP_NO", nullable = false)
    private Employee empNo;

    @Enumerated(EnumType.STRING)
    private AppRoleJobNo appRoleJobNo;

    @Enumerated(EnumType.STRING)
    private AppRoleType appRoleType;

    @Enumerated(EnumType.STRING)
    private AppStatus appStatus;

    private String appComment;

    private LocalDate appDate;

    private Integer appOrder;

    public void changeAppRoleJobNo(AppRoleJobNo appRoleJobNo) {
        this.appRoleJobNo = appRoleJobNo;
    }

    public void changeAppRoleType(AppRoleType appRoleType) {
        this.appRoleType = appRoleType;
    }

    public void changeAppStatus(AppStatus appStatus) {
        this.appStatus = appStatus;
    }

    public void changeAppComment(String appComment) {
        this.appComment = appComment;
    }

    public void changeAppOrder(int appOrder) {
        this.appOrder = appOrder;
    }

    public void changeAppDate(LocalDate appDate) {
        this.appDate = appDate;
    }

}
