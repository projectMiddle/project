package com.example.project.service.mail;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import com.example.project.dto.mail.MailAttachmentDTO;

public interface MailFileService {

    // 첨부파일 저장 + DB 저장
    List<MailAttachmentDTO> saveFiles(Long mailNo, MultipartFile[] mailUploadFiles);

    // 첨부파일 삭제 + DB 삭제
    public void deleteFile(String mailFileName);

    List<String> findFileNamesByMailNo(Long mailNo);

    Resource loadFileAsResource(Long mailNo, String fileName);

}