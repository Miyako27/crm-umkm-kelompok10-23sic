import React from "react";
import { Link, useLocation } from "react-router-dom";

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

const Profil = () => {
  const location = useLocation();

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

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold">Profil Kami</h2>
            <div className="text-sm text-gray-600">
              <Link
                to="/"
                className="hover:underline text-orange-600 font-semibold"
              >
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Profil</span>
            </div>
          </div>
        </div>
      </div>

      {/* Konten Profil */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Tentang */}
        <section>
          <h1 className="text-4xl font-bold mb-4 text-orange-600">Tentang Tripenya</h1>
          <p className="text-gray-700 leading-relaxed">
            <strong>Tripenya</strong> adalah platform perjalanan digital yang menyediakan artikel informatif, tips liburan hemat, inspirasi destinasi, serta layanan pemesanan perjalanan. Kami berkomitmen memberikan pengalaman terbaik agar setiap perjalanan terasa mudah, menyenangkan, dan penuh makna.
          </p>
        </section>

        {/* Sejarah Singkat */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sejarah Singkat</h2>
          <p className="text-gray-700 leading-relaxed">
            Tripenya berdiri sejak tahun 2020 dengan tujuan menghubungkan pelancong dengan destinasi lokal yang autentik. Berawal dari blog perjalanan sederhana, kini kami berkembang menjadi platform terpercaya yang digunakan oleh ribuan pengguna di seluruh Indonesia.
          </p>
        </section>

        {/* Visi & Misi */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Visi & Misi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Visi</h3>
              <p className="text-gray-700">
                Menjadi platform perjalanan digital terpercaya yang membantu masyarakat merencanakan perjalanan dengan nyaman, aman, dan penuh inspirasi.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-2">Misi</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Menyediakan informasi perjalanan yang akurat dan terkini.</li>
                <li>Memberikan tips liburan hemat dan efisien.</li>
                <li>Mendukung mitra lokal dalam mempromosikan destinasi wisata mereka.</li>
                <li>Menjadi teman perjalanan yang terpercaya bagi seluruh kalangan.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nilai Perusahaan */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Inovasi", desc: "Kami terus mencari cara baru untuk meningkatkan pengalaman perjalanan digital Anda." },
              { title: "Integritas", desc: "Kami menjunjung tinggi kejujuran dan transparansi dalam semua layanan kami." },
              { title: "Kepuasan Pelanggan", desc: "Kebutuhan dan kenyamanan pelanggan adalah prioritas utama kami." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-orange-50 p-5 rounded-lg shadow-sm">
                <h4 className="font-semibold text-orange-600 text-lg mb-2">{title}</h4>
                <p className="text-gray-700">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partner */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Partner & Kolaborasi</h2>
          <p className="text-gray-700">
            Kami bangga bermitra dengan berbagai pelaku industri pariwisata, termasuk hotel lokal, tour guide profesional, dan platform transportasi online. Kolaborasi ini memastikan layanan yang terintegrasi dan terpercaya untuk pengguna Tripenya.
          </p>
        </section>

        {/* Tim */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rizky Ramadhan", role: "CEO & Founder" },
              { name: "Dewi Anindya", role: "CTO & Product Lead" },
              { name: "Arif Wicaksono", role: "Marketing Manager" },
            ].map(({ name, role }) => (
              <div key={name} className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt={name}
                  className="w-32 h-32 mx-auto rounded-full mb-3 object-cover"
                />
                <h4 className="text-lg font-semibold text-orange-600">{name}</h4>
                <p className="text-gray-700 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

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

export default Profil;
