package com.example.project.controller.approval;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.approval.AppFileDTO;
import com.example.project.service.approval.AppFileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/intrasoltech/approval")
@RequiredArgsConstructor
@Log4j2
public class AppFileController {

    private final AppFileService appFileService;

    @PostMapping("/uploadFile")
    public ResponseEntity<List<AppFileDTO>> uploadFiles(
            @RequestParam("appDocNo") Long appDocNo,
            @RequestParam("uploadFiles") MultipartFile[] uploadFiles) {

        log.info("첨부파일 업로드 요청 appDocNo: {}", appDocNo);
        List<AppFileDTO> fileDTOs = appFileService.saveFiles(appDocNo, uploadFiles);
        return ResponseEntity.ok(fileDTOs);
    }

    @PostMapping("/removeFile")
    public ResponseEntity<String> removeFile(@RequestParam("fileName") String fileName) {
        log.info("파일 삭제 요청 fileName : {}", fileName);
        try {
            appFileService.deleteFile(fileName);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
