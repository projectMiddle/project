package com.example.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.EmployeeDTO;
import com.example.project.service.EmployeeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequestMapping("/empinfo")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/{empNo}")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable Long empNo) {
        EmployeeDTO dto = employeeService.getEmployeeByEmpNo(empNo);
        return ResponseEntity.ok(dto);
    }
}