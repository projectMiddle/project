package com.example.project.service.approval;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.project.entity.Employee;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.approval.AppProcessingRepository;
import com.example.project.repository.approval.ApprovalDocumentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Log4j2
public class ApprovalCountService {

        private final AppProcessingRepository appProcessingRepository;
        private final ApprovalDocumentRepository approvalDocumentRepository;
        private final EmployeeRepository employeeRepository;

        public Map<String, Integer> getInboxCounts(Long empNo) {
                log.info("📊 [Count] 수신함 알림 조회 - empNo: {}", empNo);

                Map<String, Integer> result = new HashMap<>();
                Employee emp = employeeRepository.findById(empNo).orElseThrow();

                int list = appProcessingRepository.countByEmpNoAndAppRoleTypeAndAppStatus(
                                emp, AppRoleType.APPROVER, AppStatus.PENDING);
                result.put("list", list);

                int history = appProcessingRepository.countByEmpNoAndAppRoleTypeAndAppStatusIn(
                                emp, AppRoleType.APPROVER, List.of(AppStatus.APPROVED, AppStatus.REJECTED));
                result.put("history", history);

                int reference = appProcessingRepository.countByEmpNoAndAppRoleType(
                                emp, AppRoleType.REFERENCE);
                result.put("reference", reference);

                int completed = approvalDocumentRepository.countByAppIsFinalizedTrueAndEmpNo(emp);
                result.put("completed", completed);

                return result;
        }
}
