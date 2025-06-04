package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
}
