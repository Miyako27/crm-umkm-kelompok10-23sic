import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormTravel from './FormTravel';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TravelAdmin() {
  const [travels, setTravels] = useState([]);
  const [editingTravel, setEditingTravel] = useState(null);

  const fetchTravel = async () => {
    const { data, error } = await supabase
      .from('travel')
      .select('*')
      .order('tanggal_berangkat', { ascending: false });

    if (error) {
      console.error('Gagal mengambil data:', error);
    } else {
      setTravels(data);
    }
  };

  const addTravel = async (newData) => {
    const { id_travel, ...insertData } = newData;
    const { error } = await supabase.from('travel').insert(insertData);

    if (error) {
      alert('Gagal menambahkan travel: ' + error.message);
      console.error(error);
    } else {
      alert('Data travel berhasil ditambahkan.');
      fetchTravel();
    }
  };

  const updateTravel = async (updatedData) => {
    const { id_travel } = updatedData;
    const { error } = await supabase
      .from('travel')
      .update(updatedData)
      .eq('id_travel', id_travel);

    if (error) {
      alert('Gagal memperbarui travel: ' + error.message);
      console.error(error);
    } else {
      alert('Data travel berhasil diperbarui.');
      fetchTravel();
      setEditingTravel(null);
    }
  };

  const deleteTravel = async (id) => {
    if (window.confirm('Yakin ingin menghapus data travel ini?')) {
      const { error } = await supabase
        .from('travel')
        .delete()
        .eq('id_travel', id);

      if (error) {
        alert('Gagal menghapus travel: ' + error.message);
        console.error(error);
      } else {
        alert('Data travel berhasil dihapus.');
        fetchTravel();
      }
    }
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
        <FormTravel
          addTravel={addTravel}
          updateTravel={updateTravel}
          editingTravel={editingTravel}
          setEditingTravel={setEditingTravel}
        />

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Daftar Travel</h2>
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Nama Travel</th>
                <th className="px-4 py-3 font-semibold">Asal</th>
                <th className="px-4 py-3 font-semibold">Tujuan</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Kapasitas</th>
                <th className="px-4 py-3 font-semibold">Tanggal Berangkat</th>
                <th className="px-4 py-3 font-semibold">Promo</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {travels.map((t, i) => (
                <tr key={t.id_travel} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{t.nama_travel}</td>
                  <td className="px-4 py-2">{t.asal}</td>
                  <td className="px-4 py-2">{t.tujuan}</td>
                  <td className="px-4 py-2">Rp{parseInt(t.harga).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">{t.kapasitas || '-'}</td>
                  <td className="px-4 py-2">{new Date(t.tanggal_berangkat).toLocaleDateString('id-ID')}</td>
                  <td className="px-4 py-2">
                    {t.promo_travel === 1 || t.promo_travel === true ? (
                      <span className="text-green-600 font-semibold">Promo</span>
                    ) : (
                      <span className="text-gray-500">Tidak Promo</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setEditingTravel(t)}
                      className="text-blue-600 hover:text-blue-800 mx-1 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTravel(t.id_travel)}
                      className="text-red-600 hover:text-red-800 mx-1 text-lg"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {travels.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                    Belum ada data travel.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

    </div>
  );
}
