package com.example.project.controller;

import com.example.project.dto.NoticeDTO;
import com.example.project.entity.Department;
import com.example.project.repository.DepartmentRepository;
import com.example.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
@Log4j2
public class NoticeController {

    private final NoticeService noticeService;

    private final DepartmentRepository departmentRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    // 공지 목록 조회 (페이징)
    @GetMapping({ "/List" })
    public Page<NoticeDTO> list(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("API 공지 목록 요청: page={}, size={}", page, size);
        return noticeService.getPagedList(page, size);
    }

    // 공지 등록
    @PostMapping("/create")
    public ResponseEntity<?> createNotice(@RequestBody NoticeDTO noticeDTO) {
        try {
            Long noticeId = noticeService.create(noticeDTO);
            return ResponseEntity.ok(noticeId);
        } catch (Exception e) {
            log.error("공지 등록 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }

    // 공지 단건 조회
    @GetMapping("/{notiNo}")
    public NoticeDTO getNotice(@PathVariable Long notiNo) {
        return noticeService.findById(notiNo);
    }

    // 공지 수정
    @PutMapping("/{notiNo}")
    public Long update(@PathVariable Long notiNo, @RequestBody NoticeDTO dto) {
        dto.setNotiNo(notiNo);
        log.info("API 공지 수정 요청: {}", dto);
        return noticeService.update(dto);
    }

    // 공지 삭제
    @DeleteMapping("/{notiNo}")
    public void delete(@PathVariable Long notiNo) {
        log.info("API 공지 삭제 요청: {}", notiNo);
        noticeService.deleteNotices(notiNo);
    }
}
