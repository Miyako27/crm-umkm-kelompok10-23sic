import React, { useState } from 'react';
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

const API_URL = 'https://eb3c-34-125-119-24.ngrok-free.app';

export default function RekomendasiDestinasi() {
  const [formData, setFormData] = useState({
    rata_rata_biaya: '',
    durasi_ideal_hari: '',
    rating_wisatawan: '',
    cuaca_dominan: '',
    tingkat_keramaian: '',
    fasilitas_keluarga: '',
    kuliner: 0,
    belanja: 0,
    relaksasi: 0,
    budaya: 0,
    bahari: 0,
    petualangan: 0
  });

  const [hasil, setHasil] = useState(null);
  const [top3Chart, setTop3Chart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'jenis_wisata') {
      const updated = {
        kuliner: 0,
        belanja: 0,
        relaksasi: 0,
        budaya: 0,
        bahari: 0,
        petualangan: 0,
        [value]: 1
      };
      setFormData({ ...formData, ...updated });
    } else if (['fasilitas_keluarga'].includes(name)) {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: type === 'number' ? Number(value) : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasil(null);
    setTop3Chart(null);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Gagal memproses prediksi');
      setHasil(data);

      const chartRes = await fetch(`${API_URL}/grafik_top3`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });

      const chartData = await chartRes.json();
      if (chartData.success) {
        setTop3Chart({
          labels: chartData.labels,
          datasets: [{
            label: 'Probabilitas (%)',
            data: chartData.values.map(p => (p * 100).toFixed(2)),
            backgroundColor: ['#4ade80', '#60a5fa', '#facc15']
          }]
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-800">Rekomendasi Destinasi Wisata</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Rata-rata Biaya (IDR)" name="rata_rata_biaya" value={formData.rata_rata_biaya} onChange={handleChange} type="number" />
          <FormInput label="Durasi Ideal (Hari)" name="durasi_ideal_hari" value={formData.durasi_ideal_hari} onChange={handleChange} type="number" />
          <FormInput label="Rating Wisatawan (1-5)" name="rating_wisatawan" value={formData.rating_wisatawan} onChange={handleChange} type="number" />
          <FormSelect label="Cuaca Dominan" name="cuaca_dominan" value={formData.cuaca_dominan} onChange={handleChange}
            options={["Cerah", "Hujan", "Berawan"]} />
          <FormSelect label="Tingkat Keramaian" name="tingkat_keramaian" value={formData.tingkat_keramaian} onChange={handleChange}
            options={["Ramai", "Sedang", "Sepi"]} />
          <FormSelect label="Fasilitas Keluarga" name="fasilitas_keluarga" value={formData.fasilitas_keluarga} onChange={handleChange}
            options={[
              { label: "Ada", value: "1" },
              { label: "Tidak Ada", value: "0" }
            ]} />
          <FormSelect label="Jenis Wisata" name="jenis_wisata" value={
            Object.entries(formData).find(([key, val]) => key !== 'fasilitas_keluarga' && val === 1 && ['kuliner', 'belanja', 'relaksasi', 'budaya', 'bahari', 'petualangan'].includes(key)
          )?.[0] || ""} onChange={handleChange}
            options={[
              { label: "Kuliner", value: "kuliner" },
              { label: "Belanja", value: "belanja" },
              { label: "Relaksasi", value: "relaksasi" },
              { label: "Budaya", value: "budaya" },
              { label: "Bahari", value: "bahari" },
              { label: "Petualangan", value: "petualangan" }
            ]}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            {loading ? 'Memproses...' : 'Dapatkan Rekomendasi'}
          </button>
        </form>

        {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">⚠️ {error}</div>}

        {hasil && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow">
            <h4 className="font-semibold">Rekomendasi Utama:</h4>
            <p className="text-lg font-bold text-green-700">{hasil.rekomendasi_utama}</p>
          </div>
        )}

        {top3Chart && (
          <div className="mt-8">
            <h4 className="font-semibold text-center mb-2">Top 3 Rekomendasi</h4>
            <Bar data={top3Chart} options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Probabilitas (%)'
                  }
                }
              },
              plugins: {
                legend: { display: false }
              }
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

function FormInput({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
}

function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">-- Pilih --</option>
        {options.map(opt =>
          typeof opt === 'object' ? (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ) : (
            <option key={opt} value={opt}>{opt}</option>
          )
        )}
      </select>
    </div>
  );
}
