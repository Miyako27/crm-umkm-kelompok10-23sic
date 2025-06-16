import React, { useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="font-sans min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-800">
              Order
            </h2>
            <div className="text-sm text-gray-600">
              <Link to="/" className="hover:underline text-orange-600 font-semibold">
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">Order</span>
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
                Eksplorasi keindahan Bali dari pantai hingga budaya lokal. Termasuk hotel & transportasi.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 2.500.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
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
              <h3 className="text-xl font-bold mb-2">Yogyakarta Heritage Tour</h3>
              <p className="text-gray-600 text-sm mb-4">
                Kunjungi candi, museum, dan tempat ikonik di Jogja bersama pemandu lokal.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 1.800.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
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
              <h3 className="text-xl font-bold mb-2">Labuan Bajo & Komodo Adventure</h3>
              <p className="text-gray-600 text-sm mb-4">
                Petualangan laut dan pulau eksotis, termasuk kunjungan ke Pulau Komodo.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 3.900.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
                Pesan Sekarang →
              </Link>
            </div>
          </div>

          {/* Paket 4 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://cozzy.id/uploads/0000/630/2024/08/05/cozzyid-hotel-murah-hotel-terdekat-penginapan-murah-penginapan-terdekat-booking-hotel-dusun-bambu-family-leisure-park-surga-keluarga-di-bandung-sumber-gambar-dirgantaracarrental.jpg"
              alt="Bandung"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">Bandung City Leisure</h3>
              <p className="text-gray-600 text-sm mb-4">
                Jalan-jalan santai di Lembang, Dago, dan pusat belanja Bandung. Termasuk akomodasi hotel bintang 3.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 1.200.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
                Pesan Sekarang →
              </Link>
            </div>
          </div>

          {/* Paket 5 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://res.cloudinary.com/zublu/image/fetch/f_webp,w_1200,q_auto/https://www.zubludiving.com/images/Indonesia/West-Papua/Raja-Ampat/Raja-Ampat-Wayag-Diving.jpg"
              alt="Raja Ampat"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">Raja Ampat Diving Experience</h3>
              <p className="text-gray-600 text-sm mb-4">
                Nikmati diving di spot terindah dunia, Raja Ampat. Termasuk peralatan diving dan guide profesional.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 5.500.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
                Pesan Sekarang →
              </Link>
            </div>
          </div>

          {/* Paket 6 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
            <img
              src="https://image.popbela.com/content-images/post/20231225/8aa929d9b2986a7c68fc365585a28ceb.jpg?width=1600&format=webp&w=1600"
              alt="Bromo"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">Bromo Sunrise Trekking</h3>
              <p className="text-gray-600 text-sm mb-4">
                Saksikan sunrise dari puncak Bromo, plus jeep tour dan pemandu lokal profesional.
              </p>
              <span className="text-orange-600 font-bold text-lg block mb-2">Rp 900.000/orang</span>
              <Link to="#" className="text-orange-600 font-semibold hover:underline">
                Pesan Sekarang →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
