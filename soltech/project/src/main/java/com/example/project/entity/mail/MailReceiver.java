package com.example.project.entity.mail;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.MailReceiverType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@ToString(exclude = { "empNo", "mailNo" })
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class MailReceiver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailReceiverNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAIL_NO", nullable = false)
    private MailSend mailNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAIL_EMP_NO", nullable = false)
    private Employee empNo; // 수신자

    @Enumerated(EnumType.STRING)
    @Column(name = "MAIL_RECEIVER_TYPE", nullable = false)
    private MailReceiverType mailReceiverType;

    @Column(nullable = false)
    private boolean mailIsRead;

    public void changeMailIsRead(boolean mailIsRead) {

        this.mailIsRead = mailIsRead;

    }

    public void changeMailReceiverType(MailReceiverType mailReceiverType) {
        this.mailReceiverType = mailReceiverType;
    }

}
