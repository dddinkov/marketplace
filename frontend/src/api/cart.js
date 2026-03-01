import {API_URL, authHeaders} from "./api.js";

export async function addToCart(productId, quantity = 1) {
    const response = await fetch(`${API_URL}/cart/items`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ productId, quantity })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add item to cart");
    }

    return response.json();
}

export async function fetchCart() {

    const response = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }

    const data = response.json();

    return data;
}

export async function deleteFromCart(itemId) {
    const response = await fetch(`${API_URL}/cart/items/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            cartItemId: itemId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to delete cart item");
    }
}