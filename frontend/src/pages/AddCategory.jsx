import { useState } from "react";
import { addCategory } from "../api/category.js";
import "../styles/AddCategory.css";

export default function CategoryForm() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const data = await addCategory(
                name
            );

            setSuccess(true);
            setName("");
            console.log("Added category:", data);
        } catch (err) {
            setError(err.message || "Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="category-form-container">
            <h2 className="title">Add New Category</h2>

            {success && <p style={{ color: "green" }}>Product added successfully!</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Category Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Category"}
                </button>
            </form>
        </div>
    );
}
