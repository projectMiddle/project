package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    Optional<Member> findBymEmail(String mEmail);

    boolean existsBymEmail(String mEmail);

}
