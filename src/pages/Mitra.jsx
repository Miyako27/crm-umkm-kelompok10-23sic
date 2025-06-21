import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormMitra from './FormMitra';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Mitra() {
  const [mitra, setMitra] = useState([]);
  const [editingMitra, setEditingMitra] = useState(null);

  const fetchMitra = async () => {
    const { data, error } = await supabase
      .from('mitra')
      .select('*')
      .order('tanggal_gabung', { ascending: false });

    if (error) console.error(error);
    else setMitra(data);
  };

  const addMitra = async (newMitra) => {
    const { error } = await supabase.from('mitra').insert(newMitra);
    if (error) console.error(error);
    else fetchMitra();
  };

  const updateMitra = async (updatedMitra) => {
    const { error } = await supabase
      .from('mitra')
      .update(updatedMitra)
      .eq('id_mitra', updatedMitra.id_mitra);

    if (error) console.error(error);
    else {
      fetchMitra();
      setEditingMitra(null);
    }
  };

  const deleteMitra = async (id) => {
    const { error } = await supabase
      .from('mitra')
      .delete()
      .eq('id_mitra', id);

    if (error) console.error(error);
    else fetchMitra();
  };

  useEffect(() => {
    fetchMitra();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Mitra</h2>
          <div className="text-sm text-gray-600">
            <Link
              to="/dashboard"
              className="hover:underline text-orange-600 font-semibold"
            >
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Mitra</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <FormMitra
          addMitra={addMitra}
          updateMitra={updateMitra}
          editingMitra={editingMitra}
        />
      </div>

      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Telepon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {mitra.map((m, index) => (
                <tr key={m.id_mitra} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{m.nama_mitra}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{m.jenis_mitra}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{m.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{m.telepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{m.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => setEditingMitra(m)}
                      className="text-blue-600 hover:text-blue-800 mx-2 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteMitra(m.id_mitra)}
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

export default Mitra;
