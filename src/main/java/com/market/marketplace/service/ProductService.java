package com.market.marketplace.service;

import com.market.marketplace.dto.ProductRequest;
import com.market.marketplace.exception.UserNotFoundException;
import com.market.marketplace.model.Product;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.ProductRepository;
import com.market.marketplace.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public Product addProduct(ProductRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        String name = request.name();
        String description = request.description();
        Double price = request.price();
        String imageUrl = request.imageUrl();

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageUrl(imageUrl);
        product.setUser(user);

        return productRepository.save(product);
    }
}
