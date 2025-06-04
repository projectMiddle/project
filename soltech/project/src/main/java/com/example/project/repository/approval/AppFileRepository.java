package com.example.project.repository.approval;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.approval.AppFile;

public interface AppFileRepository extends JpaRepository<AppFile, Long> {
    
}
