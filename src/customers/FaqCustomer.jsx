import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '#' },
  { label: 'Order', path: '/order-customer' },
  { label: 'Promo', path: '#' },
  { label: 'Artikel', path: '#' },
  { label: 'Testimoni', path: '#' },
  { label: 'Kontak', path: '#' },
  { label: 'FAQ', path: '/faq-customer' },
];

const faqData = [
  {
    question: 'Bagaimana cara memesan tiket perjalanan?',
    answer: 'Pilih destinasi, tanggal, dan layanan di halaman pemesanan, lalu ikuti instruksi hingga pembayaran selesai.'
  },
  {
    question: 'Apa saja metode pembayaran yang tersedia?',
    answer: 'Kami menyediakan pembayaran via transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit.'
  },
  {
    question: 'Bisakah saya membatalkan atau mengubah jadwal pemesanan?',
    answer: 'Ya, perubahan atau pembatalan dapat dilakukan maksimal H-2 perjalanan melalui menu "Kelola Pesanan".'
  },
  {
    question: 'Apakah ada biaya tambahan saat memesan tiket?',
    answer: 'Tidak ada biaya tambahan tersembunyi. Semua biaya ditampilkan secara transparan sebelum pembayaran.'
  },
  {
    question: 'Bagaimana saya mendapatkan promo atau diskon?',
    answer: 'Kamu bisa cek promo aktif di halaman Promo atau ikuti media sosial resmi kami untuk update terbaru.'
  },
  {
    question: 'Apakah tersedia layanan sewa kendaraan?',
    answer: 'Ya, kami menyediakan layanan sewa mobil dan motor di beberapa kota tujuan dengan harga bersaing.'
  },
  {
    question: 'Bagaimana jika saya tidak menerima e-tiket?',
    answer: 'E-tiket otomatis dikirim via email setelah pembayaran berhasil. Jika belum ada, cek folder spam atau hubungi CS kami.'
  },
  {
    question: 'Apakah aman melakukan transaksi di website ini?',
    answer: 'Sangat aman. Situs kami dilengkapi dengan enkripsi SSL dan sistem pembayaran yang terpercaya.'
  },
  {
    question: 'Bisakah memesan untuk orang lain?',
    answer: 'Tentu bisa! Pastikan mengisi data penumpang dengan benar di form pemesanan.'
  },
  {
    question: 'Dimana saya bisa melihat riwayat pemesanan?',
    answer: 'Kamu bisa melihat riwayat pesanan di menu "Profil" setelah login ke akun kamu.'
  }
];

const FaqCustomer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
          <div className="flex items-center">
            <img
              src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
              alt="Logo"
              className="h-10 mr-2"
            />
          </div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex list-none m-0 p-0 space-x-6">
                {navItems.map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      to={path}
                      className="font-bold text-gray-800 text-lg hover:text-orange-500 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:underline text-orange-600 font-semibold">
              Beranda
            </Link>{" "}
            / <span className="text-gray-700">FAQ</span>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <main className="min-h-screen px-6 pb-12 flex flex-col items-center">

        <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-6xl">
          {/* Gambar Kiri */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img 
              src="public/images/FAQ.png" 
              alt="Gambar Travel" 
              className="w-full max-w-sm object-cover" 
            />
          </div>

          {/* FAQ Kanan */}
          <div className="md:w-1/2 w-full space-y-4">
          <p className="text-gray-600 mb-6 text-center max-w-md item-center">
          Klik pertanyaan untuk melihat jawabannya!
        </p>
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white border border-[#FF6900] rounded-xl shadow-md overflow-hidden transition-all">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 py-4 bg-[#FF6900] text-white font-semibold flex justify-between items-center hover:bg-orange-600 transition-colors"
                >
                  {faq.question}
                  {openIndex === index ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>
                {openIndex === index && (
                  <div className="px-5 py-4 bg-orange-100 text-gray-700 text-sm">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
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
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Instagram</a></li>
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
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
          © Copyright {new Date().getFullYear()} by Miyako, Pendy, Nuraisyah.
        </div>
      </footer>
    </div>
  );
};

export default FaqCustomer;
