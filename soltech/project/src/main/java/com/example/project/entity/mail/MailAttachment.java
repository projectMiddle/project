package com.example.project.entity.mail;

import java.time.LocalDate;

import jakarta.persistence.Column;
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
@ToString(exclude = "mailNo")
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class MailAttachment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailAttachmentNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAIL_NO", nullable = false)
    private MailSend mailNo;

    @Column(nullable = false, length = 200)
    private String mailFileName;

    @Column(nullable = false)
    private String mailFilePath;

    @Column(nullable = false)
    private String mailFileUuid;

    @Column(nullable = false)
    private int mailFileSize;

    private LocalDate mailUploadDate;

    public void updateFileInfo(String fileName, String filePath, String uuid) {
        this.mailFileName = fileName;
        this.mailFilePath = filePath;
        this.mailFileUuid = uuid;
    }

    public void changeMailNo(MailSend mno) {
        this.mailNo = mno;
    }

}
