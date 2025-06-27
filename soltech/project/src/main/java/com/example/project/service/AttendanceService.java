package com.example.project.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // 불 반짝 업그레이드
    // public AttendanceDTO working(Employee employee) {
    // Attendance attendance =
    // attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());

    // return AttendanceDTO.builder()
    // .empNo(employee.getEmpNo())
    // .eName(employee.getEName())
    // .deptName(employee.getDeptNo().getDeptName())
    // .attStatus(attendance.getAttStatus())
    // .build();
    // }

    public AttendanceDTO working(Employee employee) {
        Attendance att = attendanceRepository.findTodayByEmp(employee);
        if (att == null) {
            System.out.println("❗ 출근 기록 없음 - empNo: " + employee.getEmpNo());
            return null;
        }

        return AttendanceDTO.builder()
                .attNo(att.getAttNo())
                .empNo(employee.getEmpNo())
                .attStatus(att.getAttStatus())
                .eName(employee.getEName())
                .deptName(employee.getDeptNo().getDeptName())
                .build();
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
                .eName(employee.getEName())
                .deptName(employee.getDeptNo().getDeptName())
                .build();

        return dto;
    }

    // 부서포함
    public AttendanceDTO entityDtoWithDeptName(Attendance attendance, String eName, String deptName) {
        return AttendanceDTO.builder()
                .attNo(attendance.getAttNo())
                .empNo(attendance.getEmpNo().getEmpNo())
                .attWorkDate(attendance.getAttWorkDate())
                .attStartTime(attendance.getAttStartTime())
                .attEndTime(attendance.getAttEndTime())
                .attStatus(attendance.getAttStatus())
                .eName(eName)
                .deptName(deptName)
                .build();
    }

    // 날짜 필터링
    public List<AttendanceDTO> getMonthYear(Employee emp, int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<Attendance> list = attendanceRepository.findByEmpNoAndAttWorkDateBetween(emp, start, end);

        return list.stream()
                .map(att -> entityDtoWithDeptName(att, emp.getEName(), emp.getDeptNo().getDeptName()))
                .collect(Collectors.toList());
    }

}
