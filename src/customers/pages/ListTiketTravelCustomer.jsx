import React from "react";
import { Calendar, Clock, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const TravelCard = ({ travel, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white shadow-md rounded-xl p-5 mb-5 border border-gray-200 relative hover:shadow-lg transition"
  >
    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md absolute top-4 left-4">
      Bisa Reschedule
    </span>

    <div className="flex justify-between items-start mt-6">
      <div>
        <h2 className="text-base font-semibold">{travel.nama_travel || "Nama Travel Default"}</h2> {/* Pastikan kolom ini ada di Supabase. Kalau tidak, "Nama Travel Default" akan muncul */}
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <span>Luxury Shuttle</span>
          <div className="flex items-center gap-1 text-blue-500">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span>{travel.rating || "N/A"}/5</span> {/* Pastikan kolom ini ada di Supabase */}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-orange-600 text-lg font-bold">
          Rp {travel.harga ? travel.harga.toLocaleString("id-ID") : "0"}
          <span className="text-gray-400 font-normal text-sm">/kursi</span>
        </div>
      </div>
    </div>

    <div className="mt-5 flex items-start gap-3 text-sm text-gray-600">
      <div className="flex flex-col items-center pt-1 pb-1">
        <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-white"></div>
        <div className="flex-1 w-0.5 bg-gray-300 my-1" style={{ minHeight: "40px" }}></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>

      <div className="flex flex-col justify-between py-0.5">
        <div className="mb-3">
          <span className="font-medium mr-2 text-black">
            {travel.departure_time || "N/A"}
          </span> {/* Pastikan kolom ini ada di Supabase */}
          <span className="text-gray-600">{travel.asal}</span> {/* Menggunakan 'asal' dari Supabase */}
        </div>
        <div className="text-xs text-gray-400">
          {travel.duration || "N/A"} {/* Pastikan kolom ini ada di Supabase */}
        </div>
        <div className="mt-3">
          <span className="font-medium mr-2 text-black">
            {travel.arrival_time || "N/A"}
          </span> {/* Pastikan kolom ini ada di Supabase */}
          <span className="text-gray-600">{travel.tujuan}</span> {/* Menggunakan 'tujuan' dari Supabase */}
        </div>
      </div>
    </div>
  </div>
);

export default function ListTiketTravelCustomer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data hasil pencarian dan parameter pencarian dari state
  const searchResults = location.state?.searchResults || [];
  const searchParams = location.state?.searchParams || {};

  // Fungsi untuk memformat tanggal dari YYYY-MM-DD ke format yang lebih mudah dibaca (e.g., "Sen, 29 Jun")
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="max-w-xl mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">
          {searchParams.dari || "Asal"} ➜ {searchParams.ke || "Tujuan"}
        </h1>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>{formatDate(searchParams.waktuPergi?.split('T')[0])}</span> {/* Tampilkan tanggal pergi */}
          <Clock className="w-5 h-5" />
          <span>
            {searchParams.waktuPergi?.split('T')[1] || "00:00"} -{" "}
            {searchParams.waktuPulang?.split('T')[1] || "N/A"}
          </span>{" "}
          {/* Tampilkan waktu pergi dan pulang (jika ada waktu pulang) */}
        </div>
      </div>

      {/* Render cards */}
      {searchResults.length > 0 ? (
        searchResults.map((travel) => (
          <TravelCard
            key={travel.id_travel} // Menggunakan id_travel dari Supabase sebagai key
            travel={travel}
            onClick={() => navigate("/order-customer/travel/pemesanan", { state: { selectedTravel: travel } })}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          Tidak ada travel yang ditemukan untuk rute ini.
        </p>
      )}
    </div>
  );
}