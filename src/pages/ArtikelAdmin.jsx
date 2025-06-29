import { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // Assuming '../supabase' is correctly configured
import FormArtikel from './FormArtikel';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ArtikelAdmin() {
  const [artikel, setArtikel] = useState([]);
  // editingArtikel now stores the ID of the article being edited, not the object itself
  const [editingArtikelId, setEditingArtikelId] = useState(null);

  const fetchArtikel = async () => {
    const { data, error } = await supabase
      .from('artikel')
      .select('*')
      .order('tanggal_terbit', { ascending: false }); // Ensure 'tanggal_terbit' exists in your Supabase table

    if (error) {
      console.error('Error fetching artikel:', error);
      // Handle error gracefully, e.g., show a message to the user
    } else {
      setArtikel(data);
    }
  };

  const addArtikel = async (newArtikel) => {
    // Supabase will typically handle ID generation for new inserts
    const { data, error } = await supabase.from('artikel').insert(newArtikel).select(); // .select() to get the inserted data back

    if (error) {
      console.error('Error adding artikel:', error);
      alert('Gagal menambahkan artikel: ' + error.message);
    } else {
      alert('Artikel berhasil ditambahkan!');
      fetchArtikel(); // Refresh the list
    }
  };

  const updateArtikel = async (updatedArtikel) => {
    const { error } = await supabase
      .from('artikel')
      .update(updatedArtikel)
      .eq('id', updatedArtikel.id); // Assuming 'id' is your primary key in Supabase.
                                   // If your primary key is 'id_artikel' as previously implied, use that here:
                                   // .eq('id_artikel', updatedArtikel.id_artikel);

    if (error) {
      console.error('Error updating artikel:', error);
      alert('Gagal memperbarui artikel: ' + error.message);
    } else {
      alert('Artikel berhasil diperbarui!');
      fetchArtikel(); // Refresh the list
      setEditingArtikelId(null); // Exit editing mode
    }
  };

  const deleteArtikel = async (id_artikel) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      const { error } = await supabase
        .from('artikel')
        .delete()
        .eq('id', id_artikel); // Assuming 'id' is primary key, otherwise use 'id_artikel'

      if (error) {
        console.error('Error deleting artikel:', error);
        alert('Gagal menghapus artikel: ' + error.message);
      } else {
        alert('Artikel berhasil dihapus!');
        fetchArtikel(); // Refresh the list
      }
    }
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  // Find the article object that is currently being edited based on its ID
  const currentEditingArtikel = editingArtikelId
    ? artikel.find(a => a.id === editingArtikelId) // Use 'id' if that's your PK
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
      <div className="max-w-5xl mx-auto mb-8"> {/* Added mb-8 for spacing */}
        <FormArtikel
          addArtikel={addArtikel}
          updateArtikel={updateArtikel}
          editingArtikel={currentEditingArtikel} // Pass the actual article object
          setEditingArtikel={setEditingArtikelId} // Pass the setter for editing ID
        />
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Daftar Artikel</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th> {/* Added No column header */}
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Penulis</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Terbit</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {artikel.length > 0 ? (
                artikel.map((a, index) => ( // Use index from map for numbering
                  <tr key={a.id} className="hover:bg-gray-50"> {/* Assuming 'id' is your primary key */}
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">{index + 1}</td> {/* No column data */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.penulis}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{a.tanggal_terbit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center flex gap-2 justify-center"> {/* Added flex and gap for icons */}
                      <button
                        onClick={() => setEditingArtikelId(a.id)} // Pass the ID for editing
                        className="text-blue-600 hover:text-blue-800 text-xl" // Changed mx-2 to text-xl for icons
                        title="Edit Artikel"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteArtikel(a.id)} // Pass the ID for deleting
                        className="text-red-600 hover:text-red-800 text-xl" // Changed mx-2 to text-xl for icons
                        title="Hapus Artikel"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500"> {/* Adjusted colSpan to 6 */}
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