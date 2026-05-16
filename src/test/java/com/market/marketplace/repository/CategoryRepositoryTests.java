package com.market.marketplace.repository;

import com.market.marketplace.model.Category;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class CategoryRepositoryTests {
    @Autowired
    CategoryRepository categoryRepository;

    @Test
    public void Save_ReturnSavedCategory() {
        Category category = Category.builder()
                .name("Category")
                .build();

        Category savedCategory = categoryRepository.save(category);

        Assertions.assertThat(savedCategory).isNotNull();
        Assertions.assertThat(savedCategory.getId()).isNotNull();
        Assertions.assertThat(savedCategory.getName()).isEqualTo("Category");
    }

    @Test
    public void FindById_ReturnCategory() {
        Category cat1 = categoryRepository.save(Category.builder().name("Electronics").build());
        Category cat2 = categoryRepository.save(Category.builder().name("Books").build());
        Category cat3 = categoryRepository.save(Category.builder().name("Toys").build());

        Category found = categoryRepository.findById(cat2.getId()).orElse(null);

        Assertions.assertThat(found).isNotNull();
        Assertions.assertThat(found.getName()).isEqualTo("Books");
    }

    @Test
    void FindAll_ReturnAllCategories() {
        categoryRepository.save(Category.builder().name("Electronics").build());
        categoryRepository.save(Category.builder().name("Books").build());

        List<Category> categories = categoryRepository.findAll();

        Assertions.assertThat(categories).hasSize(2);
    }

    @Test
    void DeleteById_ShouldRemoveCategory() {
        Category category = categoryRepository.save(
                Category.builder().name("Electronics").build()
        );

        categoryRepository.deleteById(category.getId());

        Optional<Category> found = categoryRepository.findById(category.getId());

        Assertions.assertThat(found).isEmpty();
    }
}
