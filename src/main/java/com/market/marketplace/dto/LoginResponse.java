package com.market.marketplace.dto;

public record LoginResponse(
        String token,
        String email
) {}
