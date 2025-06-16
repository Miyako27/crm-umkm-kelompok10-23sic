import React from "react";
import { Link, useLocation } from "react-router-dom";

const Artikel = () => {
  const location = useLocation();

  const articles = [
    {
      title: "Tips Liburan Hemat di Musim Libur",
      desc: "Pelajari cara mengatur budget agar liburan tetap menyenangkan tanpa menguras dompet.",
      img: "https://cdn1-production-images-kly.akamaized.net/vPpLKNpIZBz0UpEa7kTXo0leseU=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1573413/original/032386100_1492757560-Traveling4.jpg",
    },
    {
      title: "Destinasi Alam Terbaik untuk Tahun Ini",
      desc: "Jelajahi keindahan alam Indonesia yang wajib masuk dalam daftar perjalananmu.",
      img: "https://pagaralampos.bacakoran.co/upload/ea45770abc4e309f1913ae971f19a964.jpg",
    },
    {
      title: "Mengenal Budaya Lokal Saat Bepergian",
      desc: "Panduan berinteraksi dengan penduduk lokal untuk pengalaman yang lebih otentik.",
      img: "https://assets-a1.kompasiana.com/items/album/2021/09/17/suku-melayu-6143ea1306310e657c711402.jpg",
    },
    {
      title: "Panduan Packing Efisien",
      desc: "Cara mengemas barang agar muat di koper kecil dan tetap lengkap untuk perjalanan jauh.",
      img: "https://wisataliburan.id/datacontent/cara-packing-baju-di-koper-wisata-liburan.jpg",
    },
    {
      title: "Transportasi Umum Ramah Turis",
      desc: "Daftar kota di Indonesia dengan transportasi umum terbaik untuk wisatawan.",
      img: "https://www.radioidola.com/wp-content/uploads/2025/02/IMG-20250227-WA0005.jpg",
    },
    {
      title: "5 Kuliner Khas Daerah yang Wajib Dicoba",
      desc: "Rasakan pengalaman kuliner otentik dengan mencoba makanan khas dari berbagai daerah.",
      img: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/222/2024/09/12/WhatsApp-Image-2024-09-12-at-121923-988365368.jpeg",
    },
    {
      title: "Wisata Sejarah untuk Anak Muda",
      desc: "Cara asyik menikmati destinasi sejarah agar lebih menarik dan edukatif.",
      img: "https://eticon.co.id/wp-content/uploads/2021/11/Desa-Adat-Ratenggaro.jpg",
    },
    {
      title: "Tips Traveling Solo Pertama Kali",
      desc: "Hal-hal penting yang perlu disiapkan jika kamu ingin bepergian sendiri.",
      img: "https://infobanknews.com/wp-content/uploads/2024/06/Solo-Traveling.jpg",
    },
    {
      title: "Staycation: Liburan Nyaman Tanpa Perlu Jauh",
      desc: "Ide staycation menyenangkan di kota sendiri dengan budget minim.",
      img: "https://static.tripzilla.id/media/30307/conversions/feature-w1024.webp",
    },
  ];

  return (
    <>
      {/* Breadcrumb & Search */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold">
              Artikel & Tips Perjalanan
            </h2>
            <div className="text-sm text-gray-600">
              <Link
                to="/"
                className="hover:underline text-orange-600 font-semibold"
              >
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Artikel</span>
            </div>
          </div>

          <div className="ml-auto">
            <input
              type="text"
              placeholder="Cari artikel..."
              className="px-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Artikel Cards */}
      <section className="mt-8 mb-20 px-10 max-w-7xl mx-auto">
        {/* Header with Orange Line Above */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Siap berpetualang? Mulailah dengan membaca artikel wisata pilihan kami hari ini.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((artikel, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300"
            >
              <img
                src={artikel.img}
                alt={artikel.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{artikel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{artikel.desc}</p>
                <Link
                  to={`/artikel/${index}`}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Artikel;
