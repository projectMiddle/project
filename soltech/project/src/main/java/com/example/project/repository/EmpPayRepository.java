package com.example.project.repository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.project.entity.EmpPay;

public interface EmpPayRepository extends JpaRepository<EmpPay, Long> {

    // (사번 PK) + 해당 월
    Optional<EmpPay> findByEmpNoEmpNoAndPayMonth(Long empNo, YearMonth payMonth);

    // (사번 PK) + 연도 전체 (1~12월)
    List<EmpPay> findByEmpNoEmpNoAndPayMonthBetween(Long empNo, YearMonth start, YearMonth end);

    List<EmpPay> findByPayMonth(YearMonth payMonth);

    // @Query("SELECT p FROM EmpPay p WHERE p.empNo.empNo = :empNo AND
    // FUNCTION('TO_CHAR', p.payMonth, 'YYYY') = :yearStr")
    // List<EmpPay> findByEmpNoAndYear(@Param("empNo") Long empNo, @Param("yearStr")
    // String yearStr);
}
