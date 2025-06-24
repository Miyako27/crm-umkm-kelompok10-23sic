import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from '../../supabase';
import bcrypt from "bcryptjs";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek apakah admin
    const { data: admin } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (admin && await bcrypt.compare(password, admin.password)) {
      localStorage.setItem("user_login", JSON.stringify({ email: admin.email, role: "admin" }));
      return navigate("/dashboard");
    }

    // Login pelanggan via Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Email atau password salah");
    } else {
      localStorage.setItem("user_login", JSON.stringify({ email, role: "user" }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/loginBg.png')" }}>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/images/logoo.png" alt="Logo MJM" className="h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">Selamat Datang</h2>
        <p className="text-center text-gray-500 mb-6">Silakan masuk ke akun Anda!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan Email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
          </div>

          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link to="/registrasi" className="text-orange-500 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
