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
public class ProductDTO {
    private Long id; // ✅ 숫자 PK (내부 참조용)
    private String productId; // ✅ SKU(문자열) - 화면/라우팅/이미지용
    private String name;
    private String imageUrl;
    private Long price;
}