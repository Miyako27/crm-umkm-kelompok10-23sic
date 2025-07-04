import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabase"; // Pastikan path ke file supabase.js benar

const ArtikelDetail = () => {
  const { id } = useParams(); // ID artikel dari URL
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("id_artikel", id)
        .single(); // Hanya ambil 1 artikel sesuai ID

      if (error) {
        console.error("Gagal mengambil artikel:", error.message);
        setArtikel(null);
      } else {
        setArtikel(data);
      }

      setLoading(false);
    };

    fetchArtikel();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Memuat artikel...</div>
    );
  }

  if (!artikel) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Artikel tidak ditemukan
        </h2>
        <Link
          to="/artikel"
          className="text-orange-500 hover:underline block mt-4"
        >
          Kembali ke Artikel
        </Link>
      </div>
    );
  }

  // Tangani slug bisa berupa array atau string biasa
  const tags = Array.isArray(artikel.slug)
    ? artikel.slug
    : artikel.slug
    ? artikel.slug.split(",").map((tag) => tag.trim())
    : [];

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
              /{" "}
              <Link
                to="/artikel"
                className="hover:underline text-orange-600 font-semibold"
              >
                Artikel
              </Link>{" "}
              / <span className="text-gray-700">Detail Artikel</span>
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

      {/* Konten Artikel */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{artikel.judul}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Ditulis oleh <span className="font-medium">{artikel.penulis}</span> •{" "}
          {new Date(artikel.tanggal_terbit).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <img
          src={artikel.gambar}
          alt={artikel.judul}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-700 mb-6">{artikel.deskripsi_artikel}</p>
        <div className="prose prose-lg max-w-none text-justify text-gray-800 whitespace-pre-line">
          {artikel.isi}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-8">
            <h4 className="font-semibold text-sm mb-2 text-gray-600">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtikelDetail;
