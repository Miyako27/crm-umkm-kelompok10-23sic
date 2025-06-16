import React from "react";
import { Link, useLocation } from "react-router-dom";

const Profil = () => {
  const location = useLocation();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Profil Kami</h2>
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

      {/* Konten Profil */}
      <main className="max-w-7xl mx-auto px-6 space-y-16 pb-12">
        {/* Tentang */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Selamat Datang di{" "}
            <span className="text-orange-600">Tripenya</span>!
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
            <strong>Tripenya</strong> adalah platform perjalanan digital yang menyediakan artikel informatif, tips liburan hemat, inspirasi destinasi, serta layanan pemesanan perjalanan. Kami berkomitmen memberikan pengalaman terbaik agar setiap perjalanan terasa mudah, menyenangkan, dan penuh makna.
          </p>
        </section>

        {/* Sejarah Singkat */}
        {/* <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Sejarah Singkat</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Tripenya berdiri sejak tahun 2025 dengan tujuan menghubungkan pelancong dengan destinasi lokal yang autentik. Berawal dari blog perjalanan sederhana, kini kami berkembang menjadi platform terpercaya yang digunakan oleh ribuan pengguna di seluruh Indonesia.
          </p>
        </section> */}

        {/* Visi & Misi */}
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Visi & Misi</h2>
          <div className="bg-orange-50 p-10 rounded-2xl shadow-md space-y-10">
            {/* Visi */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Visi</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi platform perjalanan digital terpercaya yang membantu masyarakat merencanakan perjalanan dengan nyaman, aman, dan penuh inspirasi.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-200">
              <h3 className="text-2xl font-semibold text-orange-600 mb-3">Misi</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg leading-relaxed">
                <li>Menyediakan informasi perjalanan yang akurat dan terkini.</li>
                <li>Memberikan tips liburan hemat dan efisien.</li>
                <li>Mendukung mitra lokal dalam mempromosikan destinasi wisata mereka.</li>
                <li>Menjadi teman perjalanan yang terpercaya bagi seluruh kalangan.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Nilai Perusahaan */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inovasi",
                desc: "Kami terus mencari cara baru untuk meningkatkan pengalaman perjalanan digital Anda.",
              },
              {
                title: "Integritas",
                desc: "Kami menjunjung tinggi kejujuran dan transparansi dalam semua layanan kami.",
              },
              {
                title: "Kepuasan Pelanggan",
                desc: "Kebutuhan dan kenyamanan pelanggan adalah prioritas utama kami.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl shadow-lg border border-orange-200 hover:shadow-2xl transition-shadow duration-300"
              >
                <h4 className="font-semibold text-orange-600 text-xl mb-3">
                  {title}
                </h4>
                <p className="text-gray-700 text-base">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partner */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Partner & Kolaborasi</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Kami bangga bermitra dengan berbagai pelaku industri pariwisata, termasuk hotel lokal, tour guide profesional, dan platform transportasi online. Kolaborasi ini memastikan layanan yang terintegrasi dan terpercaya untuk pengguna Tripenya.
          </p>
        </section>

        {/* Tim */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Miyako Juliana Otsu",
                role: "Pendiri Tripenya",
                image: "/images/miyako.jpeg",
              },
              {
                name: "Muhammad Rayhan Effendi",
                role: "Pendiri Tripenya",
                image: "/images/pendi.jpeg",
              },
              {
                name: "Nuraisyah",
                role: "Pendiri Tripenya",
                image: "/images/nuraisyah.jpeg",
              },
            ].map(({ name, role, image }) => (
              <div
                key={name}
                className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-36 h-36 mx-auto rounded-full object-cover mb-5 border-4 border-orange-300"
                />
                <h4 className="text-xl font-semibold text-orange-600">{name}</h4>
                <p className="text-gray-700 text-sm mt-1">{role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Profil;
