export const API_URL = "http://localhost:8080";

export async function registerUser(email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
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
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({email, password})
    });

    if (!response.ok) {
        const message = await response.text();
        if (response.status === 401) {
            alert(`Login failed: ${message}`);
        } else {
            alert(`Login failed`);
        }
        throw new Error(message || "Login failed");
    }

    return response.json()
}

export async function updatePassword(userId, newPassword) {
    const response = await fetch(`{API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({passwordHash: newPassword})
    });
    return response.json();

    if (!response.ok) {
        throw new Error("Failed to update password");
    }
    return response.json();
}