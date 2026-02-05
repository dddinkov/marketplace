package com.market.marketplace.service;

import com.market.marketplace.dto.RegisterRequest;
import com.market.marketplace.exception.EmailAlreadyUsedException;
import com.market.marketplace.model.Cart;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.CartRepository;
import com.market.marketplace.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;

    @Transactional
    public User registerUser(RegisterRequest registerRequest) {
        String email = registerRequest.email();
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyUsedException();
        }

        String passwordHash = passwordEncoder.encode(registerRequest.password());

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordHash);

        Cart cart = user.createCart();
        cartRepository.save(cart);

        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public Optional<User> updatePassword(Long id, String newPasswordHash) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setPasswordHash(newPasswordHash);
                    return user;
                });
    }
}
