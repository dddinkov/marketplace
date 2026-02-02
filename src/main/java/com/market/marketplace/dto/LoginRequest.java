package com.market.marketplace.dto;

public record LoginRequest(
        String email,
        String password
) {}
