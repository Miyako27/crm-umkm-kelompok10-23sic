import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabase'; // PASTIKAN PATH INI BENAR SESUAI STRUKTUR PROYEK ANDA

// Fungsi helper untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function PemesananWisata() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dapatkan data paket dari state lokasi. Jika tidak ada, default ke objek kosong.
  // Keberadaan nilai-nilai ini TIDAK akan memblokir rendering form awal,
  // tetapi SANGAT PENTING untuk mengisi form otomatis dan perhitungan.
  const { jenisPaket, hargaPaket, idPaket } = location.state || {}; // idPaket akan berisi UUID dari paketwisata

  // State untuk mengelola input form
  const [form, setForm] = useState({
    nama_pelanggan: '', // Akan diisi dari data user yang login
    tanggal_transaksi: getTodayDate(), // Otomatis tanggal hari ini
    jenis_pesanan: jenisPaket || '', // Diisi dari location.state, jika ada (kalau tidak, kosong)
    jumlah_pesanan: 1,
    total_harga: 0, // Akan dihitung dari jumlah_pesanan * hargaPaket
    status: 'Belum Lunas', // Status default saat pertama kali dibuat
    metode_pembayaran: '',
  });

  // State untuk mengelola pesan notifikasi (sukses/error)
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' atau 'error'
  const [isLoadingUser, setIsLoadingUser] = useState(true); // Untuk mengelola loading data user

  // Efek untuk mengambil nama pengguna saat komponen dimuat
  useEffect(() => {
    const fetchUserName = async () => {
      setIsLoadingUser(true); // Mulai loading data user
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getUser();

        if (sessionError || !sessionData?.user) {
          console.error('Gagal mengambil session atau tidak ada pengguna:', sessionError);
          showMessage('Anda harus login untuk membuat pesanan.', 'error');
          // Opsional: Anda bisa mengarahkan pengguna ke halaman login jika tidak ada sesi
          // navigate('/login');
          setIsLoadingUser(false); // Selesai loading, meskipun ada error
          return;
        }

        const email = sessionData.user.email;

        // Ambil nama dari tabel 'pelanggan' berdasarkan email user
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
            nama_pelanggan: email, // Fallback ke email jika nama tidak ditemukan
          }));
        } else if (pelangganData) {
          setForm((prev) => ({
            ...prev,
            nama_pelanggan: pelangganData.nama,
          }));
          console.log("Nama pelanggan diambil dari tabel 'pelanggan' (disembunyikan):", pelangganData.nama);
        } else {
          console.warn('Nama pengguna tidak ditemukan di tabel pelanggan dengan email ini:', email);
          showMessage('Nama pengguna tidak dapat diambil. Silakan lengkapi profil Anda di profil.', 'error');
          setForm((prev) => ({
            ...prev,
            nama_pelanggan: email, // Fallback ke email jika nama tidak ditemukan
          }));
        }
      } catch (error) {
        console.error('Error in fetching user data:', error.message);
        showMessage('Terjadi kesalahan saat memuat data pengguna.', 'error');
        setForm((prev) => ({ ...prev, nama_pelanggan: '' })); // Kosongkan nama pelanggan jika ada error
      } finally {
        setIsLoadingUser(false); // Selesai loading, terlepas dari sukses/gagal
      }
    };

    fetchUserName();
  }, [navigate]); // navigate disertakan sebagai dependensi karena mungkin digunakan untuk redirect

  // Efek untuk menghitung total harga saat jumlah pesanan atau harga paket berubah
  useEffect(() => {
    if (form.jumlah_pesanan > 0 && hargaPaket) {
      setForm((prev) => ({
        ...prev,
        total_harga: (form.jumlah_pesanan * parseFloat(hargaPaket)).toFixed(2), // Pastikan hargaPaket adalah float
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        total_harga: 0, // Jika hargaPaket tidak ada atau jumlah 0, total_harga jadi 0
      }));
    }
  }, [form.jumlah_pesanan, hargaPaket]); // Bergantung pada jumlah pesanan dan harga paket yang diterima

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menampilkan pesan notifikasi
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    // Hilangkan pesan setelah 5 detik
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  // Fungsi generik untuk submit pesanan ke Supabase
  const submitOrder = async (e, orderStatus) => {
    e.preventDefault(); // Mencegah refresh halaman default form

    setMessage(null); // Bersihkan pesan notifikasi sebelumnya
    setMessageType(null);

    // Validasi form dasar (data yang mutlak harus diisi pengguna atau sudah otomatis terisi)
    if (!form.nama_pelanggan || !form.tanggal_transaksi || !form.jenis_pesanan || form.jumlah_pesanan <= 0 || form.total_harga <= 0 || !form.metode_pembayaran) {
      let validationMessage = 'Harap lengkapi semua detail pemesanan: ';
      if (!form.nama_pelanggan) validationMessage += 'Nama Pelanggan, ';
      if (!form.tanggal_transaksi) validationMessage += 'Tanggal Transaksi, ';
      if (!form.jenis_pesanan) validationMessage += 'Jenis Pesanan (Nama Paket), '; // Akan kosong jika tidak dari props
      if (form.jumlah_pesanan <= 0) validationMessage += 'Jumlah Pesanan (minimal 1), ';
      if (form.total_harga <= 0) validationMessage += 'Total Harga (harus lebih dari 0), ';
      if (!form.metode_pembayaran) validationMessage += 'Metode Pembayaran, ';
      showMessage(validationMessage.slice(0, -2) + '.', 'error'); // Hapus koma terakhir dan spasi
      return;
    }

    // VALIDASI KRUSIAL UNTUK ID_PAKET
    // Jika idPaket tidak ada (belum diteruskan dari halaman sebelumnya)
    // dan Anda ingin ini WAJIB diisi, tambahkan validasi ini:
    if (!idPaket) {
        showMessage('ID Paket tidak ditemukan. Mohon pilih paket wisata terlebih dahulu.', 'error');
        return;
    }

    try {
      const totalHargaNum = parseFloat(form.total_harga);
      if (isNaN(totalHargaNum) || totalHargaNum <= 0) {
        showMessage('Total harga tidak valid. Pastikan jumlah pesanan dan harga paket benar.', 'error');
        return;
      }

      // Log idPaket sebelum dikirim ke Supabase untuk debugging
      console.log('Data yang akan dikirim ke Supabase:', {
          nama_pelanggan: form.nama_pelanggan,
          tanggal_transaksi: form.tanggal_transaksi,
          jenis_pesanan: form.jenis_pesanan,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
          total_harga: totalHargaNum,
          status: orderStatus,
          metode_pembayaran: form.metode_pembayaran,
          id_paket: idPaket, // Ini akan mengirimkan idPaket yang diterima dari location.state (UUID)
      });

      // Lakukan INSERT ke Supabase
      const { error } = await supabase.from('penjualan').insert([ // Memasukkan data ke tabel 'penjualan'
        {
          nama_pelanggan: form.nama_pelanggan,
          tanggal_transaksi: form.tanggal_transaksi,
          jenis_pesanan: form.jenis_pesanan,
          jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
          total_harga: totalHargaNum,
          status: orderStatus, // 'Di Keranjang' atau 'Belum Lunas'
          metode_pembayaran: form.metode_pembayaran,
          id_paket: idPaket, // Mengirimkan idPaket yang diterima dari location.state (UUID yang benar)
        },
      ]);

      if (error) {
        console.error('Error submitting form to Supabase:', error.message);
        // Menampilkan pesan error spesifik jika terkait dengan id_paket
        if (error.message.includes('foreign key constraint') || error.message.includes('null value in column "id_paket" violates not-null constraint')) {
            showMessage('Terjadi masalah dengan ID Paket. Pastikan ID paket yang dipilih valid.', 'error');
        } else {
            // Pesan error umum dari Supabase jika bukan masalah id_paket
            showMessage('Terjadi kesalahan saat menyimpan pesanan: ' + error.message, 'error');
        }
        return; // Hentikan proses jika ada error database
      }

      // Jika berhasil disimpan ke database
      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else { // Ini adalah kondisi untuk 'Belum Lunas'
        showMessage('Pesanan berhasil dibuat! Anda akan diarahkan untuk konfirmasi.', 'success');
        navigate('/testimoni-customer'); // Arahkan ke halaman lain setelah pesanan sukses
      }

      // Reset form setelah sukses submit
      setForm((prev) => ({
        ...prev,
        jumlah_pesanan: 1,
        // Reset total harga berdasarkan harga paket default untuk 1 orang (jika hargaPaket ada)
        total_harga: (parseFloat(hargaPaket || 0) * 1).toFixed(2),
        status: 'Belum Lunas', // Reset status kembali ke default
        metode_pembayaran: '',
      }));

    } catch (err) {
      // Menangkap error JavaScript umum (misalnya masalah network, error parsing)
      console.error('Terjadi kesalahan tak terduga dalam submitOrder:', err.message);
      showMessage('Terjadi kesalahan saat memproses pesanan: ' + err.message, 'error');
    }
  };

  // Handler untuk tombol "Masukkan Keranjang"
  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang');
  };

  // Handler untuk tombol "Pesan Sekarang"
  const handlePlaceOrder = (e) => {
    submitOrder(e, 'Belum Lunas');
  };

  // Kondisi loading yang disederhanakan: hanya menunggu data pengguna.
  // Form akan langsung dirender setelah data pengguna dimuat,
  // terlepas dari ketersediaan jenisPaket, hargaPaket, atau idPaket.
  // Jika masih muncul "Memuat data atau menunggu pemilihan paket...", itu berarti Anda masih menggunakan kode lama.
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700">Memuat data pengguna...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }} // Pastikan path gambar benar
    >
      <div className="w-full max-w-2xl mx-auto p-4">
        <form className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Form Pemesanan Paket Wisata</h2>

          {/* Area untuk menampilkan pesan notifikasi (sukses/error) */}
          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Jenis Pesanan (Nama Paket Wisata) - readOnly */}
            <div>
              <label htmlFor="jenis_pesanan_display" className="block text-sm font-medium text-gray-700 mb-1">Jenis Pesanan (Nama Paket Wisata)</label>
              <input
                type="text"
                id="jenis_pesanan_display"
                value={form.jenis_pesanan}
                readOnly // Tetap readOnly. Jika jenisPaket tidak dari props, ini akan kosong
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
              {/* Input hidden untuk nilai sebenarnya yang akan dikirim, penting untuk validasi */}
              <input type="hidden" name="jenis_pesanan" value={form.jenis_pesanan} />
            </div>

            {/* Input Jumlah Pesanan */}
            <div>
              <label htmlFor="jumlah_pesanan" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pesanan (Orang/Tiket)</label>
              <input
                type="number"
                id="jumlah_pesanan"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min="1" // Pastikan minimal 1
                placeholder="Jumlah"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* Input Total Harga - readOnly */}
            <div>
              <label htmlFor="total_harga_display" className="block text-sm font-medium text-gray-700 mb-1">Total Harga</label>
              <input
                type="text"
                id="total_harga_display"
                value={`Rp ${parseFloat(form.total_harga).toLocaleString('id-ID')}`} // Format mata uang IDR
                readOnly // Tetap readOnly. Perhitungan bergantung pada hargaPaket dari props
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
              {/* Input hidden untuk nilai sebenarnya yang akan dikirim, penting untuk validasi */}
              <input type="hidden" name="total_harga" value={form.total_harga} />
            </div>

            {/* Select Metode Pembayaran */}
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