import React, { useState } from "react";

export default function FormOrderTravel() {
  const [formData, setFormData] = useState({
    dari: "",
    ke: "",
    waktuPergi: "",
    waktuPulang: "",
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
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
    console.log("Travel Dipesan:", formData);
    // panggil API atau redirect
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="max-w-xl mx-auto mt-10 mb-20 p-6 bg-white rounded-xl shadow-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Form Order Travel
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
              value={formData.dari}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Contoh: Pekanbaru"
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
              value={formData.ke}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Contoh: Padang"
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
              placeholder="1 - 5"
            />
          </div>

          {/* Kursi Dinamis */}
          <div className="text-center">
            <img
              src="/images/seat.png"
              alt="Gambar Kursi"
              className="mx-auto mb-4 w-48 h-48 object-contain"
            />
            {formData.kursi.map((value, index) => (
              <div key={index} className="mb-3 text-left">
                <label className="block font-semibold text-gray-700 mb-1">
                  Kursi Penumpang {index + 1}
                </label>
                <select
                  value={value}
                  onChange={(e) => handleKursiChange(index, e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="">Pilih Kursi</option>
                  {[...Array(5)].map((_, i) => (
                    <option key={i} value={`Kursi ${i + 1}`}>{`Kursi ${i + 1}`}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Tombol Cari */}
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
