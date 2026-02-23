package com.market.marketplace.dto;

import com.market.marketplace.model.Product;

public record ProductResponse(
        Long id,
        String name,
        String description,
        Double price,
        String imageUrl,
        Long userId,
        Long categoryId
) {
    public static ProductResponse from(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getUser().getId(),
                product.getCategory().getId()
        );
    }
}
