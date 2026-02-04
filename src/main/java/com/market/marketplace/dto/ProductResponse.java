package com.market.marketplace.dto;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price,
        String imageUrl,
        Long userId
) {
}
