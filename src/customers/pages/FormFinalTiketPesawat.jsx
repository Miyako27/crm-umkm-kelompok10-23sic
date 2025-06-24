import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

export default function FormPemesanan() {
  const [form, setForm] = useState({
    nama_pelanggan: '',
    tanggal_transaksi: '',
    jenis_pesanan: '',
    jumlah_pesanan: 1,
    total_harga: '',
    metode_pembayaran: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (isOrderNow = false) => {
    const requiredFields = [
      'nama_pelanggan',
      'tanggal_transaksi',
      'jenis_pesanan',
      'jumlah_pesanan',
      'total_harga',
      'metode_pembayaran',
    ];

    const hasEmptyFields = requiredFields.some((field) => !form[field]);
    if (hasEmptyFields) {
      alert('Semua field wajib diisi');
      return;
    }

    try {
      const { error } = await supabase.from('penjualan').insert([
        {
          ...form,
          status: 'belum lunas',
        },
      ]);
      if (error) throw error;

      alert(isOrderNow ? 'Pesanan berhasil dibuat!' : 'Berhasil ditambahkan ke keranjang');

      // Reset form jika perlu
      setForm({
        nama_pelanggan: '',
        tanggal_transaksi: '',
        jenis_pesanan: '',
        jumlah_pesanan: 1,
        total_harga: '',
        metode_pembayaran: '',
      });

      // Redirect jika pesan sekarang
      if (isOrderNow) {
        navigate('/konfirmasi-pembayaran');
      }

    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    handleSubmit(false); // hanya simpan ke database
  };

  const handleOrderNow = (e) => {
    e.preventDefault();
    handleSubmit(true); // simpan lalu redirect
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="w-full max-w-2xl mx-auto p-4">
        <form
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Form Pemesanan Tiket</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Pelanggan</label>
              <input
                type="text"
                name="nama_pelanggan"
                value={form.nama_pelanggan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Transaksi</label>
              <input
                type="date"
                name="tanggal_transaksi"
                value={form.tanggal_transaksi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jenis Pesanan</label>
              <input
                type="text"
                name="jenis_pesanan"
                value={form.jenis_pesanan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Contoh: Tiket Pesawat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jumlah Pesanan</label>
              <input
                type="number"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Total Harga</label>
              <input
                type="number"
                name="total_harga"
                value={form.total_harga}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Contoh: 750000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Metode Pembayaran</label>
              <select
                name="metode_pembayaran"
                value={form.metode_pembayaran}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Pilih Metode</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-between">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold"
            >
              Masukkan Keranjang
            </button>
            <button
              onClick={handleOrderNow}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
            >
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
