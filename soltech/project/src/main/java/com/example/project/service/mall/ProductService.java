package com.example.project.service.mall;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.project.dto.mall.ProductDTO;
import com.example.project.entity.mall.Product;
import com.example.project.repository.mall.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class ProductService {

        private final ProductRepository productRepository;

        /** 상품 목록 */
        public List<ProductDTO> getProductList() {
                return productRepository.findAll().stream()
                                .map(p -> ProductDTO.builder()
                                                .id(p.getId()) // ✅ 숫자 PK
                                                .productId(p.getSku()) // ✅ 문자열 SKU (예: "V32347632747")
                                                .name(p.getName())
                                                .imageUrl(p.getImageUrl())
                                                .price(p.getPrice())
                                                .build())
                                .collect(Collectors.toList());
        }

        /** 상품 상세 (PathVariable은 SKU를 받음) */
        public ProductDTO getProductDetail(String productId) { // productId = sku
                Product p = productRepository.findBySku(productId) // ✅ 레포 메서드 변경 필요
                                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. sku=" + productId));

                return ProductDTO.builder()
                                .id(p.getId()) // 숫자 PK
                                .productId(p.getSku()) // SKU
                                .name(p.getName())
                                .imageUrl(p.getImageUrl())
                                .price(p.getPrice())
                                .build();
        }
}