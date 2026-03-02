package com.market.marketplace.controller;

import com.market.marketplace.dto.OrderRequest;
import com.market.marketplace.dto.OrderResponse;
import com.market.marketplace.model.Order;
import com.market.marketplace.model.User;
import com.market.marketplace.service.CurrentUserService;
import com.market.marketplace.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final CurrentUserService currentUserService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@RequestBody OrderRequest request) {
        User user = currentUserService.getRequiredUser();

        Order order = orderService.checkout(user, request);

        OrderResponse response = OrderResponse.from(order);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders() {
        User user = currentUserService.getRequiredUser();
        List<OrderResponse> orders = orderService.getOrdersByUser(user).stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(orders);
    }
}
