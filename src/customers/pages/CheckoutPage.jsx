import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabase'; 

// Fungsi helper untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Komponen PemesananWisata sekarang akan menerima props
export default function PemesananWisata() {
  const navigate = useNavigate();
  const location = useLocation(); // Gunakan useLocation untuk mengakses state yang dilewatkan

  // Dapatkan data paket dari state lokasi (jika ada)
  const { jenisPaket, hargaPaket } = location.state || {}; // Destructure, default ke objek kosong

  // State untuk mengelola input form
  const [form, setForm] = useState({
    nama_pelanggan: '', // Otomatis terisi dari akun yang login (disembunyikan)
    tanggal_transaksi: getTodayDate(), // Otomatis terisi tanggal hari ini (disembunyikan)
    jenis_pesanan: jenisPaket || '', // <<-- Inisialisasi dari props/state lokasi
    jumlah_pesanan: 1,
    total_harga: 0, // <<-- Default ke 0, akan dihitung otomatis
    status: 'Belum Lunas',
    metode_pembayaran: '',
  });

  // State untuk mengelola pesan notifikasi (sukses/error)
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' atau 'error'
  const [isLoadingUser, setIsLoadingUser] = useState(true); // Untuk mengelola loading data user

  // Efek untuk mengambil nama pengguna saat komponen dimuat
  useEffect(() => {
    const fetchUserName = async () => {
      setIsLoadingUser(true);
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getUser();

        if (sessionError || !sessionData?.user) {
          console.error('Gagal mengambil session atau tidak ada pengguna:', sessionError);
          showMessage('Anda harus login untuk membuat pesanan.', 'error');
          // navigate('/login'); // Uncomment ini jika Anda ingin mengarahkan ke halaman login
          setIsLoadingUser(false);
          return;
        }

        const email = sessionData.user.email;

        const { data: pelangganData, error: pelangganError } = await supabase
          .from('pelanggan')
          .select('nama')
          .eq('email', email)
          .single();

        if (pelangganError) {
          console.error('Gagal ambil data pelanggan dari tabel "pelanggan":', pelangganError);
          showMessage('Gagal memuat nama pelanggan dari database. Pastikan profil Anda lengkap.', 'error');
          setForm((prev) => ({
            ...prev,
            nama_pelanggan: email,
          }));
        } else if (pelangganData) {
          setForm((prev) => ({
            ...prev,
            nama_pelanggan: pelangganData.nama,
          }));
          console.log("Nama pelanggan diambil dari tabel 'pelanggan' (disembunyikan):", pelangganData.nama);
        } else {
          console.warn('Nama pengguna tidak ditemukan di tabel pelanggan dengan email ini:', email);
          showMessage('Nama pengguna tidak dapat diambil. Silakan lengkapi profil Anda.', 'error');
          setForm((prev) => ({
            ...prev,
            nama_pelanggan: email,
          }));
        }
      } catch (error) {
        console.error('Error in fetching user data:', error.message);
        showMessage('Terjadi kesalahan saat memuat data pengguna.', 'error');
        setForm((prev) => ({ ...prev, nama_pelanggan: '' }));
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserName();
  }, [navigate]);

  // Efek untuk menghitung total harga saat jumlah pesanan atau harga paket berubah
  useEffect(() => {
    if (form.jumlah_pesanan > 0 && hargaPaket) {
      setForm((prev) => ({
        ...prev,
        total_harga: (form.jumlah_pesanan * hargaPaket).toFixed(2), // Format ke 2 desimal
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        total_harga: 0,
      }));
    }
  }, [form.jumlah_pesanan, hargaPaket]); // Bergantung pada jumlah pesanan dan harga paket yang diterima

  // Handler untuk perubahan input form (hanya untuk input yang terlihat dan dapat diedit)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menampilkan pesan notifikasi
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  // Fungsi generik untuk submit pesanan ke Supabase
  const submitOrder = async (e, orderStatus) => {
    e.preventDefault();

    setMessage(null);
    setMessageType(null);

    // Validasi tambahan untuk jenis_pesanan dan total_harga yang sekarang otomatis
    if (!form.nama_pelanggan || !form.tanggal_transaksi || !form.jenis_pesanan || !form.jumlah_pesanan || form.total_harga <= 0 || !form.metode_pembayaran) {
      showMessage('Harap lengkapi semua detail pemesanan, termasuk memilih paket wisata.', 'error');
      return;
    }

    try {
      const totalHargaNum = parseFloat(form.total_harga);
      // Validasi tambahan agar total_harga tidak nol atau negatif jika tidak diinginkan
      if (isNaN(totalHargaNum) || totalHargaNum <= 0) {
        showMessage('Total harga tidak valid. Pastikan jumlah pesanan dan harga paket benar.', 'error');
        return;
      }

      const { error } = await supabase.from('penjualan').insert([
        {
          nama_pelanggan: form.nama_pelanggan,
          tanggal_transaksi: form.tanggal_transaksi,
          jenis_pesanan: form.jenis_pesanan,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
          total_harga: totalHargaNum,
          status: orderStatus,
          metode_pembayaran: form.metode_pembayaran,
        },
      ]);

      if (error) throw error;

      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else {
        showMessage('Pesanan berhasil dibuat!', 'success');
        navigate('/testimoni-customer');
      }

      // Reset form setelah sukses submit (kecuali nama_pelanggan, tanggal_transaksi, dan jenis_pesanan yang otomatis)
      setForm((prev) => ({
        ...prev,
        jumlah_pesanan: 1,
        total_harga: (hargaPaket * 1).toFixed(2), // Reset total harga berdasarkan harga paket default untuk 1 orang
        status: 'Belum Lunas',
        metode_pembayaran: '',
      }));

    } catch (err) {
      console.error('Error submitting form:', err.message);
      showMessage('Terjadi kesalahan saat menyimpan pesanan: ' + err.message, 'error');
    }
  };

  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang');
  };

  const handlePlaceOrder = (e) => {
    submitOrder(e, 'Belum Lunas');
  };

  if (isLoadingUser || !jenisPaket || !hargaPaket) { // Tambahkan kondisi loading untuk paket
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Memuat data atau menunggu pemilihan paket...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="w-full max-w-2xl mx-auto p-4">
        <form
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Form Pemesanan Paket Wisata</h2>

          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field Nama Pelanggan dan Tanggal Transaksi tetap disembunyikan */}

            <div>
              <label htmlFor="jenis_pesanan_display" className="block text-sm font-medium text-gray-700 mb-1">Jenis Pesanan (Nama Paket Wisata)</label>
              <input
                type="text"
                id="jenis_pesanan_display"
                value={form.jenis_pesanan}
                readOnly // Membuat input ini hanya-baca
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
              {/* Input sebenarnya untuk jenis_pesanan di state, disembunyikan */}
              <input type="hidden" name="jenis_pesanan" value={form.jenis_pesanan} />
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
              <label htmlFor="total_harga_display" className="block text-sm font-medium text-gray-700 mb-1">Total Harga</label>
              <input
                type="text" // Ubah ke text karena ini display harga yang diformat
                id="total_harga_display"
                value={`Rp ${parseFloat(form.total_harga).toLocaleString('id-ID')}`} // Format tampilan
                readOnly // Hanya-baca
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
              {/* Input sebenarnya untuk total_harga di state, disembunyikan */}
              <input type="hidden" name="total_harga" value={form.total_harga} />
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

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
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