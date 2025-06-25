import React, { useState } from 'react';

// Main App component
export default function Daming() {
  // State untuk menyimpan nilai input dari form
  const [jumlahPaket, setJumlahPaket] = useState(400); // Default value
  const [promo, setPromo] = useState('Diskon Liburan'); // Default value
  const [hariLibur, setHariLibur] = useState('Ya'); // Default value
  const [ulasan, setUlasan] = useState('Positif'); // Default value

  // State untuk menyimpan hasil prediksi, pesan error, dan status loading
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // === PENTING: Ganti ini dengan URL publik ngrok yang Anda dapatkan dari backend Flask Anda! ===
  // Contoh dari output Anda: https://af0e-34-56-164-8.ngrok-free.app
  const API_BASE_URL = 'https://82fa-34-56-164-8.ngrok-free.app'; // <<< URL NGROK DARI OUTPUT ANDA!

  // Fungsi yang dipanggil saat form disubmit
  const handleSubmit = async (event) => {
    event.preventDefault(); // Mencegah form melakukan refresh halaman default
    setLoading(true); // Atur status loading menjadi true
    setError(null); // Reset pesan error sebelumnya
    setPrediction(null); // Reset prediksi sebelumnya

    // Siapkan data input sesuai dengan format yang diharapkan oleh backend Flask
    const inputData = {
      jumlah_paket_terjual: parseInt(jumlahPaket), // Pastikan ini adalah integer
      promo_iklan_berjalan: promo,
      hari_libur_nasional_musim_liburan: hariLibur,
      ulasan_pelanggan: ulasan,
    };

    try {
      // Melakukan panggilan API POST ke backend Flask
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Memberitahu server bahwa body adalah JSON
          'Accept': 'application/json',       // Memberitahu server bahwa kita mengharapkan JSON sebagai respons
        },
        body: JSON.stringify(inputData), // Mengirim data input sebagai string JSON
      });

      // Periksa apakah respons HTTP berhasil (status 2xx)
      if (!response.ok) {
        const errorData = await response.json(); // Coba parse error message dari respons JSON
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      // Parse respons JSON yang berhasil
      const data = await response.json();
      setPrediction(data.predicted_revenue); // Simpan hasil prediksi

    } catch (err) {
      // Tangani error jika terjadi masalah selama panggilan API
      console.error("Error fetching prediction:", err);
      setError("Gagal mendapatkan prediksi: " + err.message);
    } finally {
      setLoading(false); // Atur status loading kembali menjadi false setelah selesai (baik berhasil/gagal)
    }
  };

  return (
    // Kontainer utama dengan styling Tailwind CSS untuk responsivitas dan tampilan menarik
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 font-['Inter']">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Prediksi Pendapatan Travel Agent
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input: Jumlah Paket Terjual */}
          <div>
            <label htmlFor="jumlahPaket" className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Paket Terjual:
            </label>
            <input
              type="number"
              id="jumlahPaket"
              value={jumlahPaket}
              onChange={(e) => setJumlahPaket(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Select: Promo/Iklan Berjalan */}
          <div>
            <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
              Promo/Iklan Berjalan:
            </label>
            <select
              id="promo"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Diskon Liburan">Diskon Liburan</option>
              <option value="Cashback">Cashback</option>
              <option value="Buy One Get One">Buy One Get One</option>
              <option value="Tidak Ada">Tidak Ada</option>
              <option value="Diskon Early Bird">Diskon Early Bird</option>
              <option value="Paket Keluarga">Paket Keluarga</option>
            </select>
          </div>

          {/* Select: Hari Libur Nasional/Musim Liburan */}
          <div>
            <label htmlFor="hariLibur" className="block text-sm font-medium text-gray-700 mb-1">
              Hari Libur Nasional/Musim Liburan:
            </label>
            <select
              id="hariLibur"
              value={hariLibur}
              onChange={(e) => setHariLibur(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </select>
          </div>

          {/* Select: Ulasan Pelanggan */}
          <div>
            <label htmlFor="ulasan" className="block text-sm font-medium text-gray-700 mb-1">
              Ulasan Pelanggan:
            </label>
            <select
              id="ulasan"
              value={ulasan}
              onChange={(e) => setUlasan(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Positif">Positif</option>
              <option value="Negatif">Negatif</option>
            </select>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading} // Tombol dinonaktifkan saat loading
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            {loading ? 'Memprediksi...' : 'Prediksi Pendapatan'}
          </button>
        </form>

        {/* Menampilkan Hasil Prediksi */}
        {prediction !== null && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
            <h2 className="text-lg font-semibold">
              Prediksi Pendapatan Bulan Depan:
            </h2>
            <p className="text-2xl font-bold mt-2">
              IDR {prediction.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        )}

        {/* Menampilkan Pesan Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
            <h2 className="text-lg font-semibold">Error:</h2>
            <p className="mt-2">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
