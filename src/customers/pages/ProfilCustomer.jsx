import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import { ShoppingCart, LogOut, Star } from 'lucide-react';
import { BiChat } from "react-icons/bi";

// Fungsi untuk menentukan warna berdasarkan status
const getStatusStyle = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('classic')) return 'bg-red-100 text-red-700';
  if (s.includes('silver')) return 'bg-gray-200 text-gray-700';
  if (s.includes('gold')) return 'bg-yellow-200 text-yellow-800';
  return 'bg-gray-100 text-gray-500';
};


const ProfilCustomer = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const { data: sessionData, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || !sessionData?.user) {
        console.error('Gagal mengambil session:', sessionError);
        navigate('/login');
        setLoading(false); // Set loading to false on error/redirect
        return;
      }

      const email = sessionData.user.email;

      const { data, error } = await supabase
        .from('pelanggan')
        .select('*')
        .eq('email', email)
        .single(); // Keep .single() if you expect exactly one, but handle no results

      if (error && error.code === 'PGRST116') {
        // PGRST116 is the code for "The result contains 0 rows" or "multiple (or no) rows returned"
        console.warn('Pelanggan data not found for email:', email);
        // You might want to redirect to a registration page, or show a specific message
        // For now, we'll just set userData to null and let the loading state handle the message.
        setUserData(null);
      } else if (error) {
        console.error('Gagal ambil data pelanggan:', error);
      } else {
        setUserData(data);
      }
      setLoading(false); // Set loading to false when fetching ends
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user_login');
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  if (loading) {
    return <div className="p-10 text-center">Memuat data...</div>;
  }

  if (!userData) {
    // This block will be executed if userData is null after fetching (e.g., if PGRST116 error occurred)
    return (
      <div className="min-h-screen pb-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Profil Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">Sepertinya Anda belum memiliki data profil pelanggan. Silakan lengkapi profil Anda.</p>
        <button
          onClick={() => navigate('/edit-profil')} 
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition"
        >
          Lengkapi Profil Sekarang
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Profil Pelanggan</h2>
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:underline text-orange-600 font-semibold">Beranda</Link> / <span className="text-gray-700">Profil</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5">
        {/* Header Profil */}
        <div className="bg-white p-6 mt-6 text-gray-800 rounded-2xl shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={userData.foto || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                alt="Foto Profil"
                className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold">{userData.nama}</h1>
                <div className="flex items-center mt-1">
                  <Star size={18} className="mr-1 text-yellow-500" />
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold shadow ${getStatusStyle(userData.status)}`}>
                    {userData.status}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/edit-profil')}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full shadow hover:bg-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 13.5V19h5.5L19 9.5l-5.5-5.5L4 13.5z" />
              </svg>
              Edit Profil
            </button>

          </div>
        </div>

        {/* Poin */}
        <div className="bg-yellow-50 mt-5 px-6 py-7 rounded-2xl shadow-inner border border-yellow-100 flex flex-col items-center text-center shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <img src="https://img.icons8.com/color/48/coin-in-hand.png" alt="Poin Icon" className="w-8 h-8" />
            <span className="text-lg font-semibold text-yellow-800">Poin Anda</span>
          </div>
          <div className="bg-yellow-200 px-6 py-3 rounded-full shadow">
            <span className="text-3xl font-extrabold text-orange-800">{userData.poin || 0}</span>
          </div>
        </div>

        {/* Pesanan Saya */}
        <div className="bg-white mt-6 p-6 rounded-2xl shadow border border-gray-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-800">Pesanan Saya</h2>
            <button className="text-blue-500 text-sm font-medium hover:underline">Lihat Riwayat &gt;</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm text-gray-700">
            <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded">
              <img src="https://img.icons8.com/ios-filled/50/fa314a/wallet.png" alt="Belum Bayar" className="w-7 h-7 mb-1" />
              <span>Belum Bayar</span>
            </div>
            <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded">
              <img src="https://img.icons8.com/ios-filled/50/faa21a/box.png" alt="Diproses" className="w-7 h-7 mb-1" />
              <span>Diproses</span>
            </div>
            <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded">
              <img src="https://img.icons8.com/ios-filled/50/40c057/checked--v1.png" alt="Selesai" className="w-7 h-7 mb-1" />
              <span>Selesai</span>
            </div>
            <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded">
              <img src="https://img.icons8.com/ios-glyphs/30/ff4d4d/cancel.png" alt="Dibatalkan" className="w-7 h-7 mb-1" />
              <span className="text-red-500">Dibatalkan</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white mt-6 p-6 rounded-2xl shadow space-y-4 border border-gray-100">
          <Link to="/keranjang" className="flex items-center text-gray-800 hover:text-blue-600 font-medium">
            <ShoppingCart size={22} className="mr-3" />
            Keranjang
          </Link>
          <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-800 font-medium">
            <LogOut size={22} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Floating Live Chat Button */}
      <a
        href="https://wa.me/6285766351957?text=Halo%20saya%20ingin%20bertanya%20tentang%20paket%20wisata"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-yellow-400 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 transition duration-300"
        title="Tanya via WhatsApp"
      >
        <BiChat className="text-white text-3xl" />
      </a>
    </div>
  );
};

export default ProfilCustomer;