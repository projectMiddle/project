package com.example.project.repository.mainhome;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mainhome.MainJobs;

public interface MainJobsRepository extends JpaRepository<MainJobs, Long> {
    
}
