import React from "react";
import { Link } from "react-router-dom";

const Promo = () => {
    return (
        <div className="font-sans">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-3xl font-extrabold text-gray-800">
                            Promo
                        </h2>
                        <div className="text-sm text-gray-600">
                            <Link to="/" className="hover:underline text-orange-600 font-semibold">
                                Beranda
                            </Link>{" "}
                            / <span className="text-gray-700">Promo</span>
                        </div>
                    </div>

                    <div className="ml-auto">
                        <input
                            type="text"
                            placeholder="Cari Promo..."
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
                    Tersedia hanya minggu ini! Booking cepat sebelum semua kursi habis!
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
            </section>
        </div>
    );
};

export default Promo;
