package com.example.project.repository;

import com.example.project.dto.mail.*;
import com.example.project.entity.Employee;
import com.example.project.repository.mail.MailSendRepository;
import com.example.project.repository.mail.MailReceiverRepository;
import com.example.project.service.mail.MailService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
public class MailRepositoryTest {

    @Autowired
    private MailService mailService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MailSendRepository mailSendRepository;

    @Autowired
    private MailReceiverRepository mailReceiverRepository;

    private final Long senderEmpNo = 1049L;
    private final Long receiverEmpNo = 1023L;

    // 1. 메일 전송
    @Test
    @Commit
    public void testSendMail() {
        MailSendDTO dto = MailSendDTO.builder()
                .mailTitle("테스트 메일 제목")
                .mailContent("테스트 본문입니다.")
                .receiverIds(List.of(receiverEmpNo)) // 수신자
                .build();

        mailService.sendMail(dto, senderEmpNo);
        System.out.println("✅ 메일 전송 완료");
    }

    // 2. 받은 메일 목록 조회
    @Test
    public void testGetReceivedMailList() {
        List<MailReceiveListDTO> list = mailService.getReceivedMails(receiverEmpNo);
        System.out.println("📨 받은 메일 개수: " + list.size());

        for (MailReceiveListDTO dto : list) {
            System.out.println("제목: " + dto.getMailTitle());
            System.out.println("보낸 사람: " + dto.getSender().getName() + " <" + dto.getSender().getEmail() + ">");
            System.out.println("읽음 여부: " + dto.isMailIsRead());
            System.out.println("수신 타입: " + dto.getMailReceiverType());
            System.out.println("---");
        }
    }

    // 3. 보낸 메일 목록 조회
    @Test
    public void testGetSentMailList() {
        List<MailSendListDTO> list = mailService.getSendMails(senderEmpNo);
        System.out.println("✉ 보낸 메일 개수: " + list.size());

        for (MailSendListDTO dto : list) {
            System.out.println("제목: " + dto.getMailTitle());
            System.out.println("수신자 수: " + dto.getReceivers().size());
            for (UserInfo receiver : dto.getReceivers()) {
                System.out.println("→ " + receiver.getName() + " <" + receiver.getEmail() + ">");
            }
            System.out.println("---");
        }
    }

    // 4. 받은 메일 상세 조회
    @Test
    public void testGetReceivedMailDetail() {
        var receiver = mailReceiverRepository.findByEmpNoEmpNo(receiverEmpNo).stream().findFirst().orElseThrow();
        MailReceiveDetailDTO dto = mailService.getReceiveMailDetail(receiver.getMailNo().getMailNo(), receiverEmpNo);

        System.out.println("📥 받은 메일 상세");
        System.out.println("제목: " + dto.getMailTitle());
        System.out.println("내용: " + dto.getMailContent());
        System.out.println("발신자: " + dto.getSender().getName() + " <" + dto.getSender().getEmail() + ">");
    }

    // 5. 보낸 메일 상세 조회
    @Test
    public void testGetSentMailDetail() {
        var mail = mailSendRepository.findByEmpNoEmpNo(senderEmpNo).stream().findFirst().orElseThrow();
        MailSendDetailDTO dto = mailService.getSendMailDetailDTO(mail.getMailNo());

        System.out.println("📤 보낸 메일 상세");
        System.out.println("제목: " + dto.getMailTitle());
        System.out.println("본문: " + dto.getMailContent());
        System.out.println("수신자 수: " + dto.getReceivers().size());
    }

    // 6. 읽음 처리
    @Test
    @Commit
    public void testMarkAsRead() {
        var receiver = mailReceiverRepository.findByEmpNoEmpNo(receiverEmpNo).stream().findFirst().orElseThrow();
        mailService.markAsRead(receiver.getMailNo().getMailNo(), receiverEmpNo);
        System.out.println("✅ 읽음 처리 완료");
    }

    // 7. 받은 메일 삭제
    @Test
    @Commit
    public void testDeleteReceivedMail() {
        var receiver = mailReceiverRepository.findByEmpNoEmpNo(receiverEmpNo).stream().findFirst().orElseThrow();
        mailService.deleteMail(receiver.getMailNo().getMailNo(), receiverEmpNo);
        System.out.println("🗑️ 받은 메일 삭제 완료");
    }
}
