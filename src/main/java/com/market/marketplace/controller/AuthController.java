package com.market.marketplace.controller;

import com.market.marketplace.dto.LoginRequest;
import com.market.marketplace.dto.LoginResponse;
import com.market.marketplace.dto.RegisterRequest;
import com.market.marketplace.dto.RegisterResponse;
import com.market.marketplace.model.User;
import com.market.marketplace.service.AuthService;
import com.market.marketplace.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody RegisterRequest request) {
        User savedUser = userService.registerUser(request);
        RegisterResponse response = new RegisterResponse(savedUser.getId(), savedUser.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String email = request.email();
        String password = request.password();
        String jwtToken = authService.login(email, password);

        LoginResponse response = new LoginResponse(jwtToken, email);
        return ResponseEntity.ok(response);
    }
}
