import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormTravel from './FormTravel';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TravelAdmin() {
  const [travelList, setTravelList] = useState([]);
  const [editingTravel, setEditingTravel] = useState(null);

  const fetchTravel = async () => {
    const { data, error } = await supabase
      .from('travel')
      .select('*')
      .order('tanggal_berangkat', { ascending: false });

    if (error) console.error('Error fetch travel:', error);
    else setTravelList(data);
  };

  const addTravel = async (newData) => {
    const { error } = await supabase.from('travel').insert(newData);
    if (error) {
      console.error('Error insert travel:', error);
    } else {
      fetchTravel();
    }
  };

  const updateTravel = async (updatedData) => {
    if (!updatedData.id_travel) {
      console.error('id_travel tidak ada. Tidak bisa update.');
      return;
    }

    const { error } = await supabase
      .from('travel')
      .update({
        ...updatedData,
        updated_at: new Date().toISOString(),
      })
      .eq('id_travel', updatedData.id_travel);

    if (error) {
      console.error('Error update travel:', error);
    } else {
      fetchTravel();
      setEditingTravel(null);
    }
  };

  const deleteTravel = async (id) => {
    const { error } = await supabase.from('travel').delete().eq('id_travel', id);
    if (error) {
      console.error('Error delete travel:', error);
    } else {
      fetchTravel();
    }
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Travel</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Travel</span>
          </div>
        </div>
      </div>

      {/* Form Travel */}
      <div className="max-w-5xl mx-auto">
        <FormTravel
          addTravel={addTravel}
          updateTravel={updateTravel}
          editingTravel={editingTravel}
        />
      </div>

      {/* Tabel Data Travel */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Asal</th>
                <th className="px-4 py-3 font-semibold">Tujuan</th>
                <th className="px-4 py-3 font-semibold">Berangkat</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Kapasitas</th>
                <th className="px-4 py-3 font-semibold">Promo</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {travelList.map((t, i) => (
                <tr key={t.id_travel} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{t.nama_travel}</td>
                  <td className="px-4 py-2">{t.asal}</td>
                  <td className="px-4 py-2">{t.tujuan}</td>
                  <td className="px-4 py-2">{new Date(t.tanggal_berangkat).toLocaleString()}</td>
                  <td className="px-4 py-2">Rp{parseInt(t.harga).toLocaleString()}</td>
                  <td className="px-4 py-2">{t.kapasitas}</td>
                  <td className="px-4 py-2">
                    {t.promo_travel === 1 ? (
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
              {travelList.length === 0 && (
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
    </div>
  );
}

export default TravelAdmin;
