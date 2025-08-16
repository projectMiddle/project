package com.example.project.service.board;

import com.example.project.dto.board.CommentDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.board.Comment;
import com.example.project.entity.board.FreeBoard;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.board.CommentRepository;
import com.example.project.repository.board.FreeBoardRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final FreeBoardRepository freeBoardRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public Long createComment(CommentDTO dto) {
        FreeBoard board = freeBoardRepository.findById(dto.getFreeBoardNo())
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));
        Employee employee = employeeRepository.findById(dto.getEmpNo())
                .orElseThrow(() -> new IllegalArgumentException("직원이 존재하지 않습니다."));

        Comment.CommentBuilder builder = Comment.builder()
                .freeBoardNo(board)
                .empNo(employee)
                .frBdCmtContent(dto.getFrBdCmtContent())
                .frBdCmtRegDate(LocalDateTime.now());

        // ✅ 대댓글일 경우 부모 댓글도 설정
        if (dto.getParentId() != null) {
            Comment parent = commentRepository.findById(dto.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));
            builder.frBdParentComment(parent);
        }

        Comment comment = builder.build();
        return commentRepository.save(comment).getFrCommentNo();
    }

    @Override
    public void updateComment(Long commentId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));
        comment.changeBoardContent(content);
        comment.changeBoardUpdateDate(LocalDateTime.now());
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public Page<CommentDTO> getPagedComments(Long boardNo, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("frCommentNo").descending());

        Page<Comment> result = commentRepository.findByFreeBoardNo_FreeBoardNo(boardNo, pageable);

        return result.map(this::entityToDto);
    }

    @Override
    public List<CommentDTO> getCommentsByFreeBoard(Long freeBoardNo) {
        List<Comment> comments = commentRepository.findByFreeBoardNo_FreeBoardNo(freeBoardNo);
        return comments.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    private CommentDTO entityToDto(Comment comment) {
        if (comment == null)
            return null;

        Employee emp = comment.getEmpNo();

        return CommentDTO.builder()
                .frCommentNo(comment.getFrCommentNo())
                .freeBoardNo(comment.getFreeBoardNo().getFreeBoardNo())
                .empNo(emp.getEmpNo())
                .name(emp.getEName())
                .deptName(emp.getDeptNo().getDeptName())
                .frBdCmtContent(comment.getFrBdCmtContent())
                .frBdCmtRegDate(comment.getFrBdCmtRegDate())
                .frBdCmtUpdateDate(comment.getFrBdCmtUpdateDate())
                .parentId(comment.getFrBdParentComment() != null
                        ? comment.getFrBdParentComment().getFrCommentNo()
                        : null) // ✅ 핵심 수정
                .build();
    }

}
