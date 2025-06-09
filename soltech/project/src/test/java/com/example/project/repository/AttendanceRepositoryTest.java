package com.example.project.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.AttStatus;
import com.example.project.service.AttendanceService;

@SpringBootTest
public class AttendanceRepositoryTest {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void login(){
        Employee employee = employeeRepository.save(Employee.builder()
            .empNo(501L)
            .build());

    
            
      attendanceService.login(employee);
      // 아....맞네......
    }


    
}
