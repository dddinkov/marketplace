import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser, updateUser, logout } from "../api/api.js";

export default function MyProfile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchCurrentUser();
                setUser(data);
                setEmail(data.email);
            } catch (err) {
                setError("Failed to load user data. Please login again.");
            }
        };
        loadUser();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const updated = await updateUser({ email, password });
            setUser(updated);
            setSuccess("Profile updated successfully!");
            setPassword("");

            handleLogout();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <p>Loading user data...</p>;

    return (
        <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
            <h1>My Profile</h1>

            <p><strong>Account created:</strong> {new Date(user.createdAt).toLocaleString()}</p>

            <form onSubmit={handleUpdate}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </label>

                <label>
                    New Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Leave blank to keep current password"
                        disabled={loading}
                    />
                </label>

                {success && <p style={{ color: "green" }}>{success}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>

            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
