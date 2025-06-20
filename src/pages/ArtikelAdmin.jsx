import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import ArtikelForm from './FormArtikel';

function ArtikelAdmin() {
  const [artikel, setArtikel] = useState([]);
  const [editingArtikel, setEditingArtikel] = useState(null);

  const fetchArtikel = async () => {
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Gagal fetch artikel:', error);
    else setArtikel(data);
  };

  const addArtikel = async (item) => {
    const { error } = await supabase.from('artikel').insert(item);
    if (error) console.error('Gagal tambah artikel:', error);
    else fetchArtikel();
  };

  const updateArtikel = async (item) => {
    const { error } = await supabase
      .from('artikel')
      .update(item)
      .eq('id_artikel', item.id_artikel);

    if (error) console.error('Gagal update artikel:', error);
    else {
      fetchArtikel();
      setEditingArtikel(null);
    }
  };

  const deleteArtikel = async (id_artikel) => {
    const { error } = await supabase
      .from('artikel')
      .delete()
      .eq('id_artikel', id_artikel);

    if (error) console.error('Gagal hapus artikel:', error);
    else fetchArtikel();
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Manajemen Artikel</h1>

      <ArtikelForm
        addArtikel={addArtikel}
        updateArtikel={updateArtikel}
        editingArtikel={editingArtikel}
      />

      <div className="mt-8 space-y-4">
        {artikel.map(item => (
          <div key={item.id_artikel} className="border rounded p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-800">{item.judul}</h2>
            <p className="text-sm text-gray-500 mb-2">Oleh: {item.penulis} | {item.tanggal_terbit}</p>
            <p className="text-gray-700 text-sm line-clamp-3 mb-3">{item.isi}</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingArtikel(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteArtikel(item.id_artikel)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtikelAdmin;
