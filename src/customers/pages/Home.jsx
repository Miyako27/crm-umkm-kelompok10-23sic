import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { supabase } from '../../supabase';

const Home = () => {
  const [paketWisata, setPaketWisata] = useState([]);
  const [artikelList, setArtikelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: paketData } = await supabase
        .from("paketwisata")
        .select("*")
        .order("id_paket", { ascending: false })
        .limit(3);

      const { data: artikelData } = await supabase
        .from("artikel")
        .select("*")
        .order("id_artikel", { ascending: false })
        .limit(3);

      setPaketWisata(paketData || []);
      setArtikelList(artikelData || []);
    };

    fetchData();
  }, []);

  return (
    <div className="font-sans relative">
      {/* Hero Banner */}
      <div className="relative w-full h-full">
        <img
          src="/images/GambarHome.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-5 z-10 text-white"></div>
      </div>

      {/* Promo */}
      <section className="mt-14 mb-14 bg-[#FAF9F6] text-black py-10 px-20 flex flex-col md:flex-row items-center relative overflow-hidden rounded-xl max-w-full mx-auto">
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-yellow-400 rounded-full opacity-30 animate-pulse blur-xl"></div>
        <div className="absolute -bottom-14 -right-14 w-44 h-44 bg-yellow-300 rounded-full opacity-20 animate-pulse blur-2xl"></div>

        <div className="flex-shrink-0 flex items-center justify-center md:w-1/3 mr-8">
          <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-orange-600 shadow-lg">
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
            <h2 className="text-7xl font-extrabold text-white leading-none z-10 select-none">
              30%
            </h2>
          </div>
        </div>

        <div className="flex flex-col justify-between md:w-2/3 h-52 md:h-44 z-10 ml-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              Diskon Spesial Akhir Tahun! 🎉
            </h3>
            <p className="text-lg md:text-xl leading-relaxed tracking-wide mb-6">
              Dapatkan potongan hingga <span className="font-bold text-orange-600">30%</span> untuk semua
              paket wisata pilihan kami.
              <br />
              Jangan lewatkan kesempatan liburan hemat dan seru bersama <span className="underline font-semibold">Tripenya</span>!
            </p>
          </div>
          <Link
            to="/promo"
            className="self-start border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-10 py-2 hover:bg-orange-100 hover:text-orange-700 transition transform duration-300"
          >
            Lihat Promo
          </Link>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Selamat Datang di <span className="text-orange-600">Tripenya</span>!
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-orange-600 pl-4">
              Tentang Kami
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              Tripenya adalah platform perjalanan terpercaya yang menyediakan berbagai paket wisata menarik dan terjangkau. Kami berkomitmen memberikan pengalaman liburan terbaik bagi pelanggan kami dengan pelayanan profesional dan paket wisata berkualitas.
            </p>
          </div>
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

      {/* Paket Wisata */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-3xl font-extrabold text-left">Paket Wisata Populer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paketWisata.map((paket, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
              <img src={paket.gambar_url} alt={paket.nama_paket} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{paket.nama_paket}</h3>
                <p className="text-gray-600 text-sm mb-4">{paket.deskripsi}</p>
                <span className="text-orange-600 font-bold text-lg block mb-2">
                  Rp {parseInt(paket.harga).toLocaleString()}/orang
                </span>
                <Link to="/checkout" className="text-orange-600 font-semibold hover:underline">
                  Pesan Sekarang →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/order-customer/paket-wisata"
            className="inline-block border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-8 py-3 hover:bg-orange-100 hover:text-orange-700 transition"
          >
            Lihat Semua Paket
          </Link>
        </div>
      </section>

      {/* Artikel */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-3xl font-extrabold text-left">
            Artikel & Tips Perjalanan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artikelList.map((artikel, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
              <img src={artikel.gambar} alt={artikel.judul} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{artikel.judul}</h3>
                <p className="text-gray-600 text-sm mb-4">{artikel.deskripsi_artikel}</p>
                <Link to="#" className="text-orange-600 font-semibold hover:underline">
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/artikel"
            className="inline-block border-2 border-orange-600 text-orange-600 font-semibold rounded-full px-8 py-3 hover:bg-orange-100 hover:text-orange-700 transition"
          >
            Lihat Semua Artikel
          </Link>
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

export default Home;
