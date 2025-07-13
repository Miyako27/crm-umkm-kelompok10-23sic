import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale
);

export default function LoyaltyPage() {
  const [usia, setUsia] = useState('');
  const [jumlahTransaksi, setJumlahTransaksi] = useState('');
  const [totalPengeluaran, setTotalPengeluaran] = useState('');
  const [tipePerjalanan, setTipePerjalanan] = useState('');
  const [frekuensiKomplain, setFrekuensiKomplain] = useState('');
  const [durasiTerakhir, setDurasiTerakhir] = useState('');

  const [prediction, setPrediction] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://b2a522422230.ngrok-free.app';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setPieData(null);
    setCompareData(null);

    const inputData = {
      usia: Number(usia),
      jumlah_transaksi: Number(jumlahTransaksi),
      total_pengeluaran_idr: Number(totalPengeluaran),
      tipe_perjalanan_favorit: tipePerjalanan,
      frekuensi_komplain: Number(frekuensiKomplain),
      durasi_sejak_transaksi_terakhir_hari: Number(durasiTerakhir),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Prediksi gagal');

      setPrediction(data);

      await Promise.all([
        fetchPieChart(),
        fetchComparisonChart(inputData)
      ]);

    } catch (err) {
      setError("Gagal mendapatkan prediksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPieChart = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/grafik_probabilitas`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data = await res.json();
      if (!data.success) return;
      setPieData({
        labels: data.labels,
        datasets: [{
          data: data.values.map((p) => Number((p * 100).toFixed(2))),
          backgroundColor: ['#f87171', '#4ade80'],
        }],
      });
    } catch (err) {
      console.error("Gagal memuat grafik pie", err);
    }
  };

  const fetchComparisonChart = async (inputData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/profil_vs_loyal_avg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();
      if (!data.success) return;
      setCompareData({
        labels: data.features,
        datasets: [
          {
            label: 'Input Pengguna',
            data: data.current_customer,
            backgroundColor: '#60a5fa',
          },
          {
            label: 'Rata-rata Loyal',
            data: data.avg_loyal_customer,
            backgroundColor: '#facc15',
          },
        ]
      });
    } catch (err) {
      console.error("Gagal memuat grafik perbandingan", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">
          Prediksi Loyalitas Pelanggan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput label="Usia" value={usia} onChange={setUsia} />
          <FormInput label="Jumlah Transaksi" value={jumlahTransaksi} onChange={setJumlahTransaksi} />
          <FormInput label="Total Pengeluaran (IDR)" value={totalPengeluaran} onChange={setTotalPengeluaran} />
          <FormSelect label="Tipe Perjalanan Favorit" value={tipePerjalanan} onChange={setTipePerjalanan} options={["Travel", "Tiket Pesawat", "Paket Wisata"]} />
          <FormInput label="Frekuensi Komplain" value={frekuensiKomplain} onChange={setFrekuensiKomplain} />
          <FormInput label="Durasi Sejak Transaksi Terakhir (hari)" value={durasiTerakhir} onChange={setDurasiTerakhir} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition duration-200"
          >
            {loading ? 'Memprediksi...' : 'Prediksi'}
          </button>
        </form>

        {prediction && (
          <div className={`mt-6 p-5 rounded-md shadow border-l-4 ${
            prediction.predicted_label_text.toLowerCase().includes('tidak')
              ? 'bg-red-50 border-red-400 text-red-800'
              : 'bg-green-50 border-green-400 text-green-800'
          }`}>
            <h3 className="font-semibold text-lg mb-2">Hasil Prediksi:</h3>
            <p>Status: <strong>{prediction.predicted_label_text}</strong></p>
            <p>Probabilitas Loyal: <strong>{(prediction.probability_loyal * 100).toFixed(2)}%</strong></p>

            <InsightBox status={prediction.predicted_label_text} />
          </div>
        )}

        {pieData && (
          <div className="mt-6">
            <h4 className="text-center font-semibold mb-2">Grafik Probabilitas</h4>
            <Pie data={pieData} />
          </div>
        )}

        {compareData && (
          <div className="mt-8">
            <h4 className="text-center font-semibold mb-2">Perbandingan Profil dengan Rata-rata Loyal</h4>
            <Bar
              data={compareData}
              options={{
                indexAxis: 'y',
                responsive: true,
                scales: {
                  x: {
                    type: 'logarithmic',
                    title: {
                      display: true,
                      text: 'Nilai (Skala Log)'
                    },
                    ticks: {
                      callback: function (value) {
                        return Number(value).toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${Number(context.parsed.x).toLocaleString()}`;
                      }
                    }
                  }
                }
              }}
            />
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

function FormInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">-- Pilih Tipe --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function InsightBox({ status }) {
  const isNotLoyal = status.toLowerCase().includes('tidak');

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-1">Saran:</h4>
      {isNotLoyal ? (
        <ul className="list-disc list-inside text-sm">
          <li>Perbanyak interaksi, seperti email follow-up dan notifikasi promo personal.</li>
          <li>Berikan penawaran khusus untuk menarik kembali minat pelanggan.</li>
          <li>Evaluasi penyebab ketidakpuasan, misalnya komplain atau jarak waktu transaksi terakhir.</li>
        </ul>
      ) : (
        <p className="text-sm">
          Pertahankan loyalitas pelanggan dengan memberikan penghargaan seperti poin loyalitas, promo eksklusif, atau layanan premium.
        </p>
      )}
    </div>
  );
}
