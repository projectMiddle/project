package com.example.project.repository.mall;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project.entity.mall.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 예전: Optional<Product> findByProductId(String productId);
    // 변경:
    Optional<Product> findBySku(String sku); // ✅ SKU(문자)
}