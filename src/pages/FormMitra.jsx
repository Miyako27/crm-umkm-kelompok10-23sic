import { useState, useEffect } from 'react';

export default function FormMitra({ addMitra, updateMitra, editingMitra }) {
  const [form, setForm] = useState({
    nama_mitra: '',
    jenis_mitra: '',
    alamat: '',
    kota: '',
    provinsi: '',
    negara: '',
    email: '',
    telepon: '',
    website: '',
    status: '',
    deskripsi: '',
    rating: '',
    logo_url: '',
    tanggal_gabung: ''
  });

  useEffect(() => {
    if (editingMitra) {
      setForm(editingMitra);
    } else {
      setForm({
        nama_mitra: '',
        jenis_mitra: '',
        alamat: '',
        kota: '',
        provinsi: '',
        negara: '',
        email: '',
        telepon: '',
        website: '',
        status: '',
        deskripsi: '',
        rating: '',
        logo_url: '',
        tanggal_gabung: ''
      });
    }
  }, [editingMitra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama_mitra || !form.jenis_mitra || !form.email) return;

    editingMitra ? updateMitra(form) : addMitra(form);

    setForm({
      nama_mitra: '',
      jenis_mitra: '',
      alamat: '',
      kota: '',
      provinsi: '',
      negara: '',
      email: '',
      telepon: '',
      website: '',
      status: '',
      deskripsi: '',
      rating: '',
      logo_url: '',
      tanggal_gabung: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{editingMitra ? 'Edit Mitra' : 'Tambah Mitra'}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Mitra</label>
          <input
            type="text"
            name="nama_mitra"
            value={form.nama_mitra}
            onChange={handleChange}
            placeholder="Nama Mitra"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jenis Mitra</label>
          <select
            name="jenis_mitra"
            value={form.jenis_mitra}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Jenis</option>
            <option value="hotel">Hotel</option>
            <option value="maskapai">Maskapai</option>
            <option value="rental_mobil">Rental Mobil</option>
            <option value="tour_guide">Tour Guide</option>
            <option value="restoran">Restoran</option>
          </select>
        </div>

        {[
          { label: 'Email', name: 'email' },
          { label: 'Telepon', name: 'telepon' },
          { label: 'Kota', name: 'kota' },
          { label: 'Provinsi', name: 'provinsi' },
          { label: 'Negara', name: 'negara' },
          { label: 'Website', name: 'website' },
          { label: 'Rating', name: 'rating' },
          { label: 'Logo URL', name: 'logo_url' }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Pilih Status</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Tidak Aktif</option>
            <option value="dalam review">Dalam Review</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Gabung</label>
          <input
            type="date"
            name="tanggal_gabung"
            value={form.tanggal_gabung}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Alamat Lengkap"
            className="w-full border border-gray-300 rounded-md p-2 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi Mitra"
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
        >
          {editingMitra ? 'Perbarui' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
