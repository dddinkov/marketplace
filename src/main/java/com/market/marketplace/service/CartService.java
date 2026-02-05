package com.market.marketplace.service;

import com.market.marketplace.model.Cart;
import com.market.marketplace.model.CartItem;
import com.market.marketplace.model.Product;
import com.market.marketplace.model.User;
import com.market.marketplace.repository.CartItemRepository;
import com.market.marketplace.repository.CartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Transactional
    public CartItem addItemToCart(int quantity, Cart cart, Product product) {
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.incrementQuantity(quantity);
            return cartItemRepository.save(existingItem);
        }

        CartItem newItem = CartItem.from(quantity, cart, product);

        cart.addCartItem(newItem);

        return cartItemRepository.save(newItem);

    }

    @Transactional
    public CartItem updateCartItemQuantity(User user, Long cartItemId, int quantity) {
        if (quantity <= 0) {
            removeCartItem(user, cartItemId);
            return null;
        }

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found"));

        if(!item.getCart().getId().equals(user.getCart().getId())) {
            throw new IllegalArgumentException("Item does not belong to user's cart");
        }

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    @Transactional
    public void removeCartItem(User user, Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new IllegalArgumentException("CartItem not found"));

        if(!item.getCart().getId().equals(user.getCart().getId())) {
            throw new IllegalArgumentException("Item does not belong to user's cart");
        }

        item.getCart().getItems().remove(item);
        cartItemRepository.delete(item);
    }

    @Transactional
    public List<CartItem> getCartItems(User user) {
        Cart cart = user.getCart();

        return cart.getItems();
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = user.getCart();

        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
    }
}
