// src/pages/customers/Keranjang.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusSquare, FaMinusSquare, FaTrash, FaCar } from 'react-icons/fa'; // <--- GANTI FaPlane menjadi FaCar di sini
import { BiChat } from "react-icons/bi";
import { supabase } from '../../supabase';

function Keranjang() {
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
                    setError('Gagal memuat nama pelanggan. Pastikan profil Anda lengkap atau hubungi dukungan.');
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
                        id_travel,
                        paketwisata (
                            nama_paket,
                            harga,
                            gambar_url
                        ),
                        travel (
                            nama_travel,
                            harga
                        )
                    `)
                    .eq('nama_pelanggan', namaPelanggan)
                    .eq('status', 'Di Keranjang');

                if (penjualanError) {
                    console.error("Error fetching cart items:", penjualanError);
                    console.error("Supabase error object:", penjualanError);
                    setError(`Gagal memuat item keranjang: ${penjualanError.message}.`);
                    setIsLoading(false);
                    return;
                }

                if (penjualanData) {
                    const mappedCartItems = penjualanData.map(item => {
                        let name, price, imageUrl, type;

                        if (item.id_paket && item.paketwisata) {
                            name = item.paketwisata.nama_paket;
                            price = item.paketwisata.harga;
                            imageUrl = item.paketwisata.gambar_url || 'https://via.placeholder.com/150?text=Paket+Wisata';
                            type = 'paket';
                        }
                        else if (item.id_travel && item.travel) {
                            name = `Layanan Travel: ${item.travel.nama_travel}`;
                            price = item.travel.harga;
                            imageUrl = null;
                            type = 'travel';
                        }
                        else {
                            name = 'Produk Tidak Diketahui (Detail tidak lengkap)';
                            price = item.total_harga / item.jumlah_pesanan || 0;
                            imageUrl = 'https://via.placeholder.com/150?text=Unknown';
                            type = 'unknown';
                            console.warn("Item without complete product details or unsupported type:", item);
                        }

                        return {
                            id_penjualan: item.id_penjualan,
                            id_paket: item.id_paket,
                            id_travel: item.id_travel,
                            name: name,
                            price: parseFloat(price),
                            quantity: item.jumlah_pesanan,
                            imageUrl: imageUrl,
                            type: type,
                            current_total_price: parseFloat(price) * item.quantity
                        };
                    });
                    setCartItems(mappedCartItems);
                }

            } catch (err) {
                console.error("Unexpected error fetching cart:", err);
                setError('Terjadi kesalahan tak terduga saat memuat keranjang. Silakan coba lagi.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, [refreshKey]);

    const calculateSubtotal = (item) => {
        return parseFloat(item.price) * item.quantity;
    };

    const calculateGrandTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    const handleQuantityChange = async (penjualanId, delta) => {
        const itemToUpdate = cartItems.find(item => item.id_penjualan === penjualanId);
        if (!itemToUpdate) return;

        const newQuantity = Math.max(1, itemToUpdate.quantity + delta);
        const newTotalHarga = itemToUpdate.price * newQuantity;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id_penjualan === penjualanId
                    ? { ...item, quantity: newQuantity, current_total_price: newTotalHarga }
                    : item
            )
        );

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
                setRefreshKey(prev => prev + 1);
            } else {
                console.log(`Updated order ${penjualanId}: quantity to ${newQuantity}, total_harga to ${newTotalHarga}`);
            }
        } catch (err) {
            console.error("Unexpected error updating quantity:", err);
            setError('Terjadi kesalahan tak terduga saat mengubah jumlah.');
            setRefreshKey(prev => prev + 1);
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
                {!supabase.auth.getUser() && (
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Login Sekarang
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen pb-10 font-sans">
            <div className="bg-gray-50 py-4 border-b border-gray-200 px-5 mb-8">
                <div className="max-w-7xl mx-auto flex flex-col space-y-1">
                    <h2 className="text-3xl font-extrabold text-gray-800">Keranjang Saya</h2>
                    <div className="text-sm text-gray-600">
                        <Link to="/" className="hover:underline text-orange-600 font-semibold">
                            Beranda
                        </Link>{" "}
                        / <span className="text-gray-700">Keranjang</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-5 flex flex-col lg:flex-row gap-6">
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
                                    {item.type === 'travel' ? (
                                        <div className="w-20 h-20 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                                            <FaCar className="text-gray-600 text-4xl" /> {/* <--- GANTI FaPlane menjadi FaCar di sini */}
                                        </div>
                                    ) : (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md mr-4"
                                        />
                                    )}
                                    <div className="flex-grow">
                                        <h4 className="font-semibold text-lg text-gray-800">{item.name}</h4>
                                        <p className="text-gray-600">
                                            Harga per unit: Rp {item.price.toLocaleString('id-ID')}
                                        </p>
                                        <p className="text-gray-700 font-medium mt-1">
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

                <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit sticky top-6">
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

export default Keranjang;