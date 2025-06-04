package com.example.project.repository.mail;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailReceiver;

public interface MailReceiverRepository extends JpaRepository<MailReceiver, Long> {
    
}
