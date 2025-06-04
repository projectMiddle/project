package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
}
