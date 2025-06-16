import React from "react";
import { useParams, Link } from "react-router-dom";

const dummyArticles = [
  {
    title: "Tips Liburan Hemat di Musim Libur",
    author: "Dewi Lestari",
    date: "10 Juni 2025",
    img: "https://cdn1-production-images-kly.akamaized.net/vPpLKNpIZBz0UpEa7kTXo0leseU=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1573413/original/032386100_1492757560-Traveling4.jpg",
    desc: "Cara liburan menyenangkan tanpa harus menghabiskan seluruh tabunganmu. Panduan ini cocok untuk mahasiswa, pekerja, hingga keluarga muda.",
    content: `
      Liburan hemat bukan berarti kamu tidak bisa bersenang-senang. Yang penting adalah perencanaan yang matang. Mulailah dengan mencari tiket promo jauh-jauh hari dan gunakan transportasi umum. Pilih penginapan yang terjangkau namun tetap nyaman seperti guest house atau homestay.
      
      Saat makan, coba makanan lokal di warung atau kaki lima yang sering dikunjungi warga sekitar—biasanya enak dan murah. Selain itu, buat itinerary agar kamu tidak membuang waktu dan biaya secara tidak perlu. Hindari belanja impulsif dan fokus pada pengalaman, bukan barang.
      
      Gunakan aplikasi seperti Google Maps, Traveloka, atau Tiket.com untuk mencari tempat menarik gratis atau dengan biaya murah. Liburan cerdas adalah tentang menciptakan kenangan, bukan menguras dompet.
    `,
    tags: ["travel", "hemat", "budget", "liburan"],
  },
  {
    title: "Kuliner Nusantara yang Melegenda",
    author: "Chef Bima Ardianto",
    date: "5 Juni 2025",
    img: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/222/2024/09/12/WhatsApp-Image-2024-09-12-at-121923-988365368.jpeg",
    desc: "Mengenal makanan khas dari berbagai daerah yang tidak lekang oleh waktu.",
    content: `
      Indonesia terkenal dengan ragam kulinernya. Mulai dari rendang dari Padang yang mendunia, hingga papeda dari Papua yang unik teksturnya. Setiap daerah punya ciri khas dan cerita di balik makanannya.
      
      Salah satu contohnya adalah Gudeg dari Yogyakarta, yang dimasak selama berjam-jam dengan gula jawa hingga berwarna cokelat keemasan. Lalu ada Coto Makassar dengan kuah kental penuh rempah.
      
      Menyusuri nusantara lewat rasa adalah salah satu cara mengenal kekayaan budaya Indonesia. Cobalah makanan lokal setiap kali bepergian, dan jangan ragu menanyakan sejarah atau cara masaknya pada warga setempat.
    `,
    tags: ["kuliner", "nusantara", "budaya"],
  },
  // Tambahkan artikel lainnya...
];

const ArtikelDetail = () => {
  const { id } = useParams();
  const artikel = dummyArticles[id];

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
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{artikel.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Ditulis oleh <span className="font-medium">{artikel.author}</span> •{" "}
          {artikel.date}
        </p>
        <img
          src={artikel.img}
          alt={artikel.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg text-gray-700 mb-6">{artikel.desc}</p>
        <div className="prose prose-lg max-w-none text-justify text-gray-800 whitespace-pre-line">
          {artikel.content}
        </div>

        {artikel.tags && (
          <div className="mt-8">
            <h4 className="font-semibold text-sm mb-2 text-gray-600">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {artikel.tags.map((tag, index) => (
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
