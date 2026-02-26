import {triggerCartUpdate} from "../events/cartEvent.js";

export const API_URL = "http://localhost:8080";

export function headers() {
    return {
        "Content-Type": "application/json",
    };
}

export function authHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    };
}

export async function registerUser(email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const message = await response.text();

        if (response.status === 409) {
            alert(`Registration failed: ${message}`);
        }
        else {
            alert(`Registration failed.`);
        }

        throw new Error(message || "Registration failed");
    }
    return response.json();
}

export async function  loginUser(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
    }

    return response.json()
}

export async function updatePassword(userId, newPassword) {
    const response = await fetch(`{API_URL}/users/${userId}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify({passwordHash: newPassword})
    });
    return response.json();

    if (!response.ok) {
        throw new Error("Failed to update password");
    }
    return response.json();
}

export async function logout() {
    localStorage.removeItem("token");
    triggerCartUpdate();
}

export async function fetchCurrentUser() {
    const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: authHeaders(),
    });

    if(!res.ok) {
        throw new Error("Failed to fetch current user");
    }

    return res.json();
}

export async function updateUser(data) {
    const res = await fetch (`${API_URL}/users/me`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data)
});
    if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update profile");
    }

    return res.json();
}