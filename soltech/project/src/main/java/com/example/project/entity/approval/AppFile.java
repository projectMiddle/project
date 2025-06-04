package com.example.project.entity.approval;

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
@ToString(exclude = "appDocNo")
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class AppFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appFileNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "APP_DOC_NO", nullable = false)
    private ApprovalDocument appDocNo;

    @Column(nullable = false, length = 200)
    private String appFileName;

    @Column(nullable = false)
    private String appFilePath;

    @Column(nullable = false)
    private String appFileUuid;

}
