package com.example.project.dto.approval;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.example.project.entity.approval.AppFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class AppFileDTO {

    private Long appFileNo; // 파일 PK
    private String appFileName; // 원본 파일명
    private String appFilePath; // 저장 경로 (yyyy/MM/dd 형식)
    private String appFileUuid; // UUID

    public String getDownloadURL() {
        try {
            return URLEncoder.encode("/upload/" + appFilePath + "/" + appFileUuid + "_" + appFileName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "";
        }
    }

    public AppFileDTO(AppFile file) {
        this.appFileNo = file.getAppFileNo();
        this.appFileName = file.getAppFileName();
        this.appFilePath = file.getAppFilePath();
        this.appFileUuid = file.getAppFileUuid();
    }

}
