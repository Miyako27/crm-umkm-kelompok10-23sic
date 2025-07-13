import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import { BiChat } from "react-icons/bi";

/**
 * Halaman Promo
 *
 * – Menarik item promo dari:
 *   • paketwisata  (kolom `promo_paketwisata` = 1)
 *   • travel       (kolom `promo_travel`       = 1)
 *   • tiketpesawat (kolom `promo_tiketpesawat` = 1)
 * – Masing‑masing kartu menyertakan `route` & `state` untuk pre‑fill form.
 */

const Promo = () => {
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const [paketRes, travelRes, tiketRes] = await Promise.all([
          supabase.from("paketwisata").select("*").eq("promo_paketwisata", 1),
          supabase.from("travel").select("*").eq("promo_travel", 1),
          supabase.from("tiketpesawat").select("*").eq("promo_tiketpesawat", 1),
        ]);

        const formatted = [
          // Paket Wisata
          ...(paketRes.data || []).map((p) => ({
            uid: `paket-${p.id_paket}`,
            route: "/checkout",
            state: {
              id_paket: p.id_paket,
              jenisPaket: p.nama_paket,
              hargaPaket: p.harga,
            },
            type: "Paket Wisata",
            title: p.nama_paket,
            desc: p.deskripsi,
            img: p.gambar_url,
            harga: p.harga,
          })),

          // Travel
          ...(travelRes.data || []).map((t) => ({
            uid: `travel-${t.id_travel}`,
            route: "/order-customer/travel/pemesanan",
            state: {
              selectedTravel: {
                id: t.id_travel,
                asal: t.asal,
                tujuan: t.tujuan,
                harga: t.harga,
                nama_travel: t.nama_travel,
                tanggal_berangkat: t.tanggal_berangkat
              }
            },
            type: "Travel",
            title: t.nama_travel,
            desc: `Dari ${t.asal} ke ${t.tujuan} • ${t.tanggal_berangkat}`,
            img: t.gambar_url,
            harga: t.harga
          })),

          // Tiket Pesawat
          ...(tiketRes.data || []).map((tk) => ({
            uid: `tiket-${tk.id}`,
            route: "/form-final-tiket",
            state: {
              selectedFlight: {
                id: tk.id,
                asal: tk.asal,
                tujuan: tk.tujuan,
                harga: tk.harga,
                maskapai: tk.maskapai,
                kode_penerbangan: tk.kode_penerbangan,
                waktu_berangkat: tk.waktu_berangkat,
                waktu_pulang: tk.waktu_pulang
              }
            },
            type: "Tiket Pesawat",
            title: `${tk.maskapai} – ${tk.asal} ➜ ${tk.tujuan}`,
            desc: `Berangkat: ${tk.waktu_berangkat} • Pulang: ${tk.waktu_pulang}`,
            img: tk.gambar_url,
            harga: tk.harga
          })),
        ];

        setPromoList(formatted);
      } catch (error) {
        console.error("Gagal mengambil data promo:", error);
      } finally {
        setLoading(false);
      }
    };

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
              </Link>{" "}/ <span className="text-gray-700">Promo</span>
            </div>
          </div>
          {/* Pencarian (disabled) */}
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
          <div className="w-16 h-1 bg-orange-600 mb-3" />
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Tersedia hanya minggu ini! Booking cepat sebelum semua kursi habis!
          </h2>
        </div>

        {loading && (
          <p className="text-center text-gray-500 animate-pulse">Memuat promo…</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoList.map((item) => (
            <article
              key={item.uid}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300"
            >
              <img
                src={item.img || "https://png.pngtree.com/png-clipart/20230529/original/pngtree-special-promo-banner-shape-vector-png-image_9173710.png"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col h-60">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-orange-500 font-semibold mb-1">{item.type}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.desc}</p>
                </div>

                {item.harga && (
                  <span className="text-orange-600 font-bold text-lg block mb-2">
                    Rp {parseInt(item.harga).toLocaleString()}
                  </span>
                )}

                <Link
                  to={item.route}
                  state={item.state}
                  className="text-orange-600 font-semibold hover:underline self-start"
                >
                  Pesan Sekarang →
                </Link>
              </div>
            </article>
          ))}

          {!loading && promoList.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              Tidak ada promo yang tersedia saat ini.
            </p>
          )}
        </div>
      </section>

      {/* Floating Live Chat Button */}
      <a
        href="https://wa.me/6285766351957?text=Halo%20saya%20ingin%20bertanya%20tentang%20paket%20wisata"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-yellow-400 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 transition duration-300"
        title="Tanya via WhatsApp"
      >
        <BiChat className="text-white text-3xl" />
      </a>
    </div>
  );
};

export default Promo;
