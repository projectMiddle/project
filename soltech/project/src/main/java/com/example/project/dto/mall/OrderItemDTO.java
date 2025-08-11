package com.example.project.dto.mall;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class OrderItemDTO {
    private Long itemId;
    private Long productId; // 숫자 PK
    private String sku; // 문자열 코드
    private String productName;
    private String imageUrl;
    private Long quantity;
    private Long discountRate;
    private Long pricePerItem;
    private Long totalPrice;
}