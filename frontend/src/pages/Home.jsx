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
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const size = 12;

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        loadCategories();
    }, []);

    useEffect(() => {
        loadProducts();
        }, [page, selectedCategory]);

    const loadProducts = async () => {
        try {
            let data;

            if (!selectedCategory) {
                data = await fetchProducts(page, size);
            } else {
                data = await getCategoryProducts(selectedCategory, page, size);
            }

            setProducts(data.content);      // VERY IMPORTANT
            setTotalPages(data.totalPages); // store total pages
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(0);
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
            <div style={{ marginTop: "20px" }}>
                <button
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>

    );
}
