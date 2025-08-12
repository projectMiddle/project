package com.example.project.repository;

import java.time.LocalDateTime;
import java.util.stream.IntStream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.project.entity.Department;
import com.example.project.entity.Employee;
import com.example.project.entity.board.FreeBoard;
import com.example.project.repository.board.FreeBoardRepository;

import lombok.RequiredArgsConstructor;

@SpringBootTest
@RequiredArgsConstructor
public class FreeboardRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private FreeBoardRepository freeBoardRepository;

    // @Test
    // public void insertTest() {
    // Employee emp = employeeRepository.findById(1006L)
    // .orElseThrow(() -> new RuntimeException("해당 사원이 없습니다"));
    // Department dept = departmentRepository.findById(201L)
    // .orElseThrow(() -> new RuntimeException("해당 부서가 없습니다"));

    // IntStream.rangeClosed(1, 50).forEach(i -> {
    // FreeBoard freeBoard = FreeBoard.builder()
    // .empNo(emp)
    // .deptNo(dept)
    // .boardTitle("Test" + i)
    // .boardContent("Test" + i)
    // .boardRegDate(LocalDateTime.now())
    // .build();

    // freeBoardRepository.save(freeBoard);
    // });
    // }
}
