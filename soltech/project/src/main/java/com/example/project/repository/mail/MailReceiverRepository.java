package com.example.project.repository.mail;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mail.MailReceiver;
import com.example.project.entity.mail.MailSend;

public interface MailReceiverRepository extends JpaRepository<MailReceiver, Long> {
    // 송신 상세 조회
    List<MailReceiver> findByMailNo(MailSend mail);

    // 특정 사원이 수신자인 메일 조회
    List<MailReceiver> findByEmpNoEmpNo(Long empNo);

    // 특정 메일을 받은 수신자들 중 나 찾기
    Optional<MailReceiver> findByMailNo_MailNoAndEmpNo_EmpNo(Long mail, Long empNo);

    // mailNo정렬
    List<MailReceiver> findByEmpNo_EmpNoOrderByMailNo_MailNoDesc(Long empNo);
}