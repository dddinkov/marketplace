package com.market.marketplace.service;

import com.market.marketplace.dto.CategoryRequest;
import com.market.marketplace.exception.CategoryNotFoundException;
import com.market.marketplace.model.Category;
import com.market.marketplace.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
    }

    public Category addCategory(CategoryRequest request) {
        Category category = Category.from(request);
        category = categoryRepository.save(category);

        return category;
    }
}
