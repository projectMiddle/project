package com.example.project.service.mall;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // ✅ 스프링 트랜잭션

import com.example.project.dto.mall.CartItemDTO;
import com.example.project.entity.Employee;
import com.example.project.entity.mall.CartItem;
import com.example.project.entity.mall.Product;
import com.example.project.repository.EmployeeRepository;
import com.example.project.repository.mall.CartItemRepository;
import com.example.project.repository.mall.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;

    /** 장바구니 담기 (productId 파라미터는 'SKU'입니다) */
    @Transactional
    public CartItemDTO addCart(String productId, Long empNo, Long quantity) {

        // ✅ SKU로 조회하도록 변경
        Product product = productRepository.findBySku(productId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품(SKU)을 찾을 수 없습니다: " + productId));

        Employee employee = employeeRepository.findById(empNo)
                .orElseThrow(() -> new IllegalArgumentException("사원 정보를 찾을 수 없습니다: " + empNo));

        Optional<CartItem> optionalItem = cartItemRepository.findByEmployeeAndProduct(employee, product);

        CartItem cartItem;
        if (optionalItem.isPresent()) {
            cartItem = optionalItem.get();
            cartItem.changeQuantity(quantity); // 수량 누적(메서드 내부 구현 점검)
        } else {
            cartItem = CartItem.builder()
                    .employee(employee)
                    .product(product)
                    .quantity(quantity)
                    .addedAt(LocalDateTime.now())
                    .build();
        }
        cartItemRepository.save(cartItem);

        return CartItemDTO.builder()
                .cartItemId(cartItem.getCartItemId())
                .empNo(cartItem.getEmployee().getEmpNo())
                .productId(cartItem.getProduct().getSku()) // ✅ 문자열 SKU로 내려줌
                .productName(cartItem.getProduct().getName())
                .imageUrl(cartItem.getProduct().getImageUrl())
                .price(cartItem.getProduct().getPrice())
                .quantity(cartItem.getQuantity())
                .totalPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity())
                .addedAt(cartItem.getAddedAt())
                .build();
    }

    /** 장바구니 목록 조회 */
    @Transactional(readOnly = true)
    public List<CartItemDTO> getCartList(Long empNo) {
        List<CartItem> items = cartItemRepository.findByEmployee_EmpNo(empNo);

        List<CartItemDTO> dtoList = new ArrayList<>();
        for (CartItem item : items) {
            CartItemDTO dto = CartItemDTO.builder()
                    .cartItemId(item.getCartItemId())
                    .empNo(item.getEmployee().getEmpNo())
                    .productId(item.getProduct().getSku()) // ✅ SKU
                    .productName(item.getProduct().getName())
                    .imageUrl(item.getProduct().getImageUrl())
                    .price(item.getProduct().getPrice())
                    .quantity(item.getQuantity())
                    .totalPrice(item.getQuantity() * item.getProduct().getPrice())
                    .addedAt(item.getAddedAt())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    /** 장바구니 항목 삭제 */
    @Transactional
    public void deleteCartItem(List<Long> cartItemIds, Long empNo) {
        for (Long cartItemId : cartItemIds) {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new IllegalArgumentException("장바구니 항목을 찾을 수 없습니다: " + cartItemId));
            if (!cartItem.getEmployee().getEmpNo().equals(empNo)) {
                throw new SecurityException("본인의 장바구니 항목만 삭제할 수 있습니다.");
            }
            cartItemRepository.deleteById(cartItemId);
        }
    }

    /** 장바구니 전체 비우기 */
    @Transactional
    public void clearCartItem(Long empNo) {
        List<CartItem> cartItems = cartItemRepository.findByEmployee_EmpNo(empNo);
        // 일괄 삭제가 가능하면 아래 한 줄로 대체 가능: cartItemRepository.deleteAll(cartItems);
        for (CartItem cartItem : cartItems) {
            cartItemRepository.deleteById(cartItem.getCartItemId());
        }
    }
}
