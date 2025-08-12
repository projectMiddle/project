package com.example.project.controller.mainhome;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.mainhome.MainJobsDTO;
import com.example.project.service.mainhome.MainJobsService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/apply/recruit")
@RequiredArgsConstructor
@Log4j2
public class MainJobsController {

    private final MainJobsService mainJobsService;

    // 리스트
    @GetMapping("")
    public ResponseEntity<PageResultDTO<MainJobsDTO>> getList(@ModelAttribute PageRequestDTO dto) {
        log.info("전체 리스트 : {}", dto);
        PageResultDTO<MainJobsDTO> result = mainJobsService.getList(dto);
        return ResponseEntity.ok(result);
    }

    // 상세조회
    @GetMapping("/{jobsNo}")
    public ResponseEntity<MainJobsDTO> getRow(@PathVariable Long jobsNo) {
        log.info("상세조회 : {}", jobsNo);
        MainJobsDTO result = mainJobsService.getRow(jobsNo);
        return ResponseEntity.ok(result);
    }

    // 생성
    @PostMapping("/add")
    public ResponseEntity<Long> postJobs(@Valid @RequestBody MainJobsDTO dto) {
        log.info("생성 요청 : {}", dto);
        Long result = mainJobsService.jobsInsert(dto);
        return ResponseEntity.ok(result);
    }

    // 수정
    @PutMapping("/edit/{jobsNo}")
    public ResponseEntity<Long> putJobs(@PathVariable Long jobsNo, @Valid @RequestBody MainJobsDTO dto) {
        log.info("수정 요청 번호 : {}", jobsNo);
        Long result = mainJobsService.jobsUpdate(dto);
        return ResponseEntity.ok(result);
    }

    // 삭제
    @DeleteMapping("/delete/{jobsNo}")
    public ResponseEntity<?> deleteJobs(@PathVariable Long jobsNo) {
        log.info("삭제 요청 번호 : {}", jobsNo);
        mainJobsService.jobsDelete(jobsNo);
        return ResponseEntity.ok("채용 공지 삭제 완료");
    }

}
