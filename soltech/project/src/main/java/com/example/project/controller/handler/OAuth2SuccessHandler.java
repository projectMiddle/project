package com.example.project.controller.handler;

import java.io.IOException;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.project.jwt.JwtTokenProvider;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@RequiredArgsConstructor
@Log4j2
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        log.info("✅ 구글 로그인 성공: {}", authentication.getName());

        // 토큰 발급
        String accessToken = jwtTokenProvider.createToken(authentication);
        String refreshToken = jwtTokenProvider.createRefreshToken(authentication.getName());

        // 프론트로 리다이렉트할 URI
        String redirectUrl = "http://localhost:5173/oauth2/success"
                + "?accessToken=" + accessToken
                + "&refreshToken=" + refreshToken;

        log.info("🔐 액세스토큰 발급 및 리다이렉트: {}", redirectUrl);

        // 리다이렉트
        response.sendRedirect(redirectUrl);
    }
}
