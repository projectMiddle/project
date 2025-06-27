package com.example.project.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findByEmpNoAndAttWorkDate(Employee empNo, LocalDate attWorkDate);

    List<Attendance> findByEmpNoAndAttWorkDateBetween(Employee emp, LocalDate start, LocalDate end);

    default Attendance findTodayByEmp(Employee emp) {
        return findByEmpNoAndAttWorkDate(emp, LocalDate.now());
    }
}
