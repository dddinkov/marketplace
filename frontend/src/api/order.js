import {API_URL, authHeaders} from "./api.js";

export async function fetchOrders() {
    const response = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch orders");
    }

    return response.json();
}