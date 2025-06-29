import { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // Pastikan konfigurasi supabase sudah benar
import FormArtikel from './FormArtikel';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ArtikelAdmin() {
  const [artikel, setArtikel] = useState([]);
  const [editingArtikelId, setEditingArtikelId] = useState(null);

  const fetchArtikel = async () => {
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('tanggal_terbit', { ascending: false });

    if (error) {
      console.error('Error fetching artikel:', error);
    } else {
      setArtikel(data);
    }
  };

  const addArtikel = async (newArtikel) => {
    const { data, error } = await supabase.from('artikel').insert(newArtikel).select();

    if (error) {
      console.error('Error adding artikel:', error);
      alert('Gagal menambahkan artikel: ' + error.message);
    } else {
      alert('Artikel berhasil ditambahkan!');
      fetchArtikel();
    }
  };

  const updateArtikel = async (updatedArtikel) => {
    const { error } = await supabase
      .from('artikel')
      .update(updatedArtikel)
      .eq('id_artikel', updatedArtikel.id_artikel); // gunakan 'id_artikel' jika itu PK kamu

    if (error) {
      console.error('Error updating artikel:', error);
      alert('Gagal memperbarui artikel: ' + error.message);
    } else {
      alert('Artikel berhasil diperbarui!');
      fetchArtikel();
      setEditingArtikelId(null);
    }
  };

  const deleteArtikel = async (id_artikel) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      console.log("Menghapus ID:", id_artikel); // log ID untuk debugging
      const { error } = await supabase
        .from('artikel')
        .delete()
        .eq('id_artikel', id_artikel); // gunakan 'id_artikel' jika itu kolom PK

      if (error) {
        console.error('Error deleting artikel:', error);
        alert('Gagal menghapus artikel: ' + error.message);
      } else {
        alert('Artikel berhasil dihapus!');
        fetchArtikel();
      }
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const currentEditingArtikel = editingArtikelId
    ? artikel.find(a => a.id_artikel === editingArtikelId) // cocokkan ID edit
    : null;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Artikel</h2>
          <div className="text-sm text-gray-600">
            <Link
              to="/dashboard"
              className="hover:underline text-orange-600 font-semibold"
            >
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Artikel</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto mb-8">
        <FormArtikel
          addArtikel={addArtikel}
          updateArtikel={updateArtikel}
          editingArtikel={currentEditingArtikel}
          setEditingArtikel={setEditingArtikelId}
        />
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Daftar Artikel</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Penulis</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {artikel.length > 0 ? (
                artikel.map((a, index) => (
                  <tr key={a.id_artikel} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.penulis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.tanggal_terbit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center flex gap-2 justify-center">
                      <button
                        onClick={() => setEditingArtikelId(a.id_artikel)}
                        className="text-blue-600 hover:text-blue-800 text-xl"
                        title="Edit Artikel"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteArtikel(a.id_artikel)}
                        className="text-red-600 hover:text-red-800 text-xl"
                        title="Hapus Artikel"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Belum ada artikel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ArtikelAdmin;
