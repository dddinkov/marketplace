package com.market.marketplace.dto;

import com.market.marketplace.model.User;

public record RegisterResponse(
        Long id,
        String email
) {
    public static RegisterResponse from(User user) {
        return new RegisterResponse(user.getId(), user.getEmail());
    }
}
