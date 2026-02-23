package com.market.marketplace.controller;

import com.market.marketplace.dto.CategoryRequest;
import com.market.marketplace.dto.CategoryResponse;
import com.market.marketplace.model.Category;
import com.market.marketplace.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("category")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponse> getProduct(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        CategoryResponse response = CategoryResponse.from(category);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<CategoryResponse> addCategory(@RequestBody CategoryRequest request) {
        Category category = categoryService.addCategory(request);
        CategoryResponse response = CategoryResponse.from(category);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        System.out.println(categories.toString());

        if(categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(
                categories.stream()
                        .map(CategoryResponse::from)
                        .collect(Collectors.toList()));
    }
}
