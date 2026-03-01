import {API_URL, authHeaders, headers} from "./api.js";

export async function addCategory(name) {
    const response = await fetch(`${API_URL}/category/add`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add category");
    }

    return response.json();
}

export async function getCategory(categoryId) {
    const response = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "GET",
        headers: headers()
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch category");
    }

    return response.json();
}

export async function getCategories() {
    const response = await fetch(`${API_URL}/category/all`, {
        method: "GET",
        headers: headers()
    }
)
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch categories");
    }

    return response.json();
}

export async function getCategoryProducts(categoryId, page = 0, size = 12) {
    const response = await fetch(`${API_URL}/category/${categoryId}/products?page=${page}&size=${size}`, {
        method: "GET",
        headers: headers()
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch products");
    }

    return response.json();
}