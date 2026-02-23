import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/products.js";
import "../styles/ProductList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    return (
        <div className="product-container">
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            {products.length === 0 && <p className="no-products">No products available</p>}
        </div>
    );
}
