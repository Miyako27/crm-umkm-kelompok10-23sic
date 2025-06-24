import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ShoppingCart, LogOut, Star } from 'lucide-react';

const ProfilCustomer = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || !sessionData?.user) {
        console.error('Gagal mengambil session:', sessionError);
        navigate('/login');
        return;
      }

      const email = sessionData.user.email;

      const { data, error } = await supabase
        .from('pelanggan')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Gagal ambil data pelanggan:', error);
        return;
      }

      setUserData(data);
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Logout dari Supabase Auth
    localStorage.removeItem('user_login'); // Hapus localStorage user
    window.dispatchEvent(new Event('userLogout')); // Trigger ke Header
    navigate('/'); // Redirect ke halaman utama
  };

  if (!userData) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-white pb-10">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header */}
        <div className="bg-white p-6 text-gray-800 rounded-b-3xl shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={userData.foto || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                alt="Foto Profil"
                className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{userData.nama}</h1>
                <div className="flex items-center mt-1">
                  <Star size={18} className="mr-1 text-yellow-500" />
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold shadow bg-yellow-300 text-yellow-900">
                    {userData.status}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-sm underline hover:text-gray-600 font-medium">Edit Profil</button>
          </div>
        </div>

        {/* Poin */}
        <div className="bg-gradient-to-r from-orange-50 to-white mt-5 px-6 py-7 rounded-2xl shadow-lg border border-orange-100 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <img src="https://img.icons8.com/color/48/coin-in-hand.png" alt="Poin Icon" className="w-8 h-8" />
            <span className="text-lg font-semibold text-yellow-700">Poin Anda</span>
          </div>
          <div className="bg-yellow-100 px-6 py-3 rounded-full shadow-inner">
            <span className="text-3xl font-extrabold text-orange-800">{userData.poin || 0}</span>
          </div>
        </div>

        {/* Riwayat */}
        <div className="bg-white mt-5 p-5 rounded-xl shadow-md border border-gray-100">
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
              <img src="https://img.icons8.com/ios-filled/50/faa21a/box.png" alt="Diproses" className="w-7 h-7 mb-1" />
              <span>Diproses</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://img.icons8.com/ios-filled/50/40c057/checked--v1.png" alt="Selesai" className="w-7 h-7 mb-1" />
              <span>Selesai</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white mt-5 p-5 rounded-xl shadow-md space-y-4 border border-gray-100">
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
    </div>
  );
};

export default ProfilCustomer;
