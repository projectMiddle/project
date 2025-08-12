package com.example.project.service.note;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.note.NoteAttachmentDTO;
import com.example.project.dto.note.NoteReceiveDetailDTO;
import com.example.project.dto.note.NoteReceiveListDTO;
import com.example.project.dto.note.NoteSendDTO;
import com.example.project.dto.note.NoteSendDetailDTO;
import com.example.project.dto.note.NoteSendListDTO;
import com.example.project.dto.note.NoteTrashDTO;
import com.example.project.dto.note.UserInfoDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.note.NoteAttachment;
import com.example.project.entity.note.NoteReceive;
import com.example.project.entity.note.NoteSend;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.note.NoteAttachmentRepository;
import com.example.project.repository.note.NoteReceiveRepository;
import com.example.project.repository.note.NoteSendRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteSendRepository noteSendRepository;
    private final NoteReceiveRepository noteReceiveRepository;
    private final NoteFileService noteFileService;
    private final NoteFileServiceImpl noteFileServiceImpl;
    private final EmployeeRepository employeeRepository;
    private final NoteAttachmentRepository noteAttachmentRepository;

    // 작성
    @Transactional
    public void sendNote(String noteTitle, String noteContent,
            List<Long> receiverIds, Long senderEmpNo,
            List<MultipartFile> attachments) {
        try {
            log.info("쪽지 전송 시작");
            log.info("받은 receiverIds: {}", receiverIds);
            log.info("받은 attachments 수: {}", attachments != null ? attachments.size() : 0);

            // 1. 송신자 조회
            Employee sender = employeeRepository.findById(senderEmpNo)
                    .orElseThrow(() -> new IllegalArgumentException("송신자 정보를 찾을 수 없습니다."));

            log.info("송신자 조회 완료: {}", sender.getEmpNo());
            log.info("부서명: {}", sender.getDeptNo().getDeptName());

            // 2. NoteSend 저장
            NoteSend noteSend = NoteSend.builder()
                    .sender(sender)
                    .noteTitle(noteTitle)
                    .noteContent(noteContent)
                    .noteDelete(false)
                    .build();
            noteSend = noteSendRepository.save(noteSend);
            noteSendRepository.flush(); // ID 확보용
            Long noteSendNo = noteSend.getNoteSendNo();

            log.info("NoteSend 저장 완료 - ID: {}", noteSendNo);

            // 3. 첨부파일 저장
            if (attachments != null && !attachments.isEmpty()) {
                log.info("첨부파일 저장 시작...");
                noteFileServiceImpl.saveFiles(noteSendNo, attachments);
            }

            // 4. 수신자 복사 + 첨부파일 복사
            for (Long receiverId : receiverIds) {
                try {
                    log.info("수신자 저장 시도 - receiverId: {}", receiverId);

                    Employee receiver = employeeRepository.findById(receiverId)
                            .orElseThrow(() -> new IllegalArgumentException("수신자 정보를 찾을 수 없습니다."));

                    NoteReceive noteReceive = NoteReceive.builder()
                            .receiver(receiver)
                            .noteTitle(noteTitle)
                            .noteContent(noteContent)
                            .noteRead(false)
                            .noteDelete(false)
                            .noteReceiveDate(LocalDateTime.now()) // ❗ 수정 포인트
                            .noteSendNo(noteSendNo)
                            .senderName(sender.getEName())
                            .senderDept(sender.getDeptNo().getDeptName())
                            .senderEmpNo(sender.getEmpNo())
                            .build();

                    noteReceive = noteReceiveRepository.save(noteReceive);
                    log.info("수신자 저장 완료 - ID: {}, 이름: {}", noteReceive.getNoteReceiveNo(), receiver.getEName());

                    // 첨부파일 복사
                    List<NoteAttachment> sendFiles = noteAttachmentRepository.findByNoteSend_NoteSendNo(noteSendNo);
                    log.info("📎 복사 대상 첨부파일 수: {}", sendFiles.size());

                    for (NoteAttachment file : sendFiles) {
                        NoteAttachment copied = NoteAttachment.builder()
                                .noteReceive(noteReceive)
                                .noteFileName(file.getNoteFileName())
                                .noteFilePath(file.getNoteFilePath())
                                .noteFileUuid(file.getNoteFileUuid())
                                .noteFileSize(file.getNoteFileSize())
                                .build();
                        noteAttachmentRepository.save(copied);
                    }

                } catch (Exception ex) {
                    log.error("수신자 저장 또는 복사 중 오류 발생 - receiverId: {}", receiverId, ex);
                    throw ex; // 혹은 continue;
                }
            }

            log.info("쪽지 전송 완료");

        } catch (Exception e) {
            log.error("쪽지 전송 중 오류 발생", e);
            throw e;
        }
    }

    // 목록 조회 - 송신
    public List<NoteSendListDTO> getSendNotes(Long senderEmpNo) {
        // 특정사원이 보낸 쪽지 객체 조회(1전송)
        List<NoteSend> sendNotes = noteSendRepository
                // 삭제 제외
                .findBySender_EmpNoAndNoteDeleteFalseOrderByNoteSendNoDesc(senderEmpNo);

        return sendNotes.stream().map(note -> {
            // 수신객체 조회
            List<NoteReceive> receives = noteReceiveRepository.findByNoteSendNo(note.getNoteSendNo());

            // 수신자 목록 추출
            String targetName = "";
            if (!receives.isEmpty()) {
                String firstName = receives.get(0).getReceiver().getEName();
                int others = receives.size() - 1;
                targetName = others > 0 ? firstName + " 님외 " + others + "명" : firstName;
            }

            return NoteSendListDTO.builder()
                    .noteSendNo(note.getNoteSendNo())
                    .noteTitle(note.getNoteTitle())
                    .noteSendDate(note.getNoteSendDate())
                    .targetName(targetName)
                    .build();
        }).collect(Collectors.toList());

    }

    // 목록 조회 - 수신
    public List<NoteReceiveListDTO> getReceiveNotes(Long receiverEmpNo) {
        // 특정사원이 받은 쪽지 객체 조회
        List<NoteReceive> receiveNotes = noteReceiveRepository
                // 삭제 제외
                .findByReceiver_EmpNoAndNoteDeleteFalseOrderByNoteReceiveNoDesc(receiverEmpNo);

        return receiveNotes.stream().map(r -> {
            // 송신자정보 -> NoteSend에서 가져와야함

            UserInfoDTO senderInfo = UserInfoDTO.builder()
                    .name(r.getSenderName())
                    .deptName(r.getSenderDept())
                    .empNo(r.getSenderEmpNo())
                    .build();

            return NoteReceiveListDTO.builder()
                    .noteReceiveNo(r.getNoteReceiveNo())
                    .noteTitle(r.getNoteTitle())
                    .noteReceiveDate(r.getNoteReceiveDate())
                    .sender(senderInfo)
                    .noteIsRead(r.isNoteRead())
                    .build();
        }).collect(Collectors.toList());

    }

    // 상세 - 송신
    public NoteSendDetailDTO getSendNote(Long noteSendNo) {
        // noteSendNo로 정보 찾기
        NoteSend sendNote = noteSendRepository.findById(noteSendNo).orElseThrow();
        // 첨부파일
        List<NoteAttachmentDTO> attachments = noteAttachmentRepository.findByNoteSend_NoteSendNo(noteSendNo)
                .stream().map(NoteAttachmentDTO::from).collect(Collectors.toList());
        // 수신자 목록 조회
        List<UserInfoDTO> receivers = noteReceiveRepository.findByNoteSendNo(noteSendNo).stream()
                .map(reciver -> UserInfoDTO.builder()
                        .name(reciver.getReceiver().getEName())
                        .deptName(reciver.getReceiver().getDeptNo().getDeptName())
                        .empNo(reciver.getReceiver().getEmpNo())
                        .build())
                .collect(Collectors.toList());

        return NoteSendDetailDTO.builder()
                .noteSendNo(sendNote.getNoteSendNo())
                .noteTitle(sendNote.getNoteTitle())
                .noteContent(sendNote.getNoteContent())
                .noteSendDate(sendNote.getNoteSendDate())
                .receivers(receivers)
                .attachments(attachments)
                .build();

    }

    // 상세 - 수신
    public NoteReceiveDetailDTO getReceiveNote(Long noteReceiveNo) {
        // noteReceiveNo로 정보 찾기
        log.info("수신 쪽지 상세 조회 요청 - noteReceiveNo: {}", noteReceiveNo);

        NoteReceive receiveNote = noteReceiveRepository.findById(noteReceiveNo)
                .orElseThrow(() -> {
                    log.error("받은 쪽지 조회 실패 - noteReceiveNo: {}", noteReceiveNo);
                    return new IllegalArgumentException("받은 쪽지 없음");
                });

        log.info("받은 쪽지 조회 성공: {}", receiveNote);

        UserInfoDTO senderInfo = UserInfoDTO.builder()
                .name(receiveNote.getSenderName())
                .deptName(receiveNote.getSenderDept())
                .empNo(receiveNote.getSenderEmpNo())
                .build();

        // 첨부파일
        List<NoteAttachmentDTO> attachments = noteAttachmentRepository
                .findByNoteReceive_NoteReceiveNo(receiveNote.getNoteReceiveNo()) // 복사한 noteSendNo
                .stream()
                .map(NoteAttachmentDTO::from)
                .collect(Collectors.toList());

        // 송신자 조회 -> 송신자 : employee의 sender -> sender는 NoteSend의 noteSendNo로 찾기 ->
        // noteSendNo는 repository에서 찾기

        // dto로
        return NoteReceiveDetailDTO.builder()
                .noteReceiveNo(receiveNote.getNoteReceiveNo())
                .noteTitle(receiveNote.getNoteTitle())
                .noteContent(receiveNote.getNoteContent())
                .noteReceiveDate(receiveNote.getNoteReceiveDate())
                .sender(senderInfo)
                .attachments(attachments)
                .build();
    }

    // 휴지통
    public List<NoteTrashDTO> getTrashNotes(Long empNo) {
        List<NoteTrashDTO> trashList = new ArrayList<>();

        // 보낸 쪽지 중 삭제된 것
        // noteDelete가 true인것 찾기
        List<NoteSend> deletedSendNotes = noteSendRepository
                .findBySender_EmpNoAndNoteDeleteTrueOrderByNoteSendNoDesc(empNo);

        // 각 쪽지의 수신자 조회
        for (NoteSend send : deletedSendNotes) {
            List<NoteReceive> receives = noteReceiveRepository.findByNoteSendNo(send.getNoteSendNo());

            String targetName = "";
            if (!receives.isEmpty()) {
                String firstName = receives.get(0).getReceiver().getEName();
                int others = receives.size() - 1;
                targetName = others > 0 ? firstName + " 님외 " + others + "명" : firstName;
            }

            NoteTrashDTO dto = NoteTrashDTO.builder()
                    .id(send.getNoteSendNo())
                    .noteTitle(send.getNoteTitle())
                    .noteType("보낸쪽지")
                    .targetName(targetName)
                    .date(send.getNoteSendDate())
                    .build();

            trashList.add(dto);
        }

        // 받은 쪽지 중 삭제된 것
        // 받은 쪽지(NoteReceive)에서 삭제 true인것 찾기
        List<NoteReceive> deletedReceiveNotes = noteReceiveRepository.findByReceiver_EmpNoAndNoteDeleteTrue(empNo);
        // true인것들 정보 하나씩 가져오기(NoteSend의 수신자 가져오기) -> NoteSendNo로 찾기
        for (NoteReceive receive : deletedReceiveNotes) {
            String sender = receive.getSenderName();
            NoteTrashDTO dto = NoteTrashDTO.builder()
                    .id(receive.getNoteReceiveNo())
                    .noteTitle(receive.getNoteTitle())
                    .noteType("받은쪽지")
                    .targetName(sender)
                    .date(receive.getNoteReceiveDate())
                    .build();

            trashList.add(dto);
        }

        return trashList;
    }

    // 읽음 여부
    // 특정 쪽지 찾기 : 수신쪽지(noteReceiveNo) 찾기 -> repository에서 찾기 -> NoteReceive에 업뎃 -> 저장
    public void markAsRead(Long noteReceiveNo) {
        NoteReceive receive = noteReceiveRepository.findById(noteReceiveNo).orElseThrow();

        receive.changeNoteRead(true);
        noteReceiveRepository.save(receive);
    }

    // findById() : 기본 Optional<T>를 반환 -> null 일땐?? -> error

    // 논리 삭제 - 송신
    // 특정 보낸쪽지 찾기: 특정 쪽지 객체(noteSend)찾기 -> noteSendNo로 찾기 -> repository에서 찾기 -> 업뎃
    // -> repository에저장
    public void trashSendNote(Long noteSendNo) {
        NoteSend send = noteSendRepository.findById(noteSendNo).orElseThrow();
        send.changeNoteDelete(true);
        noteSendRepository.save(send);
    }

    // 논리 삭제 - 수신
    // 특정 받은 쪽지 찾기: 특정 쪽지 객체 찾기(noteReceive) -> noteReceiveNo로 찾기 -> repository에서 ->
    // 업뎃-> repository에 저장
    public void trashReceiveNote(Long noteReceiveNo) {
        NoteReceive receive = noteReceiveRepository.findById(noteReceiveNo).orElseThrow();
        receive.changeNoteDelete(true);
        noteReceiveRepository.save(receive);
    }

    // 물리 삭제 - 송신
    // 특정 보낸 쪽지 찾기 -> 삭제 -> 저장
    @Transactional
    public void deleteSendNote(List<Long> noteSendIds) {
        for (Long id : noteSendIds) {
            noteSendRepository.deleteById(id);
        }
    }

    // 물리 삭제 - 수신
    @Transactional
    public void deleteReceiveNote(List<Long> noteReceiveIds) {
        for (Long id : noteReceiveIds) {
            noteReceiveRepository.deleteById(id);
        }
    }

    // 왜.... 자꾸... 할게 생기는거야........ 왜애........

    // 복구.......
    // delete -> false -> respository에서 -> noteSendNo 조회 -> noteSend
    public void recoverSendNote(Long noteSendNo) {
        NoteSend noteSend = noteSendRepository.findById(noteSendNo).orElseThrow();
        noteSend.changeNoteDelete(false);
        noteSendRepository.save(noteSend);

    }

    public void recoverReceiveNote(Long noteReceiveNo) {
        NoteReceive noteReceive = noteReceiveRepository.findById(noteReceiveNo).orElseThrow();
        noteReceive.changeNoteDelete(false);
        noteReceiveRepository.save(noteReceive);
    }
    // 이제 진짜.. 끝...?
    // 어림없지
}
