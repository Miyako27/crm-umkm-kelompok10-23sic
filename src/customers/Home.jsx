import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  { label: 'Order', path: '#' },
  { label: 'Promo', path: '#' },
  { label: 'Artikel', path: '/artikel' },
  { label: 'Testimoni', path: '/testimoni' },
  { label: 'Kontak', path: '/kontak' },
  { label: 'FAQ', path: '#' },
];

const Home = () => {
  return (
    <div className="font-sans">
      {/* Header and Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
          {/* Logo Section (kiri) */}
          <div className="flex items-center">
            <img
              src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
              alt="Pemerintah Provinsi Riau Logo"
              className="h-10 mr-2"
            />
          </div>

          {/* Nav + Login (kanan) */}
          <div className="flex items-center space-x-6">
            {/* Navigation (kanan) */}
            <nav>
              <ul className="flex list-none m-0 p-0 space-x-6">
                {navItems.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="font-bold text-gray-800 text-lg hover:text-orange-500 transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Login Button */}
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition-colors duration-300 inline-block"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative w-full h-full">
        <img
          src="images/GambarHome.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(230,80,40,0.7)] to-[rgba(255,165,0,0.3)]"></div> */}

        {/* Hero content placeholder */}
        <div className="absolute bottom-12 left-5 z-10 text-white">
          {/* Jika ada teks atau logo di sini bisa ditambahkan */}
        </div>
      </div>

      {/* Promo */}
      <section className="mt-14 mb-14 bg-[#FAF9F6] text-black py-10 px-20 flex flex-col md:flex-row items-center relative overflow-hidden rounded-xl max-w-full mx-auto">
        {/* Decorative circles */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-yellow-400 rounded-full opacity-30 animate-pulse blur-xl"></div>
        <div className="absolute -bottom-14 -right-14 w-44 h-44 bg-yellow-300 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        {/* Left side: Big Discount Circle with Icon */}
        <div className="flex-shrink-0 flex items-center justify-center md:w-1/3 mr-8">
          <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-orange-600 shadow-lg">
            {/* Discount tag icon inside circle */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-5 left-5 h-12 w-12 text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 7L3 11l5 5 4-4-5-5zm4 4l5 5 4-4-5-5-4 4z"
              />
            </svg>

            {/* Diskon Text */}
            <h2 className="text-7xl font-extrabold text-white leading-none z-10 select-none">
              30%
            </h2>
          </div>
        </div>

        {/* Right side: Text + Button */}
        <div className="flex flex-col justify-between md:w-2/3 h-52 md:h-44 z-10 ml-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Diskon Spesial Akhir Tahun! 🎉
            </h3>
            <p className="text-lg md:text-xl leading-relaxed tracking-wide mb-6">
              Dapatkan potongan hingga{" "}
              <span className="font-bold text-orange-600">30%</span> untuk semua
              paket wisata pilihan kami.
              <br />
              Jangan lewatkan kesempatan liburan hemat dan seru bersama{" "}
              <span className="underline font-semibold">Tripenya</span>!
            </p>
          </div>

          <Link
            to="#"
            className="self-start border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-10 py-2 hover:bg-orange-100 hover:text-orange-700 transition transform duration-300"
          >
            Lihat Promo
          </Link>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Selamat Datang di <span className="text-orange-600">Tripenya</span>!
        </h2>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: Tentang Kami */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-orange-600 pl-4">
              Tentang Kami
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Tripenya adalah platform perjalanan terpercaya yang menyediakan
              berbagai paket wisata menarik dan terjangkau. Kami berkomitmen
              memberikan pengalaman liburan terbaik bagi pelanggan kami dengan
              pelayanan profesional dan paket wisata berkualitas.
            </p>
          </div>

          {/* Right: Kenapa Memilih Kami */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-orange-600 pl-4">
              Kenapa Memilih Kami
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Paket wisata lengkap dan variatif sesuai kebutuhan.</li>
              <li>Harga kompetitif dengan promo menarik.</li>
              <li>Tim profesional siap membantu Anda 24/7.</li>
              <li>Pelayanan personal dan pengalaman pelanggan terbaik.</li>
              <li>Kemudahan pemesanan online yang cepat dan aman.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Paket Wisata Section */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        {/* Header with Orange Line Above */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-3xl font-extrabold text-left">
            Paket Wisata Populer
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Paket 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://cdn.audleytravel.com/2478/1770/79/16027396-pura-ulun-danu-bratan-bali.jpg"
              alt="Bali"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">Bali 4 Hari 3 Malam</h3>
              <p className="text-gray-600 text-sm mb-4">
                Eksplorasi keindahan Bali dari pantai hingga budaya lokal.
                Termasuk hotel & transportasi.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">
                Rp 2.500.000/orang
              </span>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Pesan Sekarang →
              </Link>
            </div>
          </div>

          {/* Paket 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://agievent.com/public/uploads/0000/1/2020/06/02/yogyakarta-heritage-tour-borobudur-and-prambanan-promo.jpg"
              alt="Yogyakarta"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                Yogyakarta Heritage Tour
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Kunjungi candi, museum, dan tempat ikonik di Jogja bersama
                pemandu lokal.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">
                Rp 1.800.000/orang
              </span>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Pesan Sekarang →
              </Link>
            </div>
          </div>

          {/* Paket 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://lingkarwilis.com/wp-content/uploads/2024/10/labuannnnnn.webp"
              alt="Labuan Bajo"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                Labuan Bajo & Komodo Adventure
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Petualangan laut dan pulau eksotis, termasuk kunjungan ke Pulau
                Komodo.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">
                Rp 3.900.000/orang
              </span>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Pesan Sekarang →
              </Link>
            </div>
          </div>
        </div>

        {/* Selengkapnya Button */}
        <div className="text-center mt-10">
          <Link
            to="#"
            className="inline-block border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-8 py-3 hover:bg-orange-100 hover:text-orange-700 transition"
          >
            Lihat Semua Paket
          </Link>
        </div>
      </section>

      {/* Artikel Section */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        {/* Header with Orange Line Above */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>{" "}
          {/* Garis orange di atas */}
          <h2 className="text-3xl font-extrabold text-left">
            Artikel & Tips Perjalanan
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Artikel 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://cdn1-production-images-kly.akamaized.net/vPpLKNpIZBz0UpEa7kTXo0leseU=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1573413/original/032386100_1492757560-Traveling4.jpg"
              alt="Artikel 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                Tips Liburan Hemat di Musim Libur
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Pelajari cara mengatur budget agar liburan tetap menyenangkan
                tanpa menguras dompet.
              </p>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>

          {/* Artikel 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://pagaralampos.bacakoran.co/upload/ea45770abc4e309f1913ae971f19a964.jpg"
              alt="Artikel 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                Destinasi Alam Terbaik untuk Tahun Ini
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Jelajahi keindahan alam Indonesia yang wajib masuk dalam daftar
                perjalananmu.
              </p>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>

          {/* Artikel 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://assets-a1.kompasiana.com/items/album/2021/09/17/suku-melayu-6143ea1306310e657c711402.jpg"
              alt="Artikel 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">
                Mengenal Budaya Lokal Saat Bepergian
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Panduan berinteraksi dengan penduduk lokal untuk pengalaman yang
                lebih otentik.
              </p>
              <Link
                to="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </div>
        </div>

        {/* Selengkapnya Button */}
        <div className="text-center mt-10">
          <Link
            to="/artikel"
            className="inline-block border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-8 py-3 hover:bg-orange-100 hover:text-orange-700 transition"
          >
            Lihat Semua Artikel
          </Link>
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
    </div>
  );
};

export default Home;
