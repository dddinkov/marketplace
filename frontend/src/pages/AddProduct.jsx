import { useState, useEffect } from "react";
import { addProduct } from "../api/products.js";
import { getCategories} from "../api/category.js";
import "../styles/AddProduct.css";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categoryId, setCategoryId] = useState(5);
    const [categories, setCategories] = useState([]);
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
                imageUrl,
                categoryId
            );

            setSuccess(true);
            setName("");
            setDescription("");
            setPrice("");
            setImageUrl("");
            setCategoryId(5);
            console.log("Added product:", data);
        } catch (err) {
            setError(err.message || "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    async function loadCategories() {
        try {
            setLoading(true);
            const data = await getCategories();
            setCategories(data ?? []);
            console.log(categories);
        } catch (err) {
            setError(err.message);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <div className="product-form-container">
            <h2 className="title">Add New Product</h2>

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

                <label htmlFor="category"> Choose Category </label>
                <select id="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(parseInt(e.target.value))}
                        required
                        disabled={loading || categories.length === 0}
                >
                    {categories.length === 0 ? (
                        <option value="" disabled> No categories available </option>
                    ) : (
                        categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))
                    )}
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
