package com.example.project.repository.approval;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.Employee;
import com.example.project.entity.approval.ApprovalDocument;

public interface ApprovalDocumentRepository extends JpaRepository<ApprovalDocument, Long> {

    // 결재 완료된 문서
    Page<ApprovalDocument> findByAppIsFinalizedTrue(Pageable pageable);

    // 결재 상신 상태 문서 (아직 결재 시작도 안됨)
    Page<ApprovalDocument> findByAppIsFinalizedFalse(Pageable pageable);

    // 결재 진행 중인 문서 (실제용)
    @Query("SELECT d FROM ApprovalDocument d WHERE d.appIsFinalized = false AND EXISTS (" +
            "SELECT p FROM AppProcessing p WHERE p.appDocNo = d AND p.appStatus = com.example.project.entity.constant.AppStatus.PENDING)")
    Page<ApprovalDocument> findProcessingDocs(Pageable pageable);

    // 테스트용
    Page<ApprovalDocument> findByEmpNoEmpNo(Long empNo, Pageable pageable);

    Page<ApprovalDocument> findByAppIsFinalizedFalseAndEmpNoEmpNo(Long empNo, Pageable pageable);

    Page<ApprovalDocument> findByAppIsFinalizedTrueAndEmpNoEmpNo(Long empNo, Pageable pageable);

    @Query("SELECT d FROM ApprovalDocument d WHERE d.appIsFinalized = false AND d.empNo.empNo = :empNo AND EXISTS (" +
            "SELECT p FROM AppProcessing p WHERE p.appDocNo = d AND p.appStatus = com.example.project.entity.constant.AppStatus.PENDING)")
    Page<ApprovalDocument> findProcessingDocsByEmpNo(@Param("empNo") Long empNo, Pageable pageable);

    // 총 개수 카운트용
    int countByAppIsFinalizedTrueAndEmpNo(Employee emp);

}
