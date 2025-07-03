// src/pages/KeranjangSaya.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa';
import { supabase } from '../../supabase'; // Pastikan path ini benar ke instance Supabase Anda

function KeranjangSaya() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          setError('Anda harus login untuk melihat keranjang Anda.');
          setIsLoading(false);
          return;
        }

        const userEmail = userData.user.email;

        const { data: pelangganData, error: pelangganError } = await supabase
          .from('pelanggan')
          .select('nama')
          .eq('email', userEmail)
          .single();

        if (pelangganError || !pelangganData) {
          setError('Gagal memuat nama pelanggan. Pastikan profil Anda lengkap.');
          setIsLoading(false);
          return;
        }

        const namaPelanggan = pelangganData.nama;

        const { data: penjualanData, error: penjualanError } = await supabase
          .from('penjualan')
          .select(`
            id_penjualan,
            jumlah_pesanan,
            total_harga,
            id_paket,
            paketwisata (
              nama_paket,
              harga,
              gambar_url
            )
          `) // Pastikan tidak ada komentar di dalam tanda backtick ini
          .eq('nama_pelanggan', namaPelanggan)
          .eq('status', 'Di Keranjang');

        if (penjualanError) {
          console.error("Error fetching cart items:", penjualanError);
          setError('Gagal memuat item keranjang: ' + penjualanError.message);
          setIsLoading(false);
          return;
        }

        if (penjualanData) {
          const mappedCartItems = penjualanData.map(item => ({
            id_penjualan: item.id_penjualan,
            id_paket: item.id_paket,
            name: item.paketwisata ? item.paketwisata.nama_paket : 'Nama Paket Tidak Tersedia',
            price: item.paketwisata ? item.paketwisata.harga : item.total_harga / item.jumlah_pesanan,
            quantity: item.jumlah_pesanan,
            imageUrl: item.paketwisata ? item.paketwisata.gambar_url : 'https://via.placeholder.com/150',
            current_total_price: item.total_harga
          }));
          setCartItems(mappedCartItems);
        }

      } catch (err) {
        console.error("Unexpected error fetching cart:", err);
        setError('Terjadi kesalahan tak terduga saat memuat keranjang.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [refreshKey]);

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleQuantityChange = async (penjualanId, delta) => {
    // Optimistic update
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id_penjualan === penjualanId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    const itemToUpdate = cartItems.find(item => item.id_penjualan === penjualanId);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(1, itemToUpdate.quantity + delta);
    const newTotalHarga = itemToUpdate.price * newQuantity;

    try {
      const { error } = await supabase
        .from('penjualan')
        .update({
          jumlah_pesanan: newQuantity,
          total_harga: newTotalHarga
        })
        .eq('id_penjualan', penjualanId);

      if (error) {
        console.error("Error updating quantity in Supabase:", error);
        setError('Gagal mengubah jumlah pesanan: ' + error.message);
        // Rollback optimistic update if error
        setRefreshKey(prev => prev + 1);
      } else {
        console.log(`Updated order ${penjualanId}: quantity to ${newQuantity}, total_harga to ${newTotalHarga}`);
      }
    } catch (err) {
      console.error("Unexpected error updating quantity:", err);
      setError('Terjadi kesalahan tak terduga saat mengubah jumlah.');
      setRefreshKey(prev => prev + 1); // Rollback
    }
  };


  const handleRemoveItem = async (penjualanId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini dari keranjang?')) {
      try {
        const { error } = await supabase
          .from('penjualan')
          .delete()
          .eq('id_penjualan', penjualanId);

        if (error) {
          console.error("Error deleting item from Supabase:", error);
          setError('Gagal menghapus item dari keranjang: ' + error.message);
        } else {
          setCartItems((prevItems) => prevItems.filter((item) => item.id_penjualan !== penjualanId));
          console.log(`Item with id_penjualan ${penjualanId} removed successfully.`);
        }
      } catch (err) {
        console.error("Unexpected error deleting item:", err);
        setError('Terjadi kesalahan tak terduga saat menghapus item.');
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.');
      return;
    }

    try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
            alert('Anda harus login untuk melanjutkan pembayaran.');
            navigate('/login');
            return;
        }
        const userEmail = userData.user.email;
        const { data: pelangganData, error: pelangganError } = await supabase
            .from('pelanggan')
            .select('nama')
            .eq('email', userEmail)
            .single();

        if (pelangganError || !pelangganData) {
            alert('Gagal mengambil nama pelanggan. Harap lengkapi profil Anda.');
            return;
        }
        const namaPelanggan = pelangganData.nama;

        const { error: updateError } = await supabase
            .from('penjualan')
            .update({ status: 'Menunggu Pembayaran' })
            .eq('nama_pelanggan', namaPelanggan)
            .eq('status', 'Di Keranjang');

        if (updateError) {
            console.error("Error updating cart items status:", updateError);
            alert('Gagal melanjutkan ke pembayaran: ' + updateError.message);
        } else {
            alert('Berhasil melanjutkan ke pembayaran dengan total: Rp ' + calculateGrandTotal().toLocaleString('id-ID'));
            setCartItems([]);
            navigate('/testimoni-customer');
        }

    } catch (err) {
        console.error("Unexpected error during checkout:", err);
        alert('Terjadi kesalahan tak terduga saat checkout.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 text-center py-20">
        <p className="text-gray-600 text-lg">Memuat item keranjang...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 text-center py-20">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <p className="text-gray-600 mt-2">Pastikan Anda sudah login dan memiliki item di keranjang.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Keranjang Saya</h2>
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:underline text-orange-600 font-semibold">
              Beranda
            </Link>{' '}
            / <span className="text-gray-700">Keranjang</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="flex-grow bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Daftar Item di Keranjang</h3>
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Keranjang Anda kosong.
              <p className="mt-2">
                <Link to="/order" className="text-orange-600 hover:underline">
                  Mulai jelajahi paket wisata kami!
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id_penjualan}
                  className="flex items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                    <p className="text-gray-600">
                      Harga per unit: Rp {item.price.toLocaleString('id-ID')}
                    </p>
                    <p className="text-gray-600">
                      Subtotal: Rp {calculateSubtotal(item).toLocaleString('id-ID')}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id_penjualan, -1)}
                        className="text-gray-600 hover:text-orange-600 text-2xl"
                        title="Kurangi Jumlah"
                      >
                        <FaMinusSquare />
                      </button>
                      <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id_penjualan, 1)}
                        className="text-gray-600 hover:text-orange-600 text-2xl"
                        title="Tambah Jumlah"
                      >
                        <FaPlusSquare />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id_penjualan)}
                        className="ml-auto text-red-600 hover:text-red-800 text-xl"
                        title="Hapus Item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Ringkasan Pesanan</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Total Item ({cartItems.length})</span>
              <span>Rp {calculateGrandTotal().toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800 pt-3 border-t border-gray-200">
              <span>Total Akhir</span>
              <span>Rp {calculateGrandTotal().toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold mt-6 transition duration-200 ease-in-out"
          >
            Lanjutkan ke Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

export default KeranjangSaya;