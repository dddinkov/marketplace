package com.market.marketplace.dto;

public record UpdateUserRequest(
        String email,
        String password
) {
}
