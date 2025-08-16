package com.example.project.repository.approval.impl;

import java.util.Map;

public interface ApprovalCountRepository {
    Map<String, Long> countApprovalStatusByEmpNo(Long empNo);
}
