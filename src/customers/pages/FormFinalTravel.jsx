import { useState } from 'react';
import { supabase } from '../../supabase'; // Make sure this path is correct for your Supabase client

export default function FormFinalTravel() {
  const [form, setForm] = useState({
    nama_pelanggan: '',
    tanggal_transaksi: '',
    jenis_pesanan: '',
    jumlah_pesanan: 1,
    total_harga: '',
    metode_pembayaran: '',
  });

  const [message, setMessage] = useState(null); // State for notification message
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Function to display notification messages
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Hide message after a few seconds
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  // Generic function to submit the order to Supabase with a specified status
  const submitOrder = async (e, orderStatus) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear previous messages
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

    const hasEmpty = requiredFields.some((field) => !form[field]);
    if (hasEmpty) {
      showMessage('Harap lengkapi semua data yang wajib diisi.', 'error');
      return;
    }

    try {
      // Convert total_harga to a float number
      const totalHargaNum = parseFloat(form.total_harga);
      if (isNaN(totalHargaNum)) {
        showMessage('Total harga harus berupa angka.', 'error');
        return;
      }

      const { error } = await supabase.from('penjualan').insert([
        {
          ...form,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10), // Ensure integer
          total_harga: totalHargaNum,
          status: orderStatus, // Status determined by the clicked button
        },
      ]);
      if (error) throw error;

      // Display success message based on the action
      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else { // If status is 'Belum Lunas' or other
        showMessage('Pemesanan berhasil dibuat!', 'success');
      }

      // Reset form after successful submission
      setForm({
        nama_pelanggan: '',
        tanggal_transaksi: '',
        jenis_pesanan: '',
        jumlah_pesanan: 1,
        total_harga: '',
        metode_pembayaran: '',
      });
    } catch (err) {
      console.error(err);
      showMessage('Terjadi kesalahan saat menyimpan data: ' + err.message, 'error');
    }
  };

  // Specific handler for "Masukkan Keranjang" button
  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang'); // Set status to 'Di Keranjang'
  };

  // Specific handler for "Pesan Sekarang" button
  const handlePlaceOrder = (e) => {
    submitOrder(e, 'Belum Lunas'); // Set status to 'Belum Lunas'
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <form
          // Remove onSubmit from form tag as buttons will handle submission
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Form Pemesanan Travel</h2>

          {/* Notification Message Area */}
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Masukkan nama"
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
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
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Contoh: Travel Jakarta - Bandung"
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
              <label htmlFor="total_harga" className="block text-sm font-medium mb-1">Total Harga (Rp)</label>
              <input
                type="number"
                id="total_harga"
                name="total_harga"
                value={form.total_harga}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Contoh: 300000"
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
                <option value="Kartu Kredit">Kartu Kredit</option> {/* Added Kartu Kredit option */}
              </select>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button" // Use type="button" to prevent automatic form submission
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Masukkan Keranjang
            </button>
            <button
              type="button" // Use type="button" to prevent automatic form submission
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