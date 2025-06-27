package com.example.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.LoginRequestDTO;
import com.example.project.dto.MemberDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.Member;
import com.example.project.jwt.JwtTokenProvider;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.MemberRepository;
import com.example.project.service.MemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class LoginController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    // JWT 로그인 API (React 연동용) - loginType에 따라 사원/회원 분기 처리
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {
        log.info("📥 받은 DTO: {}", dto);
        String loginType = dto.getLoginType();
        String password = dto.getPassword();
        String username;

        if ("employee".equalsIgnoreCase(loginType)) {
            username = dto.getEmpNo();
            if (username == null || username.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "사번이 누락되었습니다."));
            }

            Employee employee = employeeRepository.findByEmpNo(Long.parseLong(username)).orElse(null);
            if (employee == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "존재하지 않는 사원입니다."));
            }
            if (!employee.getEPassword().equals(password)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "비밀번호가 일치하지 않습니다."));
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    String.valueOf(employee.getEmpNo()),
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_EMPLOYEE")));

            String accessToken = jwtTokenProvider.createToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication.getName());

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "로그인 성공",
                    "data", Map.of(
                            "accessToken", accessToken,
                            "refreshToken", refreshToken,
                            "username", authentication.getName(),
                            "empNo", employee.getEmpNo(),
                            "deptNo", employee.getDeptNo().getDeptNo(),
                            "jobNo", employee.getJobNo().getJobNo(),
                            "eName", employee.getEName(),
                            "eEmail", employee.getEEmail())));

        } else if ("member".equalsIgnoreCase(loginType)) {
            username = dto.getEmail();
            if (username == null || username.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "이메일이 누락되었습니다."));
            }

            // 멤버 조회
            Member member = memberRepository.findBymEmail(username).orElse(null);
            if (member == null) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "존재하지 않는 회원입니다."));
            }
            // ✅ 암호화된 비밀번호 비교
            if (!passwordEncoder.matches(password, member.getMPassword())) {
                return ResponseEntity.badRequest().body(Map.of(
                        "success", false,
                        "message", "비밀번호가 일치하지 않습니다."));
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    member.getMEmail(),
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_MEMBER")));

            String accessToken = jwtTokenProvider.createToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication.getName());

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "로그인 성공",
                    "data", Map.of(
                            "accessToken", accessToken,
                            "refreshToken", refreshToken,
                            "username", authentication.getName())));

        } else {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "loginType은 'employee' 또는 'member'만 가능합니다."));
        }
    }

    // RefreshToken으로 AccessToken 재발급
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body("만료되었거나 유효하지 않은 RefreshToken입니다.");
        }

        String username = jwtTokenProvider.getUsername(refreshToken);
        String newAccessToken = jwtTokenProvider.createToken(
                new UsernamePasswordAuthenticationToken(username, null, null));

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // 서버에서는 별도 처리 없이 프론트에서 토큰 삭제하도록 안내
        return ResponseEntity.ok("로그아웃 성공 – 클라이언트에서 토큰 제거 요망");
    }

    // 직원, 일반 회원 선택 페이지
    @GetMapping("/login/select")
    public ResponseEntity<?> getLoginSelect() {
        log.info("로그인 폼 요청");
        return ResponseEntity.ok("로그인 선택 페이지");
    }

    // 직원 로그인
    @GetMapping("/employee/login")
    public ResponseEntity<?> getLoginPage() {
        return ResponseEntity.ok("직원 로그인 페이지");
    }

    // 일반 회원 로그인 화면
    @GetMapping("/member/login")
    public ResponseEntity<?> getMemberLogin() {
        log.info("일반회원 로그인 폼 요청");
        return ResponseEntity.ok("일반 회원 페이지");
    }

    // 일반 회원 회원가입 요청
    @GetMapping("/member/signup")
    public ResponseEntity<?> getSignUp(Model model) {
        log.info("일반회원 회원가입 폼 요청");
        model.addAttribute("member", new MemberDTO());
        return ResponseEntity.ok(new MemberDTO());
    }

    // 일반회원 회원가입
    @PostMapping("/member/signup")
    public ResponseEntity<?> postSignUp(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult) {
        log.info("💾 회원가입 시도 데이터: {}", memberDTO);
        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder("회원가입 실패: ");
            bindingResult.getFieldErrors().forEach(error -> {
                sb.append("[")
                        .append(error.getField())
                        .append(": ")
                        .append(error.getDefaultMessage())
                        .append("] ");
            });
            log.warn("❌ 유효성 검사 실패: {}", bindingResult.getAllErrors());
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", sb.toString()));
        }
        memberService.registerLocal(memberDTO);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "회원가입 성공"));
    }

    // react 에서 회원가입 시 실시간 중복여부 확인용 api
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
        boolean exists = memberRepository.existsBymEmail(email);
        Map<String, Object> response = new HashMap<>();
        response.put("exists", exists);
        response.put("message", exists ? "이미 존재하는 이메일입니다." : "사용 가능한 이메일입니다.");
        return ResponseEntity.ok(response);
    }

    // 로그인 성공 시 직원 페이지로 이동
    @GetMapping("/intrasoltech")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<?> getDashboard() {
        return ResponseEntity.ok("직원 대시보드 페이지");
    }

}
