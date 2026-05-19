import {API_URL, authHeaders, headers} from "./api.js";

const CATEGORY_API_URL = `${API_URL}/categories`;

export async function addCategory(name) {
    const response = await fetch(`${CATEGORY_API_URL}`, {
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
    const response = await fetch(`${CATEGORY_API_URL}/${categoryId}`, {
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
    const response = await fetch(`${CATEGORY_API_URL}`, {
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
    const response = await fetch(`${CATEGORY_API_URL}/${categoryId}/products?page=${page}&size=${size}`, {
        method: "GET",
        headers: headers()
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch products");
    }

    return response.json();
}