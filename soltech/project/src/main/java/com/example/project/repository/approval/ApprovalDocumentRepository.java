package com.example.project.repository.approval;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.Employee;
import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.repository.approval.impl.ApprovalCountRepository;
import com.example.project.repository.approval.impl.ApprovalDocumentRepositoryCustom;

public interface ApprovalDocumentRepository
                extends JpaRepository<ApprovalDocument, Long>, ApprovalCountRepository,
                ApprovalDocumentRepositoryCustom {

        // 결재 완료된 문서
        Page<ApprovalDocument> findByAppIsFinalizedTrue(Pageable pageable);

        // 결재 상신 상태 문서 (아직 결재 시작도 안됨)
        Page<ApprovalDocument> findByAppIsFinalizedFalse(Pageable pageable);

        // 결재상신
        @Query("SELECT d FROM ApprovalDocument d " +
                        "WHERE d.empNo.empNo = :empNo " +
                        "AND d.appIsFinalized = false " +
                        "AND NOT EXISTS (" +
                        "  SELECT p FROM AppProcessing p " +
                        "  WHERE p.appDocNo = d " +
                        "  AND p.appStatus = com.example.project.entity.constant.AppStatus.REJECTED)")
        Page<ApprovalDocument> findSubmittedDocsByEmpNoAndAppStatusNot(
                        @Param("empNo") Long empNo,
                        Pageable pageable);

        // 결재 진행 중인 문서 (실제용)
        @Query("SELECT d FROM ApprovalDocument d " +
                        "WHERE d.empNo.empNo = :empNo " +
                        "AND d.appIsFinalized = false " +
                        "AND NOT EXISTS (" +
                        "  SELECT p FROM AppProcessing p " +
                        "  WHERE p.appDocNo = d " +
                        "  AND p.appStatus = com.example.project.entity.constant.AppStatus.REJECTED)")
        Page<ApprovalDocument> findProcessingDocsByEmpNoAndAppStatusNot(
                        @Param("empNo") Long empNo,
                        Pageable pageable);

        // 결재 반려
        @Query("SELECT DISTINCT d FROM ApprovalDocument d " +
                        "JOIN AppProcessing p ON p.appDocNo = d " +
                        "WHERE d.empNo.empNo = :empNo " +
                        "AND p.appStatus = com.example.project.entity.constant.AppStatus.REJECTED")
        Page<ApprovalDocument> findRejectedDocsByEmpNo(@Param("empNo") Long empNo, Pageable pageable);

        // 테스트용
        Page<ApprovalDocument> findByEmpNoEmpNo(Long empNo, Pageable pageable);

        Page<ApprovalDocument> findByAppIsFinalizedFalseAndEmpNoEmpNo(Long empNo, Pageable pageable);

        Page<ApprovalDocument> findByAppIsFinalizedTrueAndEmpNoEmpNo(Long empNo, Pageable pageable);

        @Query("SELECT d FROM ApprovalDocument d WHERE d.appIsFinalized = false AND d.empNo.empNo = :empNo AND EXISTS ("
                        +
                        "SELECT p FROM AppProcessing p WHERE p.appDocNo = d AND p.appStatus = com.example.project.entity.constant.AppStatus.PENDING)")
        Page<ApprovalDocument> findProcessingDocsByEmpNo(@Param("empNo") Long empNo, Pageable pageable);

        // 임시저장함
        @Query("SELECT d FROM ApprovalDocument d WHERE d.appIsTemporary = true AND d.empNo.empNo = :empNo")
        Page<ApprovalDocument> findTemporaryDocsByEmpNo(@Param("empNo") Long empNo, Pageable pageable);

        // 회수함
        @Query("SELECT d FROM ApprovalDocument d WHERE d.empNo.empNo = :empNo AND EXISTS (" +
                        "SELECT p FROM AppProcessing p WHERE p.appDocNo = d AND p.appStatus = com.example.project.entity.constant.AppStatus.RETRIEVED)")
        Page<ApprovalDocument> findRetrievedDocsByEmpNo(@Param("empNo") Long empNo, Pageable pageable);

        // 총 개수 카운트용
        int countByAppIsFinalizedTrueAndEmpNo(Employee emp);

        // 결재 서류 문서 번호 추출용
        @Query("SELECT MAX(a.appDocNo) FROM ApprovalDocument a")
        Long findMaxAppDocNo();

}
