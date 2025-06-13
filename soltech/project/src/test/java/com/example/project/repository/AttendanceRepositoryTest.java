package com.example.project.repository;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.dto.AttendanceDTO;
import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;

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
    public void loginTest() {
        Employee employee = employeeRepository.findById(1049L).get();
        AttendanceDTO dto = attendanceService.login(employee);

        System.out.println("사번: " + dto.getEmpNo());
        System.out.println("출근 날짜: " + dto.getAttWorkDate());
        System.out.println("출근 시간: " + dto.getAttStartTime());
        System.out.println("상태: " + dto.getAttStatus());

        Attendance saved = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());
        System.out.println("DB 출결: " + saved);

    }

    @Test
    public void logoutTest() {
        Employee employee = employeeRepository.findById(1049L).get();

        AttendanceDTO dto = attendanceService.logout(employee);
        System.out.println("사번: " + dto.getEmpNo());
        System.out.println("퇴근 시간: " + dto.getAttEndTime());
        System.out.println("상태: " + dto.getAttStatus());

        Attendance saved = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());
        System.out.println("DB 출결: " + saved);
    }

    @Test
    public void workingTest() {
        Employee employee = employeeRepository.findById(1001L).get();

        boolean result = attendanceService.working(employee);
        System.out.println("출근 여부" + result);
    }

}
