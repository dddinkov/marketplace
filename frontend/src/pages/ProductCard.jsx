import React from "react";
import {addToCart} from "../api/cart.js";
import {triggerCartUpdate} from "../events/cartEvent";
import "../styles/ProductCard.css";
import {Link, useNavigate} from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const handleAdd = async () => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
        try {
            await addToCart(product.id, 1);
            triggerCartUpdate();
        } catch (err) {
            console.error("Failed to add to cart:", err);
        }
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`}>
            <img src={product.imageUrl} alt={product.name} className="mb-2" width="250px" height="250px"/>
            </Link>
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={handleAdd}
            >
                Add to Cart
            </button>
        </div>
    )
}