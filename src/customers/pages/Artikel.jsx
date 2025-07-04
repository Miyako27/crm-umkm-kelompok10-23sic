import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { supabase } from '../../supabase';

const Artikel = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("artikel")
        .select("id_artikel, judul, deskripsi_artikel, gambar");

      if (error) {
        console.error("Gagal mengambil data artikel:", error.message);
      } else {
        setArticles(data);
      }
    };

    fetchArticles();
  }, []);

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
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Siap berpetualang? Mulailah dengan membaca artikel wisata pilihan kami hari ini.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((artikel) => (
            <div
              key={artikel.id_artikel}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300"
            >
              <img
                src={
                  artikel.gambar ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={artikel.judul}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{artikel.judul}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {artikel.deskripsi_artikel}
                </p>
                <Link
                  to={`/artikel/${artikel.id_artikel}`}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
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
    </>
  );
};

export default Artikel;
