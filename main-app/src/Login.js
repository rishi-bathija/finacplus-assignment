import React, { useState } from "react";
import { login } from "./auth/auth";

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ username: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = login(form.username, form.password);
        if (token) onLogin();
        else alert("Invalid credentials");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm mx-auto mt-24 p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-6"
        >
            <h2 className="font-bold text-3xl text-blue-700 text-center mb-2">Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                autoFocus
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="p-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <button
                type="submit"
                className="py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
            >
                Login
            </button>
        </form>
    );
};

export default Login;
