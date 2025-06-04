package com.example.project.repository.mail;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailAttachment;

public interface MailAttachmentRepository extends JpaRepository<MailAttachment, Long> {
    
}
