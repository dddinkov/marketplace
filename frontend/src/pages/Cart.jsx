import React, { useState, useEffect } from "react";
import {fetchCart} from "../api/cart.js";
import "../styles/Cart.css";

export default function Cart({ onRemoveFromCart }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const data = await fetchCart();
                setCart(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!cart || cart.items.length === 0) {
        return <div>Your cart is empty.</div>;
    }

    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.total;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cart.items.map((item) => (
                    <div key={item.productId} className="cart-item">
                        <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="cart-item-img"
                            width="100px"
                            height="100px"
                        />
                        <div className="cart-item-details">
                            <h4>{item.productName}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.productPrice}</p>
                            <button onClick={() => onRemoveFromCart(item.product.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
}
