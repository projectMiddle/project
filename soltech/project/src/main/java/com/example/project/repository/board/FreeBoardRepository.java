package com.example.project.repository.board;

import com.example.project.entity.board.FreeBoard;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
    // 게시글 단건 조회
    Optional<FreeBoard> findById(Long freeBoardNo);

    Page<FreeBoard> findByFrBdTitleContaining(String keyword, Pageable pageable);

}
