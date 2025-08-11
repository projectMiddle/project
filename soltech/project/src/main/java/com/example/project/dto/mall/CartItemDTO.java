package com.example.project.dto.mall;

import java.time.LocalDateTime;
import java.util.List;

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
public class CartItemDTO {
    private Long cartItemId;

    private Long empNo;

    private String productId;
    private String productName;
    private String imageUrl;
    private Long price;

    private Long quantity;

    private Long totalPrice;

    private LocalDateTime addedAt;
}
