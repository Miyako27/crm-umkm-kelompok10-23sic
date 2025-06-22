import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  History,
  ShoppingCart,
  LogOut,
  Star
} from 'lucide-react';

const ProfilCustomer = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_login");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_login");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 p-6 text-white rounded-b-3xl shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={user.foto}
              alt="Foto Profil"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{user.nama}</h1>
              <div className="flex items-center mt-1">
                <Star size={18} className="mr-1 text-white/90" />
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-semibold shadow ${
                    user.segmentasi === 'Gold'
                      ? 'bg-yellow-300 text-yellow-900'
                      : 'bg-blue-200 text-blue-700'
                  }`}
                >
                  {user.segmentasi} Member
                </span>
              </div>
            </div>
          </div>
          <button className="text-sm underline hover:text-white/90 font-medium">Edit Profil</button>
        </div>
      </div>

      {/* Poin */}
      <div className="bg-white mx-5 mt-5 p-5 rounded-xl shadow-md flex justify-between items-center border border-gray-100">
        <span className="text-gray-600 text-lg font-medium">Poin Anda</span>
        <span className="text-xl font-bold text-green-600">{user.poin}</span>
      </div>

      {/* Riwayat Pemesanan */}
      <div className="bg-white mx-5 mt-5 p-5 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Pesanan Saya</h2>
          <button className="text-blue-500 text-sm font-medium">Lihat Riwayat &gt;</button>
        </div>
        <div className="flex justify-around text-center text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <img src="https://img.icons8.com/ios-filled/50/fa314a/wallet.png" alt="Belum Bayar" className="w-7 h-7 mb-1" />
            <span>Belum Bayar</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://img.icons8.com/ios-filled/50/faa21a/box.png" alt="Dikemas" className="w-7 h-7 mb-1" />
            <span>Dikemas</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://img.icons8.com/ios-filled/50/40c057/delivery.png" alt="Dikirim" className="w-7 h-7 mb-1" />
            <span>Dikirim</span>
          </div>
          <div className="flex flex-col items-center relative">
            <img src="https://img.icons8.com/ios-filled/50/ffcc00/star.png" alt="Beri Penilaian" className="w-7 h-7 mb-1" />
            <span>Beri Penilaian</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 font-bold shadow">11</span>
          </div>
        </div>
      </div>

      {/* Menu Utama */}
      <div className="bg-white mx-5 mt-5 p-5 rounded-xl shadow-md space-y-4 border border-gray-100">
        <button className="flex items-center w-full text-left text-gray-800 hover:text-blue-600 font-medium">
          <History size={22} className="mr-3" />
          Riwayat Pemesanan
        </button>

        <button className="flex items-center w-full text-left text-gray-800 hover:text-blue-600 font-medium">
          <ShoppingCart size={22} className="mr-3" />
          Keranjang
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left text-red-600 hover:text-red-800 font-medium"
        >
          <LogOut size={22} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilCustomer;