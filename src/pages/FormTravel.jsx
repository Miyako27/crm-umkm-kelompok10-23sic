import { useState, useEffect } from 'react';

export default function FormTravel({ addTravel, updateTravel, editingTravel }) {
  const [form, setForm] = useState({
    nama_travel: '',
    deskripsi: '',
    asal: '',
    tujuan: '',
    tanggal_berangkat: '',
    tanggal_pulang: '',
    harga: '',
    kapasitas: ''
  });

  useEffect(() => {
    if (editingTravel) {
      setForm(editingTravel);
    } else {
      setForm({
        nama_travel: '',
        deskripsi: '',
        asal: '',
        tujuan: '',
        tanggal_berangkat: '',
        tanggal_pulang: '',
        harga: '',
        kapasitas: ''
      });
    }
  }, [editingTravel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama_travel || !form.asal || !form.tujuan || !form.harga || !form.tanggal_berangkat) return;

    const cleanData = {
      ...form,
      harga: parseFloat(form.harga),
      kapasitas: form.kapasitas ? parseInt(form.kapasitas) : null
    };

    editingTravel ? updateTravel(cleanData) : addTravel(cleanData);

    setForm({
      nama_travel: '',
      deskripsi: '',
      asal: '',
      tujuan: '',
      tanggal_berangkat: '',
      tanggal_pulang: '',
      harga: '',
      kapasitas: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingTravel ? 'Edit Data Travel' : 'Tambah Data Travel'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input teks */}
        {[
          { label: 'Nama Travel', name: 'nama_travel' },
          { label: 'Harga', name: 'harga', type: 'number' },
          { label: 'Asal', name: 'asal' },
          { label: 'Tujuan', name: 'tujuan' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Berangkat</label>
          <input
            type="datetime-local"
            name="tanggal_berangkat"
            value={form.tanggal_berangkat}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Pulang</label>
          <input
            type="datetime-local"
            name="tanggal_pulang"
            value={form.tanggal_pulang}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Kapasitas - Full Width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Kapasitas</label>
          <input
            type="number"
            name="kapasitas"
            value={form.kapasitas}
            onChange={handleChange}
            placeholder="Kapasitas"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Deskripsi */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi travel..."
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
          />
        </div>

      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
        >
          {editingTravel ? 'Perbarui' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
