package com.example.project.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("SELECT n FROM Notice n WHERE n.notiTitle IS NULL OR n.notiTitle LIKE %:keyword%")
    Page<Notice> findWithNullTitle(@Param("keyword") String keyword, Pageable pageable);

}
