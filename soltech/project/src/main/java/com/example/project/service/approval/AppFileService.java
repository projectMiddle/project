package com.example.project.service.approval;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.approval.AppFileDTO;

public interface AppFileService {
    
    // 첨부파일 저장 + DB 저장
    List<AppFileDTO> saveFiles(Long appDocNo, MultipartFile[] uploadFiles);

    // 첨부파일 삭제 + DB 삭제
    public void  deleteFile(String fileName);

}
