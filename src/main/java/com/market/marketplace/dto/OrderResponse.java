package com.market.marketplace.dto;

import com.market.marketplace.model.Order;

public record OrderResponse(
        Long id,
        Long userId,
        String status,
        String address,
        Double price
) {
    public static OrderResponse from(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getStatus().name(),
                order.getAddress(),
                order.getPrice()
        );
    }
}
