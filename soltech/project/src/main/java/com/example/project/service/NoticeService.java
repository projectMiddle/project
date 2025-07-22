package com.example.project.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.project.dto.NoticeDTO;
import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.Notice;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.NoticeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RequiredArgsConstructor
@Service
public class NoticeService {

        private final NoticeRepository noticeRepository;
        private final EmployeeRepository employeeRepository;
        private final DepartmentRepository departmentRepository;

        @Transactional
        public Long create(NoticeDTO dto) {
                log.info("새글 작성 요청");
                log.info("📨 받은 NoticeDTO: {}", dto);

                Employee emp = employeeRepository.findById(dto.getEmpNo())
                                .orElseThrow(() -> new RuntimeException("해당 사원이 존재하지 않음"));
                Department dept = departmentRepository.findById(dto.getDeptNo())
                                .orElseThrow(() -> new RuntimeException("해당 부서가 존재하지 않음"));

                Notice notice = dtoToEntity(dto, emp, dept);
                Notice saved = noticeRepository.save(notice);
                log.info("📌 저장된 공지사항: {}", saved);
                return saved.getNotiNo();
        }

        public void deleteNotices(Long notiNo) {
                Notice notice = noticeRepository.findById(notiNo)
                                .orElseThrow(() -> new RuntimeException("공지사항을 찾을 수 없습니다."));
                noticeRepository.delete(notice);
        }

        @Transactional
        public Long update(NoticeDTO dto) {
                Notice notice = noticeRepository.findById(dto.getNotiNo())
                                .orElseThrow(() -> new RuntimeException("공지 없음"));

                notice.changeNotiContent(dto.getNotiContent());
                notice.changeNotiUpdateDate(LocalDateTime.now());

                noticeRepository.save(notice);
                return notice.getNotiNo();
        }

        public NoticeDTO findById(Long notiNo) {
                Notice notice = noticeRepository.findById(notiNo)
                                .orElseThrow(() -> new RuntimeException("공지 없음"));
                return entityToDto(notice);
        }

        public PageResultDTO<NoticeDTO> readAll(PageRequestDTO pageRequestDTO) {
                Pageable pageable = PageRequest.of(
                                pageRequestDTO.getPage() - 1,
                                pageRequestDTO.getSize(),
                                Sort.by("notiNo").descending());

                Page<Notice> result = noticeRepository.findAll(pageable);

                List<NoticeDTO> dtoList = result.get()
                                .map(this::entityToDto)
                                .collect(Collectors.toList());

                return PageResultDTO.<NoticeDTO>withAll()
                                .dtoList(dtoList)
                                .totalCount(result.getTotalElements())
                                .pageRequestDTO(pageRequestDTO)
                                .build();
        }

        public Page<NoticeDTO> getPagedList(int page, int size, String search) {
                Pageable pageable = PageRequest.of(page - 1, size, Sort.by("notiNo").descending());

                Page<Notice> result;
                if (search == null || search.isEmpty()) {
                        result = noticeRepository.findAll(pageable);
                } else {
                        result = noticeRepository.findWithNullTitle(search, pageable);
                }
                return result.map(this::entityToDto);
        }

        private NoticeDTO entityToDto(Notice notice) {
                if (notice == null)
                        return null;

                return NoticeDTO.builder()
                                .notiNo(notice.getNotiNo())
                                .notiTitle(notice.getNotiTitle())
                                .notiContent(notice.getNotiContent())
                                .notiRegDate(notice.getNotiRegDate())
                                .notiUpdateDate(notice.getNotiUpdateDate())
                                .deptName(notice.getDeptNo() != null ? notice.getDeptNo().getDeptName() : null)
                                .deptNo(notice.getDeptNo() != null ? notice.getDeptNo().getDeptNo() : null)
                                .name(notice.getEmpNo() != null ? notice.getEmpNo().getEName() : null)
                                .empNo(notice.getEmpNo() != null ? notice.getEmpNo().getEmpNo() : null)
                                .build();
        }

        private Notice dtoToEntity(NoticeDTO dto, Employee emp, Department dept) {
                return Notice.builder()
                                .empNo(emp)
                                .deptNo(dept)
                                .notiTitle(dto.getNotiTitle())
                                .notiContent(dto.getNotiContent())
                                .notiRegDate(dto.getNotiRegDate().now())
                                .build();
        }
}