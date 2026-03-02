package com.market.marketplace.service;

import com.market.marketplace.dto.OrderRequest;
import com.market.marketplace.exception.EmptyCartException;
import com.market.marketplace.model.*;
import com.market.marketplace.repository.OrderItemRepository;
import com.market.marketplace.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional
    public Order checkout(User user, OrderRequest request) {
        Cart cart = user.getCart();

        if (cart.getItems().isEmpty()) {
            throw new EmptyCartException();
        }

        BigDecimal total = BigDecimal.ZERO;

        Order order = new Order();
        order.setUser(user);
        order.setAddress(request.address());
        order.setStatus(OrderStatus.PENDING);

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.from(cartItem);
            orderItem.setOrder(order);
            total = total.add(orderItem.getPrice()
                    .multiply(BigDecimal.valueOf(orderItem.getQuantity())));
            order.getItems().add(orderItem);
        }

        order.setPrice(total);

        orderRepository.save(order);

        cart.getItems().clear();

        return order;
    }

    public List<Order> getOrdersByUser(User user) {
        return orderRepository.findByUserId(user.getId());
    }
}
