package com.market.marketplace.controller;

import com.market.marketplace.dto.CartItemRequest;
import com.market.marketplace.dto.CartItemResponse;
import com.market.marketplace.dto.CartResponse;
import com.market.marketplace.model.Cart;
import com.market.marketplace.model.CartItem;
import com.market.marketplace.model.Product;
import com.market.marketplace.model.User;
import com.market.marketplace.service.CartService;
import com.market.marketplace.service.CurrentUserService;
import com.market.marketplace.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("cart")
public class CartController {
    private final CartService cartService;
    private final CurrentUserService currentUserService;
    private final ProductService productService;


    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        User user = currentUserService.getRequiredUser();
        return ResponseEntity.ok(CartResponse.from(user.getCart()));
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addItem(@Valid @RequestBody CartItemRequest request) {
        User user = currentUserService.getRequiredUser();
        Cart cart = user.getCart();

        Long productId = request.productId();
        Product product = productService.getProduct(productId);

        CartItem item = cartService.addItemToCart(request.quantity(), cart, product);
        CartItemResponse response = CartItemResponse.from(item);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
