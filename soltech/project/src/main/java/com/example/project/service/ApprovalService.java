package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.repository.approval.AppFileRepository;
import com.example.project.repository.approval.AppProcessingRepository;
import com.example.project.repository.approval.ApprovalDocumentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class ApprovalService {
    
    private final AppFileRepository appFileRepository;
    private final AppProcessingRepository appProcessingRepository;
    private final ApprovalDocumentRepository approvalDocumentRepository;

}
