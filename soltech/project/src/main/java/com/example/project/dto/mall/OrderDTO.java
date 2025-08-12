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
public class OrderDTO {
    private Long orderId;
    private LocalDateTime orderDate; // 프런트에서 when 표시
    private Long totalPrice;
    private Integer itemCount; // 없으면 프런트에서 items.size()로 대체 가능
    private String status; // "COMPLETED" 등
}