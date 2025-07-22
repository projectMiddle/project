package com.example.project.controller.mail;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.mail.MailReceiveDetailDTO;
import com.example.project.dto.mail.MailReceiveListDTO;
import com.example.project.dto.mail.MailSendDTO;
import com.example.project.dto.mail.MailSendDetailDTO;
import com.example.project.dto.mail.MailSendListDTO;
import com.example.project.service.mail.MailService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/intrasoltech/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    // 메일 전송
    @PostMapping("/send")
    public ResponseEntity<String> sendMail(
            @ModelAttribute MailSendDTO dto,
            @RequestParam Long senderEmpNo) {
        mailService.sendMail(dto, senderEmpNo);
        return ResponseEntity.ok("메일 전송 완료");
    }

    // 받은 메일 목록
    @GetMapping("/receiveList")
    public ResponseEntity<List<MailReceiveListDTO>> getReceiveMails(@RequestParam Long empNo) {

        List<MailReceiveListDTO> mails = mailService.getReceivedMails(empNo);
        return ResponseEntity.ok(mails);
    }

    // 보낸 메일 목록
    @GetMapping("/sendList")
    public ResponseEntity<List<MailSendListDTO>> getSendMails(@RequestParam Long empNo) {
        List<MailSendListDTO> result = mailService.getSendMails(empNo);
        return ResponseEntity.ok(result);
    }

    // 받은 메일 상세
    @GetMapping("/receiveDetail")
    public ResponseEntity<MailReceiveDetailDTO> getReceiveDetail(@RequestParam Long mailNo, @RequestParam Long empNo) {
        return ResponseEntity.ok(mailService.getReceiveMailDetail(mailNo, empNo));
    }

    // 보낸 메일 상세
    @GetMapping("/sendDetail")
    public ResponseEntity<MailSendDetailDTO> getSendDetail(@RequestParam Long mailNo) {
        MailSendDetailDTO dto = mailService.getSendMailDetailDTO(mailNo);
        return ResponseEntity.ok(dto);
    }

    // 받은 메일 삭제
    @DeleteMapping("/receiveDelete")
    public ResponseEntity<String> deleteReceivedMail(@RequestParam Long mailNo, @RequestParam Long empNo) {

        mailService.deleteMail(mailNo, empNo);
        return ResponseEntity.ok("받은 메일 삭제 완료");
    }

    // 읽음 처리 --> db변경만
    @PostMapping("/read")
    public ResponseEntity<Void> markAsRead(@RequestParam Long mailNo, @RequestParam Long empNo) {
        mailService.markAsRead(mailNo, empNo);
        return ResponseEntity.ok().build();
    }
}