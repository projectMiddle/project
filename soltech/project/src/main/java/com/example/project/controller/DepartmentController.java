package com.example.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.department.DepartmentDTO;
import com.example.project.dto.department.EmployeeDetailByDepartmentDTO;
import com.example.project.service.DepartmentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/intrasoltech/department")
@RequiredArgsConstructor
@Log4j2
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/list")
    public ResponseEntity<List<DepartmentDTO>> getDepartments() {
        log.info("department/list 호출");
        List<DepartmentDTO> list = departmentService.getAllDepartments();
        return ResponseEntity.ok(list);
    }

    @GetMapping("list/{deptNo}")
    public ResponseEntity<List<EmployeeDetailByDepartmentDTO>> getEmployeesByDepartment(@PathVariable Long deptNo) {
        log.info("부서 소속 사원 목록 조회 요청 : {}", deptNo);
        List<EmployeeDetailByDepartmentDTO> result = departmentService.getEmployeesByDepartment(deptNo);
        return ResponseEntity.ok(result);
    }

}
