package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.project.dto.EmployeeDTO;
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
public class EmployeeService implements UserDetailsService {

    @Autowired
    private final EmployeeRepository employeeRepository;
    @Autowired
    private final DepartmentRepository departmentRepository;
    @Autowired
    private final JobRankRepository jobRankRepository;

    @Override
    public UserDetails loadUserByUsername(String empNoStr) throws UsernameNotFoundException {

        Long empNo;

        try {
            empNo = Long.parseLong(empNoStr);
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("사번 형식이 잘못되었습니다.");
        }

        Employee employee = employeeRepository.findByEmpNo(empNo)
                .orElseThrow(() -> new UsernameNotFoundException("사번이 없습니다."));

        return (UserDetails) EmployeeDTO.builder()
                .empNo(employee.getEmpNo())
                .ePassword(employee.getEPassword())
                .deptNo(employee.getDeptNo())
                .jobNo(employee.getJobNo())
                .eName(employee.getEName())
                .eEmail(employee.getEEmail())
                .mMemberRole(employee.getEMemberRole())
                .build();
    }

}
