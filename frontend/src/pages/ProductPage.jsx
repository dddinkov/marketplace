import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import { addToCart } from "../api/cart";
import { triggerCartUpdate } from "../events/cartEvent";
import "../styles/ProductPage.css";

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (err) {
                setError("Failed to load product.");
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, quantity);
            triggerCartUpdate();

            setShowSuccess(true);
            setSuccessMessage(`${quantity} ${product.name}(s) added to cart`);
            setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage("");
            }, 2000);
            setQuantity(1);
        } catch (err) {
            console.error("Failed to add product to cart.");
        }
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    if (loading) return <p>Loading product...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="product-page-container">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className="product-details-container">
                <h1>{product.name}</h1>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                <p className="product-description">{product.description}</p>

                <div className="quantity-selector">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>

                {showSuccess && (
                    <div className="success-popup">
                        {successMessage}
                    </div>
                )}

                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}