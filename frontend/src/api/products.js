import {API_URL, authHeaders, headers} from "./api.js";

export async function addProduct(name, description, price, imageUrl, categoryId) {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: authHeaders(),
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

export async function fetchProducts(page = 0, size = 20) {
    const response = await fetch(
        `${API_URL}/products?page=${page}&size=${size}`,
        {
            method: "GET",
            headers: headers()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}
export async function fetchProductById(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "GET",
        headers: authHeaders()
    });
    return response.json();
}