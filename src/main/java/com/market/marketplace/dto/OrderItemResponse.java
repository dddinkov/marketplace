package com.market.marketplace.dto;

import com.market.marketplace.model.OrderItem;

import java.math.BigDecimal;
import java.net.URL;

public record OrderItemResponse(
        Long productId,
        String productName,
        BigDecimal price,
        Integer quantity,
        String imageUrl
) {
    public static OrderItemResponse from(OrderItem item) {
        return new OrderItemResponse(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getPrice(),
                item.getQuantity(),
                item.getProduct().getImageUrl()
        );
    }
}