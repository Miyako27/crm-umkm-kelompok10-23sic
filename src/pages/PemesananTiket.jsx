import React, { useState } from 'react';

const PemesananTiket = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    jumlahTiket: '',
    tanggal: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.jumlahTiket || !form.tanggal) {
      alert('Semua kolom harus diisi!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert('Email tidak valid!');
      return;
    }
    if (Number(form.jumlahTiket) < 1) {
      alert('Jumlah tiket harus minimal 1');
      return;
    }
    console.log('Data Pemesanan:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Card container */}
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Form Pemesanan Tiket</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="nama">Nama</label>
            <input
              id="nama"
              name="nama"
              placeholder="Masukkan nama Anda"
              onChange={handleChange}
              value={form.nama}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Masukkan email Anda"
              onChange={handleChange}
              value={form.email}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="jumlahTiket">Jumlah Tiket</label>
            <input
              id="jumlahTiket"
              type="number"
              min="1"
              name="jumlahTiket"
              placeholder="Masukkan jumlah tiket"
              onChange={handleChange}
              value={form.jumlahTiket}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="tanggal">Tanggal</label>
            <input
              id="tanggal"
              type="date"
              name="tanggal"
              onChange={handleChange}
              value={form.tanggal}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition-colors duration-300"
          >
            Pesan
          </button>
        </form>
      </div>
    </div>
  );
};

export default PemesananTiket;
