package com.example.project.repository.board;

import com.example.project.entity.board.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByFreeBoardNo_FreeBoardNo(Long freeBoardNo);

    Page<Comment> findByFreeBoardNo_FreeBoardNo(Long freeBoardNo, Pageable pageable);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.freeBoardNo.freeBoardNo = :freeBoardNo")
    void deleteByFreeBoardNo(@Param("freeBoardNo") Long freeBoardNo);

}
