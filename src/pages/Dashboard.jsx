import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const keyStats = [
    { label: "Total Pengguna", value: "100", color: "sky" },
    { label: "Total Pemesanan", value: "220", color: "green" },
    { label: "Total Pendapatan", value: "Rp 1,2M", color: "violet" },
    { label: "Jadwal Terkonfirmasi", value: "220", color: "amber" },
    { label: "Kepuasan Pelanggan", value: "92%", color: "emerald" },
  ];

  const bookingLine = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Booking Bulanan",
        data: [700, 900, 850, 950, 1200, 1500, 1600, 1550, 1400, 1700, 1800, 2000],
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const funnelData = {
    labels: ["Selesai", "Bayar", "Tertarik", "Pengunjung"],
    datasets: [
      {
        label: "Funnel Tahapan Pemesanan",
        data: [2300, 2500, 5000, 10000],
        backgroundColor: ["#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd"],
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      },
    ],
  };

  const destinationForecast = {
    labels: ["Bali", "Yogyakarta", "Lombok", "Labuan Bajo", "Raja Ampat"],
    datasets: [
      {
        label: "Musim Panas",
        data: [1500, 800, 900, 1000, 1300],
        backgroundColor: "#facc15",
      },
      {
        label: "Musim Hujan",
        data: [1000, 1200, 700, 900, 1100],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const destinationAssociation = {
    labels: ["Bali - Lombok", "Yogyakarta - Bali", "Lombok - Labuan Bajo", "Bali - Raja Ampat"],
    datasets: [
      {
        label: "Frekuensi Bersamaan",
        data: [420, 310, 275, 190],
        backgroundColor: "#f472b6",
      },
    ],
  };

  const popularDestinations = {
    labels: ["Bali", "Yogyakarta", "Lombok", "Labuan Bajo", "Raja Ampat"],
    datasets: [
      {
        label: "Jumlah Kunjungan",
        data: [1200, 950, 850, 770, 680],
        backgroundColor: [
          "#60a5fa",
          "#818cf8",
          "#34d399",
          "#fbbf24",
          "#f87171",
        ],
      },
    ],
  };

  const paymentMethods = {
    labels: ["Transfer Bank", "E-Wallet", "Kartu Kredit"],
    datasets: [
      {
        data: [5000, 3000, 1800],
        backgroundColor: ["#0284c7", "#10b981", "#eab308"],
      },
    ],
  };

  const customerSegments = {
    labels: ["Mahasiswa", "Karyawan", "Keluarga", "Wisatawan Asing"],
    datasets: [
      {
        label: "Segmentasi",
        data: [2500, 3400, 2100, 1600],
        backgroundColor: ["#8b5cf6", "#6366f1", "#a78bfa", "#c4b5fd"],
      },
    ],
  };

  const leadSources = {
    labels: ["Instagram", "Google Ads", "Referral", "TikTok"],
    datasets: [
      {
        label: "Jumlah Leads",
        data: [1300, 1100, 900, 750],
        backgroundColor: ["#f43f5e", "#f87171", "#fb7185", "#fda4af"],
      },
    ],
  };

  const chartOptions = (title, horizontal = false) => ({
    indexAxis: horizontal ? 'y' : 'x',
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    resizeDelay: 200,
    plugins: {
      title: { display: true, text: title },
    },
  });

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {keyStats.map(({ label, value, color }) => (
          <div key={label} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300 ease-in-out">
            <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
            <h2 className={`text-2xl font-bold text-${color}-600`}>{value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Line data={bookingLine} options={chartOptions("Booking per Bulan")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={funnelData} options={chartOptions("Funnel Tahapan Pemesanan", true)} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={customerSegments} options={chartOptions("Segmentasi Pelanggan")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={leadSources} options={chartOptions("Sumber Leads / Referral")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={popularDestinations} options={chartOptions("Destinasi Terpopuler")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Pie data={paymentMethods} options={chartOptions("Metode Pembayaran Terbanyak")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={destinationForecast} options={chartOptions("Prediksi Tren Destinasi per Musim")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={destinationAssociation} options={chartOptions("Asosiasi Destinasi")} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
