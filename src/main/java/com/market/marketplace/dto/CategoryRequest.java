package com.market.marketplace.dto;

import jakarta.validation.constraints.NotNull;

public record CategoryRequest(@NotNull String name) {
}
