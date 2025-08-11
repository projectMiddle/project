package com.example.project.repository.mall;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.mall.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
