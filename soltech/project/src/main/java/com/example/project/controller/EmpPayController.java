package com.example.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.EmpPayDTO;
import com.example.project.dto.EmpPayResponseDTO;
import com.example.project.entity.EmpPay;
import com.example.project.entity.Employee;
import com.example.project.repository.EmployeeRepository;
import com.example.project.service.EmpPayService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PutMapping;

@Log4j2
@RestController
@RequestMapping("/intrasoltech/pay")
@RequiredArgsConstructor
public class EmpPayController {

    private final EmpPayService empPayService;
    private final EmployeeRepository employeeRepository;

    // 명세서 상세 조회
    @GetMapping("/{id}")
    public EmpPayDTO getPay(@PathVariable Long id) {
        return empPayService.getPayDto(id);
    }

    // 자동 계산 분리
    @PostMapping("/calculate")
    public ResponseEntity<EmpPayResponseDTO> calculate(@RequestBody EmpPayDTO dto) {
        // 연봉을 employee DB에서 조회해서 채워줌
        Employee employee = employeeRepository.findById(dto.getEmpNo())
                .orElseThrow(() -> new RuntimeException("사원 정보가 없습니다."));

        // 연봉을 DTO에 세팅
        dto.setAnnualSalary(employee.getESalary());

        // 계산 로직 실행
        EmpPayResponseDTO result = empPayService.calculate(dto);
        return ResponseEntity.ok(result);
    }

    // 명세서 생성 (자동계산 제거된 순수 저장)
    @PostMapping("/create")
    public ResponseEntity<?> postCreatePay(
            @RequestBody EmpPayDTO dto) {
        EmpPay saved = empPayService.save(dto);
        return ResponseEntity.ok(EmpPayResponseDTO.from(saved));
    }

    // 월 명세서 리스트
    @GetMapping("/list")
    public ResponseEntity<List<EmpPayDTO>> getListByMonth(
            @RequestParam Long empNo,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(empPayService.getPayListByMonth(year, month));
    }

    // 명세서 수정
    @PutMapping("/update/{empPayId}")
    public ResponseEntity<?> updateEmpPay(
            @PathVariable Long empPayId, @RequestBody EmpPayDTO dto) {
        EmpPay updated = empPayService.updatePay(empPayId, dto);
        return ResponseEntity.ok(EmpPayResponseDTO.from(updated));
    }

    // 명세서 삭제
    @DeleteMapping("/delete/{empPayId}")
    public ResponseEntity<?> deleteEmpPay(@PathVariable Long empPayId) {
        empPayService.deletePay(empPayId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employee/{empNo}")
    public ResponseEntity<Map<String, Object>> getEmployeeInfo(@PathVariable Long empNo) {
        return empPayService.getEmployeeInfo(empNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
