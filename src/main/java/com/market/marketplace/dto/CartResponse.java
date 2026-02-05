package com.market.marketplace.dto;

import com.market.marketplace.model.Cart;

import java.util.List;

public record CartResponse (
        List<CartItemResponse> items,
        Double total
) {
    public static CartResponse from(Cart cart) {
        return new CartResponse(

        cart.getItems().stream()
                .map(CartItemResponse::from)
                .toList(),
        cart.getTotalPrice()
        );
    }
}
