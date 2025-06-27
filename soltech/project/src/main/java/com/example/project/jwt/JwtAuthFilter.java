package com.example.project.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Log4j2
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        log.info("인증객체1: {}", SecurityContextHolder.getContext().getAuthentication());

        String token = jwtTokenProvider.resolveToken(request);
        System.out.println("🧩 JWT Filter 진입");
        System.out.println("🪪 토큰: " + token);
        log.info("인증객체2: {}", SecurityContextHolder.getContext().getAuthentication());

        if (token != null && jwtTokenProvider.validateToken(token)) {
            Authentication auth = jwtTokenProvider.getAuthentication(token);
            log.info("✅ auth 객체 생성 결과: {}", auth);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        log.info("인증객체3: {}", SecurityContextHolder.getContext().getAuthentication());
        filterChain.doFilter(request, response);
    }
}