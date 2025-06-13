import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Profil", path: "/profil" },
  { label: "Order", path: "#" },
  { label: "Promo", path: "#" },
  { label: "Artikel", path: "/artikel" },
  { label: "Testimoni", path: "#" },
  { label: "Kontak", path: "#" },
  { label: "FAQ", path: "#" },
];

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
          <div className="flex items-center">
            <img
              src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
              alt="Logo"
              className="h-10 mr-2"
            />
          </div>

          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex list-none m-0 p-0 space-x-6">
                {navItems.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className={`font-bold text-lg transition-colors duration-300 ${
                        location.pathname === path
                          ? "text-orange-500"
                          : "text-gray-800 hover:text-orange-500"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="mt-8 bg-gray-900 text-gray-200">
        <div className="container mx-auto max-w-screen-xl px-5 py-12 flex flex-col md:flex-row justify-between gap-8">
          {/* Logo dan Deskripsi */}
          <div className="md:w-1/3">
            <img
              src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
              alt="Logo Footer"
              className="h-12 mb-4"
            />
            <p className="text-sm max-w-xs">
              Tripenya - Healing Gak Pake Drama, Cuma Disini!
            </p>
          </div>

          {/* Media Sosial */}
          <div className="md:w-1/3">
            <h3 className="font-bold text-xl mb-2">Ikuti Kami</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak dan Jam Buka */}
          <div className="md:w-1/3">
            <h3 className="font-bold text-xl mb-2">Hubungi Kami</h3>
            <p>Telp: +62 812-3456-7890</p>
            <p>Alamat: Jl. Sudirman No.123, Pekanbaru, Riau</p>
            <p>Jam Buka: Senin - Minggu, 08.00 - 20.00 WIB</p>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
          © Copyright {new Date().getFullYear()} by Miyako, Pendy, Nuraisyah.
        </div>
      </footer>
    </>
  );
};

export default Artikel;
