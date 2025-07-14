import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import { supabase } from "../../supabase";

const Order = () => {
  const [openIndex, setOpenIndex] = useState(null); // Masih tidak digunakan
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("paketwisata")
        .select("id_paket, nama_paket, deskripsi, harga, gambar_url"); // Pastikan id_paket diambil di sini

      if (error) {
        console.error("Gagal mengambil data paket wisata:", error.message);
      } else {
        setPackages(data);
      }
    };

    fetchPackages();
  }, []);

  // --- PERUBAHAN UTAMA DI SINI ---
  const handlePesanSekarang = (packageId, packageName, packagePrice) => {
    navigate("/checkout", {
      state: {
        idPaket: packageId, // <--- INI YANG PERLU DITAMBAHKAN
        jenisPaket: packageName,
        hargaPaket: packagePrice,
      },
    });
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Order Paket Wisata
            </h2>
            <div className="text-sm text-gray-600">
              <Link
                to="/"
                className="hover:underline text-orange-600 font-semibold"
              >
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Order Paket Wisata</span>
            </div>
          </div>

          <div className="ml-auto">
            <input
              type="text"
              placeholder="Cari Wisata..."
              className="px-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Paket Wisata Section */}
      <section className="mb-20 px-10 max-w-7xl mx-auto">
        {/* Header with Orange Line Above */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Pilih paket wisata favoritmu dan lakukan pemesanan sekarang!
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id_paket}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300"
            >
              <img
                src={
                  pkg.gambar_url ||
                  "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt={pkg.nama_paket}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{pkg.nama_paket}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.deskripsi}</p>
                <span className="text-orange-600 font-bold text-lg block mb-2">
                  Rp {Number(pkg.harga).toLocaleString("id-ID")}/orang
                </span>
                <button
                  // --- PERUBAHAN UTAMA DI SINI ---
                  onClick={() =>
                    handlePesanSekarang(pkg.id_paket, pkg.nama_paket, pkg.harga)
                  }
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Pesan Sekarang →
                </button>
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
    </div>
  );
};

export default Order;