package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.JobRank;
import com.example.project.entity.constant.JobNo;

public interface JobRankRepository extends JpaRepository<JobRank, JobNo> {
    
}
