import { useState, useEffect } from 'react';

export default function FormArtikel({ addArtikel, updateArtikel, editingArtikel }) {
  const [form, setForm] = useState({
    judul: '',
    slug: '',
    gambar: '',
    isi: '',
    penulis: '',
    tanggal_terbit: ''
  });

  useEffect(() => {
    if (editingArtikel) {
      setForm(editingArtikel);
    } else {
      setForm({
        judul: '',
        slug: '',
        gambar: '',
        isi: '',
        penulis: '',
        tanggal_terbit: ''
      });
    }
  }, [editingArtikel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.judul || !form.slug || !form.isi) return;

    editingArtikel ? updateArtikel(form) : addArtikel(form);

    setForm({
      judul: '',
      slug: '',
      gambar: '',
      isi: '',
      penulis: '',
      tanggal_terbit: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">{editingArtikel ? 'Edit Artikel' : 'Tambah Artikel'}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ label: 'Judul', name: 'judul' },
          { label: 'Slug (misal: wisata-bali)', name: 'slug' },
          { label: 'Link Gambar (URL)', name: 'gambar' },
          { label: 'Penulis', name: 'penulis' }].map(({ label, name }) => (
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Tanggal Terbit</label>
          <input
            type="date"
            name="tanggal_terbit"
            value={form.tanggal_terbit}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Isi Artikel</label>
          <textarea
            name="isi"
            value={form.isi}
            onChange={handleChange}
            placeholder="Isi Artikel"
            className="w-full border border-gray-300 rounded-md p-2 h-40 resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
        >
          {editingArtikel ? 'Perbarui' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}
