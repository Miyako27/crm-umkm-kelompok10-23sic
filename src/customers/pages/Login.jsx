import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data Dummy
    const dummyAccounts = [
      { email: "admin@gmail.com", password: "123", role: "admin" },
      { email: "user@gmail.com", password: "123", role: "user" },
    ];

    const foundAccount = dummyAccounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (foundAccount) {
      localStorage.setItem("user_login", JSON.stringify({
        email: foundAccount.email,
        role: foundAccount.role
      }));

      if (foundAccount.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/images/logoo.png" alt="Logo MJM" className="h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">Selamat Datang</h2>
        <p className="text-center text-gray-500 mb-6">Silakan masuk ke akun Anda!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
