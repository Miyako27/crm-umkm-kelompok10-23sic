import { useState, useEffect } from 'react';
import { supabase } from '../../supabase'; 
import { useLocation } from 'react-router-dom'; 

export default function FormFinalTravel() {
  const location = useLocation();
  const selectedTravel = location.state?.selectedTravel;

  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    nama_pelanggan: '',
    tanggal_transaksi: '',
    jenis_pesanan: '',
    jumlah_pesanan: 1,
    total_harga: '',
    metode_pembayaran: '',
    id_travel: selectedTravel?.id_travel || null,
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Effect to fetch current user and pre-fill initial form values
  useEffect(() => {
    const fetchUserAndPrefillForm = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError.message);
        return;
      }
      setCurrentUser(user);

      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 16);

      setForm((prev) => ({
        ...prev,
        nama_pelanggan: user ? user.user_metadata.full_name || user.email : '',
        tanggal_transaksi: formattedDate,
        jenis_pesanan: selectedTravel ? `Travel ${selectedTravel.asal} - ${selectedTravel.tujuan}` : '',
        jumlah_pesanan: 1, // Always reset to 1 on initial load
        total_harga: selectedTravel ? (selectedTravel.harga * 1) : '', // Initial total price for 1 quantity
        id_travel: selectedTravel?.id_travel || null,
      }));
    };

    fetchUserAndPrefillForm();
  }, [selectedTravel]);

  // Effect to update total_harga when jumlah_pesanan changes
  useEffect(() => {
    if (selectedTravel && form.jumlah_pesanan) {
      const calculatedTotal = parseFloat(selectedTravel.harga) * parseInt(form.jumlah_pesanan, 10);
      setForm((prev) => ({
        ...prev,
        total_harga: calculatedTotal,
      }));
    } else if (!form.jumlah_pesanan) {
      setForm((prev) => ({
        ...prev,
        total_harga: 0, // Set to 0 if quantity is empty or invalid
      }));
    }
  }, [form.jumlah_pesanan, selectedTravel]); // Depend on jumlah_pesanan and selectedTravel

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const submitOrder = async (e, orderStatus) => {
    e.preventDefault();

    setMessage(null);
    setMessageType(null);

    const requiredFields = [
      'nama_pelanggan',
      'tanggal_transaksi',
      'jenis_pesanan',
      'jumlah_pesanan',
      'total_harga',
      'metode_pembayaran',
    ];

    const hasEmpty = requiredFields.some((field) => !form[field] && field !== 'total_harga'); // total_harga is calculated
    if (hasEmpty) {
      showMessage('Harap lengkapi semua data yang wajib diisi.', 'error');
      return;
    }

    try {
      const totalHargaNum = parseFloat(form.total_harga);
      if (isNaN(totalHargaNum) || totalHargaNum <= 0) { // Ensure total_harga is a valid positive number
        showMessage('Total harga tidak valid. Pastikan jumlah pesanan benar.', 'error');
        return;
      }

      const { error } = await supabase.from('penjualan').insert([
        {
          ...form,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
          total_harga: totalHargaNum,
          status: orderStatus,
          id_travel: form.id_travel,
        },
      ]);
      if (error) throw error;

      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else {
        showMessage('Pemesanan berhasil dibuat!', 'success');
      }

      // Reset form after successful submission
      setForm((prev) => ({
        ...prev,
        jenis_pesanan: selectedTravel ? `Travel ${selectedTravel.asal} - ${selectedTravel.tujuan}` : '', // Keep filled
        jumlah_pesanan: 1, // Reset quantity to 1
        total_harga: selectedTravel ? (parseFloat(selectedTravel.harga) * 1) : '', // Recalculate for 1 quantity
        metode_pembayaran: '',
        id_travel: selectedTravel?.id_travel || null, // Keep filled
      }));

    } catch (err) {
      console.error(err);
      showMessage('Terjadi kesalahan saat menyimpan data: ' + err.message, 'error');
    }
  };

  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang');
  };

  const handlePlaceOrder = (e) => {
    submitOrder(e, 'Belum Lunas');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <form
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Form Pemesanan Travel</h2>

          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nama_pelanggan" className="block text-sm font-medium mb-1">Nama Pelanggan</label>
              <input
                type="text"
                id="nama_pelanggan"
                name="nama_pelanggan"
                value={form.nama_pelanggan}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="tanggal_transaksi" className="block text-sm font-medium mb-1">Tanggal Transaksi</label>
              <input
                type="datetime-local"
                id="tanggal_transaksi"
                name="tanggal_transaksi"
                value={form.tanggal_transaksi}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="jenis_pesanan" className="block text-sm font-medium mb-1">Jenis Pesanan</label>
              <input
                type="text"
                id="jenis_pesanan"
                name="jenis_pesanan"
                value={form.jenis_pesanan}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="jumlah_pesanan" className="block text-sm font-medium mb-1">Jumlah Pesanan</label>
              <input
                type="number"
                id="jumlah_pesanan"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="total_harga" className="block text-sm font-medium mb-1">Total Harga</label>
              <input
                type="text" // Change to type="text" for displaying formatted currency
                id="total_harga"
                name="total_harga"
                value={
                  typeof form.total_harga === 'number'
                    ? `Rp ${form.total_harga.toLocaleString('id-ID')}`
                    : ''
                }
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly // Make it read-only as it's calculated
                required
              />
            </div>

            <div>
              <label htmlFor="metode_pembayaran" className="block text-sm font-medium mb-1">Metode Pembayaran</label>
              <select
                id="metode_pembayaran"
                name="metode_pembayaran"
                value={form.metode_pembayaran}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Pilih Metode</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Tunai">Tunai</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Masukkan Keranjang
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="flex-1 bg-orange-500 hover:bg-orange-600 border border-gray-300 text-white px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
