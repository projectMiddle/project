package com.example.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.AllInformationDTO;
import com.example.project.service.AllInformationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/intrasoltech/information")
@RequiredArgsConstructor
@Log4j2
public class AllInformationController {

    private final AllInformationService allInformationService;

    @GetMapping("/all/{empNo}")
    public ResponseEntity<AllInformationDTO> getEmployeeAllInfo(@PathVariable Long empNo) {
        log.info("모든 정보 요청 empNo : {}", empNo);
        AllInformationDTO dto = allInformationService.getAllEmployeeInfo(empNo);
        return ResponseEntity.ok(dto);
    }

}
