import { API_URL } from "./api.js";

export async function addCategory(name) {
    const response = await fetch(`${API_URL}/category/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add category");
    }

    return response.json();
}

export async function getCategory(categoryId) {
    const response = await fetch(`${API_URL}/products/${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (!response.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch category");
    }

    return response.json();
}