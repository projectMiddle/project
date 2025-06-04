package com.example.project.repository.approval;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project.entity.approval.ApprovalDocument;

public interface ApprovalDocumentRepository extends JpaRepository<ApprovalDocument, Long> {
    
}
