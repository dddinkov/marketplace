package com.market.marketplace.service;

import com.market.marketplace.exception.InvalidPasswordException;
import com.market.marketplace.exception.UserNotFoundException;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new InvalidPasswordException();
        }

        return jwtService.generateToken(user.getEmail());
    }
}
