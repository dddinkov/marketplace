package com.market.marketplace.dto;

import com.market.marketplace.model.User;

public record UserResponse(
        Long id,
        String email
) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getEmail());
    }
}
