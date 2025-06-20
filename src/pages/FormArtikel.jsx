import { useState, useEffect } from 'react';

const FormArtikel = ({ addArtikel, updateArtikel, editingArtikel }) => {
  const [form, setForm] = useState({
    judul: '',
    slug: '',
    gambar: '',
    isi: '',
    penulis: '',
    tanggal_terbit: ''
  });

  useEffect(() => {
    if (editingArtikel) setForm(editingArtikel);
    else {
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-600 mb-2">
        {editingArtikel ? 'Edit Artikel' : 'Tambah Artikel'}
      </h2>

      <input
        type="text"
        placeholder="Judul"
        className="w-full p-3 border rounded"
        value={form.judul}
        onChange={e => setForm({ ...form, judul: e.target.value })}
      />

      <input
        type="text"
        placeholder="Slug (misal: wisata-bali-2025)"
        className="w-full p-3 border rounded"
        value={form.slug}
        onChange={e => setForm({ ...form, slug: e.target.value })}
      />

      <input
        type="text"
        placeholder="Link Gambar (URL)"
        className="w-full p-3 border rounded"
        value={form.gambar}
        onChange={e => setForm({ ...form, gambar: e.target.value })}
      />

      <textarea
        placeholder="Isi Artikel"
        className="w-full p-3 border rounded h-32 resize-none"
        value={form.isi}
        onChange={e => setForm({ ...form, isi: e.target.value })}
      />

      <input
        type="text"
        placeholder="Penulis"
        className="w-full p-3 border rounded"
        value={form.penulis}
        onChange={e => setForm({ ...form, penulis: e.target.value })}
      />

      <input
        type="date"
        className="w-full p-3 border rounded"
        value={form.tanggal_terbit}
        onChange={e => setForm({ ...form, tanggal_terbit: e.target.value })}
      />

      <button type="submit" className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 w-full">
        {editingArtikel ? 'Perbarui Artikel' : 'Simpan Artikel'}
      </button>
    </form>
  );
};

export default FormArtikel;
