import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiChat } from "react-icons/bi";
import { FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa';

function KeranjangSaya() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('myCart');
    return savedCart ? JSON.parse(savedCart) : [
      {
        id: 1,
        name: 'Bali 4 Hari 3 Malam',
        price: 5000000,
        quantity: 1,
        imageUrl: 'https://cdn.audleytravel.com/2478/1770/79/16027396-pura-ulun-danu-bratan-bali.jpg'
      },
      {
        id: 2,
        name: 'Yogyakarta Heritage Tour',
        price: 1800000,
        quantity: 1,
        imageUrl: 'https://agievent.com/public/uploads/0000/1/2020/06/02/yogyakarta-heritage-tour-borobudur-and-prambanan-promo.jpg'
      },
      {
        id: 3,
        name: 'Labuan Bajo & Komodo Adventure',
        price: 3900000,
        quantity: 1,
        imageUrl: 'https://lingkarwilis.com/wp-content/uploads/2024/10/labuannnnnn.webp'
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('myCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateSubtotal = (item) => item.price * item.quantity;
  const calculateGrandTotal = () => cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);

  const handleQuantityChange = (itemId, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini dari keranjang?')) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Keranjang Anda kosong. Silakan tambahkan item terlebih dahulu.');
      return;
    }
    alert('Melanjutkan ke halaman pembayaran dengan total: Rp ' + calculateGrandTotal().toLocaleString('id-ID'));
  };

  return (
    <div className="w-full min-h-screen pb-10">
      {/* Breadcrumb - background abu abu full lebar */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 px-5 mb-8">
        <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-800">Keranjang Saya</h2>
            <div className="text-sm text-gray-600">
              <Link to="/" className="hover:underline text-orange-600 font-semibold">
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Keranjang</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row gap-6">
        {/* Daftar Item */}
        <div className="flex-grow bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Daftar Item di Keranjang</h3>
          {cartItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Keranjang Anda kosong.
              <p className="mt-2">
                <Link to="/" className="text-orange-600 hover:underline">
                  Mulai jelajahi produk kami!
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
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
                      Rp {calculateSubtotal(item).toLocaleString('id-ID')}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="text-gray-600 hover:text-orange-600 text-2xl"
                        title="Kurangi Jumlah"
                      >
                        <FaMinusSquare />
                      </button>
                      <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="text-gray-600 hover:text-orange-600 text-2xl"
                        title="Tambah Jumlah"
                      >
                        <FaPlusSquare />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
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

        {/* Ringkasan Pesanan */}
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

      {/* Tombol Chat Mengambang */}
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
}

export default KeranjangSaya;
