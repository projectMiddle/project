package com.example.project.repository.mall;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Employee;
import com.example.project.entity.mall.CartItem;
import com.example.project.entity.mall.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByEmployeeAndProduct(Employee employee, Product product);

    List<CartItem> findByEmployee_EmpNo(Long empNo);

}
