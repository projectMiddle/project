package com.example.project.repository;

import java.util.UUID;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.approval.AppFile;
import com.example.project.entity.approval.ApprovalDocument;
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

        // 서류 작성
        ApprovalDocument approvalDocument = ApprovalDocument.builder()
                .empNo(employee)
                .deptNo(employee.getDeptNo())
                .appDocCategory("TEST 카테고리")
                .appDocTitle("TEST 제목")
                .appDocContent("TEST 본문")
                .appIsUrgent(false)
                .appIsFinalized(false)
                .build();
        approvalDocumentRepository.save(approvalDocument);

        // 첨부 파일
        String basePath = "C:/project/file/";
        IntStream.rangeClosed(1, 3).forEach(i -> {
            AppFile appFile = AppFile.builder()
                    .appFileUuid(UUID.randomUUID().toString())
                    .appFileName("test" + i + ".jpg")
                    .appDocNo(approvalDocument)
                    .build();
            appFileRepository.save(appFile);
        });

    }

}
