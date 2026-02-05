package com.market.marketplace.service;

import com.market.marketplace.exception.UserNotFoundException;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUserService {
    private final UserRepository userRepository;

    public User getRequiredUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        String email = auth.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }
}
