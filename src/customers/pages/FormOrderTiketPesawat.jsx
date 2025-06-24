import React, { useState } from "react";

export default function FormOrderTiketPesawat() {
  const [formData, setFormData] = useState({
    dari: "",
    ke: "",
    waktuPergi: "",
    waktuPulang: "",
    maskapai: "",
    kelas: "",
    jumlahPenumpang: "1",
    kursi: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "jumlahPenumpang") {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          jumlahPenumpang: "",
          kursi: [],
        }));
      } else {
        const jumlah = parseInt(value);
        if (!isNaN(jumlah)) {
          const kursiKosong = Array(jumlah).fill("");
          setFormData((prev) => ({
            ...prev,
            jumlahPenumpang: value,
            kursi: kursiKosong,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            jumlahPenumpang: value,
            kursi: [],
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlurJumlah = () => {
    let jumlah = parseInt(formData.jumlahPenumpang);
    if (isNaN(jumlah) || jumlah < 1) jumlah = 1;
    if (jumlah > 10) jumlah = 10;
    setFormData((prev) => ({
      ...prev,
      jumlahPenumpang: jumlah.toString(),
      kursi: Array(jumlah).fill(""),
    }));
  };

  const handleKursiChange = (index, value) => {
    const newKursi = [...formData.kursi];
    newKursi[index] = value;
    setFormData((prev) => ({ ...prev, kursi: newKursi }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tiket Pesawat Dipesan:", formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="max-w-xl w-full mx-4 p-6 bg-white rounded-xl shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Form Order Tiket Pesawat
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
              placeholder="Contoh: Pekanbaru"
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
              placeholder="Contoh: Bandung"
              value={formData.ke}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Maskapai */}
          <div>
            <label htmlFor="maskapai" className="block font-semibold text-gray-700 mb-1">
              Maskapai
            </label>
            <select
              name="maskapai"
              value={formData.maskapai}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Pilih Maskapai</option>
              <option value="Garuda Indonesia">Garuda Indonesia</option>
              <option value="Lion Air">Lion Air</option>
              <option value="Citilink">Citilink</option>
              <option value="AirAsia">AirAsia</option>
            </select>
          </div>

          {/* Kelas */}
          <div>
            <label htmlFor="kelas" className="block font-semibold text-gray-700 mb-1">
              Kelas
            </label>
            <select
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="">Pilih Kelas</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Bisnis">Bisnis</option>
              <option value="First Class">First Class</option>
              <option value="First Class">Premium Ekonomi</option>
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

          {/* Waktu Pergi */}
          <div>
            <label htmlFor="waktuPergi" className="block font-semibold text-gray-700 mb-1">
              Waktu Pergi
            </label>
            <input
              type="datetime-local"
              name="waktuPergi"
              value={formData.waktuPergi}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Waktu Pulang */}
          <div>
            <label htmlFor="waktuPulang" className="block font-semibold text-gray-700 mb-1">
              Waktu Pulang <span className="text-sm text-gray-400">(opsional)</span>
            </label>
            <input
              type="datetime-local"
              name="waktuPulang"
              value={formData.waktuPulang}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md transition"
          >
            Cari
          </button>
        </form>
      </div>
    </div>
  );
}
