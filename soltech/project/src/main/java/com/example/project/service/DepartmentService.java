package com.example.project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.project.dto.department.DepartmentDTO;
import com.example.project.dto.department.EmployeeDetailByDepartmentDTO;
import com.example.project.entity.Employee;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public List<DepartmentDTO> getAllDepartments() {
        log.info("전체 부서 정보 조회");

        return departmentRepository.findAll().stream()
                .map(dept -> new DepartmentDTO(
                        dept.getDeptNo(),
                        dept.getDeptName(),
                        dept.getDeptPhone() // ✅ 전화번호 포함
                ))
                .collect(Collectors.toList());
    }

    public List<EmployeeDetailByDepartmentDTO> getEmployeesByDepartment(Long deptNo) {
        log.info("🔎 사원 목록 조회 번호 : {}", deptNo);

        List<Employee> employees = employeeRepository.findByDeptNo_DeptNo(deptNo);

        return employees.stream()
                .map(emp -> EmployeeDetailByDepartmentDTO.builder()
                        .empNo(emp.getEmpNo())
                        .eName(emp.getEName())
                        .eEmail(emp.getEEmail())
                        .eMobile(emp.getEMobile())
                        .eMemberRole(emp.getEMemberRole().name())
                        .jobName(emp.getJobNo().getJobName())
                        .build())
                .collect(Collectors.toList());
    }

}
