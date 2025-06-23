package com.example.project.repository.approval;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.approval.AppFile;
import com.example.project.entity.approval.ApprovalDocument;

public interface AppFileRepository extends JpaRepository<AppFile, Long> {

    // 결재 문서 기준으로 첨부파일 전체 조회
    List<AppFile> findByAppDocNo(ApprovalDocument doc);

    // 삭제 전용 쿼리
    void deleteByAppFileUuidAndAppFileNameAndAppFilePath(String uuid, String appFileName, String appFilePath);

}
