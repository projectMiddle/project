package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.dto.AllInformationDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.JobRank;
import com.example.project.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AllInformationService {

    private final EmployeeRepository employeeRepository;

    public AllInformationDTO getAllEmployeeInfo(Long empNo) {
        Employee emp = employeeRepository.findByEmpNo(empNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 사원이 존재하지 않습니다"));

        Department dept = emp.getDeptNo();
        JobRank job = emp.getJobNo();

        return AllInformationDTO.builder()
                .empNo(emp.getEmpNo())
                .eName(emp.getEName())
                .eGender(emp.getEGender())
                .eBirthday(emp.getEBirthday())
                .eEmail(emp.getEEmail())
                .eAddress(emp.getEAddress())
                .eMobile(emp.getEMobile())
                .eAccount(emp.getEAccount())
                .mMemberRole(emp.getEMemberRole())
                .eHiredate(emp.getEHiredate())
                .eLeavedate(emp.getELeavedate())
                .eSalary(emp.getESalary())

                .deptName(dept != null ? dept.getDeptName() : null)
                .deptPhone(dept != null ? dept.getDeptPhone() : null)

                .jobName(job != null ? job.getJobName() : null)
                .jobDiscount(job != null ? job.getJobDiscount() : null)

                .build();
    }

}
