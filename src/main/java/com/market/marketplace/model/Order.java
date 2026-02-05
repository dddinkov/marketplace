package com.market.marketplace.model;

import com.market.marketplace.dto.OrderRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_order_user")
    )
    private User user;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String address;

    private Double price;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public static Order from(OrderRequest request, User user) {
        String address = request.address();
        Double price = request.price();

        Order order = new Order();
        order.setAddress(address);
        order.setPrice(price);
        order.status = OrderStatus.PENDING;
        order.setUser(user);

        return order;
    }
}
