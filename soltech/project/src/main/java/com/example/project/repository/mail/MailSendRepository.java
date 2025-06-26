package com.example.project.repository.mail;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailSend;

public interface MailSendRepository extends JpaRepository<MailSend, Long> {
    List<MailSend> findByEmpNoEmpNo(Long empNo);

    // mailNo정렬
    List<MailSend> findByEmpNo_EmpNoOrderByMailNoDesc(Long empNo);
}