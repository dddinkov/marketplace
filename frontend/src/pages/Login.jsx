import React, { useState } from "react";
import { loginUser } from "../api/api.js";
import "../styles/Login.css";
import {useNavigate} from "react-router-dom";
import {triggerCartUpdate} from "../events/cartEvent.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", data.email);
            setSuccess(true);
            setEmail("");
            setPassword("");

            triggerCartUpdate();

            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="login-message">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </form>
        </div>
    );
}
