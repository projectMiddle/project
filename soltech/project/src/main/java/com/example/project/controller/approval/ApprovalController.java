package com.example.project.controller.approval;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.approval.AppDocWithFileDTO;
import com.example.project.dto.approval.AppEmployeeAllDTO;
import com.example.project.dto.approval.AppProcessingDTO;
import com.example.project.dto.approval.ApprovalDetailDTO;
import com.example.project.dto.approval.ApprovalDocumentDTO;
import com.example.project.service.approval.ApprovalCountService;
import com.example.project.service.approval.ApprovalService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/intrasoltech/approval")
@RequiredArgsConstructor
@Log4j2
public class ApprovalController {

    private final ApprovalService approvalService;
    private final ApprovalCountService approvalCountService;

    // 리스트 요청
    // @GetMapping("/list")
    // public ResponseEntity<PageResultDTO<ApprovalDocumentDTO>> getApprovalList(
    // PageRequestDTO requestDTO,
    // @RequestParam(required = false, defaultValue = "all") String status) {

    // log.info("GET list status: {}", status);
    // PageResultDTO<ApprovalDocumentDTO> result = switch (status) {
    // case "processing" -> approvalService.getInboxList(requestDTO);
    // case "history" -> approvalService.getApprovalHistory(requestDTO);
    // case "reference" -> approvalService.getReferenceList(requestDTO);
    // default -> approvalService.getApprovalList(requestDTO, status); // ✅ empNo
    // 포함!
    // };

    // return ResponseEntity.ok(result);
    // }

    // 테스트용 리스트 요청
    @GetMapping("/list")
    public ResponseEntity<PageResultDTO<ApprovalDocumentDTO>> getApprovalList(
            @ModelAttribute PageRequestDTO requestDTO,
            @RequestParam("status") String status,
            @RequestParam("empNo") Long empNo) {

        log.info("문서 목록 조회 요청 - status: {}, empNo: {}", status, empNo);

        PageResultDTO<ApprovalDocumentDTO> result = switch (status) {
            case "list" -> approvalService.getInboxList(requestDTO, empNo);
            case "processing" -> approvalService.getApprovalList(requestDTO, status, empNo);
            case "history" -> approvalService.getApprovalHistory(requestDTO, empNo);
            case "reference" -> approvalService.getReferenceList(requestDTO, empNo);
            default -> approvalService.getApprovalList(requestDTO, status, empNo);
        };

        return ResponseEntity.ok(result);
    }

    // 생성
    @PostMapping("/create/{empNo}")
    public ResponseEntity<Long> createApproval(@PathVariable Long empNo, @ModelAttribute AppDocWithFileDTO dto) {
        log.info("생성 요청 empNo : {}", empNo);
        log.info("생성 요청 dto : {}", dto);
        dto.setEmpNo(empNo); // 나중에 제거 예정
        Long appDocNo = approvalService.createAppDocument(dto);
        return ResponseEntity.ok(appDocNo);
    }

    // 결재선 지정 : 사원 목록 불러오기
    @GetMapping("/employees")
    public ResponseEntity<List<AppEmployeeAllDTO>> getEmployeesForLine() {
        log.info("결재선 사원 목록 요청");
        return ResponseEntity.ok(approvalService.getAllEmployeesForAppLine());
    }

    // 문서 상세 조회
    @GetMapping("/detail/{appDocNo}")
    public ResponseEntity<ApprovalDetailDTO> getApprovalDetail(@PathVariable Long appDocNo) {
        log.info("결재문서 상세조회 요청 - 문서번호: {}", appDocNo);
        ApprovalDetailDTO dto = approvalService.getApprovalDetail(appDocNo);
        return ResponseEntity.ok(dto);
    }

    // 결재자별 수정
    @PostMapping("/process/{appDocNo}")
    public ResponseEntity<String> processApproval(
            @PathVariable Long appDocNo,
            @RequestBody AppProcessingDTO dto) {

        log.info("결재 처리 요청 - 문서번호: {}, 사번: {}, 상태: {}, 의견: {}",
                appDocNo, dto.getEmpNo(), dto.getAppStatus(), dto.getComment());

        // 혹시 body에 있는 appDocNo와 path의 appDocNo 다르면 예외 처리할 수도 있음
        approvalService.processApproval(appDocNo, dto);
        return ResponseEntity.ok("결재 처리 완료");
    }

    // 삭제
    @DeleteMapping("/delete/{appDocNo}")
    public ResponseEntity<?> deleteApprovalDocument(@PathVariable Long appDocNo) {
        log.info("삭제 요청 appDocNo : {}", appDocNo);
        try {
            approvalService.deleteApprovalDocument(appDocNo);
            return ResponseEntity.ok("결재문서 삭제 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("삭제 실패 : " + e.getMessage());
        }
    }

    // 배지용 카운트
    @GetMapping("/categorycount")
    public ResponseEntity<Map<String, Integer>> getCategoryCounts(@RequestParam Long empNo) {
        log.info("사이드바 카테고리 알림 조회 요청 - empNo: {}", empNo);
        Map<String, Integer> counts = approvalCountService.getInboxCounts(empNo);
        return ResponseEntity.ok(counts);
    }

}
