package com.example.project.controller.note;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.note.NoteReceiveDetailDTO;
import com.example.project.dto.note.NoteReceiveListDTO;
import com.example.project.dto.note.NoteSendDTO;
import com.example.project.dto.note.NoteSendDetailDTO;
import com.example.project.dto.note.NoteSendListDTO;
import com.example.project.dto.note.NoteTrashDTO;
import com.example.project.service.note.NoteService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

@Log4j2
@RestController
@RequestMapping("/intrasoltech/note")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    // 쪽지 전송
    @PostMapping("/send")
    public ResponseEntity<String> sendNote(
            @RequestParam("noteTitle") String noteTitle,
            @RequestParam("noteContent") String noteContent,
            @RequestParam("receiverIds") List<Long> receiverIds,
            @RequestParam("senderEmpNo") Long senderEmpNo,
            @RequestParam(value = "attachments", required = false) List<MultipartFile> attachments) {

        log.info("받은 noteTitle: {}", noteTitle);
        log.info("받은 noteContent: {}", noteContent);
        log.info("받은 receiverIds: {}", receiverIds);
        log.info("받은 attachments 수: {}", attachments != null ? attachments.size() : 0);

        // 실제 서비스 로직 호출
        noteService.sendNote(noteTitle, noteContent, receiverIds, senderEmpNo, attachments);

        return ResponseEntity.ok("쪽지 전송 성공");
    }

    // 송신 목록
    @GetMapping("/sendList")
    public ResponseEntity<List<NoteSendListDTO>> getSendNotes(@RequestParam Long senderEmpNo) {
        List<NoteSendListDTO> sendList = noteService.getSendNotes(senderEmpNo);
        return ResponseEntity.ok(sendList);

    }

    // 수신 목록
    @GetMapping("/receiveList")
    public ResponseEntity<List<NoteReceiveListDTO>> getReceiveNotes(@RequestParam Long receiveEmpNo) {
        List<NoteReceiveListDTO> receiveList = noteService.getReceiveNotes(receiveEmpNo);
        return ResponseEntity.ok(receiveList);

    }

    // 휴지통 목록
    @GetMapping("/trashList")
    public ResponseEntity<List<NoteTrashDTO>> getTrashNotes(@RequestParam Long empNo) {
        List<NoteTrashDTO> trashList = noteService.getTrashNotes(empNo);
        return ResponseEntity.ok(trashList);
    }

    // 송신 상세
    @GetMapping("/sendDetail/{noteSendNo}")
    public ResponseEntity<NoteSendDetailDTO> getSendNote(@PathVariable Long noteSendNo) {
        NoteSendDetailDTO send = noteService.getSendNote(noteSendNo);
        return ResponseEntity.ok(send);
    }

    // 수신 상세
    @GetMapping("/receiveDetail/{noteReceiveNo}")
    public ResponseEntity<NoteReceiveDetailDTO> getReceiveNote(@PathVariable Long noteReceiveNo) {
        log.info("noteReceiveNo: {}", noteReceiveNo);
        NoteReceiveDetailDTO receive = noteService.getReceiveNote(noteReceiveNo);
        return ResponseEntity.ok(receive);
    }

    // 읽음 처리
    // .build() -> 상태코드만 주고 본문 없음
    @PostMapping("/read/{noteReceiveNo}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long noteReceiveNo) {
        noteService.markAsRead(noteReceiveNo);
        return ResponseEntity.ok().build();
    }

    // 논리 - 송신
    @PostMapping("/send/trash/{noteSendNo}")
    public ResponseEntity<Void> trashSend(@PathVariable Long noteSendNo) {
        noteService.trashSendNote(noteSendNo);
        return ResponseEntity.ok().build();

    }

    // 논리 - 수신
    @PostMapping("/receive/trash/{noteReceiveNo}")
    public ResponseEntity<Void> trashReceive(@PathVariable Long noteReceiveNo) {
        noteService.trashReceiveNote(noteReceiveNo);
        return ResponseEntity.ok().build();
    }

    // 물리 - 송신
    @DeleteMapping("/delete/send")
    public ResponseEntity<Void> deleteSend(@RequestBody List<Long> noteSendNo) {
        noteService.deleteSendNote(noteSendNo);
        return ResponseEntity.ok().build();
    }

    // 물리- 수신
    @DeleteMapping("/delete/receive")
    public ResponseEntity<Void> deleteReceive(@RequestBody List<Long> noteReceiveNo) {
        System.out.println(">>> deleteReceive BULK called: " + noteReceiveNo);
        noteService.deleteReceiveNote(noteReceiveNo);
        return ResponseEntity.ok().build();
    }

    // 복구
    @PostMapping("/recover/send/{noteSendNo}")
    public ResponseEntity<Void> recoverSend(@PathVariable Long noteSendNo) {
        noteService.recoverSendNote(noteSendNo);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/recover/receive/{noteReceiveNo}")
    public ResponseEntity<Void> recoverReceive(@PathVariable Long noteReceiveNo) {
        noteService.recoverReceiveNote(noteReceiveNo);
        return ResponseEntity.ok().build();
    }

}
