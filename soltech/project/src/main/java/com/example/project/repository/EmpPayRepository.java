package com.example.project.repository;

import java.time.YearMonth;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.EmpPay;

public interface EmpPayRepository extends JpaRepository<EmpPay, Long> {
    List<EmpPay> findByPayMonth(YearMonth payMonth);
}
