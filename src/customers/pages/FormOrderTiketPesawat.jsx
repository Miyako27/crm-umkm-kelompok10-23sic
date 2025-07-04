import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormCariTiketPesawat() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dari: "",
    ke: "",
    tanggalPergi: "",
    tanggalPulang: "",
    maskapai: "",
    kelas: "",
    jumlahPenumpang: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlurJumlah = () => {
    let jumlah = parseInt(formData.jumlahPenumpang);
    if (isNaN(jumlah) || jumlah < 1) jumlah = 1;
    if (jumlah > 10) jumlah = 10;
    setFormData((prev) => ({
      ...prev,
      jumlahPenumpang: jumlah.toString(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan data pencarian sementara jika perlu
    localStorage.setItem("pencarianPesawat", JSON.stringify(formData));
    // Navigasi ke halaman daftar tiket pesawat
    navigate("/list-tiket-pesawat", { state: formData });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="max-w-xl w-full mx-4 p-6 bg-white rounded-xl shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Cari Tiket Pesawat
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dari */}
          <div>
            <label htmlFor="dari" className="block font-semibold text-gray-700 mb-1">
              Dari
            </label>
            <input
              type="text"
              name="dari"
              placeholder="Contoh: Jakarta"
              value={formData.dari}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Ke */}
          <div>
            <label htmlFor="ke" className="block font-semibold text-gray-700 mb-1">
              Ke
            </label>
            <input
              type="text"
              name="ke"
              placeholder="Contoh: Bali"
              value={formData.ke}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Tanggal Pergi */}
          <div>
            <label htmlFor="tanggalPergi" className="block font-semibold text-gray-700 mb-1">
              Tanggal Pergi
            </label>
            <input
              type="date"
              name="tanggalPergi"
              value={formData.tanggalPergi}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Tanggal Pulang (opsional) */}
          <div>
            <label htmlFor="tanggalPulang" className="block font-semibold text-gray-700 mb-1">
              Tanggal Pulang <span className="text-sm text-gray-400">(opsional)</span>
            </label>
            <input
              type="date"
              name="tanggalPulang"
              value={formData.tanggalPulang}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Kelas */}
          <div>
            <label htmlFor="kelas" className="block font-semibold text-gray-700 mb-1">
              Kelas (opsional)
            </label>
            <select
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Semua Kelas</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Bisnis">Bisnis</option>
              <option value="First Class">First Class</option>
              <option value="Premium Ekonomi">Premium Ekonomi</option>
            </select>
          </div>

          {/* Jumlah Penumpang */}
          <div>
            <label htmlFor="jumlahPenumpang" className="block font-semibold text-gray-700 mb-1">
              Jumlah Penumpang
            </label>
            <input
              type="text"
              name="jumlahPenumpang"
              value={formData.jumlahPenumpang}
              onChange={handleChange}
              onBlur={handleBlurJumlah}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="1-10"
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md transition"
          >
            Cari Tiket
          </button>
        </form>
      </div>
    </div>
  );
}
