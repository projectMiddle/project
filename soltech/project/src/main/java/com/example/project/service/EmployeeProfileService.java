package com.example.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.project.dto.EmployeeDTO;
import com.example.project.dto.employee.EmployeeDTO_c;
import com.example.project.dto.employee.EmployeeUpdateDTO;
import com.example.project.entity.Employee;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.JobRankRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class EmployeeProfileService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final JobRankRepository jobRankRepository;

    public EmployeeDTO_c getEmployee(Long empNo) {
        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow();

        return entityToDto(employee);
    }

    public List<EmployeeDTO_c> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::entityToDto)
                .toList();
    }

    @Transactional
    public void updateEmployeeInfo(Long empNo, EmployeeUpdateDTO dto) {
        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow(() -> new RuntimeException("사원을 찾을 수 없습니다."));
        System.out.println("수정할 사원: " + employee.getEName());
        System.out.println("수정 내용: " + dto);
        employee.changeeMobile(dto.getEMobile());
        employee.changeeAddress(dto.getEAddress());
        employee.changeeAccount(dto.getEAccount());
        employee.changeePassword(dto.getEPassword());

    }

    private EmployeeDTO_c entityToDto(Employee employee) {
        return EmployeeDTO_c.builder()
                .empNo(employee.getEmpNo())
                .eName(employee.getEName())
                .eGender(employee.getEGender())
                .eBirth(employee.getEBirthday())
                .eEmail(employee.getEEmail())
                .eAddress(employee.getEAddress())
                .eMobile(employee.getEMobile())
                .eAccount(employee.getEAccount())
                .ePassword(employee.getEPassword())
                .eHiredate(employee.getEHiredate())
                .eLeavedate(employee.getELeavedate())
                .eSalary(employee.getESalary())
                .deptName(employee.getDeptNo().getDeptName())
                .jobNo(employee.getJobNo().getJobName())

                .build();
    }

}
