import { useState, useEffect } from 'react';

export default function FormTravel({ addTravel, updateTravel, editingTravel }) {
  const [form, setForm] = useState({
    id_travel: null,
    nama_travel: '',
    deskripsi: '',
    asal: '',
    tujuan: '',
    tanggal_berangkat: '',
    tanggal_pulang: '',
    harga: '',
    kapasitas: '',
    promo_travel: false,
  });

  useEffect(() => {
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    };

    if (editingTravel) {
      setForm({
        id_travel: editingTravel.id_travel ?? null,
        nama_travel: editingTravel.nama_travel ?? '',
        deskripsi: editingTravel.deskripsi ?? '',
        asal: editingTravel.asal ?? '',
        tujuan: editingTravel.tujuan ?? '',
        tanggal_berangkat: formatDate(editingTravel.tanggal_berangkat),
        tanggal_pulang: formatDate(editingTravel.tanggal_pulang),
        harga: editingTravel.harga ?? '',
        kapasitas: editingTravel.kapasitas ?? '',
        promo_travel: editingTravel.promo_travel === 1,
      });
    }
  }, [editingTravel]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama_travel || !form.asal || !form.tujuan || !form.harga || !form.tanggal_berangkat) {
      alert('Mohon lengkapi data wajib');
      return;
    }

    const cleanData = {
      ...form,
      harga: parseFloat(form.harga),
      kapasitas: form.kapasitas ? parseInt(form.kapasitas) : null,
      promo_travel: form.promo_travel ? 1 : 0,
    };

    if (form.id_travel) {
      console.log('Mengirim UPDATE:', cleanData);
      await updateTravel(cleanData);
    } else {
      console.log('Mengirim INSERT:', cleanData);
      await addTravel(cleanData);
    }

    setForm({
      id_travel: null,
      nama_travel: '',
      deskripsi: '',
      asal: '',
      tujuan: '',
      tanggal_berangkat: '',
      tanggal_pulang: '',
      harga: '',
      kapasitas: '',
      promo_travel: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {form.id_travel ? 'Edit Data Travel' : 'Tambah Data Travel'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Nama Travel', name: 'nama_travel' },
          { label: 'Harga', name: 'harga', type: 'number' },
          { label: 'Asal', name: 'asal' },
          { label: 'Tujuan', name: 'tujuan' },
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

        <div className="md:col-span-2 grid grid-cols-2 gap-4 items-start">
          <div>
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

          <div>
            <label className="block text-sm font-medium mb-1">Apakah Promo?</label>
            <input
              type="checkbox"
              name="promo_travel"
              checked={form.promo_travel}
              onChange={handleChange}
              className="w-6 h-6 text-orange-500 accent-orange-500 mt-1"
            />
          </div>
        </div>

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
          {form.id_travel ? 'Perbarui' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
