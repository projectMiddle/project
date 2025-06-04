package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.repository.AttendanceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class AttendanceService {
    
    private final AttendanceRepository attendanceRepository;

}
