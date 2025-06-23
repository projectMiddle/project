package com.example.project.service.mail;

import org.springframework.web.multipart.MultipartFile;

import com.example.project.entity.mail.MailAttachment;
import com.example.project.entity.mail.MailSend;

public interface MailFileService {

    // 파일 저장 + DB 저장
    MailAttachment saveFile(MultipartFile file, MailSend mailSend);

    // 파일 삭제
    void deleteFile(String encodedPath);
}
