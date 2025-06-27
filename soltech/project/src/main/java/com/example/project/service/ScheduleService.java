package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.repository.ScheduleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ScheduleService {
    
    private final ScheduleRepository scheduleRepository;

}
