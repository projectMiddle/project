package com.example.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.AttendanceDTO;
import com.example.project.entity.Employee;
import com.example.project.service.AttendanceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@Log4j2
@RequestMapping("/")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    // @PostMapping("/add")
    // public AttendanceDTO login(@AuthenticationPrincipal Employee employee) {
    //    log.info("출근");
        
    //     return attendanceService.login(empployee);
    // }
    
    

   

    @PostMapping("")
    public AttendanceDTO logout(Employee employee) {
        log.info("퇴근");
        return attendanceService.logout(employee);
    }


    @GetMapping("")
    public boolean working(@AuthenticationPrincipal Employee employee) {
        return attendanceService.working(employee);
    }
}

