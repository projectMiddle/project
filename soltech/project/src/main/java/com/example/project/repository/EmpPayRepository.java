package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.EmpPay;

public interface EmpPayRepository extends JpaRepository<EmpPay, Long> {
    
}
