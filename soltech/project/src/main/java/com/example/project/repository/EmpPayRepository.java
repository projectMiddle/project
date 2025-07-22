package com.example.project.repository;

import java.time.YearMonth;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.EmpPay;

public interface EmpPayRepository extends JpaRepository<EmpPay, Long> {
    List<EmpPay> findByPayMonth(YearMonth payMonth);

    @Query("SELECT p FROM EmpPay p WHERE p.empNo.empNo = :empNo AND FUNCTION('TO_CHAR', p.payMonth, 'YYYY') = :yearStr")
    List<EmpPay> findByEmpNoAndYear(@Param("empNo") Long empNo, @Param("yearStr") String yearStr);
}
