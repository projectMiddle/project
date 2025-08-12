package com.example.project.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.mall.CartItemDTO;
import com.example.project.dto.mall.OrderDetailDTO;
import com.example.project.dto.mall.OrderItemDTO;
import com.example.project.dto.mall.ProductDTO;
import com.example.project.repository.mall.ProductRepository;
import com.example.project.service.mall.CartService;
import com.example.project.service.mall.OrderService;
import com.example.project.service.mall.ProductService;
import com.example.project.dto.mall.OrderDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequestMapping("/intrasoltech/mall")
@RequiredArgsConstructor
public class MallController {

    private final ProductService productService;
    private final OrderService orderService;
    private final CartService cartService;

    // 상품 목록 조회
    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getProductList() {
        List<ProductDTO> productList = productService.getProductList();

        return ResponseEntity.ok(productList);
    }

    // 상품 상세 조회
    @GetMapping("/products/{productId}")
    public ResponseEntity<ProductDTO> getProductDetail(@PathVariable String productId) {
        ProductDTO dto = productService.getProductDetail(productId);

        return ResponseEntity.ok(dto);
    }

    // 주문 생성
    @PostMapping("/orders/{empNo}")
    public ResponseEntity<Void> createOrder(@PathVariable Long empNo) {
        orderService.createOrder(empNo);
        return ResponseEntity.ok().build();
    }

    // 주문 목록 조회
    @GetMapping("/orders/list/{empNo}")
    public ResponseEntity<List<OrderDTO>> getOrderList(@PathVariable Long empNo) {
        List<OrderDTO> orderList = orderService.getOrderList(empNo); // 서비스가 배열 반환
        return ResponseEntity.ok(orderList);
    }

    // 주문 상세 조회
    @GetMapping("/orders/{empNo}/{orderId}")
    public ResponseEntity<OrderDetailDTO> getOrderDetail(@PathVariable Long empNo, @PathVariable Long orderId) {
        OrderDetailDTO dto = orderService.getOrderDetail(empNo, orderId);
        return ResponseEntity.ok(dto);
    }

    // 주문 취소
    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok().build();
    }

    // 장바구니 생성
    @PostMapping("/cart")
    public ResponseEntity<CartItemDTO> addCart(@RequestParam String productId, @RequestParam Long empNo,
            @RequestParam Long quantity) {
        CartItemDTO dto = cartService.addCart(productId, empNo, quantity);

        return ResponseEntity.ok(dto);
    }

    // 장바구니 조회
    @GetMapping("/cart/{empNo}")
    public ResponseEntity<List<CartItemDTO>> getCartList(@PathVariable Long empNo) {
        List<CartItemDTO> cartList = cartService.getCartList(empNo);
        return ResponseEntity.ok(cartList);

    }

    // 장바구니 항목 삭제
    @DeleteMapping("/cart/{empNo}")
    public ResponseEntity<Void> deleteCart(@PathVariable Long empNo, @RequestParam List<Long> cartItemId) {
        cartService.deleteCartItem(cartItemId, empNo);
        return ResponseEntity.ok().build();
    }

    // 장바구니 비우기
    @DeleteMapping("/cart/clear/{empNo}")
    public ResponseEntity<Void> clearCart(@PathVariable Long empNo) {
        cartService.clearCartItem(empNo);
        return ResponseEntity.ok().build();
    }

}
