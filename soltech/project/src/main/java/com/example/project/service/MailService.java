package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.repository.mail.MailAttachmentRepository;
import com.example.project.repository.mail.MailReceiverRepository;
import com.example.project.repository.mail.MailSendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class MailService {

    private final MailAttachmentRepository mailAttachmentRepository;
    private final MailReceiverRepository mailReceiverRepository;
    private final MailSendRepository mailSendRepository;

}
