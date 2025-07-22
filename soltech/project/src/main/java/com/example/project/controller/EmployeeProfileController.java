package com.example.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.employee.EmployeeDTO_c;
import com.example.project.dto.employee.EmployeeUpdateDTO;
import com.example.project.service.EmployeeProfileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Log4j2
@RequestMapping("/intrasoltech/empinfo")
@RequiredArgsConstructor
public class EmployeeProfileController {

    private final EmployeeProfileService employeeService;

    @GetMapping("/{empNo}")
    public ResponseEntity<EmployeeDTO_c> getEmployee(@PathVariable Long empNo) {
        EmployeeDTO_c dto = employeeService.getEmployee(empNo);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{empNo}")
    public ResponseEntity<Void> updateEmployee(@PathVariable Long empNo, @RequestBody EmployeeUpdateDTO dto) {
        employeeService.updateEmployeeInfo(empNo, dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeDTO_c>> getAllEmployees() {
        List<EmployeeDTO_c> list = employeeService.getAllEmployees();
        return ResponseEntity.ok(list);
    }
}