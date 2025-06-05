import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FormSupirArmada = () => {
  const [form, setForm] = useState({
    namaSupir: '',
    noHpSupir: '',
    nomorKTP: '',
    namaArmada: '',
    nomorPolisi: '',
    kapasitas: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Tersimpan:', form);
    // Simpan ke backend jika perlu
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-600">
          <li>
            <Link to="/" className="hover:text-purple-500">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/armada" className="hover:text-purple-500">
              Armada
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-semibold" aria-current="page">
            Form Armada
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-semibold mb-2">Data Supir dan Armada</h1>
      <p className="mb-4 text-gray-500">Tambahkan Data Supir dan Armada</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Supir Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Supir
          </label>
          <input
            type="text"
            name="namaSupir"
            value={form.namaSupir}
            onChange={handleChange}
            placeholder="Masukkan Nama Supir"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomor HP Supir
          </label>
          <input
            type="text"
            name="noHpSupir"
            value={form.noHpSupir}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomor KTP
          </label>
          <input
            type="text"
            name="nomorKTP"
            value={form.nomorKTP}
            onChange={handleChange}
            placeholder="Masukkan Nomor KTP"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        {/* Armada Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Armada
          </label>
          <input
            type="text"
            name="namaArmada"
            value={form.namaArmada}
            onChange={handleChange}
            placeholder="Masukkan Nama Armada"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nomor Polisi
          </label>
          <input
            type="text"
            name="nomorPolisi"
            value={form.nomorPolisi}
            onChange={handleChange}
            placeholder="Masukkan Nomor Polisi"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kapasitas (Orang)
          </label>
          <input
            type="number"
            name="kapasitas"
            value={form.kapasitas}
            onChange={handleChange}
            placeholder="Masukkan Kapasitas Armada"
            className="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSupirArmada;
