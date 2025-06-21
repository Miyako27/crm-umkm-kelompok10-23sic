import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormArtikel from './FormArtikel';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ArtikelAdmin() {
  const [artikel, setArtikel] = useState([]);
  const [editingArtikel, setEditingArtikel] = useState(null);

  const fetchArtikel = async () => {
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('tanggal_terbit', { ascending: false });

    if (error) console.error(error);
    else setArtikel(data);
  };

  const addArtikel = async (newArtikel) => {
    const { error } = await supabase.from('artikel').insert(newArtikel);
    if (error) console.error(error);
    else fetchArtikel();
  };

  const updateArtikel = async (updatedArtikel) => {
    const { error } = await supabase
      .from('artikel')
      .update(updatedArtikel)
      .eq('id', updatedArtikel.id);

    if (error) console.error(error);
    else {
      fetchArtikel();
      setEditingArtikel(null);
    }
  };

  const deleteArtikel = async (id) => {
    const { error } = await supabase
      .from('artikel')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else fetchArtikel();
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

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

      <div className="max-w-5xl mx-auto">
        <FormArtikel
          addArtikel={addArtikel}
          updateArtikel={updateArtikel}
          editingArtikel={editingArtikel}
        />
      </div>

      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Penulis</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {artikel.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.penulis}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.tanggal_terbit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setEditingArtikel(a)}
                      className="text-blue-600 hover:text-blue-800 mx-2 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteArtikel(a.id)}
                      className="text-red-600 hover:text-red-800 mx-2 text-lg"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ArtikelAdmin;