package com.example.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.AttendanceDTO;
import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;
import com.example.project.repository.AttendanceRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.service.AttendanceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@Log4j2
@RequestMapping("/intrasoltech/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    @PostMapping("/login/{empNo}")
    public AttendanceDTO login(@PathVariable Long empNo) {
        Employee employee = employeeRepository.findById(empNo).get();
        return attendanceService.login(employee);
    }

    @PostMapping("/logout/{empNo}")
    public AttendanceDTO logout(@PathVariable Long empNo) {
        Employee employee = employeeRepository.findById(empNo).get();
        return attendanceService.logout(employee);
    }

    // 불반짝 업그레이드
    // @GetMapping("/working/{empNo}")
    // public AttendanceDTO working(@PathVariable Long empNo) {
    // Employee employee = employeeRepository.findById(empNo).orElseThrow();
    // return attendanceService.working(employee);
    // }
    @GetMapping("/working/{empNo}")
    public ResponseEntity<AttendanceDTO> working(@PathVariable Long empNo) {
        return employeeRepository.findById(empNo)
                .map(employee -> {
                    AttendanceDTO dto = attendanceService.working(employee);
                    if (dto == null) {
                        return ResponseEntity.ok(new AttendanceDTO()); // 안전하게 빈 DTO 반환
                    }
                    return ResponseEntity.ok(dto);
                })
                .orElseGet(() -> ResponseEntity.ok(new AttendanceDTO())); // 사원이 없으면 빈 DTO
    }

    // 연,월 필터링
    @GetMapping("/list/{empNo}")
    public List<AttendanceDTO> getMethodName(@PathVariable Long empNo, @RequestParam int year,
            @RequestParam int month) {
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException("월(month)은 1부터 12 사이여야 합니다.");
        }
        Employee emp = employeeRepository.findById(empNo).orElseThrow();

        return attendanceService.getMonthYear(emp, year, month);

    }

    @GetMapping("/user/info/{empNo}")
    public Map<String, Object> getUserSummary(@PathVariable Long empNo) {
        Employee employee = employeeRepository.findById(empNo).orElseThrow();
        Attendance attendance = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());

        boolean isWorking = (attendance != null && attendance.getAttEndTime() == null);

        return Map.of(
                "name", employee.getEName(),
                "department", employee.getDeptNo().getDeptName(),
                "attStatus", isWorking ? "WORK" : "OFF");
    }
}