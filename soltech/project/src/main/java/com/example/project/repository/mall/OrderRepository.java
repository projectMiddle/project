package com.example.project.repository.mall;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mall.Order;

import com.example.project.entity.Employee;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmployee(Employee employee);

    List<Order> findByEmployee_EmpNoOrderByOrderDateDesc(Long empNo);

}
