package com.example.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.AttendanceDTO;
import com.example.project.entity.Employee;
import com.example.project.repository.EmployeeRepository;
import com.example.project.service.AttendanceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Log4j2
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final EmployeeRepository employeeRepository;

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

    @GetMapping("/working/{empNo}")
    public boolean working(@PathVariable Long empNo) {
        Employee employee = employeeRepository.findById(empNo).get();
        return attendanceService.working(employee);
    }
}
