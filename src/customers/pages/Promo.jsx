import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../../supabase';

const Promo = () => {
  const [promoList, setPromoList] = useState([]);

  const fetchPromoData = async () => {
    try {
      const [paketRes, travelRes, tiketRes] = await Promise.all([
        supabase.from("paketwisata").select("*").eq("promo_paketwisata", 1),
        supabase.from("travel").select("*").eq("promo_travel", 1),
        supabase.from("tiketpesawat").select("*").eq("promo_tiketpesawat", 1),
      ]);

      const formatted = [
        ...(paketRes.data || []).map((p) => ({
          id: `paket-${p.id_paket}`,
          type: "Paket Wisata",
          title: p.nama_paket,
          desc: p.deskripsi,
          img: p.gambar_url,
          harga: p.harga,
        })),
        ...(travelRes.data || []).map((t) => ({
          id: `travel-${t.id_travel}`,
          type: "Travel",
          title: t.nama_travel,
          desc: `Dari ${t.asal} ke ${t.tujuan} pada ${t.tanggal_berangkat}`,
          img: t.gambar_url,
          harga: t.harga,
        })),
        ...(tiketRes.data || []).map((tk) => ({
          id: `tiket-${tk.id_tiket}`,
          type: "Tiket Pesawat",
          title: `${tk.maskapai} - ${tk.dari} ke ${tk.ke}`,
          desc: `Berangkat: ${tk.waktu_berangkat}, Pulang: ${tk.waktu_pulang}`,
          img: tk.gambar_url,
          harga: tk.harga,
        })),
      ];

      setPromoList(formatted);
    } catch (err) {
      console.error("Gagal mengambil data promo:", err);
    }
  };

  useEffect(() => {
    fetchPromoData();
  }, []);

  return (
    <div className="font-sans">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-800">Promo</h2>
            <div className="text-sm text-gray-600">
              <Link to="/" className="hover:underline text-orange-600 font-semibold">
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Promo</span>
            </div>
          </div>
          <div className="ml-auto">
            <input
              type="text"
              placeholder="Cari Promo..."
              className="px-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Tersedia hanya minggu ini! Booking cepat sebelum semua kursi habis!
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300"
            >
              <img
                src={item.img || "https://png.pngtree.com/png-clipart/20230529/original/pngtree-special-promo-banner-shape-vector-png-image_9173710.png"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-orange-500 font-semibold mb-1">{item.type}</p>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <span className="text-orange-600 font-bold text-lg block mb-2">
                  Rp {parseInt(item.harga).toLocaleString()}/orang
                </span>
                <Link to="#" className="text-orange-600 font-semibold hover:underline">
                  Pesan Sekarang →
                </Link>
              </div>
            </div>
          ))}
          {promoList.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada promo yang tersedia saat ini.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Promo;
