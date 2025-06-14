package com.example.project.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.example.project.dto.AttendanceDTO;
import com.example.project.entity.Attendance;
import com.example.project.entity.Employee;
import com.example.project.entity.constant.AttStatus;
import com.example.project.repository.AttendanceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    // 출근
    public AttendanceDTO login(Employee employee) {
        Attendance attendance = Attendance.builder()
                .empNo(employee)
                .attWorkDate(LocalDate.now())
                .attStartTime(LocalTime.now())
                .attEndTime(null)
                .attStatus(AttStatus.WORK)

                .build();
        Attendance saved = attendanceRepository.save(attendance);

        return entityDto(saved, employee);
    }

    public AttendanceDTO logout(Employee employee) {
        Attendance attendance = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());
        attendance.changeAttEndTime(LocalTime.now());
        attendance.changeAttStatus(AttStatus.OFF);

        Attendance saved = attendanceRepository.save(attendance);

        return entityDto(saved, employee);

    }

    // // 불 반짝
    public boolean working(Employee employee) {
        Attendance attendance = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());
        if (attendance.getAttEndTime() == null) {
            return true;
        } else {
            return false;
        }
    }

    // entity => dto
    private AttendanceDTO entityDto(Attendance attendance, Employee employee) {
        AttendanceDTO dto = AttendanceDTO.builder()
                .attNo(attendance.getAttNo())
                .empNo(employee.getEmpNo())
                .attWorkDate(attendance.getAttWorkDate())
                .attStartTime(attendance.getAttStartTime())
                .attEndTime(attendance.getAttEndTime())
                .attStatus(attendance.getAttStatus())
                .build();

        return dto;
    }

}
