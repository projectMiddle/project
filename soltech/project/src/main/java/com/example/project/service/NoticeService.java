package com.example.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

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

    // 새글작성
    @Transactional
    public Long create(NoticeDTO dto) {
        log.info("새글 작성 요청");

        // 사원, 부서 실제로 조회
        Employee emp = employeeRepository.findById(dto.getEmpNo())
                .orElseThrow(() -> new RuntimeException("해당 사원이 존재하지 않음"));

        // 사원, 부서 객체를 그대로 dtoToEntity에 전달
        Notice notice = dtoToEntity(dto);

        // 저장 후 ID 반환
        return noticeRepository.save(notice).getNotiNo();
    }

    // 삭제
    @Transactional
    public void delete(Long bno) {
        // 연관관계 데이터 정리 => 댓글
        // SQL : 댓글 선 삭제 후 게시글 삭제 or 댓글 부모를 null 변경 후 삭제

        // 댓글 삭제 : 1) bno로 댓글 찾기 2) 삭제
        noticeRepository.deleteById(bno);
    }

    // 수정
    public Long update(NoticeDTO dto) {
        // 수정할 대상 찾기(Id 로 찾기)
        Notice notice = noticeRepository.findById(dto.getNotiNo()).orElseThrow();
        // 내용 업데이트
        notice.changeNotiContent(dto.getNotiContent());
        // 저장
        noticeRepository.save(notice);

        return notice.getNotiNo();
    }

    public Page<NoticeDTO> getPagedList(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("notiNo").descending());
        return noticeRepository.findAll(pageable)
                .map(this::entityToDto);
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

    private NoticeDTO entityToDto(Notice notice) {
        NoticeDTO dto = NoticeDTO.builder()
                .notiNo(notice.getNotiNo())
                .notiTitle(notice.getNotiTitle())
                .notiContent(notice.getNotiContent())
                .notiRegDate(notice.getNotiRegDate())
                .build();
        return dto;
    }

    private Notice dtoToEntity(NoticeDTO dto) {
        return Notice.builder()
                .empNo(Employee.builder().empNo(dto.getEmpNo()).build())
                .deptNo(Department.builder().deptNo(dto.getDeptNo()).build())
                .notiTitle(dto.getNotiTitle())
                .notiContent(dto.getNotiContent())
                .notiRegDate(dto.getNotiRegDate())
                .build();
    }
}
