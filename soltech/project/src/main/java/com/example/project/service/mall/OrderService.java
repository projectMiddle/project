package com.example.project.service.mall;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.project.dto.mall.CartItemDTO;
import com.example.project.dto.mall.OrderDTO;
import com.example.project.dto.mall.OrderDetailDTO;
import com.example.project.dto.mall.OrderItemDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.JobRank;
import com.example.project.entity.constant.JobNo;
import com.example.project.entity.mall.CartItem;
import com.example.project.entity.mall.Order;
import com.example.project.entity.mall.OrderItem;
import com.example.project.entity.mall.Product;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.mall.CartItemRepository;
import com.example.project.repository.mall.OrderItemRepository;
import com.example.project.repository.mall.OrderRepository;
import com.example.project.repository.mall.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;

    // 할인
    private double getDiscountRate(JobNo jobNo) {

        switch (jobNo) {
            case AD_MGR:
                return 0.30;
            case ASSI_MGR:
                return 0.25;
            case AD_AM:
                return 0.2;
            case AM:
                return 0.15;
            case JM:
                return 0.1;
            case NM:
                return 0.05;

            default:
                return 0.05;
        }

    }

    // 주문 생성
    @Transactional
    public void createOrder(Long empNo) {
        // 1) 사원 & 장바구니 확인
        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow(() -> new IllegalArgumentException("사원 정보를 찾을 수 없습니다: " + empNo));

        List<CartItem> cartItems = cartItemRepository.findByEmployee_EmpNo(empNo);
        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("선택한 장바구니 항목이 없습니다.");
        }

        // 2) 배송정보 기본값(폴백)
        String deliveryName = Optional.ofNullable(employee.getEName())
                .filter(s -> !s.isBlank())
                .orElse("수령인");
        String deliveryPhone = Optional.ofNullable(employee.getEMobile())
                .filter(s -> !s.isBlank())
                .orElse("01000000000");
        String deliveryAddress = Optional.ofNullable(employee.getEAddress())
                .filter(s -> !s.isBlank())
                .orElse("서울특별시 종로구 종로12길 15");

        // 3) 직급 할인율
        double discountRate = getDiscountRate(employee.getJobNo().getJobNo()); // 0.05 ~ 0.30

        // 4) 주문 엔티티 생성
        Order order = Order.builder()
                .employee(employee)
                .deliveryName(deliveryName)
                .deliveryPhone(deliveryPhone)
                .deliveryAddress(deliveryAddress)
                .totalPrice(0L) // 나중에 계산 후 세팅
                .build();

        // 5) 아이템 생성 + 총액 계산
        long totalPrice = 0L;
        for (CartItem c : cartItems) {
            long originPrice = c.getProduct().getPrice(); // 정가
            long discountedUnit = Math.round(originPrice * (1 - discountRate)); // 할인 단가
            long itemTotal = discountedUnit * c.getQuantity();
            totalPrice += itemTotal;

            OrderItem oi = OrderItem.builder()
                    .product(c.getProduct())
                    .quantity(c.getQuantity())
                    .pricePerItem(originPrice) // 정가 기록
                    .discountRate((long) Math.round(discountRate * 100)) // 예: 15%
                    .build();

            order.addItem(oi); // 양방향 세팅 + 리스트 추가
        }

        // 6) 총액 확정, 저장, 장바구니 비우기
        order.changeTotalPrice(totalPrice);
        orderRepository.save(order); // cascade로 OrderItem도 함께 저장
        cartItemRepository.deleteAll(cartItems);

        log.info("createOrder empNo={}, items={}, totalPrice={}", empNo, cartItems.size(), totalPrice);
    }

    @Transactional(readOnly = true)
    public List<OrderDTO> getOrderList(Long empNo) {
        return orderRepository.findByEmployee_EmpNoOrderByOrderDateDesc(empNo)
                .stream()
                .map(o -> {
                    // 아이템 합계 계산 (지연로딩 대비 EntityGraph 권장)
                    long itemSum = Optional.ofNullable(o.getItems()).orElse(List.of())
                            .stream()
                            .mapToLong(oi -> {
                                long discounted = Math
                                        .round(oi.getPricePerItem() * (100 - oi.getDiscountRate()) / 100.0);
                                return discounted * oi.getQuantity();
                            })
                            .sum();
                    long total = (o.getTotalPrice() != null && o.getTotalPrice() > 0) ? o.getTotalPrice() : itemSum;

                    return OrderDTO.builder()
                            .orderId(o.getOrderId())
                            .orderDate(o.getOrderDate())
                            .totalPrice(total) // ✅ 보정
                            .itemCount(Optional.ofNullable(o.getItems()).orElse(List.of())
                                    .stream().mapToInt(oi -> oi.getQuantity().intValue()).sum())
                            .status("COMPLETED")
                            .build();
                })
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderDetailDTO getOrderDetail(Long empNo, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();

        List<OrderItemDTO> itemDTOs = Optional.ofNullable(order.getItems())
                .orElse(Collections.emptyList())
                .stream()
                .map(it -> {
                    long discountedUnit = Math.round(it.getPricePerItem() * (100 - it.getDiscountRate()) / 100.0);
                    return OrderItemDTO.builder()
                            .itemId(it.getItemId())
                            .productId(it.getProduct().getId()) // 숫자 PK
                            .sku(it.getProduct().getSku()) // 문자열 SKU (있으면)
                            .productName(it.getProduct().getName())
                            .imageUrl(it.getProduct().getImageUrl())
                            .quantity(it.getQuantity())
                            .discountRate(it.getDiscountRate())
                            .pricePerItem(it.getPricePerItem())
                            .totalPrice(discountedUnit * it.getQuantity())
                            .build();
                })
                .toList();

        long computed = itemDTOs.stream().mapToLong(OrderItemDTO::getTotalPrice).sum();
        long headerTotal = (order.getTotalPrice() != null && order.getTotalPrice() > 0) ? order.getTotalPrice()
                : computed;

        String address = Optional.ofNullable(order.getDeliveryAddress())
                .filter(s -> !s.isBlank())
                .orElse("서울특별시 종로구 종로12길 15"); // 고정 기본값

        return OrderDetailDTO.builder()
                .orderId(order.getOrderId())
                .name(order.getDeliveryName())
                .phone(order.getDeliveryPhone())
                .address(address) // ✅ 보정 적용
                .totalPrice(headerTotal) // ✅ 보정 적용
                .date(order.getOrderDate())
                .items(itemDTOs)
                .build();
    }

    // 주문 취소 / 삭제 (물리)
    public void cancelOrder(Long orderId) {
        orderRepository.deleteById(orderId);

    }

    private static Long toLongSafe(Object id) {
        if (id == null)
            return null;
        if (id instanceof Long l)
            return l;
        if (id instanceof Integer i)
            return i.longValue();
        if (id instanceof java.math.BigInteger bi)
            return bi.longValue();
        if (id instanceof java.math.BigDecimal bd)
            return bd.longValue();
        if (id instanceof String s) {
            String t = s.trim();
            if (t.isEmpty())
                return null;
            // 숫자 문자열일 때만 변환
            if (!t.matches("^-?\\d+$")) {
                // 숫자가 아니면 DTO 타입을 String으로 두는 게 맞음
                throw new IllegalStateException("productId is non-numeric string: " + t);
            }
            return Long.parseLong(t);
        }
        throw new IllegalStateException("Unsupported productId type: " + id.getClass().getName());
    }

}
