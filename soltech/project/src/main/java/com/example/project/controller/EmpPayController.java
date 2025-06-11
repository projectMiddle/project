package com.example.project.controller;

import java.util.List;

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
import com.example.project.service.EmpPayService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
@Log4j2
@RestController
@RequestMapping("/pay")
@RequiredArgsConstructor
public class EmpPayController {

    private final EmpPayService empPayService;

    // 명세서 상세 조회
    @GetMapping("/{id}")
    public EmpPayDTO getPay(@PathVariable Long id) {
        return empPayService.getPayDto(id);
    }

    // 명세서 생성

    @PostMapping("/create")
    public ResponseEntity<?> postCreatePay(
            // @AuthenticationPrincipal CustomUserDetails loginUser, 로그인 연동시 해제
            @RequestBody EmpPayDTO dto) {
        // dto.setEmpNo(loginUser.getEmpNo()); 로그인 연동시 해제
        EmpPay saved = empPayService.calPay(dto);
        return ResponseEntity.ok(EmpPayResponseDTO.from(saved));
    }

    // 월 명세서 리스트
    @GetMapping("/list")
    public ResponseEntity<List<EmpPayDTO>> getListByMonth(
            // @AuthenticationPrincipal CustomUserDetails loginUser, 로그인 연동시 아래에 empNo 지우고
            // 풀것
            @RequestParam Long empNo,
            @RequestParam int year,
            @RequestParam int month) {
        // dto.setEmpNo(loginUser.getEmpNo()); 로그인 연동시 해제
        return ResponseEntity.ok(empPayService.getPayListByMonth(
                // loginUser.getEmpNo() // 로그인 연동시 해제
                year, month));
    }

    // 명세서 수정
    @PutMapping("update/{empPayId}")
    public ResponseEntity<?> updateEmpPay(
            // @AuthenticationPrincipal CustomUserDetails loginUser, 로그인 연동시 해제
            @PathVariable Long empPayId, @RequestBody EmpPayDTO dto) {

        // dto.setEmpNo(loginUser.getEmpNo()); 로그인 연동시 해제
        EmpPay updated = empPayService.updatePay(empPayId, dto);
        return ResponseEntity.ok(EmpPayResponseDTO.from(updated));
    }

    // 명세서 삭제
    @DeleteMapping("delete/{empPayId}")
    public ResponseEntity<?> deleteEmpPay(@PathVariable Long empPayId
    // @AuthenticationPrincipal CustomUserDetails loginUser 로그인 연동시 해제
    ) {
        empPayService.deletePay(empPayId
        // loginUser.getEmpNo() 로그인 연동시 해제
        );
        return ResponseEntity.noContent().build();
    }
}
