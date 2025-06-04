package com.example.project.repository.mail;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailSend;

public interface MailSendRepository extends JpaRepository<MailSend, Long> {
    
}
