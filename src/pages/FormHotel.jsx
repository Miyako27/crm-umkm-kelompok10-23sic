// src/components/admin/FormHotel.jsx
import { useEffect, useState } from 'react';

function FormHotel({ addHotel, updateHotel, editingHotel }) {
  const [formData, setFormData] = useState({
    nama_hotel: '',
    lokasi: '',
    harga_per_malam: '', // Tetap string untuk input, akan di-parse saat submit
    rating_bintang: '',  // Tetap string untuk input, akan di-parse saat submit
    fasilitas: '',
    deskripsi: '',
  });

  useEffect(() => {
    if (editingHotel) {
      setFormData({
        nama_hotel: editingHotel.nama_hotel || '',
        lokasi: editingHotel.lokasi || '',
        harga_per_malam: editingHotel.harga_per_malam ? String(editingHotel.harga_per_malam) : '',
        rating_bintang: editingHotel.rating_bintang ? String(editingHotel.rating_bintang) : '',
        fasilitas: editingHotel.fasilitas || '',
        deskripsi: editingHotel.deskripsi || '',
        id_hotel: editingHotel.id_hotel, // Penting untuk update
      });
    } else {
      setFormData({
        nama_hotel: '',
        lokasi: '',
        harga_per_malam: '',
        rating_bintang: '',
        fasilitas: '',
        deskripsi: '',
      });
    }
  }, [editingHotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Logika khusus untuk input harga_per_malam: hanya izinkan angka dan satu titik desimal
    if (name === 'harga_per_malam') {
      // Hapus semua karakter non-digit kecuali titik
      newValue = newValue.replace(/[^0-9.]/g, '');

      // Pastikan hanya ada satu titik desimal
      const parts = newValue.split('.');
      if (parts.length > 2) {
        // Jika ada lebih dari satu titik, gabungkan bagian setelah titik pertama
        newValue = parts[0] + '.' + parts.slice(1).join('');
      }
    } else if (name === 'rating_bintang') {
      // Logika khusus untuk rating_bintang: hanya izinkan angka dan satu titik desimal
      newValue = newValue.replace(/[^0-9.]/g, ''); // Hapus non-angka/titik

      const parts = newValue.split('.');
      if (parts.length > 2) {
        newValue = parts[0] + '.' + parts.slice(1).join('');
      }

      // Opsional: Batasi panjang input rating, misal "X.Y" atau "X"
      if (newValue.length > 3 && newValue.includes('.')) {
        newValue = newValue.substring(0, 3);
      } else if (newValue.length > 1 && !newValue.includes('.') && parseFloat(newValue) > 5) {
         newValue = "5";
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    dataToSend.harga_per_malam = parseFloat(dataToSend.harga_per_malam);
    dataToSend.rating_bintang = parseFloat(dataToSend.rating_bintang);

    // --- Validasi Sederhana ---
    let errors = [];

    if (!dataToSend.nama_hotel) {
      errors.push("Nama Hotel wajib diisi.");
    }
    if (!dataToSend.lokasi) {
      errors.push("Lokasi wajib diisi.");
    }
    if (isNaN(dataToSend.harga_per_malam) || dataToSend.harga_per_malam <= 0) {
      errors.push("Harga Per Malam harus berupa angka yang valid dan lebih dari 0.");
    }
    if (!dataToSend.deskripsi) {
      errors.push("Deskripsi wajib diisi.");
    }
    if (isNaN(dataToSend.rating_bintang) || dataToSend.rating_bintang < 1 || dataToSend.rating_bintang > 5) {
      errors.push("Rating Bintang harus berupa angka desimal antara 1.0 hingga 5.0.");
    }

    if (errors.length > 0) {
      alert("Harap perbaiki kesalahan berikut:\n" + errors.join("\n"));
      return;
    }
    // --- Akhir Validasi ---

    if (editingHotel) {
      updateHotel(dataToSend);
    } else {
      addHotel(dataToSend);
    }

    setFormData({
      nama_hotel: '',
      lokasi: '',
      harga_per_malam: '',
      rating_bintang: '',
      fasilitas: '',
      deskripsi: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingHotel ? 'Edit Data Hotel' : 'Tambah Data Hotel'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Nama Hotel */}
        <div>
          <label htmlFor="nama_hotel" className="block text-sm font-medium text-gray-700">
            Nama Hotel
          </label>
          <input
            type="text"
            id="nama_hotel"
            name="nama_hotel"
            value={formData.nama_hotel}
            onChange={handleChange}
            placeholder="Nama Hotel"
            // Diselaraskan dengan FormPaketWisata
            className="w-full border border-gray-300 rounded-md p-2 focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Harga Per Malam */}
        <div>
          <label htmlFor="harga_per_malam" className="block text-sm font-medium text-gray-700">
            Harga Per Malam
          </label>
          <input
            type="text"
            id="harga_per_malam"
            name="harga_per_malam"
            value={formData.harga_per_malam}
            onChange={handleChange}
            placeholder="Contoh: 150000.00"
            // Diselaraskan dengan FormPaketWisata
            className="w-full border border-gray-300 rounded-md p-2 focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Lokasi */}
        <div>
          <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">
            Lokasi
          </label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            placeholder="Lokasi"
            // Diselaraskan dengan FormPaketWisata
            className="w-full border border-gray-300 rounded-md p-2 focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Rating Bintang */}
        <div>
          <label htmlFor="rating_bintang" className="block text-sm font-medium text-gray-700">
            Rating Bintang
          </label>
          <input
            type="number"
            id="rating_bintang"
            name="rating_bintang"
            value={formData.rating_bintang}
            onChange={handleChange}
            placeholder="Contoh: 4.5"
            min="1"
            max="5"
            step="0.1"
            // Diselaraskan dengan FormPaketWisata
            className="w-full border border-gray-300 rounded-md p-2 focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        {/* Fasilitas */}
        <div className="md:col-span-2">
          <label htmlFor="fasilitas" className="block text-sm font-medium text-gray-700">
            Fasilitas (pisahkan dengan koma)
          </label>
          <textarea
            id="fasilitas"
            name="fasilitas"
            value={formData.fasilitas}
            onChange={handleChange}
            placeholder="Kolam renang, WiFi, Restoran, dll."
            rows="2"
            // Diselaraskan dengan FormPaketWisata (p-2, h-auto/resize-none jika ada di aslinya)
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
          ></textarea>
        </div>

        {/* Deskripsi */}
        <div className="md:col-span-2">
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
            Deskripsi Hotel
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi lengkap hotel"
            rows="3"
            // Diselaraskan dengan FormPaketWisata (p-2, h-32 resize-none)
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
            required
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="md:col-span-2 mt-6">
          <button
            type="submit"
            // Diselaraskan dengan FormPaketWisata (bg-orange-500, hover:bg-orange-600, px-6 py-3)
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
          >
            {editingHotel ? 'Update' : 'Simpan'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormHotel;