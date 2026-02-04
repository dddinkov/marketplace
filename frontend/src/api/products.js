import {API_URL} from "./api.js";

export async function addProduct(name, description, price, imageUrl) {
    const response = await fetch(`${API_URL}/products/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name,
            description,
            price,
            imageUrl
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
    }

    return await response.json();
}