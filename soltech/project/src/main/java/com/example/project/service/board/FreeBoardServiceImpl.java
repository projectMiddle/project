package com.example.project.service.board;

import com.example.project.dto.board.FreeBoardDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.board.FreeBoard;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.board.CommentRepository;
import com.example.project.repository.board.FreeBoardRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FreeBoardServiceImpl implements FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final CommentRepository commentRepository;

    @Override
    public Long createFreeBoard(FreeBoardDTO dto) {
        Employee emp = employeeRepository.findById(dto.getEmpNo())
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));
        Department dept = departmentRepository.findById(dto.getDeptNo())
                .orElseThrow(() -> new IllegalArgumentException("부서가 존재하지 않습니다."));

        FreeBoard board = FreeBoard.builder()
                .empNo(emp)
                .deptNo(dept)
                .frBdTitle(dto.getFrBdTitle())
                .frBdContent(dto.getFrBdContent())
                .frBdRegDate(LocalDateTime.now())
                .build();

        return freeBoardRepository.save(board).getFreeBoardNo();
    }

    @Override
    public void updateFreeBoard(Long freeBoardNo, FreeBoardDTO dto) {
        FreeBoard board = freeBoardRepository.findById(freeBoardNo)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        board.changeBoardTitle(dto.getFrBdTitle()); // ✅ 제목도 수정
        board.changeBoardContent(dto.getFrBdContent());
        board.changeBoardUpdateDate(LocalDateTime.now());

        freeBoardRepository.save(board);
    }

    @Transactional
    @Override
    public void deleteFreeBoard(Long freeBoardNo) {
        // 1. 댓글 먼저 삭제 (자식 → 부모 순으로 한 번에 삭제)
        commentRepository.deleteByFreeBoardNo(freeBoardNo);

        // 2. 게시글 삭제
        freeBoardRepository.deleteById(freeBoardNo);
    }

    @Override
    public FreeBoardDTO getFreeBoardById(Long freeBoardNo) {
        FreeBoard board = freeBoardRepository.findById(freeBoardNo)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        return entityToDto(board);
    }

    @Override
    public Page<FreeBoardDTO> getPagedList(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("freeBoardNo").descending());
        Page<FreeBoard> result;

        if (search == null || search.isEmpty()) {
            result = freeBoardRepository.findAll(pageable);
        } else {
            result = freeBoardRepository.findByFrBdTitleContaining(search, pageable);
        }

        return result.map(this::entityToDto);
    }

    private FreeBoardDTO entityToDto(FreeBoard board) {
        return FreeBoardDTO.builder()
                .freeBoardNo(board.getFreeBoardNo())
                .empNo(board.getEmpNo().getEmpNo())
                .deptNo(board.getDeptNo().getDeptNo())
                .name(board.getEmpNo().getEName())
                .deptName(board.getDeptNo().getDeptName())
                .frBdTitle(board.getFrBdTitle())
                .frBdContent(board.getFrBdContent())
                .frBdRegDate(board.getFrBdRegDate())
                .frBdUpdateDate(board.getFrBdUpdateDate())
                .build();
    }
}
