import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/products.js";
import { addToCart } from "../api/cart.js";
import "../styles/ProductList.css";

export default function ProductList() {
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(token)
            .then(setProducts)
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    const handleAddToCart = async (productId, quantity) => {
        try {
            const result = await addToCart(productId, quantity);
            alert("Product added to cart!");
        } catch (err) {
            console.error(err);
            alert("Failed to add product to cart.");
        }
    };

    return (
        <div className="product-container">
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
            {products.length === 0 && <p className="no-products">No products available</p>}
        </div>
    );
}
