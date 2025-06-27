package com.example.project.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    private final long tokenValidTime = 1000L * 60 * 60; // 1시간
    private final long refreshTokenValidTime = 1000L * 60 * 60 * 24 * 7; // 7일

    @PostConstruct
    protected void init() {
        this.secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // 토큰 생성
    public String createToken(Authentication authentication) {
        String username = authentication.getName();

        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);

        Date now = new Date();
        Date expiry = new Date(now.getTime() + tokenValidTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, Base64.getDecoder().decode(secretKey)) // 바이트 변환도 같이
                .compact();
    }

    // Refresh 토큰 생성 (7일짜리)
    public String createRefreshToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + refreshTokenValidTime);

        Claims claims = Jwts.claims().setSubject(username); // ✅ claims 객체 만들어야 함

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.HS256, Base64.getDecoder().decode(secretKey)) // 바이트 변환도 같이
                .compact();
    }

    // 인증 객체 추출 (roles 직접 추출)
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(Base64.getDecoder().decode(secretKey))
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();

        ObjectMapper mapper = new ObjectMapper();
        List<String> roles = mapper.convertValue(
                claims.get("roles"),
                new TypeReference<List<String>>() {
                });

        if (roles == null || roles.isEmpty()) {
            log.info("❌ JWT 내 roles가 비어 있음");
            return null;
        }
   
        // 여기서 ROLE_ 붙이기
        List<GrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new) //  그냥 그대로 넣기
                .collect(Collectors.toList());

        CustomUserDetails userDetails = new CustomUserDetails(username, authorities);
        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }

    // 사용자명 추출
    public String getUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 요청에서 헤더에 담긴 토큰 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        return (bearerToken != null && bearerToken.startsWith("Bearer "))
                ? bearerToken.substring(7)
                : null;
    }

    // 유효성 검사
    public boolean validateToken(String token) {
        System.out.println("🔍 토큰 유효성 검사 시작");
        System.out.println("📦 받은 토큰: " + token);

        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
