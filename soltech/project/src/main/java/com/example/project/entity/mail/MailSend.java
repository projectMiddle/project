package com.example.project.entity.mail;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.example.project.entity.Employee;

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
@ToString(exclude = "empNo")
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class MailSend {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mailNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MAIL_EMP_NO", nullable = false)
    private Employee empNo;  // 발신자

    @Column(nullable = false)
    private String mailTitle;

    @Column
    private String mailContent;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime mailSendDate;

}
