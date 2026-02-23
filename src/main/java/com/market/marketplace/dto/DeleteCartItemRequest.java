package com.market.marketplace.dto;

import jakarta.validation.constraints.NotNull;

public record DeleteCartItemRequest(
        @NotNull Long cartItemId
) {}
