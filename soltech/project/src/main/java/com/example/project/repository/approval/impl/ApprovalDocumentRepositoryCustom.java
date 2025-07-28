package com.example.project.repository.approval.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.project.entity.approval.ApprovalDocument;

public interface ApprovalDocumentRepositoryCustom {
    Page<ApprovalDocument> findDocsWithUrgentSorted(Long empNo, String status, Pageable pageable);

    Page<ApprovalDocument> findDocsForReceiveSorted(List<Long> appDocNos, Pageable pageable);
}
