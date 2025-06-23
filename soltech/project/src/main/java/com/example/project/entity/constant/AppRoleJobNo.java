package com.example.project.entity.constant;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum AppRoleJobNo {
    AD_MGR,  // 매니저급 (본부장)
    ASSI_MGR,  // 매니저급 (부장)
    AD_AM,   // 부매니저급 (과장)
    AM;      // 부매니저급 (대리)

    @JsonCreator
    public static AppRoleJobNo from(String value) {
        return AppRoleJobNo.valueOf(value.toUpperCase());
    }
}
