package com.example.project.service.approval;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.dto.PageRequestDTO;
import com.example.project.dto.PageResultDTO;
import com.example.project.dto.approval.AppDocWithFileDTO;
import com.example.project.dto.approval.AppEmployeeAllDTO;
import com.example.project.dto.approval.AppFileDTO;
import com.example.project.dto.approval.AppProcessingDTO;
import com.example.project.dto.approval.ApprovalDetailDTO;
import com.example.project.dto.approval.ApprovalDocumentDTO;
import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.approval.AppFile;
import com.example.project.entity.approval.AppProcessing;
import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;
import com.example.project.repository.DepartmentRepository;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.approval.AppFileRepository;
import com.example.project.repository.approval.AppProcessingRepository;
import com.example.project.repository.approval.ApprovalDocumentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ApprovalService {

        private final AppProcessingRepository appProcessingRepository;
        private final ApprovalDocumentRepository approvalDocumentRepository;
        private final AppFileRepository appFileRepository;

        private final EmployeeRepository employeeRepository;
        private final DepartmentRepository departmentRepository;

        private final AppFileService appFileService;

        // 상신함
        public PageResultDTO<ApprovalDocumentDTO> getMyDraftBoxList(PageRequestDTO dto, String status, Long empNo) {
                Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize());
                Page<ApprovalDocument> result = approvalDocumentRepository.findDocsWithUrgentSorted(empNo, status,
                                pageable);

                if ("submitted".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findSubmittedDocsByEmpNoAndAppStatusNot(empNo, pageable);
                } else if ("processing".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findProcessingDocsByEmpNoAndAppStatusNot(empNo, pageable);
                } else if ("completed".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findByAppIsFinalizedTrueAndEmpNoEmpNo(empNo, pageable);
                } else if ("rejected".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findRejectedDocsByEmpNo(empNo, pageable);
                } else {
                        result = approvalDocumentRepository.findByEmpNoEmpNo(empNo, pageable);
                }

                List<ApprovalDocumentDTO> dtoList = result.stream()
                                .map(this::entityToDto)
                                .filter(doc -> doc.getAppIsTemporary() != null && !doc.getAppIsTemporary())
                                .collect(Collectors.toList());

                return PageResultDTO.<ApprovalDocumentDTO>withAll()
                                .dtoList(dtoList)
                                .totalCount(result.getTotalElements())
                                .pageRequestDTO(dto)
                                .build();
        }

        // 수신함
        public PageResultDTO<ApprovalDocumentDTO> getMyReceiveBoxList(PageRequestDTO dto, String status, Long empNo) {
                Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize());

                Page<AppProcessing> procPage;

                if ("list".equalsIgnoreCase(status)) {
                        procPage = appProcessingRepository.findInboxByApprover(empNo, AppRoleType.APPROVER,
                                        AppStatus.PENDING, pageable);
                } else if ("history".equalsIgnoreCase(status)) {
                        List<AppStatus> statuses = List.of(AppStatus.APPROVED, AppStatus.REJECTED);
                        procPage = appProcessingRepository.findApprovalHistoryByApprover(empNo, AppRoleType.APPROVER,
                                        statuses, pageable);
                } else {
                        procPage = appProcessingRepository.findReferencesByEmpNo(empNo, AppRoleType.REFERENCE,
                                        pageable);
                }

                List<Long> appDocNos = procPage.stream()
                                .map(proc -> proc.getAppDocNo().getAppDocNo())
                                .collect(Collectors.toList());

                Page<ApprovalDocument> result = approvalDocumentRepository.findDocsForReceiveSorted(appDocNos,
                                pageable);

                List<ApprovalDocumentDTO> dtoList = result.stream()
                                .map(this::entityToDto)
                                .collect(Collectors.toList());

                return PageResultDTO.<ApprovalDocumentDTO>withAll()
                                .dtoList(dtoList)
                                .totalCount(result.getTotalElements())
                                .pageRequestDTO(dto)
                                .build();
        }

        // 시행함
        public PageResultDTO<ApprovalDocumentDTO> getMyEnforcedBoxList(PageRequestDTO dto, Long empNo) {
                Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize());

                Page<ApprovalDocument> result = approvalDocumentRepository.findDocsWithUrgentSorted(empNo, "enforced",
                                pageable);

                List<ApprovalDocumentDTO> dtoList = result.stream()
                                .map(this::entityToDto)
                                .collect(Collectors.toList());

                return PageResultDTO.<ApprovalDocumentDTO>withAll()
                                .dtoList(dtoList)
                                .totalCount(result.getTotalElements())
                                .pageRequestDTO(dto)
                                .build();
        }

        // 보관함
        public PageResultDTO<ApprovalDocumentDTO> getMyStorageBoxList(PageRequestDTO dto, String status, Long empNo) {
                Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getSize());

                Page<ApprovalDocument> result = approvalDocumentRepository.findDocsWithUrgentSorted(empNo, status,
                                pageable);

                if ("temporary".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findTemporaryDocsByEmpNo(empNo, pageable);
                } else if ("retrieved".equalsIgnoreCase(status)) {
                        result = approvalDocumentRepository.findRetrievedDocsByEmpNo(empNo, pageable);
                } else {
                        result = approvalDocumentRepository.findByEmpNoEmpNo(empNo, pageable);
                }

                List<ApprovalDocumentDTO> dtoList = result.stream()
                                .map(this::entityToDto)
                                .collect(Collectors.toList());

                return PageResultDTO.<ApprovalDocumentDTO>withAll()
                                .dtoList(dtoList)
                                .totalCount(result.getTotalElements())
                                .pageRequestDTO(dto)
                                .build();
        }

        // 생성
        public Long createAppDocument(AppDocWithFileDTO dto) {
                log.info("도착한 approvers: {}", dto.getApprovers());
                log.info("도착한 references: {}", dto.getReferences());

                Employee emp = employeeRepository.findById(dto.getEmpNo())
                                .orElseThrow(() -> new IllegalArgumentException("사원 정보 없음"));
                Department dept = departmentRepository.findById(dto.getDeptNo())
                                .orElseThrow(() -> new IllegalArgumentException("부서 정보 없음"));

                ApprovalDocument savedDoc = approvalDocumentRepository.save(
                                ApprovalDocument.builder()
                                                .appDocCategory(dto.getAppDocCategory())
                                                .appDocTitle(dto.getAppDocTitle())
                                                .appDocContent(dto.getAppDocContent())
                                                .appIsUrgent(dto.isAppIsUrgent())
                                                .appIsFinalized(false)
                                                .appIsTemporary(dto.getAppIsTemporary())
                                                .empNo(emp)
                                                .deptNo(dept)
                                                .appDocDate(LocalDate.now())
                                                .build());

                // 첨부파일 저장
                MultipartFile[] uploadFiles = dto.getUploadFiles();
                if (uploadFiles != null && uploadFiles.length > 0) {
                        appFileService.saveFiles(savedDoc.getAppDocNo(), uploadFiles);
                }

                // 결재선 저장
                if (!dto.getAppIsTemporary()) { // 임시저장이 아닐 경우만 결재자 저장
                        List<AppProcessingDTO> approvers = dto.getApprovers();
                        if (approvers == null || approvers.size() != 3) {
                                throw new IllegalArgumentException("결재자는 반드시 3명이어야 합니다.");
                        }
                        saveAppLine(approvers, savedDoc, AppRoleType.APPROVER);

                        List<AppProcessingDTO> references = dto.getReferences();
                        if (references != null && references.size() > 3) {
                                throw new IllegalArgumentException("참조자는 최대 3명까지 가능합니다.");
                        }
                        if (references != null && !references.isEmpty()) {
                                saveAppLine(references, savedDoc, AppRoleType.REFERENCE);
                        }
                }

                return savedDoc.getAppDocNo();
        }

        // 임시저장 문서 조회 후 생성
        public void modifyAppDocument(Long appDocNo, AppDocWithFileDTO dto) {

                log.info("문서 수정 시작 - appDocNo: {}", appDocNo);

                // 1. 기존 문서 조회
                ApprovalDocument old = approvalDocumentRepository.findById(appDocNo)
                                .orElseThrow(() -> new IllegalArgumentException("문서가 존재하지 않음"));

                // 2. 새로운 문서 객체 생성 (builder 기반)
                ApprovalDocument updated = ApprovalDocument.builder()
                                .appDocNo(old.getAppDocNo()) // PK 유지
                                .appDocTitle(dto.getAppDocTitle())
                                .appDocContent(dto.getAppDocContent())
                                .appDocCategory(dto.getAppDocCategory())
                                .appIsUrgent(dto.isAppIsUrgent())
                                .appIsTemporary(dto.getAppIsTemporary())
                                .appIsFinalized(false)
                                .appDocDate(old.getAppDocDate()) // 기존 날짜 유지
                                .empNo(old.getEmpNo()) // 기안자 유지
                                .deptNo(old.getDeptNo()) // 부서 유지
                                .build();

                // 3. 기존 결재선 삭제
                appProcessingRepository.deleteByAppDocNo(old);
                log.info("기존 결재선 삭제 완료");

                // 4. 결재선 재등록
                if (dto.getApprovers() != null) {
                        dto.getApprovers().forEach(approver -> {
                                AppProcessing proc = AppProcessing.builder()
                                                .appDocNo(updated)
                                                .empNo(Employee.builder().empNo(approver.getEmpNo()).build())
                                                .appRoleJobNo(approver.getAppRoleJobNo())
                                                .appRoleType(AppRoleType.APPROVER)
                                                .appOrder(approver.getAppOrder())
                                                .appStatus(AppStatus.PENDING)
                                                .build();
                                appProcessingRepository.save(proc);
                        });
                }

                if (dto.getReferences() != null) {
                        dto.getReferences().forEach(ref -> {
                                AppProcessing proc = AppProcessing.builder()
                                                .appDocNo(updated)
                                                .empNo(Employee.builder().empNo(ref.getEmpNo()).build())
                                                .appRoleJobNo(ref.getAppRoleJobNo())
                                                .appRoleType(AppRoleType.REFERENCE)
                                                .appStatus(AppStatus.PENDING)
                                                .build();
                                appProcessingRepository.save(proc);
                        });
                }

                log.info("결재선 등록 완료");

                // 5. 기존 첨부파일 삭제
                List<AppFile> files = appFileRepository.findByAppDocNo(updated);
                for (AppFile file : files) {
                        String fullPath = file.getAppFilePath() + "/" + file.getAppFileUuid() + "_"
                                        + file.getAppFileName();
                        appFileService.deleteFile(fullPath);
                }
                log.info("기존 첨부파일 삭제 완료");

                // 6. 첨부파일 재등록
                if (dto.getUploadFiles() != null) {
                        appFileService.saveFiles(appDocNo, dto.getUploadFiles());
                        log.info("첨부파일 재등록 완료");
                }

                // 7. 문서 저장
                approvalDocumentRepository.save(updated);
                log.info("문서 저장 완료 - appDocNo: {}", appDocNo);
        }

        // 삭제
        @Transactional
        public void deleteApprovalDocument(Long appDocNo) {
                ApprovalDocument doc = approvalDocumentRepository.findById(appDocNo)
                                .orElseThrow(() -> new IllegalArgumentException("해당 결재문서를 찾을 수 없음"));

                // 첨부파일 삭제 (DB 및 실제 파일)
                List<AppFile> files = appFileRepository.findByAppDocNo(doc);
                for (AppFile file : files) {
                        String fullFileName = file.getAppFilePath() + "/" + file.getAppFileUuid() + "_"
                                        + file.getAppFileName();
                        appFileService.deleteFile(fullFileName); // 파일 삭제
                }

                // 결재선 삭제
                appProcessingRepository.deleteByAppDocNo(doc);

                // 결재 문서 삭제
                approvalDocumentRepository.delete(doc);
        }

        // 결재선 저장
        private void saveAppLine(List<AppProcessingDTO> list, ApprovalDocument doc, AppRoleType roleType) {
                for (AppProcessingDTO dto : list) {
                        Employee emp = employeeRepository.findById(dto.getEmpNo())
                                        .orElseThrow(() -> new IllegalArgumentException("사원 없음"));

                        AppProcessing entity = AppProcessing.builder()
                                        .appDocNo(doc)
                                        .empNo(emp)
                                        .appRoleType(roleType)
                                        .appRoleJobNo(dto.getAppRoleJobNo())
                                        .appOrder(roleType == AppRoleType.APPROVER ? dto.getAppOrder() : null)
                                        .appStatus(AppStatus.PENDING)
                                        .build();

                        appProcessingRepository.save(entity);
                }
        }

        // 결재선 지정 모달 사원 불러오기
        public List<AppEmployeeAllDTO> getAllEmployeesForAppLine() {
                return employeeRepository.findAll().stream()
                                .map(emp -> AppEmployeeAllDTO.builder()
                                                .empNo(emp.getEmpNo())
                                                .eName(emp.getEName())
                                                .jobNo(emp.getJobNo().getJobNo().name())
                                                .jobName(emp.getJobNo().getJobName())
                                                .deptName(emp.getDeptNo().getDeptName())
                                                .build())
                                .collect(Collectors.toList());
        }

        // 결재 서류 (기안자, 참조자) 조회용
        public ApprovalDetailDTO getApprovalDetail(Long appDocNo) {
                ApprovalDocument doc = approvalDocumentRepository.findById(appDocNo)
                                .orElseThrow(() -> new RuntimeException("문서를 찾을 수 없습니다"));

                List<AppFile> files = appFileRepository.findByAppDocNo(doc);

                // 결재자 목록 조회
                List<AppProcessing> approverEntities = appProcessingRepository
                                .findByAppDocNoAndAppRoleTypeOrderByAppOrderAsc(doc, AppRoleType.APPROVER);

                List<AppProcessingDTO> approvers = approverEntities.stream()
                                .map(proc -> AppProcessingDTO.builder()
                                                .empNo(proc.getEmpNo().getEmpNo())
                                                .empName(proc.getEmpNo().getEName())
                                                .jobName(proc.getEmpNo().getJobNo().getJobName())
                                                .deptName(proc.getEmpNo().getDeptNo().getDeptName())
                                                .appRoleType(proc.getAppRoleType().name())
                                                .appOrder(proc.getAppOrder())
                                                .appStatus(proc.getAppStatus().name())
                                                .comment(proc.getAppComment())
                                                .processedDate(proc.getAppDate())
                                                .appDocNo(appDocNo)
                                                .build())
                                .collect(Collectors.toList());

                // 참조자 목록 조회
                List<AppProcessing> referenceEntities = appProcessingRepository
                                .findByAppDocNoAndAppRoleTypeOrderByAppOrderAsc(doc, AppRoleType.REFERENCE);

                List<AppProcessingDTO> references = referenceEntities.stream()
                                .map(proc -> AppProcessingDTO.builder()
                                                .empNo(proc.getEmpNo().getEmpNo())
                                                .empName(proc.getEmpNo().getEName())
                                                .jobName(proc.getEmpNo().getJobNo().getJobName())
                                                .deptName(proc.getEmpNo().getDeptNo().getDeptName())
                                                .appRoleType(proc.getAppRoleType().name())
                                                .appDocNo(appDocNo)
                                                .build())
                                .collect(Collectors.toList());

                return ApprovalDetailDTO.builder()
                                .appDocNo(doc.getAppDocNo())
                                .appDocCategory(doc.getAppDocCategory())
                                .appDocTitle(doc.getAppDocTitle())
                                .appDocContent(doc.getAppDocContent())
                                .appDocDate(doc.getAppDocDate())
                                .appIsUrgent(doc.isAppIsUrgent())
                                .appIsFinalized(doc.isAppIsFinalized())
                                .eName(doc.getEmpNo().getEName())
                                .deptName(doc.getEmpNo().getDeptNo().getDeptName())
                                .empNo(doc.getEmpNo().getEmpNo())
                                .files(files.stream().map(AppFileDTO::new).toList())
                                .approvers(approvers)
                                .references(references)
                                .appIsTemporary(doc.getAppIsTemporary())
                                .build();
        }

        // 결재자 별 수정 기능
        @Transactional
        public void processApproval(Long appDocNo, AppProcessingDTO dto) {
                log.info("결재 처리 서비스 진입");
                log.info("결재 처리 요청 도착 - docNo: {}, empNo: {}, status: {}, comment: {}",
                                appDocNo, dto.getEmpNo(), dto.getAppStatus(), dto.getComment());

                // 1. 문서 조회
                ApprovalDocument doc = approvalDocumentRepository.findById(appDocNo).orElse(null);
                if (doc == null) {
                        log.error("문서 없음: {}", appDocNo);
                        throw new IllegalArgumentException("문서를 찾을 수 없습니다");
                }

                // 2. 결재자 조회
                Employee emp = employeeRepository.findById(dto.getEmpNo()).orElse(null);
                if (emp == null) {
                        log.error("사번 없음: {}", dto.getEmpNo());
                        throw new IllegalArgumentException("결재자 정보를 찾을 수 없습니다");
                }

                // 3. AppProcessing 조회
                List<AppProcessing> processingList = appProcessingRepository.findByAppDocNoAndEmpNo(doc, emp);
                if (processingList.isEmpty()) {
                        log.error("결재 대상 없음: empNo = {}", dto.getEmpNo());
                        throw new IllegalArgumentException("결재 처리 대상이 없습니다");
                }

                AppProcessing processing = processingList.get(0);

                // 4. 상태 변경
                processing.changeAppStatus(AppStatus.valueOf(dto.getAppStatus())); // APPROVED or REJECTED
                processing.changeAppComment(dto.getComment());
                processing.changeAppDate(LocalDate.now()); // public field라면 직접 지정

                log.info("🖋️ 결재 처리 완료 - 상태: {}", dto.getAppStatus());

                // 5. 다음 결재자 처리
                if (AppStatus.APPROVED.name().equals(dto.getAppStatus())) {
                        List<AppProcessing> approvers = appProcessingRepository
                                        .findByAppDocNoAndAppRoleTypeOrderByAppOrderAsc(doc, AppRoleType.APPROVER);

                        int currentOrder = processing.getAppOrder();
                        boolean nextFound = false;

                        for (AppProcessing approver : approvers) {
                                if (approver.getAppOrder() == currentOrder + 1) {
                                        approver.changeAppStatus(AppStatus.PENDING); // 다음 순번에게 PENDING 부여
                                        log.info("➡️ 다음 결재자 {} 활성화", approver.getEmpNo().getEmpNo());
                                        nextFound = true;
                                        break;
                                }
                        }

                        if (!nextFound) {
                                doc.changeAppIsFinalized(true);
                                log.info("📌 모든 결재 완료 - 문서 확정 처리");
                        }
                }

        }

        // 결재 문서 번호 가져오기
        @Transactional
        public Long getNextAppDocNo() {
                Long maxDocNo = approvalDocumentRepository.findMaxAppDocNo();
                return (maxDocNo != null) ? maxDocNo + 1 : 1L;
        }

        // 결재서류 entity -> dto
        private ApprovalDocumentDTO entityToDto(ApprovalDocument entity) {
                List<AppProcessing> processingList = appProcessingRepository.findByAppDocNo(entity);

                boolean isRejected = processingList.stream()
                                .anyMatch(proc -> proc.getAppStatus() == AppStatus.REJECTED);

                return ApprovalDocumentDTO.builder()
                                .appDocNo(entity.getAppDocNo())
                                .appDocTitle(entity.getAppDocTitle())
                                .appDocCategory(entity.getAppDocCategory())
                                .appIsUrgent(entity.isAppIsUrgent())
                                .appIsFinalized(entity.isAppIsFinalized())
                                .appDocDate(entity.getAppDocDate())
                                .appIsTemporary(entity.getAppIsTemporary())
                                .eName(entity.getEmpNo().getEName())
                                .deptName(entity.getDeptNo().getDeptName())
                                .isRejected(isRejected)
                                .build();
        }

}
