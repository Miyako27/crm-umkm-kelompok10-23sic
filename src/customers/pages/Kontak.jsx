import React from "react";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const Kontak = () => {
  return (
    <div className="font-sans">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Kontak Kami</h2>
          <div className="text-sm text-gray-600">
            <Link
              to="/"
              className="hover:underline text-orange-600 font-semibold"
            >
              Beranda
            </Link>{" "}
            / <span className="text-gray-700">Kontak</span>
          </div>
        </div>
      </div>

      {/* Konten Kontak */}
      <section className="mt-10">
        <div className="container mx-auto max-w-screen-xl px-5 flex flex-col md:flex-row gap-10 items-center">
          {/* Peta Google Maps */}
          <div className="md:w-1/2">
            <div className="bg-white p-4 rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Lokasi Kami</h4>
              <iframe
                title="Peta Lokasi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6852358819566!2d101.44772387581628!3d0.5070672638312067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5aeff2f1f5c8f%3A0x88502882d0e3edac!2sJl.%20Sudirman%20No.123%2C%20Pekanbaru%2C%20Riau!5e0!3m2!1sen!2sid!4v1718297698667!5m2!1sen!2sid"
                width="100%"
                height="350"
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg w-full h-72 md:h-80 border"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Informasi Kontak dengan Card */}
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Hubungi Kami
            </h3>
            <p className="text-gray-700">
              Silakan hubungi kami untuk pertanyaan, pemesanan, atau informasi
              lainnya.
            </p>

            {/* Card Kontak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start bg-white p-4 rounded-lg shadow-md border">
                <FiPhone className="text-orange-500 text-2xl mt-1 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Telepon</h4>
                  <p className="text-gray-700">+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-md border">
                <FiMail className="text-orange-500 text-2xl mt-1 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <p className="text-gray-700">tripenya.id@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-md border">
                <FiMapPin className="text-orange-500 text-2xl mt-1 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Alamat</h4>
                  <p className="text-gray-700">
                    Jl. Sudirman No.123, Pekanbaru, Riau
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-4 rounded-lg shadow-md border">
                <FiClock className="text-orange-500 text-2xl mt-1 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800">Jam Operasional</h4>
                  <p className="text-gray-700">
                    Senin - Minggu, 08.00 - 20.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kontak;
