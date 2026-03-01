package com.market.marketplace.service;

import com.market.marketplace.dto.CategoryRequest;
import com.market.marketplace.exception.CategoryNotFoundException;
import com.market.marketplace.model.Category;
import com.market.marketplace.model.Product;
import com.market.marketplace.repository.CategoryRepository;
import com.market.marketplace.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
    }

    public Category addCategory(CategoryRequest request) {
        Category category = Category.from(request);
        category = categoryRepository.save(category);

        return category;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Page<Product> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryId(categoryId, pageable);
    }
}
