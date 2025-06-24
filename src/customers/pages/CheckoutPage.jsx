import { useState } from 'react';
// import { createClient } from '@supabase/supabase-js'; // Asumsi bahwa @supabase/supabase-js diinstal dan dapat diakses

// CATATAN PENTING:
// Dalam aplikasi React yang sebenarnya, objek 'supabase' biasanya akan
// diinisialisasi di file terpisah (misalnya, `src/supabaseClient.js`)
// dan kemudian diimpor ke komponen.
//
// Contoh inisialisasi di `src/supabaseClient.js`:
// import { createClient } from '@supabase/supabase-js'
// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//
// Kemudian di komponen ini:
// import { supabase } from '../../supabaseClient'; // Sesuaikan path

// Untuk tujuan kompilasi dan menjalankan kode ini di lingkungan yang
// mungkin tidak memiliki modul @supabase/supabase-js terinstal
// atau konfigurasi bundler yang kompleks, kita akan menggunakan objek 'supabase' tiruan.
// GANTI ini dengan impor Supabase yang sebenarnya di proyek Anda.
const supabase = {
  from: (tableName) => ({
    insert: async (data) => {
      console.log(`[MOCK SUPABASE] Inserting into ${tableName}:`, data);
      // Simulasikan respons sukses atau error
      if (Math.random() > 0.1) { // 90% sukses, 10% error
        return { error: null };
      } else {
        return { error: { message: 'Mock Error: Gagal menyimpan data.' } };
      }
    }
  })
};


export default function PemesananWisata() {
  // State untuk mengelola input form
  const [form, setForm] = useState({
    nama_pelanggan: '',
    tanggal_transaksi: '',
    jenis_pesanan: '', // Ini kemungkinan akan menjadi nama paket wisata
    jumlah_pesanan: 1, // Default ke 1
    total_harga: '',
    status: 'Belum Lunas', // Status default untuk pesanan baru, akan ditimpa oleh aksi tombol
    metode_pembayaran: '',
  });

  // State untuk mengelola pesan notifikasi (sukses/error)
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' atau 'error'

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menampilkan pesan notifikasi
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Sembunyikan pesan setelah beberapa detik
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  // Fungsi generik untuk submit pesanan ke Supabase
  const submitOrder = async (e, orderStatus) => {
    e.preventDefault(); // Mencegah refresh halaman default form submission

    // Reset pesan sebelumnya
    setMessage(null);
    setMessageType(null);

    // Validasi dasar
    if (!form.nama_pelanggan || !form.tanggal_transaksi || !form.jenis_pesanan || !form.jumlah_pesanan || !form.total_harga || !form.metode_pembayaran) {
      showMessage('Semua field wajib diisi!', 'error');
      return;
    }

    try {
      // Konversi total_harga ke angka float
      const totalHargaNum = parseFloat(form.total_harga);
      if (isNaN(totalHargaNum)) {
        showMessage('Total harga harus angka.', 'error');
        return;
      }

      // Memasukkan data ke tabel 'penjualan' di Supabase
      const { error } = await supabase.from('penjualan').insert([
        {
          nama_pelanggan: form.nama_pelanggan,
          tanggal_transaksi: form.tanggal_transaksi,
          jenis_pesanan: form.jenis_pesanan,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10), // Pastikan integer
          total_harga: totalHargaNum,
          status: orderStatus, // Status ditentukan berdasarkan tombol yang diklik
          metode_pembayaran: form.metode_pembayaran,
        },
      ]);

      if (error) throw error;

      // Tampilkan pesan sukses berdasarkan aksi
      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else { // Jika status 'Belum Lunas' atau lainnya
        showMessage('Pesanan berhasil dibuat!', 'success');
      }
      
      // Reset form setelah sukses submit
      setForm({
        nama_pelanggan: '',
        tanggal_transaksi: '',
        jenis_pesanan: '',
        jumlah_pesanan: 1,
        total_harga: '',
        status: 'Belum Lunas', // Kembali ke status default
        metode_pembayaran: '',
      });

    } catch (err) {
      console.error('Error submitting form:', err.message);
      showMessage('Terjadi kesalahan saat menyimpan pesanan: ' + err.message, 'error');
    }
  };

  // Handler spesifik untuk tombol "Masukkan Keranjang"
  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang'); // Mengatur status menjadi 'Di Keranjang'
  };

  // Handler spesifik untuk tombol "Pesan Sekarang"
  const handlePlaceOrder = (e) => {
    submitOrder(e, 'belum lunas'); // MENGUBAH STATUS MENJADI 'belum lunas'
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }} // Menggunakan gambar latar belakang Anda
    >
      <div className="w-full max-w-2xl mx-auto p-4">
        <form
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Form Pemesanan Paket Wisata</h2>

          {/* Area untuk menampilkan pesan notifikasi */}
          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nama_pelanggan" className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
              <input
                type="text"
                id="nama_pelanggan"
                name="nama_pelanggan"
                value={form.nama_pelanggan}
                onChange={handleChange}
                placeholder="Masukkan Nama Pelanggan"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="tanggal_transaksi" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Transaksi</label>
              <input
                type="date"
                id="tanggal_transaksi"
                name="tanggal_transaksi"
                value={form.tanggal_transaksi}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="jenis_pesanan" className="block text-sm font-medium text-gray-700 mb-1">Jenis Pesanan (Nama Paket Wisata)</label>
              <input
                type="text"
                id="jenis_pesanan"
                name="jenis_pesanan"
                value={form.jenis_pesanan}
                onChange={handleChange}
                placeholder="Contoh: Paket Bali Eksotis"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="jumlah_pesanan" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pesanan (Orang/Tiket)</label>
              <input
                type="number"
                id="jumlah_pesanan"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min="1"
                placeholder="Jumlah"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="total_harga" className="block text-sm font-medium text-gray-700 mb-1">Total Harga</label>
              <input
                type="number"
                id="total_harga"
                name="total_harga"
                value={form.total_harga}
                onChange={handleChange}
                step="0.01" // Memungkinkan nilai desimal untuk mata uang
                placeholder="Contoh: 1500000.00"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="metode_pembayaran" className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
              <select
                id="metode_pembayaran"
                name="metode_pembayaran"
                value={form.metode_pembayaran}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Pilih Metode Pembayaran</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Tunai">Tunai</option>
              </select>
            </div>
          </div>

          {/* Area tombol */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="button" // Gunakan type="button" agar tidak otomatis submit form
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Masukkan Keranjang
            </button>
            <button
              type="button" // Gunakan type="button" agar tidak otomatis submit form
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
