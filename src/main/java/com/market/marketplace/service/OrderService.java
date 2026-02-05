package com.market.marketplace.service;

import com.market.marketplace.model.Order;
import com.market.marketplace.repository.OrderRepository;
import com.market.marketplace.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    @Transactional
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }
}
