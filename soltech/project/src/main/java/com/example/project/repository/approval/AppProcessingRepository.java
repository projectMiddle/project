package com.example.project.repository.approval;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.approval.AppProcessing;

public interface AppProcessingRepository extends JpaRepository<AppProcessing, Long> {
    
}
