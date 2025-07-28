package com.example.project.service.approval;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.project.repository.approval.ApprovalDocumentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Log4j2
public class ApprovalCountServiceImpl implements ApprovalCountService {

    private final ApprovalDocumentRepository approvalDocumentRepository;

    @Override
    public Map<String, Long> getApprovalCounts(Long empNo) {
        log.info("결재 카운트 요청 empNo : {}", empNo);
        Map<String, Long> result = approvalDocumentRepository.countApprovalStatusByEmpNo(empNo);
        log.info("결재 카운트 결과 : {}", result);
        return result;
    }
}
