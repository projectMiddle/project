package com.example.project.repository.approval;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.Employee;
import com.example.project.entity.approval.AppProcessing;
import com.example.project.entity.approval.ApprovalDocument;
import com.example.project.entity.constant.AppRoleType;
import com.example.project.entity.constant.AppStatus;

public interface AppProcessingRepository extends JpaRepository<AppProcessing, Long> {

        List<AppProcessing> findByAppDocNo(ApprovalDocument appDoc);

        // 문서에서 결재자만 or 참조자만 가져옴 => 결재자 목록, 참조자 리스트 구분해서 보여줄 때
        List<AppProcessing> findByAppDocNoAndAppRoleType(ApprovalDocument doc, AppRoleType type);

        // 결재자만 appOrder 순서대로 정렬 => 결재라인 보여줄 때 (1단계 → 2단계 → 3단계)
        List<AppProcessing> findByAppDocNoAndAppRoleTypeOrderByAppOrderAsc(ApprovalDocument doc, AppRoleType type);

        // 특정 사원이 이 문서에 연관되어 있는지 조회 => 결재자 본인 확인, 권한 검사
        List<AppProcessing> findByAppDocNoAndEmpNo(ApprovalDocument doc, Employee emp);

        void deleteByAppDocNo(ApprovalDocument doc);

        // 수신결재함
        @Query("SELECT ap FROM AppProcessing ap WHERE ap.empNo.empNo = :empNo AND ap.appRoleType = :roleType AND ap.appStatus = :status")
        Page<AppProcessing> findInboxByApprover(@Param("empNo") Long empNo, @Param("roleType") AppRoleType roleType,
                        @Param("status") AppStatus status, Pageable pageable);

        // 결재내역
        @Query("SELECT ap FROM AppProcessing ap WHERE ap.empNo.empNo = :empNo AND ap.appRoleType = :roleType AND ap.appStatus IN :statuses")
        Page<AppProcessing> findApprovalHistoryByApprover(@Param("empNo") Long empNo,
                        @Param("roleType") AppRoleType roleType, @Param("statuses") List<AppStatus> statuses,
                        Pageable pageable);

        // 수신참조함
        @Query("SELECT ap FROM AppProcessing ap WHERE ap.empNo.empNo = :empNo AND ap.appRoleType = :roleType")
        Page<AppProcessing> findReferencesByEmpNo(@Param("empNo") Long empNo, @Param("roleType") AppRoleType roleType,
                        Pageable pageable);

        // 총 개수 카운트용
        int countByEmpNoAndAppRoleTypeAndAppStatus(
                        Employee emp,
                        AppRoleType roleType,
                        AppStatus status);

        int countByEmpNoAndAppRoleTypeAndAppStatusIn(
                        Employee emp,
                        AppRoleType roleType,
                        List<AppStatus> statuses);

        int countByEmpNoAndAppRoleType(
                        Employee emp,
                        AppRoleType roleType);

}
