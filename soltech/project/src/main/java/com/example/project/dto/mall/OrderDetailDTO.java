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
public class OrderDetailDTO {
    private Long orderId;
    private String name;
    private String phone;
    private String address;
    private Long totalPrice;
    private LocalDateTime date;
    private List<OrderItemDTO> items;

}
