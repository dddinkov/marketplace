export const API_URL = "http://localhost:8080";

export async function registerUser(email, password) {
    const response = await fetch(`${API_URL}/users`, {
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
    }
    return response.json();
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