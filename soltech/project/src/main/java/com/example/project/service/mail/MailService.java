package com.example.project.service.mail;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.eclipse.jdt.internal.compiler.ast.Receiver;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.mail.MailReceiveDetailDTO;
import com.example.project.dto.mail.MailReceiveListDTO;
import com.example.project.dto.mail.MailSendDTO;
import com.example.project.dto.mail.MailSendDetailDTO;
import com.example.project.dto.mail.MailSendListDTO;
import com.example.project.dto.mail.UserInfo;
import com.example.project.entity.Employee;
import com.example.project.entity.constant.MailReceiverType;
import com.example.project.entity.mail.MailReceiver;
import com.example.project.entity.mail.MailSend;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.mail.MailAttachmentRepository;
import com.example.project.repository.mail.MailReceiverRepository;
import com.example.project.repository.mail.MailSendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class MailService {

        private final MailReceiverRepository mailReceiverRepository;
        private final MailSendRepository mailSendRepository;
        private final EmployeeRepository employeeRepository;
        private final MailFileService mailFileService;

        /////////////////////// 메일 작성///////////////////////
        public void sendMail(MailSendDTO dto, Long senderEmpNo) {
                // 발신자
                Employee sender = employeeRepository.findById(senderEmpNo)
                                .orElseThrow();
                log.info("메일 발신자: {} ({})", sender.getEmpNo(), sender.getEEmail());

                // 수신메일 저장
                MailSend mailSend = MailSend.builder()
                                .empNo(sender)
                                .mailTitle(dto.getMailTitle())
                                .mailContent(dto.getMailContent())
                                .mailSendDate(LocalDateTime.now())
                                .build();

                mailSend = mailSendRepository.save(mailSend);
                log.info("메일 저장 완료 - 메일번호: {}", mailSend.getMailNo());

                // 수신자 저장
                for (Long receiverId : dto.getReceiverIds()) {
                        Employee receiver = employeeRepository.findById(receiverId).orElseThrow();

                        MailReceiver receiverEntity = MailReceiver.builder()
                                        .mailNo(mailSend)
                                        .empNo(receiver)
                                        .mailReceiverType(MailReceiverType.TO)
                                        .mailIsRead(false)
                                        .build();

                        mailReceiverRepository.save(receiverEntity);
                        log.info("수신자 저장 - {} ({})", receiver.getEmpNo(), receiver.getEEmail());
                }

                // 첨부파일 처리
                MultipartFile[] uploadFiles = dto.getAttachments();
                if (uploadFiles != null && uploadFiles.length > 0) {
                        mailFileService.saveFiles(mailSend.getMailNo(), uploadFiles);
                }
                log.info("메일전송 완료 {}", dto.getMailTitle());
        }

        /////////////////////// 보낸 메일 목록 조회 ///////////////////////
        public List<MailSendListDTO> getSendMails(Long senderEmpNo) {

                // 특정 사원이 보낸 메일 조회
                List<MailSend> sendMails = mailSendRepository.findByEmpNo_EmpNoOrderByMailNoDesc(senderEmpNo);

                // 각 mailSend eitity -> dto
                return sendMails.stream()
                                .map(mail -> {

                                        // 특정 메일을 받은 수신자들
                                        List<MailReceiver> receivers = mailReceiverRepository.findByMailNo(mail);

                                        // 수진자 이름<이메일> 형식으로 변환
                                        List<UserInfo> receiverInfos = receivers.stream().map(receiver -> {
                                                return UserInfo.builder()
                                                                .name(receiver.getEmpNo().getEName())
                                                                .email(receiver.getEmpNo().getEEmail())

                                                                .build();
                                        }).collect(Collectors.toList());

                                        // dto
                                        return MailSendListDTO.builder()
                                                        .mailNo(mail.getMailNo())
                                                        .mailTitle(mail.getMailTitle())
                                                        .mailSendDate(mail.getMailSendDate())
                                                        .receivers(receiverInfos)

                                                        .build();
                                }).collect(Collectors.toList());
        }

        /////////////////////// 받은 메일 목록 조회 ///////////////////////
        public List<MailReceiveListDTO> getReceivedMails(Long senderEmpNo) {

                // 특정 사원의 수신자들 조회
                List<MailReceiver> receiverList = mailReceiverRepository
                                .findByEmpNo_EmpNoOrderByMailNo_MailNoDesc(senderEmpNo);

                return receiverList.stream()
                                .map(receiver -> {
                                        MailSend mail = receiver.getMailNo(); // --> 보낸 메일

                                        // 송신자 정보 -> 이름<이메일>
                                        Employee sender = mail.getEmpNo();
                                        UserInfo senderInfo = UserInfo.builder()
                                                        .name(sender.getEName())
                                                        .email(sender.getEEmail())
                                                        .build();

                                        // dto로
                                        return MailReceiveListDTO.builder()
                                                        .mailNo(mail.getMailNo())
                                                        .mailTitle(mail.getMailTitle())
                                                        .mailSendDate(mail.getMailSendDate())
                                                        .sender(senderInfo)
                                                        .mailIsRead(receiver.isMailIsRead())
                                                        .mailReceiverType(receiver.getMailReceiverType().name())
                                                        .build();

                                }).collect(Collectors.toList());

        }

        /////////////////////// 보낸메일 상세 조회 / dto(UserInfo) ///////////////////////
        public MailSendDetailDTO getSendMailDetailDTO(Long mailNo) {
                // 메일번호로 정보 찾기
                MailSend mail = mailSendRepository.findById(mailNo).orElseThrow();

                // 수신자 목록 조회 / dto
                List<UserInfo> receivers = mailReceiverRepository.findByMailNo(mail).stream()
                                .map(receiver -> UserInfo.builder()
                                                .name(receiver.getEmpNo().getEName())
                                                .email(receiver.getEmpNo().getEEmail())
                                                .build())
                                .collect(Collectors.toList());
                // 첨부파일 목록 조회 / dto() --> 나중에...

                return MailSendDetailDTO.builder()
                                .mailNo(mail.getMailNo())
                                .mailTitle(mail.getMailTitle())
                                .mailContent(mail.getMailContent())
                                .mailSendDate(mail.getMailSendDate())
                                .receivers(receivers)
                                .build();

        }

        /////////////////////// 받은 메일 상세 조회 / dto(UserInfo) ///////////////////////
        public MailReceiveDetailDTO getReceiveMailDetail(Long mailNo, Long receiverEmpNo) {
                // 받은 사람 조회 (특정메일 + 수신자)
                MailReceiver receiver = mailReceiverRepository.findByMailNo_MailNoAndEmpNo_EmpNo(mailNo, receiverEmpNo)
                                .orElseThrow();

                // 메일 정보
                MailSend mail = receiver.getMailNo();

                // 수신자 전체 목록 -> 이름<이메일>
                List<UserInfo> receivers = mailReceiverRepository.findByMailNo(mail).stream()
                                .map(r -> UserInfo.builder()
                                                .name(r.getEmpNo().getEName())
                                                .email(r.getEmpNo().getEEmail())
                                                .build())
                                .collect(Collectors.toList());

                // 송신자 정보 -> 이름<이메일>
                UserInfo senderInfo = UserInfo.builder()
                                .name(mail.getEmpNo().getEName())
                                .email(mail.getEmpNo().getEEmail())
                                .build();

                // dto
                return MailReceiveDetailDTO.builder()
                                .mailNo(mail.getMailNo())
                                .mailTitle(mail.getMailTitle())
                                .mailContent(mail.getMailContent())
                                .mailSendDate(mail.getMailSendDate())
                                .receivers(receivers)
                                .sender(senderInfo)
                                .build();

        }

        /////////////////////// 받은 메일 삭제 ///////////////////////
        public void deleteMail(Long maiNo, Long receiverEmpNo) {
                MailReceiver receiver = mailReceiverRepository.findByMailNo_MailNoAndEmpNo_EmpNo(maiNo, receiverEmpNo)
                                .orElseThrow();

                mailReceiverRepository.delete(receiver);
                log.info("메일 삭제 완료");

        }

        /////////////////////// 읽음 처리 ///////////////////////
        public void markAsRead(Long mailNo, Long receiverEmpNo) {

                // 특정 메일 찾기
                MailReceiver receiver = mailReceiverRepository
                                .findByMailNo_MailNoAndEmpNo_EmpNo(mailNo, receiverEmpNo).orElseThrow();

                if (!receiver.isMailIsRead()) {
                        receiver.changeMailIsRead(true);
                        mailReceiverRepository.save(receiver);
                        log.info("읽음 처리 성공 {} {}", mailNo, receiverEmpNo);
                }
        }

}

/////////////////////// 보낸 메일 삭제 (논리 삭제 -> 실제 디비에서 삭제 x ->
/////////////////////// 2차)///////////////////////
/////////////////////// 휴지통 -> 2차 ///////////////////////