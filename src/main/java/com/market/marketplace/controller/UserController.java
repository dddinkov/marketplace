package com.market.marketplace.controller;

import com.market.marketplace.dto.RegisterRequest;
import com.market.marketplace.dto.UpdateUserRequest;
import com.market.marketplace.dto.UserResponse;
import com.market.marketplace.exception.UserNotFoundException;
import com.market.marketplace.model.User;
import com.market.marketplace.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUser(user.getId(), request.email(), request.password())
                .orElseThrow(UserNotFoundException::new);
        UserResponse response = UserResponse.from(updatedUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(
            @AuthenticationPrincipal User user
    ) {
        UserResponse response = UserResponse.from(user);
        return ResponseEntity.ok(response);
    }
}
