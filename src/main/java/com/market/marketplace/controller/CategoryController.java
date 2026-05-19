package com.market.marketplace.controller;

import com.market.marketplace.dto.CategoryRequest;
import com.market.marketplace.dto.CategoryResponse;
import com.market.marketplace.dto.ProductResponse;
import com.market.marketplace.model.Category;
import com.market.marketplace.model.Product;
import com.market.marketplace.service.CategoryService;
import com.market.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final ProductService productService;

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        CategoryResponse response = CategoryResponse.from(category);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> addCategory(@RequestBody CategoryRequest request) {
        Category category = categoryService.addCategory(request);
        CategoryResponse response = CategoryResponse.from(category);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(
                categories.stream()
                        .map(CategoryResponse::from)
                        .collect(Collectors.toList()));
    }

    @GetMapping("/{categoryId}/products")
    public ResponseEntity<Page<ProductResponse>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
            ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId, pageable)
                .map(ProductResponse::from));
    }
}
