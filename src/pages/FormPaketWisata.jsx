import { useState, useEffect } from 'react';

export default function FormPaketWisata({ addProduk, updateProduk, editingProduk }) {
  const [form, setForm] = useState({
    nama_paket: '',
    jenis_paket: '',
    deskripsi: '',
    lokasi_tujuan: '',
    durasi: '',
    harga: '',
    gambar_url: '',
    tanggal_berangkat: '',
    tanggal_kembali: '',
    kuota: '',
    status: 'Aktif'
  });

  useEffect(() => {
    if (editingProduk) {
      setForm(editingProduk);
    } else {
      setForm({
        nama_paket: '',
        jenis_paket: '',
        deskripsi: '',
        lokasi_tujuan: '',
        durasi: '',
        harga: '',
        gambar_url: '',
        tanggal_berangkat: '',
        tanggal_kembali: '',
        kuota: '',
        status: 'Aktif'
      });
    }
  }, [editingProduk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama_paket || !form.harga) return;

    editingProduk ? updateProduk(form) : addProduk(form);

    setForm({
      nama_paket: '',
      jenis_paket: '',
      deskripsi: '',
      lokasi_tujuan: '',
      durasi: '',
      harga: '',
      gambar_url: '',
      tanggal_berangkat: '',
      tanggal_kembali: '',
      kuota: '',
      status: 'Aktif'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingProduk ? 'Edit Paket Wisata' : 'Tambah Paket Wisata'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Nama Paket', name: 'nama_paket' },
          { label: 'Lokasi Tujuan', name: 'lokasi_tujuan' },
          { label: 'Durasi', name: 'durasi' },
          { label: 'Harga', name: 'harga' },
          { label: 'Gambar URL', name: 'gambar_url' },
          { label: 'Kuota', name: 'kuota' }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={name === 'harga' || name === 'kuota' ? 'number' : 'text'}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* Jenis Paket dan Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Paket</label>
            <select
              name="jenis_paket"
              value={form.jenis_paket}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Pilih Jenis Paket</option>
              <option value="Open Trip">Open Trip</option>
              <option value="Private Trip">Private Trip</option>
              <option value="One Day Trip">One Day Trip</option>
              <option value="Group Tour">Group Tour</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>

        {/* Tanggal Berangkat & Kembali */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Berangkat</label>
            <input
              type="date"
              name="tanggal_berangkat"
              value={form.tanggal_berangkat}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Kembali</label>
            <input
              type="date"
              name="tanggal_kembali"
              value={form.tanggal_kembali}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi paket wisata"
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
        >
          {editingProduk ? 'Perbarui' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
