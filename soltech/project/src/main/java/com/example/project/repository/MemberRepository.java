package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
    
}
