package com.market.marketplace.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record CategoryRequest(@NotNull String name) {
}
