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
    @Transactional
    public AttendanceDTO login(Employee employee) {
        LocalDate today = LocalDate.now();

        // 1) 이미 출근 중이면: 기존 열린 세션 반환
        if (attendanceRepository.existsByEmpNoAndAttEndTimeIsNull(employee)) {
            Attendance open = attendanceRepository.findFirstByEmpNoAndAttEndTimeIsNullOrderByAttStartTimeDesc(employee)
                    .orElse(null);

            return (open != null) ? entityDto(open, employee) : new AttendanceDTO();
        }

        // 2) 오늘자 행이 있고 이미 퇴근 완료되었으면: 그대로 반환(하루 1회 규칙 유지용)
        Attendance todayRow = attendanceRepository.findByEmpNoAndAttWorkDate(employee, today);
        if (todayRow != null && todayRow.getAttEndTime() != null) {
            return entityDto(todayRow, employee);
        }

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

    @Transactional
    public AttendanceDTO logout(Employee employee) {
        // 1) 열린 세션이 있으면 종료
        Attendance open = attendanceRepository.findFirstByEmpNoAndAttEndTimeIsNullOrderByAttStartTimeDesc(employee)
                .orElse(null);

        if (open != null) {
            open.changeAttEndTime(LocalTime.now());
            open.changeAttStatus(AttStatus.OFF);
            return entityDto(open, employee);

        }

        // 2) 열린 세션은 없고, 오늘 행이 이미 완료된 경우: 그대로 반환
        Attendance todayRow = attendanceRepository.findByEmpNoAndAttWorkDate(employee, LocalDate.now());
        if (todayRow != null && todayRow.getAttEndTime() != null) {
            return entityDto(todayRow, employee);
        }

        return new AttendanceDTO();

    }

    public AttendanceDTO working(Employee employee) {
        boolean working = attendanceRepository.existsByEmpNoAndAttEndTimeIsNull(employee);
        return AttendanceDTO.builder()
                .empNo(employee.getEmpNo())
                .attStatus(working ? AttStatus.WORK : AttStatus.OFF)
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
