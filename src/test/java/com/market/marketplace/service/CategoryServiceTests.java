package com.market.marketplace.service;

import com.market.marketplace.dto.CategoryRequest;
import com.market.marketplace.exception.CategoryNotFoundException;
import com.market.marketplace.model.Category;
import com.market.marketplace.repository.CategoryRepository;
import com.market.marketplace.repository.ProductRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTests {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CategoryService categoryService;

    @Test
    void GetCategoryById_ReturnCategory() {
        Category category = Category.builder()
                .id(1L)
                .name("Electronics")
                .build();

        when(categoryRepository.findById(1L))
                .thenReturn(Optional.of(category));

        Category result = categoryService.getCategoryById(1L);

        Assertions.assertThat(result).isNotNull();
        Assertions.assertThat(result.getId()).isEqualTo(1L);
        Assertions.assertThat(result.getName())
                .isEqualTo("Electronics");
    }

    @Test
    void GetCategoryById_NotFound() {
        when(categoryRepository.findById(1L))
                .thenReturn(Optional.empty());

        Assertions.assertThatThrownBy(() -> categoryService.getCategoryById(1L))
                .isInstanceOf(CategoryNotFoundException.class);
    }

    @Test
    void AddCategory_ReturnCategory() {
        CategoryRequest request = CategoryRequest.builder()
                .name("Books")
                .build();

        Category savedCategory = Category.builder()
                .id(1L)
                .name("Books")
                .build();

        when(categoryRepository.save(any(Category.class)))
                .thenReturn(savedCategory);

        Category result = categoryService.addCategory(request);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Books", result.getName());
    }

    @Test
    void GetAllCategories_ReturnAllCategories() {
        Category c1 = Category.builder()
                .name("Books")
                .build();

        Category c2 = Category.builder()
                .name("Games")
                .build();

        when(categoryRepository.findAll())
                .thenReturn(List.of(c1, c2));

        List<Category> result = categoryService.getAllCategories();

        Assertions.assertThat(result.size())
                .isEqualTo(2);
    }
}