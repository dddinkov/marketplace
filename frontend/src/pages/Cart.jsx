import React, {useState, useEffect} from "react";
import {fetchCart, deleteFromCart, clearCart, checkoutCart} from "../api/cart.js";
import {triggerCartUpdate} from "../events/cartEvent.js";
import "../styles/Cart.css";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);

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

    useEffect(() => {
        loadCart()
    }, []);

    const handleDelete = async (cartItemId) => {
        try {
            await deleteFromCart(cartItemId);

            loadCart()
            triggerCartUpdate()
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();

            loadCart();
            triggerCartUpdate();
        } catch (err) {
            setError(err.message);
        }
    }

    const handleCheckout = async () => {
        try {
            await checkoutCart(address);
            setCart(null);
            triggerCartUpdate();
        } catch (err) {
            setError(err.message);
        }
    }

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
                    <div key={item.id} className="cart-item">
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
                            <button onClick={() => handleDelete(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                <button className="clear-cart-btn"
                        onClick={handleClearCart}>
                    Clear
                </button>
                <button className="checkout-cart-btn"
                        onClick={() => setShowCheckoutForm(true)}>
                    Checkout
                </button>
            </div>
            {showCheckoutForm && (
                <div className="checkout-form-overlay">
                    <div className="checkout-form">
                        <h4>Enter your shipping address</h4>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Main St, City, Country"
                            className="address-input"
                        />
                        <div className="checkout-form-buttons">
                            <button
                                className="confirm-checkout-btn"
                                onClick={handleCheckout}
                                disabled={!address.trim()}
                            >
                                Confirm
                            </button>
                            <button
                                className="cancel-checkout-btn"
                                onClick={() => setShowCheckoutForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
