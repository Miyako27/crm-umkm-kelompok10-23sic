import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_BASE_URL = 'https://4fc2-34-125-7-8.ngrok-free.app'; // Ganti sesuai ngrok kamu

export default function LoyaltyPage() {
  const [formData, setFormData] = useState({
    usia: 30,
    jumlah_transaksi: 5,
    total_pengeluaran_idr: 1000000,
    tipe_perjalanan_favorit: 'Travel',
    frekuensi_komplain: 1,
    durasi_sejak_transaksi_terakhir_hari: 10
  });

  const [prediction, setPrediction] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        value === ''
          ? ''
          : name.includes('idr')
          ? parseFloat(value)
          : isNaN(value)
          ? value
          : parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    for (const [key, val] of Object.entries(formData)) {
      if (val === '' || val === null || val === undefined || Number.isNaN(val)) {
        setError(`Input "${key.replace(/_/g, ' ')}" tidak boleh kosong.`);
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Gagal prediksi');
      setPrediction(result);
      fetchStats();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Gagal fetch statistik:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = {
    labels: ['Loyal', 'Tidak Loyal'],
    datasets: [
      {
        label: 'Jumlah',
        data: stats ? [stats.jumlah_loyal || 0, stats.jumlah_tidak_loyal || 0] : [0, 0],
        backgroundColor: ['green', 'red']
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Prediksi Loyalitas Pelanggan</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/_/g, ' ')}:
            </label>
            {key === 'tipe_perjalanan_favorit' ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              >
                <option value="Travel">Travel</option>
                <option value="Tiket Pesawat">Tiket Pesawat</option>
                <option value="Paket Wisata">Paket Wisata</option>
              </select>
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border rounded px-2 py-1"
              />
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Prediksi
        </button>
      </form>

      {error && <p className="text-red-600">❌ {error}</p>}

      {prediction && (
        <div className="bg-green-100 p-4 rounded shadow mb-6">
          <h2 className="font-semibold text-green-700">✅ Hasil Prediksi:</h2>
          <p><strong>Status:</strong> {prediction.predicted_label_text}</p>
          <p><strong>Probabilitas Loyal:</strong> {(prediction.probability_loyal * 100).toFixed(2)}%</p>
        </div>
      )}

      <h2 className="text-xl font-bold mt-6 mb-2 text-center">📊 Grafik Loyalitas Pelanggan</h2>
      {stats && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}
