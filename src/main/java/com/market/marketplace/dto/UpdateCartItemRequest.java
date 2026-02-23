package com.market.marketplace.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateCartItemRequest(
        @NotNull Long productId,
        @NotNull @Min(1) Integer quantity
) {
    public UpdateCartItemRequest(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity != null ? quantity : 1;
    }
}
