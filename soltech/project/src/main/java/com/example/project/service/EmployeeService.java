package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.dto.EmployeeDTO;
import com.example.project.entity.Employee;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.JobRankRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final JobRankRepository jobRankRepository;

    public EmployeeDTO getEmployeeByEmpNo(Long empNo) {
        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow();

        return entityToDto(employee);
    }

    private EmployeeDTO entityToDto(Employee employee) {

        return EmployeeDTO.builder()
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
                .deptNo(employee.getDeptNo())
                .jobNo(employee.getJobNo())
                .build();
    }

}
