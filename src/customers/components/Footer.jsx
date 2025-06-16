import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 bg-gray-900 text-gray-200">
      <div className="container mx-auto max-w-screen-xl px-5 py-12 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo dan Deskripsi */}
        <div className="md:w-1/3">
          <img
            src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
            alt="Logo Footer"
            className="h-12 mb-4"
          />
          <p className="text-sm max-w-xs">
            Tripenya - Healing Gak Pake Drama, Cuma Disini!
          </p>
        </div>

        {/* Media Sosial */}
        <div className="md:w-1/3">
          <h3 className="font-bold text-xl mb-2">Ikuti Kami</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak dan Jam Buka */}
        <div className="md:w-1/3">
          <h3 className="font-bold text-xl mb-2">Hubungi Kami</h3>
          <p>Telp: +62 812-3456-7890</p>
          <p>Alamat: Jl. Sudirman No.123, Pekanbaru, Riau</p>
          <p>Jam Buka: Senin - Minggu, 08.00 - 20.00 WIB</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © Copyright {new Date().getFullYear()} by Miyako, Pendy, Nuraisyah.
      </div>
    </footer>
  );
}
