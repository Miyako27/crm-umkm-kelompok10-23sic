import { Link } from "react-router-dom";
import { useState } from "react"; // Karena pakai useState buat FAQ (kalau mau nambah nanti)


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

const Order = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h2 className="text-3xl font-extrabold text-gray-800">Halaman Order</h2>
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:underline text-orange-600 font-semibold">
              Beranda
            </Link>{" "}
            / <span className="text-gray-700">Order</span>
          </div>
        </div>
      </div>

      {/* Konten Utama Halaman Order */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-10">        </h1>

        <p className="text-center text-gray-600 mb-8">
          Pilih paket wisata favoritmu dan lakukan pemesanan sekarang!
        </p>

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
      </div>

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

          {/* Kontak */}
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

export default Order;
