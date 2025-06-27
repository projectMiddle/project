package com.example.project.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Employee;
import com.example.project.entity.approval.AppFile;
import com.example.project.entity.approval.AppProcessing;
import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.entity.constant.AppRoleJobNo;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;
import com.example.project.repository.approval.AppFileRepository;
import com.example.project.repository.approval.AppProcessingRepository;
import com.example.project.repository.approval.ApprovalDocumentRepository;

@SpringBootTest
public class ApprovalRepositoryTest {

        @Autowired
        private ApprovalDocumentRepository approvalDocumentRepository;

        @Autowired
        private AppProcessingRepository appProcessingRepository;

        @Autowired
        private AppFileRepository appFileRepository;

        @Autowired
        private EmployeeRepository employeeRepository;

        @Test
        public void insertTest() {
                Employee employee = employeeRepository.findById(1023L).get();

                IntStream.rangeClosed(1, 200).forEach(j -> {

                        // 서류 작성
                        ApprovalDocument approvalDocument = ApprovalDocument.builder()
                                        .empNo(employee)
                                        .deptNo(employee.getDeptNo())
                                        .appDocCategory("기안서")
                                        .appDocTitle("TEST 제목")
                                        .appDocContent("TEST 본문")
                                        .appIsUrgent(false)
                                        .appIsFinalized(false)
                                        .appDocDate(LocalDate.now())
                                        .build();
                        approvalDocumentRepository.save(approvalDocument);

                        // 첨부 파일
                        String basePath = "C:/project/file/";
                        IntStream.rangeClosed(1, 3).forEach(i -> {
                                String uuid = UUID.randomUUID().toString();
                                String fileName = "file" + i + ".jpg";
                                String fullPath = basePath + uuid + "_" + fileName;

                                AppFile appFile = AppFile.builder()
                                                .appDocNo(approvalDocument)
                                                .build();

                                appFile.updateFileInfo(fileName, fullPath, uuid);

                                appFileRepository.save(appFile);
                        });

                        // 결재 라인
                        // 결재 3인
                        Employee approver1 = employeeRepository.findById(1015L).orElseThrow(); // AD_AM
                        Employee approver2 = employeeRepository.findById(1010L).orElseThrow(); // ASSI_MGR
                        Employee approver3 = employeeRepository.findById(1007L).orElseThrow(); // AD_MGR

                        // 참조 3인
                        Employee reference1 = employeeRepository.findById(1018L).orElseThrow(); // AD_AM
                        Employee reference2 = employeeRepository.findById(1019L).orElseThrow(); // AD_AM

                        List<AppProcessing> list = List.of(
                                        appManagerProcessing(approvalDocument, approver1, AppRoleJobNo.AD_AM,
                                                        AppRoleType.APPROVER,
                                                        AppStatus.PENDING, 1),
                                        appManagerProcessing(approvalDocument, approver2, AppRoleJobNo.ASSI_MGR,
                                                        AppRoleType.APPROVER,
                                                        AppStatus.PENDING, 2),
                                        appManagerProcessing(approvalDocument, approver3, AppRoleJobNo.AD_MGR,
                                                        AppRoleType.APPROVER,
                                                        AppStatus.PENDING, 3),
                                        appManagerProcessing(approvalDocument, reference1, AppRoleJobNo.AD_AM,
                                                        AppRoleType.REFERENCE,
                                                        AppStatus.PENDING,
                                                        null),
                                        appManagerProcessing(approvalDocument, reference2, AppRoleJobNo.AD_AM,
                                                        AppRoleType.REFERENCE,
                                                        AppStatus.PENDING,
                                                        null));
                        appProcessingRepository.saveAll(list);
                });

        }

        // 결재자, 참조자 한번에 처리하기 위한 메서드
        private AppProcessing appManagerProcessing(
                        ApprovalDocument doc,
                        Employee emp,
                        AppRoleJobNo jobNo,
                        AppRoleType roleType,
                        AppStatus status,
                        Integer order // nullable
        ) {
                return AppProcessing.builder()
                                .appDocNo(doc)
                                .empNo(emp)
                                .appRoleJobNo(jobNo)
                                .appRoleType(roleType)
                                .appStatus(status)
                                .appOrder(order)
                                .build();
        }

}
