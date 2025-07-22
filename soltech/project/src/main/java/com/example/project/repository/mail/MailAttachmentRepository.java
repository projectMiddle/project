package com.example.project.repository.mail;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailAttachment;
import com.example.project.entity.mail.MailSend;

public interface MailAttachmentRepository extends JpaRepository<MailAttachment, Long> {

    List<MailAttachment> findByMailNo(MailSend mailSend);

    void deleteByMailFileUuidAndMailFileNameAndMailFilePath(String uuid, String mailFileName, String mailFilePath);

    List<MailAttachment> findByMailNo_MailNo(Long mailNo);
}