import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const [openIndex, setOpenIndex] = useState(null); // Ini masih tidak digunakan
  const navigate = useNavigate();

  // Data paket wisata yang lebih terstruktur
  const packages = [
    {
      id: "bali4d3n",
      name: "Bali 4 Hari 3 Malam",
      price: 2500000,
      description: "Eksplorasi keindahan Bali dari pantai hingga budaya lokal. Termasuk hotel & transportasi.",
      image: "https://cdn.audleytravel.com/2478/1770/79/16027396-pura-ulun-danu-bratan-bali.jpg",
    },
    {
      id: "yogyakartaht",
      name: "Yogyakarta Heritage Tour",
      price: 1800000,
      description: "Kunjungi candi, museum, dan tempat ikonik di Jogja bersama pemandu lokal.",
      image: "https://agievent.com/public/uploads/0000/1/2020/06/02/yogyakarta-heritage-tour-borobudur-and-prambanan-promo.jpg",
    },
    {
      id: "labuanbkomodo",
      name: "Labuan Bajo & Komodo Adventure",
      price: 3900000,
      description: "Petualangan laut dan pulau eksotis, termasuk kunjungan ke Pulau Komodo.",
      image: "https://lingkarwilis.com/wp-content/uploads/2024/10/labuannnnnn.webp",
    },
    {
      id: "bandungcl",
      name: "Bandung City Leisure",
      price: 1200000,
      description: "Jalan-jalan santai di Lembang, Dago, dan pusat belanja Bandung. Termasuk akomodasi hotel bintang 3.",
      image: "https://cozzy.id/uploads/0000/630/2024/08/05/cozzyid-hotel-murah-hotel-terdekat-penginapan-murah-penginapan-terdekat-booking-hotel-dusun-bambu-family-leisure-park-surga-keluarga-di-bandung-sumber-gambar-dirgantaracarrental.jpg",
    },
    {
      id: "rajaampatde",
      name: "Raja Ampat Diving Experience",
      price: 5500000,
      description: "Nikmati diving di spot terindah dunia, Raja Ampat. Termasuk peralatan diving dan guide profesional.",
      image: "https://res.cloudinary.com/zublu/image/fetch/f_webp,w_1200,q_auto/https://www.zubludiving.com/images/Indonesia/West-Papua/Raja-Ampat/Raja-Ampat-Wayag-Diving.jpg",
    },
    {
      id: "bromosunrise",
      name: "Bromo Sunrise Trekking",
      price: 900000,
      description: "Saksikan sunrise dari puncak Bromo, plus jeep tour dan pemandu lokal profesional.",
      image: "https://image.popbela.com/content-images/post/20231225/8aa929d9b2986a7c68fc365585a28ceb.jpg?width=1600&format=webp&w=1600",
    },
  ];

  const handlePesanSekarang = (packageName, packagePrice) => {
    // MODIFIKASI HANYA PADA BARIS INI: Ganti '/pemesanan-wisata' menjadi '/checkout'
    navigate('/checkout', {
      state: {
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
              <Link to="/" className="hover:underline text-orange-600 font-semibold">
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
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {pkg.description}
                </p>
                <span className="text-orange-600 font-bold text-lg block mb-2">
                  Rp {pkg.price.toLocaleString('id-ID')}/orang
                </span>
                <button
                  onClick={() => handlePesanSekarang(pkg.name, pkg.price)}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Pesan Sekarang →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Order;