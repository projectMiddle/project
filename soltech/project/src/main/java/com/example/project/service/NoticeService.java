package com.example.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.NoticeDTO;
import com.example.project.entity.Notice;
import com.example.project.repository.NoticeRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    // 새글작성
    public Long create(NoticeDTO dto) {
        // dto => entity 변경
        Notice notice = dtoToEntity(dto);
        // 저장
        Notice newNotice = noticeRepository.save(notice);
        return newNotice.getNotiNo();
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
        Notice notice = Notice.builder()
                .notiNo(dto.getNotiNo())
                .notiTitle(dto.getNotiTitle())
                .notiContent(dto.getNotiContent())
                .build();
        return notice;
    }
}
