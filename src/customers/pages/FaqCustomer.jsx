import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

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
      <main className="min-h-screen px-6 pb-12 flex flex-col">
        {/* Header with Orange Line Above */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Punya pertanyaan seputar paket wisata kami? Temukan jawabannya di sini!
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-6xl">
          {/* Gambar Kiri */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img 
              src="images/FAQ.png" 
              alt="Gambar Travel" 
              className="w-full max-w-sm object-cover" 
            />
          </div>

          {/* FAQ Kanan */}
          <div className="md:w-1/2 w-full space-y-4">
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
    </div>
  );
};

export default FaqCustomer;
