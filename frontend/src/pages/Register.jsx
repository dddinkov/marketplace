import React, { useState } from "react";
import { registerUser, loginUser } from "../api/api.js";
import "../styles/Register.css";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            await registerUser(email, password);
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            navigate("/");
            setSuccess(true);
            setEmail("");
            setPassword("");
            setRepeatPassword("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2 className="title">Registration Form</h2>
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
                <label htmlFor="repeat_password">Repeat password</label>
                <input
                    id="repeat_password"
                    type="password"
                    placeholder="********"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    disabled={loading}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                <p className="login-message">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
}