import {API_URL} from "./api.js";

export async function addProduct(name, description, price, imageUrl, categoryId) {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name,
            description,
            price,
            imageUrl,
            categoryId
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
    }

    return await response.json();
}

export async function fetchProducts() {
    const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.json();
}

export async function fetchProductById(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.json();
}