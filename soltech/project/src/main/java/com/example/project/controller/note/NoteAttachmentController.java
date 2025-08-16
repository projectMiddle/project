package com.example.project.controller.note;

import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import com.example.project.dto.note.NoteAttachmentDTO;
import com.example.project.service.note.NoteFileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/intrasoltech/note")
@RequiredArgsConstructor
@Log4j2
public class NoteAttachmentController {

    private final NoteFileService noteFileService;

    // 첨부파일 업로드
    @PostMapping("/uploadFile")
    public ResponseEntity<List<NoteAttachmentDTO>> uploadFiles(
            @RequestParam("noteNo") Long noteNo,
            @RequestParam("noteUploadFiles") List<MultipartFile> uploadFiles) {

        log.info("쪽지 첨부파일 업로드 요청: noteNo = {}", noteNo);
        List<NoteAttachmentDTO> result = noteFileService.saveFiles(noteNo, uploadFiles);
        return ResponseEntity.ok(result);
    }

    // 첨부파일 삭제
    @PostMapping("/removeFile")
    public ResponseEntity<String> deleteFile(@RequestParam("fileName") String fileName) {
        log.info("쪽지 파일 삭제 요청 : {}", fileName);

        try {
            noteFileService.deleteFile(fileName);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            log.error("파일 삭제 실패", e);
            return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 첨부파일 이름 목록 조회
    @GetMapping("/attachments")
    public ResponseEntity<List<String>> getAttachmentNames(@RequestParam Long noteNo) {
        List<String> filenames = noteFileService.findFileNamesByNoteNo(noteNo);
        return ResponseEntity.ok(filenames);
    }

    @GetMapping("/file/download")
    public ResponseEntity<byte[]> downloadNoteFileBytes(
            @RequestParam String type,
            @RequestParam Long noteNo,
            @RequestParam String fileName,
            @RequestParam String noteFilePath) {

        try {
            String decodedPath = URLDecoder.decode(noteFilePath, "UTF-8");
            String decodedFileName = URLDecoder.decode(fileName, "UTF-8");

            Path filePath = Paths.get("C:/project/soltech/project/note", decodedPath, decodedFileName);
            log.info("다운로드 시도: {}", filePath);

            if (!Files.exists(filePath)) {
                log.error("파일 없음: {}", filePath);
                return ResponseEntity.notFound().build();
            }

            byte[] fileBytes = Files.readAllBytes(filePath);
            log.info("파일 크기: {} bytes", fileBytes.length);

            String encodedFileName = URLEncoder.encode(decodedFileName, "UTF-8").replace("+", "%20");

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFileName)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(fileBytes);

        } catch (Exception e) {
            log.error("다운로드 실패", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
