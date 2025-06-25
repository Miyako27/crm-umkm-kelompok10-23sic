import React, { useState } from 'react';

export default function Loyalitas() {
  const [usia, setUsia] = useState('');
  const [jumlahTransaksi, setJumlahTransaksi] = useState('');
  const [totalPengeluaran, setTotalPengeluaran] = useState('');
  const [tipePerjalanan, setTipePerjalanan] = useState('');
  const [frekuensiKomplain, setFrekuensiKomplain] = useState('');
  const [durasiTerakhir, setDurasiTerakhir] = useState('');

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://f9c2-34-19-5-156.ngrok-free.app';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    const inputData = {
      usia: Number(usia),
      jumlah_transaksi: Number(jumlahTransaksi),
      total_pengeluaran_idr: Number(totalPengeluaran),
      tipe_perjalanan_favorit: tipePerjalanan,
      frekuensi_komplain: Number(frekuensiKomplain),
      durasi_sejak_transaksi_terakhir_hari: Number(durasiTerakhir)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(inputData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError("Gagal mendapatkan prediksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">Prediksi Loyalitas Pelanggan</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Usia</label>
            <input type="number" value={usia} onChange={(e) => setUsia(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Jumlah Transaksi</label>
            <input type="number" value={jumlahTransaksi} onChange={(e) => setJumlahTransaksi(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Total Pengeluaran (IDR)</label>
            <input type="number" value={totalPengeluaran} onChange={(e) => setTotalPengeluaran(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Tipe Perjalanan Favorit</label>
            <select value={tipePerjalanan} onChange={(e) => setTipePerjalanan(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">-- Pilih Tipe --</option>
              <option value="Travel">Travel</option>
              <option value="Tiket Pesawat">Tiket Pesawat</option>
              <option value="Paket Wisata">Paket Wisata</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Frekuensi Komplain</label>
            <input type="number" value={frekuensiKomplain} onChange={(e) => setFrekuensiKomplain(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Durasi Sejak Transaksi Terakhir (hari)</label>
            <input type="number" value={durasiTerakhir} onChange={(e) => setDurasiTerakhir(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition duration-200">
            {loading ? 'Memprediksi...' : 'Prediksi'}
          </button>
        </form>

        {prediction && (
          <div className={`mt-6 p-5 rounded-md shadow border-l-4 ${prediction.predicted_label_text.toLowerCase().includes('tidak')
              ? 'bg-red-50 border-red-400 text-red-800'
              : 'bg-green-50 border-green-400 text-green-800'
            }`}>
            <h3 className="font-semibold text-lg mb-2">Hasil Prediksi:</h3>
            <p>Status: <strong>{prediction.predicted_label_text}</strong></p>
            <p>Probabilitas Loyal: <strong>{(prediction.probability_loyal * 100).toFixed(2)}%</strong></p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-5 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-md shadow">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
