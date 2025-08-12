package com.example.project.controller.board;

import com.example.project.dto.board.FreeBoardDTO;
import com.example.project.service.board.FreeBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/intrasoltech/freeboard")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    // 게시글 등록
    @PostMapping("/create")
    public ResponseEntity<Long> create(@RequestBody FreeBoardDTO dto) {
        Long id = freeBoardService.createFreeBoard(dto);
        return ResponseEntity.ok(id);
    }

    // 게시글 수정
    @PutMapping("/{freeBoardNo}")
    public ResponseEntity<Void> update(@PathVariable Long freeBoardNo, @RequestBody FreeBoardDTO dto) {
        freeBoardService.updateFreeBoard(freeBoardNo, dto);
        return ResponseEntity.ok().build();
    }

    // 게시글 삭제
    @DeleteMapping("/{freeBoardNo}")
    public ResponseEntity<Void> delete(@PathVariable Long freeBoardNo) {
        freeBoardService.deleteFreeBoard(freeBoardNo);
        return ResponseEntity.ok().build();
    }

    // 게시글 단건 조회
    @GetMapping("/{freeBoardNo}")
    public ResponseEntity<FreeBoardDTO> read(@PathVariable Long freeBoardNo) {
        return ResponseEntity.ok(freeBoardService.getFreeBoardById(freeBoardNo));
    }

    // 게시글 목록 (페이지네이션 + 검색어)
    @GetMapping
    public ResponseEntity<Page<FreeBoardDTO>> list(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        Page<FreeBoardDTO> list = freeBoardService.getPagedList(page, size, search);
        return ResponseEntity.ok(list);
    }
}
