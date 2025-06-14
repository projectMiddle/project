package com.example.project.service;

import org.springframework.stereotype.Service;

import com.example.project.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class MemberService {
    
    private final MemberRepository memberRepository;

}
