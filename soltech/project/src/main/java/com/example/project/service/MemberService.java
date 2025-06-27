package com.example.project.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.project.dto.MemberDTO;
import com.example.project.entity.Member;
import com.example.project.entity.constant.MemberRole;
import com.example.project.entity.constant.Provider;
import com.example.project.repository.MemberRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    // @Autowired
    private final MemberRepository memberRepository;
    // @Autowired
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        log.info("✅ passwordEncoder 빈 확인: {}", passwordEncoder.getClass().getName());
    }

    // 회원가입 (로컬)
    public Member registerLocal(MemberDTO dto) {
        if (memberRepository.existsBymEmail(dto.getMEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 가입된 이메일입니다.");
        }
        validateEmail(dto.getMEmail());

        Member member = Member.builder()
                .mEmail(dto.getMEmail())
                .mPassword(passwordEncoder.encode(dto.getMPassword()))
                .mName(dto.getMName())
                .mMobile(dto.getMMobile())
                .mBirthday(dto.getMBirthday())
                .mAddress(dto.getMAddress())
                .mGender(dto.getMGender())
                .mMemberRole(MemberRole.MEMBER)
                .createdDateTime(LocalDateTime.now())
                .build();

        return memberRepository.save(member);

    }

    // 구글 로그인 (OAuth2 가입 or 첫 로그인 시 자동 가입)
    public Member registerOAuth2(OAuth2User oAuth) {
        String email = oAuth.<String>getAttribute("email");
        return memberRepository.findBymEmail(email)
                .orElseGet(() -> memberRepository.save(
                        Member.builder()
                                .mEmail(email)
                                .provider(Provider.GOOGLE)
                                .providerId(oAuth.getName()) // sub
                                .mMemberRole(MemberRole.MEMBER)
                                .createdDateTime(LocalDateTime.now())
                                .build()));
    }

    // 이메일 중복 여부
    private void validateEmail(String mEmail) {
        Optional<Member> member = memberRepository.findBymEmail(mEmail);
        if (member.isPresent()) {
            throw new IllegalStateException("이미 가입된 회원입니다.");
        }

    }

    // 로그인 처리
    @Override
    public UserDetails loadUserByUsername(String mEmail) throws UsernameNotFoundException {

        Member member = memberRepository.findBymEmail(mEmail)
                .orElseThrow(() -> new UsernameNotFoundException("이메일 확인"));

        // MemberDTO memberDTO = MemberDTO.builder()
        // .mEmail(member.getMEmail())
        // .mPassword(member.getMPassword())
        // .mMemberRole(member.getMMemberRole())
        // .build();

        // return memberDTO;

        return MemberDTO.builder()
                .mEmail(member.getMEmail())
                .mPassword(member.getMPassword())
                .mMemberRole(member.getMMemberRole())
                .build();

    }

}
