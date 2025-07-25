package com.example.project.service.approval;

import java.util.Map;

public interface ApprovalCountService {

        Map<String, Long> getApprovalCounts(Long empNo);

}
