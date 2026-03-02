import React, {useEffect, useState} from "react";
import {fetchOrders} from "../api/order.js";
import "../styles/Order.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOrders, setShowOrders] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        fetchOrders()
            .then(data => setOrders(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const toggleOrder = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;
    if (orders.length === 0) return <div>No orders yet.</div>;

    return (
        <div className="orders-dropdown">
            <button
                className="orders-toggle-btn"
                onClick={() => setShowOrders(!showOrders)}
            >
                My Orders {showOrders ? "▲" : "▼"}
            </button>

            {showOrders && (
                <ul className="orders-list">
                    {orders.map(order => (
                        <li key={order.id}>
                            <button
                                className="order-id-btn"
                                onClick={() => toggleOrder(order.id)}
                            >
                                Order #{order.id} {expandedOrderId === order.id ? "▲" : "▼"}
                            </button>

                            {expandedOrderId === order.id && (
                                <div className="order-details">
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Address:</strong> {order.address}</p>
                                    <p><strong>Total Price:</strong> ${order.price.toFixed(2)}</p>
                                    <h4>Items:</h4>
                                    {order.items.map(item => {
                                        return (
                                            <div className="order-item-card">
                                                <img src={`${item.imageUrl}?auto=compress&cs=tinysrgb&w=200`}
                                                     alt={item.productName} className="mb-2"
                                                     loading="lazy"/>
                                                <p key={item.productId}>
                                                    {item.productName} — {item.quantity} × ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        )}
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}