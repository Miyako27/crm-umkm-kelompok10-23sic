import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Data Dummy
        const validEmail = "miyako@gmail.com";
        const validPassword = "123";

        if (email === validEmail && password === validPassword) {
            navigate("/dashboard");
        } else {
            navigate("/401");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/loginBg.png')" }}
        >
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                {/* Logo MJM */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
                        alt="Logo MJM"
                        className="h-12"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-2">Selamat Datang</h2>
                <p className="text-center text-gray-500 mb-6">
                    Silakan masuk ke akun Anda!
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="miyako@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <a href="#" className="text-sm text-[#797A7C] hover:underline">
                                Forget Password?
                            </a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-[#797A7C]">Remember Password</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white font-semibold py-2 px-4 rounded-md shadow-sm transition"
                        style={{ backgroundColor: "#FF6900" }}
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-sm text-[#797A7C]">
                        Don’t have an account?{' '}
                        <a href="#" className="text-[#5A8CFF] underline">
                            Create Account
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
