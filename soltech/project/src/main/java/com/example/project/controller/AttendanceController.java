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
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    // @PostMapping("/login")
    // public AttendanceDTO login(Employee employee) {
    // log.info("출근");

    // return attendanceService.login(employee);
    // }

    // @PostMapping("/login")
    // public String postMethodName(@RequestBody String entity) {
    // //TODO: process POST request

    // return entity;
    // }

    // @PostMapping("/logout")
    // public AttendanceDTO logout(Employee employee) {
    // log.info("퇴근");
    // return attendanceService.logout(employee);
    // }

    // // 반짝
    // @GetMapping("")
    // public boolean working(Employee employee) {
    // return attendanceService.working(employee);
    // }
}
