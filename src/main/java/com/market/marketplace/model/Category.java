package com.market.marketplace.model;

import com.market.marketplace.dto.CategoryRequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public static Category from(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.name());

        return category;
    }
}
