package com.example.project.controller.mail;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.mail.MailAttachmentDTO;
import com.example.project.service.mail.MailFileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/intrasoltech/mail")
@RequiredArgsConstructor
@Log4j2
public class MailAttachmentController {

    private final MailFileService mailFileService;

    @PostMapping("/uploadFile")
    public ResponseEntity<List<MailAttachmentDTO>> uploadFiles(@RequestParam("mailNo") Long mailNo,
            @RequestParam("uploadFiles") MultipartFile[] uploadFiles) {

        log.info("첨부파일 업로드 요청 appDocNo: {}", mailNo);
        List<MailAttachmentDTO> fileDTOs = mailFileService.saveFiles(mailNo, uploadFiles);
        return ResponseEntity.ok(fileDTOs);

    }

    @PostMapping("/removeFile")
    public ResponseEntity<String> deleteFile(@RequestParam("fileName") String fileName) {
        log.info("파일 삭제 요청 : {}", fileName);

        try {
            mailFileService.deleteFile(fileName);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 첨부파일 이름 목록 조회
    @GetMapping("/attachments")
    public ResponseEntity<List<String>> getAttachmentNames(@RequestParam Long mailNo) {
        List<String> filenames = mailFileService.findFileNamesByMailNo(mailNo);
        return ResponseEntity.ok(filenames);
    }

    // 첨부파일 다운로드
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam Long mailNo, @RequestParam String fileName) {

        Resource resource = mailFileService.loadFileAsResource(mailNo, fileName);
        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8)
                .replaceAll("\\+", "%20"); // 공백을 + 대신 %20으로

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + encodedFileName + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                .body(resource);
    }

}