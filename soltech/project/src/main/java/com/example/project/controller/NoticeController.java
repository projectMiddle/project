package com.example.project.controller;

import com.example.project.dto.NoticeDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.Notice;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.NoticeRepository;
import com.example.project.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/intrasoltech/notices")
@RequiredArgsConstructor
@Log4j2
public class NoticeController {

    private final NoticeService noticeService;

    private final DepartmentRepository departmentRepository;

    private final NoticeRepository noticeRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/list")
    public ResponseEntity<?> getNotices(
            @RequestParam(defaultValue = "1") int page, // 💡 1부터 시작하는 프론트 요청 기준
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false, defaultValue = "") String search) {

        // ✅ page - 1 로 수정 (0부터 시작하는 JPA용)
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("notiRegDate").descending());

        Page<Notice> noticePage;
        if (search == null || search.trim().isEmpty()) {
            noticePage = noticeRepository.findAll(pageable);
        } else {
            noticePage = noticeRepository.findWithNullTitle(search.trim(), pageable);
        }

        List<NoticeDTO> dtoList = noticePage.getContent().stream().map(notice -> {
            Employee emp = notice.getEmpNo();
            Department dept = emp != null ? emp.getDeptNo() : null;
            return NoticeDTO.builder()
                    .notiNo(notice.getNotiNo())
                    .empNo(emp != null ? emp.getEmpNo() : null)
                    .name(emp != null ? emp.getEName() : null)
                    .deptNo(dept != null ? dept.getDeptNo() : null)
                    .deptName(dept != null ? dept.getDeptName() : null)
                    .notiTitle(notice.getNotiTitle())
                    .notiContent(notice.getNotiContent())
                    .notiRegDate(notice.getNotiRegDate())
                    .notiUpdateDate(notice.getNotiUpdateDate())
                    .build();
        }).toList();

        Map<String, Object> response = new HashMap<>();
        response.put("content", dtoList);
        response.put("totalPages", noticePage.getTotalPages());
        response.put("totalElements", noticePage.getTotalElements());

        return ResponseEntity.ok(response);
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
