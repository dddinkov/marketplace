import ProductList from "./ProductList";
import "../styles/Home.css";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCategories, getCategoryProducts} from "../api/category.js";
import {fetchProducts} from "../api/products.js";

export default function Home() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        loadCategories();
    }, []);

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    const handleCategoryChange = async (categoryId) => {
        if (!categoryId) {
            fetchProducts()
                .then(setProducts)
                .catch(err => console.error("Failed to fetch products", err));
            return;
        }
        const products = await getCategoryProducts(categoryId);
        setProducts(products);
    }
    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Available Products</h1>
            {isHomePage && (
                <select onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            )}
            <ProductList products={products} />
        </div>

    );
}
