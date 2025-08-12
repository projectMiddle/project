package com.example.project.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Attendance findByEmpNoAndAttWorkDate(Employee empNo, LocalDate attWorkDate);

    List<Attendance> findByEmpNoAndAttWorkDateBetween(Employee emp, LocalDate start, LocalDate end);

    // 퇴근전
    boolean existsByEmpNoAndAttEndTimeIsNull(Employee emp);

    // 퇴근 처리
    Optional<Attendance> findFirstByEmpNoAndAttEndTimeIsNullOrderByAttStartTimeDesc(Employee emp);

    // default Attendance findTodayByEmp(Employee emp) {
    // return findByEmpNoAndAttWorkDate(emp, LocalDate.now());
    // }
}
