import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase";
import { BiChat } from "react-icons/bi";

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimoni")
        .select("nama_pengirim, foto_url, pesan")
        .order("created_at", { ascending: false })
        .limit(4); // Hanya ambil 4 testimoni terbaru

      if (error) {
        console.error("Gagal mengambil testimoni:", error.message);
      } else {
        setTestimonials(data);
      }

      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="font-sans">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Testimoni</h2>
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:underline text-orange-600 font-semibold">
              Beranda
            </Link>{" "}
            / <span className="text-gray-700">Testimoni</span>
          </div>
        </div>
      </div>

      {/* Section Testimoni */}
      <section className="bg-white mb-20">
        <div className="max-w-7xl mx-auto px-10">
          {/* Header with Orange Line Above */}
          <div className="mb-10">
            <div className="w-16 h-1 bg-orange-600 mb-3"></div>
            <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
              Pelayanan kami berbicara lewat kata-kata bahagia para pelanggan
            </h2>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-10">Memuat testimoni...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-gray-500 py-10">Belum ada testimoni tersedia.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={
                        t.foto_url ||
                        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                      }
                      alt={t.nama_pengirim}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                    />
                    <h4 className="font-bold text-gray-800">{t.nama_pengirim}</h4>
                  </div>
                  <p className="text-gray-700 text-sm">"{t.pesan}"</p>
                </div>
              ))}
            </div>
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

export default Testimoni;
