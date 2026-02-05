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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    private final CurrentUserService currentUserService;

    @PostMapping("/add")
    public ResponseEntity<OrderResponse> addOrder(@RequestBody OrderRequest orderRequest) {
        User user = currentUserService.getRequiredUser();
        Order order = Order.from(orderRequest, user);

        order = orderService.addOrder(order);

        OrderResponse response = OrderResponse.from(order);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
