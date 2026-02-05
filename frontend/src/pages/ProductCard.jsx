import React from "react";
import "../styles/ProductCard.css";

export default function ProductCard({ product, token, onAddToCart }) {
    const handleAdd = () => {
        onAddToCart(product.id, 1);
    };

    return (
        <div className="border p-4 rounded shadow">
            <img src={product.imageUrl} alt={product.name} className="mb-2" width="250px" height="250px"/>
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-green-700 font-semibold">${product.price}</p>
            <button
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={handleAdd}
            >
                Add to Cart
            </button>
        </div>
    )
}