package com.market.marketplace.controller;

import com.market.marketplace.dto.ProductRequest;
import com.market.marketplace.dto.ProductResponse;
import com.market.marketplace.model.Category;
import com.market.marketplace.model.Product;
import com.market.marketplace.model.User;
import com.market.marketplace.service.CategoryService;
import com.market.marketplace.service.CurrentUserService;
import com.market.marketplace.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final CurrentUserService currentUserService;
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest request) {
        User user = currentUserService.getRequiredUser();

        Category category = categoryService.getCategoryById(request.categoryId());

        Product product = Product.from(request, user, category);
        product = productService.addProduct(product);

        ProductResponse response = ProductResponse.from(product);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts()
                .stream()
                .map(ProductResponse::from)
                .toList();
        return ResponseEntity.ok(products);
    }
}
