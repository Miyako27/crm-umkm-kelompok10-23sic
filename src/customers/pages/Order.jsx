import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../../supabase'; // PASTIKAN PATH INI BENAR SESUAI STRUKTUR PROYEK ANDA

const Order = () => {
  const navigate = useNavigate();

  // Ubah state 'packages' untuk menyimpan data dari Supabase
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efek untuk mengambil data paket wisata dari Supabase saat komponen dimuat
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('paketwisata') // Nama tabel paket wisata Anda
        .select('id_paket, nama_paket, harga, deskripsi, gambar_url'); // Pilih kolom yang Anda butuhkan sesuai skema
        // Anda bisa menambahkan .order('nama_paket', { ascending: true }) jika ingin diurutkan

      if (error) {
        console.error("Error fetching packages:", error);
        setError("Gagal memuat data paket wisata.");
      } else {
        setPackages(data); // Simpan data paket dari Supabase ke state
      }
      setIsLoading(false);
    };

    fetchPackages();
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  const handlePesanSekarang = (selectedPackageId, selectedPackageName, selectedPackagePrice) => {
    // Pastikan Anda meneruskan id_paket yang sebenarnya (UUID)
    navigate('/checkout', { // PASTIKAN ROUTE INI BENAR (misal: '/checkout' atau '/pemesanan-wisata')
      state: {
        idPaket: selectedPackageId,       // <--- INI PENTING: ID Paket (UUID) dari Supabase
        jenisPaket: selectedPackageName,  // Nama paket
        hargaPaket: selectedPackagePrice, // Harga paket
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Memuat daftar paket wisata...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  // Jika tidak ada paket ditemukan
  if (packages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Tidak ada paket wisata yang tersedia saat ini.</p>
      </div>
    );
  }

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
            <div key={pkg.id_paket} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-orange-200 transition-shadow duration-300">
              <img
                src={pkg.gambar_url} // Gunakan gambar_url dari Supabase
                alt={pkg.nama_paket}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{pkg.nama_paket}</h3> {/* Gunakan nama_paket */}
                <p className="text-gray-600 text-sm mb-4">
                  {pkg.deskripsi} {/* Gunakan deskripsi */}
                </p>
                <span className="text-orange-600 font-bold text-lg block mb-2">
                  Rp {pkg.harga.toLocaleString('id-ID')}/orang {/* Gunakan harga */}
                </span>
                <button
                  // Kirim id_paket, nama_paket, dan harga saat tombol diklik
                  onClick={() => handlePesanSekarang(pkg.id_paket, pkg.nama_paket, pkg.harga)}
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