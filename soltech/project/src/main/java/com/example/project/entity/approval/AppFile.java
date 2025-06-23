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
    @JoinColumn(name = "APP_DOC_NO")
    private ApprovalDocument appDocNo;

    @Column(length = 200)
    private String appFileName;

    private String appFilePath;

    private String appFileUuid;

    public void updateFileInfo(String fileName, String filePath, String uuid) {
        this.appFileName = fileName;
        this.appFilePath = filePath;
        this.appFileUuid = uuid;
    }

    public void changeAppDocNo(ApprovalDocument doc) {
        this.appDocNo = doc;
    }

}
