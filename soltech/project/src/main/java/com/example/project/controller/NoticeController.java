package com.example.project.controller;

import com.example.project.dto.NoticeDTO;
import com.example.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
@Log4j2
public class NoticeController {

    private final NoticeService noticeService;

    // 공지 목록 조회 (페이징)
    @GetMapping({ "/List" })
    public Page<NoticeDTO> list(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("API 공지 목록 요청: page={}, size={}", page, size);
        return noticeService.getPagedList(page, size);
    }

    // 공지 등록
    @PostMapping("/create")
    public ResponseEntity<Long> create(@RequestBody NoticeDTO dto) {
        log.info("API 공지 등록 요청: {}", dto);
        Long noticeId = noticeService.create(dto);
        return ResponseEntity.ok(noticeId);
    }

    // 공지 단건 조회
    @GetMapping("/List/{notiNo}")
    public NoticeDTO get(@PathVariable Long notiNo) {
        return noticeService.getPagedList(1, 100)
                .getContent()
                .stream()
                .filter(n -> n.getNotiNo().equals(notiNo))
                .findFirst()
                .orElseThrow();
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
        noticeService.delete(notiNo);
    }
}
