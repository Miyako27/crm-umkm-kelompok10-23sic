import React, { useState, useEffect } from "react";
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
import { supabase } from '../supabase';

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
  const [leadSources, setLeadSources] = useState({
    labels: ["Website", "Instagram", "TikTok", "Rekomendasi Orang Lain", "Lainnya"],
    datasets: [
      {
        label: "Jumlah Leads",
        data: [0, 0, 0, 0, 0],
        backgroundColor: ["#0EA5E9", "#E1306C", "#010101", "#10B981", "#A855F7"],
      },
    ],
  });

  const [customerSegments, setCustomerSegments] = useState({
    labels: ["Member Classic", "Member Silver", "Member Gold"],
    datasets: [
      {
        label: "Segmentasi",
        data: [0, 0, 0, 0],
        backgroundColor: ["#8b5cf6", "#6366f1", "#a78bfa"],
      },
    ],
  });

  const [totalPengguna, setTotalPengguna] = useState(0);
  const [totalPemesanan, setTotalPemesanan] = useState(0);
  const [totalBelumLunas, setTotalBelumLunas] = useState(0);
  const [totalDikeranjang, setTotalDikeranjang] = useState(0);
  const [kepuasanPelanggan, setKepuasanPelanggan] = useState("0%");

  const [funnelData, setFunnelData] = useState({
    labels: ["Lunas", "Belum Lunas", "Tertarik", "Pengunjung"],
    datasets: [
      {
        label: "Funnel Tahapan Pemesanan",
        data: [0, 0, 0, 0],
        backgroundColor: ["#1d4ed8", "#3b82f6", "#60a5fa", "#93c5fd"],
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      },
    ],
  });

  const [paymentMethods, setPaymentMethods] = useState({
    labels: ["Transfer Bank", "Kartu Kredit", "E-Wallet", "Tunai"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#0284c7", "#eab308", "#10b981", "#f87171"],
      },
    ],
  });

  useEffect(() => {
    const fetchLeadSources = async () => {
      const { data, error } = await supabase.from("pelanggan").select("sumber_masuk");
      if (error) {
        console.error("Gagal fetch sumber_masuk:", error);
        return;
      }

      const kategori = ["Website", "Instagram", "Tiktok", "Rekomendasi Orang Lain", "Lainnya"];
      const jumlah = kategori.map(
        (kategori) =>
          data.filter((item) => item.sumber_masuk === kategori).length
      );

      setLeadSources((prev) => ({
        ...prev,
        datasets: [{
          ...prev.datasets[0],
          data: jumlah,
        }],
      }));
    };

    const fetchCustomerSegments = async () => {
      const { data, error } = await supabase.from("pelanggan").select("status");
      if (error) {
        console.error("Gagal fetch status pelanggan:", error);
        return;
      }

      const segmen = ["Member Classic", "Member Silver", "Member Gold", "Member Platinum"];
      const jumlah = segmen.map(
        (s) => data.filter((item) => item.status === s).length
      );

      setCustomerSegments((prev) => ({
        ...prev,
        datasets: [{
          ...prev.datasets[0],
          data: jumlah,
        }],
      }));
    };

    const fetchTotalPengguna = async () => {
      const { count, error } = await supabase
        .from("pelanggan")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Gagal fetch total pengguna:", error);
      } else {
        setTotalPengguna(count);
      }
    };

    const fetchPaymentMethods = async () => {
      const { data, error } = await supabase.from("penjualan").select("metode_pembayaran");

      if (error) {
        console.error("Gagal fetch metode pembayaran:", error);
        return;
      }

      const kategori = ["Transfer Bank", "Kartu Kredit", "E-Wallet", "Tunai"];
      const jumlah = kategori.map(
        (kategori) =>
          data.filter((item) => item.metode_pembayaran === kategori).length
      );

      setPaymentMethods((prev) => ({
        ...prev,
        datasets: [{
          ...prev.datasets[0],
          data: jumlah,
        }],
      }));
    };

    const fetchKepuasanPelanggan = async () => {
      const { data, error } = await supabase
        .from("testimoni")
        .select("rating");

      if (error) {
        console.error("Gagal fetch testimoni:", error);
        return;
      }

      const total = data.length;
      const puas = data.filter((t) => parseFloat(t.rating) >= 4).length;
      const persen = total === 0 ? 0 : Math.round((puas / total) * 100);
      setKepuasanPelanggan(`${persen}%`);
    };

    fetchLeadSources();
    fetchCustomerSegments();
    fetchTotalPengguna();
    fetchPaymentMethods();
    fetchKepuasanPelanggan();
  }, []);

  useEffect(() => {
    if (totalPengguna > 0) {
      fetchStatusPenjualan();
    }
  }, [totalPengguna]);

  const fetchStatusPenjualan = async () => {
    const { data, error } = await supabase.from("penjualan").select("status");
    if (error) {
      console.error("Gagal fetch status penjualan:", error);
      return;
    }

    const jumlahLunas = data.filter((item) => item.status === "lunas").length;
    const jumlahBelumLunas = data.filter((item) => item.status === "Belum Lunas").length;
    const jumlahKeranjang = data.filter((item) => item.status === "Di Keranjang").length;
    const jumlahTotal = totalPengguna;

    setTotalPemesanan(jumlahLunas);
    setTotalBelumLunas(jumlahBelumLunas);
    setTotalDikeranjang(jumlahKeranjang);

    setFunnelData((prev) => ({
      ...prev,
      datasets: [{
        ...prev.datasets[0],
        data: [jumlahLunas, jumlahBelumLunas, jumlahKeranjang, jumlahTotal],
      }],
    }));
  };

  const keyStats = [
    { label: "Total Pengguna", value: totalPengguna, color: "sky" },
    { label: "Total Pemesanan", value: totalPemesanan, color: "green" },
    { label: "Total Dikeranjang", value: totalDikeranjang, color: "violet" },
    { label: "Total Belum Lunas", value: totalBelumLunas, color: "amber" },
    { label: "Kepuasan Pelanggan", value: kepuasanPelanggan, color: "emerald" },
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
          <Bar data={funnelData} options={chartOptions("Funnel Tahapan Pemesanan", true)} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={customerSegments} options={chartOptions("Segmentasi Pelanggan")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={leadSources} options={chartOptions("Sumber Tahu Tripenya")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Pie data={paymentMethods} options={chartOptions("Metode Pembayaran Terbanyak")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Line data={bookingLine} options={chartOptions("Booking per Bulan")} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 min-h-[350px]">
          <Bar data={popularDestinations} options={chartOptions("Destinasi Terpopuler")} />
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
