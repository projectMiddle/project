package com.example.project.service.board;

import com.example.project.dto.board.CommentDTO;

import java.util.List;

import org.springframework.data.domain.Page;

public interface CommentService {

    // 댓글 등록
    Long createComment(CommentDTO dto);

    // 댓글 수정
    void updateComment(Long commentId, String content);

    // 댓글 삭제
    void deleteComment(Long commentId);

    // 게시글의 댓글 전체 조회
    List<CommentDTO> getCommentsByFreeBoard(Long freeBoardNo);

    Page<CommentDTO> getPagedComments(Long boardNo, int page, int size);
}
