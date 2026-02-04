import { useState } from "react";
import { addProduct } from "../api/products.js";
import "../styles/ProductAdd.css";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const data = await addProduct(
                name,
                description,
                parseFloat(price),
                imageUrl
            );

            setSuccess(true);
            setName("");
            setDescription("");
            setPrice("");
            setImageUrl("");
            console.log("Added product:", data);
        } catch (err) {
            setError(err.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form-container">
            <h2>Add New Product</h2>

            {success && <p style={{ color: "green" }}>Product added successfully!</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Product Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                />

                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    disabled={loading}
                />

                <label htmlFor="imageUrl">Image URL</label>
                <input
                    id="imageUrl"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
