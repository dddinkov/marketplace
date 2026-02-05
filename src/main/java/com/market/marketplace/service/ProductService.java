package com.market.marketplace.service;

import com.market.marketplace.model.Product;
import com.market.marketplace.repository.ProductRepository;
import com.market.marketplace.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Transactional
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}
