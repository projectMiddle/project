package com.example.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {

    @NotBlank
    private String loginType; // "member" or "employee"

    private String email; // 회원 로그인용

    private String empNo; // 사원 로그인용

    @NotBlank
    private String password;
}
