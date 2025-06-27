package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
}
