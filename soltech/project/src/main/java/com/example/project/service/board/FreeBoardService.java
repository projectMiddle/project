package com.example.project.service.board;

import com.example.project.dto.board.FreeBoardDTO;
import org.springframework.data.domain.Page;

public interface FreeBoardService {
    Long createFreeBoard(FreeBoardDTO dto);

    void updateFreeBoard(Long freeBoardNo, FreeBoardDTO dto);

    void deleteFreeBoard(Long freeBoardNo);

    FreeBoardDTO getFreeBoardById(Long freeBoardNo);

    Page<FreeBoardDTO> getPagedList(int page, int size, String search);
}
