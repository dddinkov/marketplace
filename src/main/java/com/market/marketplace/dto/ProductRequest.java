package com.market.marketplace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.URL;

public record ProductRequest(
        @NotBlank
        String name,
        String description,
        @NotNull @Positive
        Double price,
        @URL
        String imageUrl,
        @NotNull
        Long categoryId
) {}
