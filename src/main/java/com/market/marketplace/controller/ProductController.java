package com.market.marketplace.controller;

import com.market.marketplace.dto.ProductRequest;
import com.market.marketplace.dto.ProductResponse;
import com.market.marketplace.model.Product;
import com.market.marketplace.model.User;
import com.market.marketplace.service.CurrentUserService;
import com.market.marketplace.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final CurrentUserService currentUserService;

    @PostMapping
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest request) {
        User user = currentUserService.getRequiredUser();

        Product product = Product.from(request, user);
        product = productService.addProduct(product);

        ProductResponse response = ProductResponse.from(product);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }
}
