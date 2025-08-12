package com.example.project.controller.board;

import com.example.project.dto.board.CommentDTO;
import com.example.project.service.board.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intrasoltech/freeboard")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 📌 특정 게시글의 전체 댓글 조회
    @GetMapping("/{boardNo}/comments")
    public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long boardNo) {
        List<CommentDTO> comments = commentService.getCommentsByFreeBoard(boardNo);
        return ResponseEntity.ok(comments);
    }

    // 📌 댓글 등록 (parentId는 Optional)
    @PostMapping("/{boardNo}/comments")
    public ResponseEntity<Long> createComment(
            @PathVariable Long boardNo,
            @RequestBody CommentDTO dto) {
        dto.setFreeBoardNo(boardNo); // boardNo 세팅
        Long id = commentService.createComment(dto);
        return ResponseEntity.ok(id);
    }

    // 📌 댓글 수정
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Void> updateComment(
            @PathVariable Long commentId,
            @RequestBody CommentDTO dto) {
        commentService.updateComment(commentId, dto.getFrBdCmtContent());
        return ResponseEntity.ok().build();
    }

    // 📌 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
