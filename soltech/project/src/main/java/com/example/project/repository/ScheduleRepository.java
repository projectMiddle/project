package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
}
