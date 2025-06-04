package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    
}
