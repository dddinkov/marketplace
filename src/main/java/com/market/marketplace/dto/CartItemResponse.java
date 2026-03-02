package com.market.marketplace.dto;

import com.market.marketplace.model.CartItem;

import java.math.BigDecimal;

public record CartItemResponse(
        Long id,
        Long productId,
        String productName,
        BigDecimal productPrice,
        String imageUrl,
        Integer quantity
) {
    public static CartItemResponse from(CartItem cartItem) {
        return new CartItemResponse(
                cartItem.getId(),
                cartItem.getProduct().getId(),
                cartItem.getProduct().getName(),
                cartItem.getProduct().getPrice(),
                cartItem.getProduct().getImageUrl(),
                cartItem.getQuantity()
        );
    }
}
