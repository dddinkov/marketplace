package com.market.marketplace.dto;

import com.market.marketplace.model.Order;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public record OrderResponse(
        Long id,
        Long userId,
        String status,
        String address,
        BigDecimal price,
        List<OrderItemResponse> items
) {
    public static OrderResponse from(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getStatus().name(),
                order.getAddress(),
                order.getPrice(),
                order.getItems().stream()
                        .map(OrderItemResponse::from)
                        .collect(Collectors.toList())
        );
    }
}
