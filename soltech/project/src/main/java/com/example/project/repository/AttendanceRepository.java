package com.example.project.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findByEmpNoAndAttWorkDate(Employee empNo, LocalDate attWorkDate);
    // 내가 이걸 왜 넣었지
}
