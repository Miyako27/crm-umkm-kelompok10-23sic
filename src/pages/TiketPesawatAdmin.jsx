import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import FormTiketPesawat from './FormTiketPesawat';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function TiketPesawatAdmin() {
  const [tiketList, setTiketList] = useState([]);
  const [editingTiket, setEditingTiket] = useState(null);

  const fetchTiket = async () => {
    const { data, error } = await supabase
      .from('tiketpesawat')
      .select('*')
      .order('waktu_berangkat', { ascending: false });

    if (error) console.error(error);
    else setTiketList(data);
  };

  const addTiket = async (newData) => {
    const { error } = await supabase.from('tiketpesawat').insert(newData);
    if (error) console.error(error);
    else fetchTiket();
  };

  const updateTiket = async (updatedData) => {
    const { error } = await supabase
      .from('tiketpesawat')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id', updatedData.id);

    if (error) console.error(error);
    else {
      fetchTiket();
      setEditingTiket(null);
    }
  };

  const deleteTiket = async (id) => {
    const { error } = await supabase
      .from('tiketpesawat')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else fetchTiket();
  };

  useEffect(() => {
    fetchTiket();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Tiket Pesawat</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Tiket Pesawat</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto">
        <FormTiketPesawat
          addTiket={addTiket}
          updateTiket={updateTiket}
          editingTiket={editingTiket}
        />
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Maskapai</th>
                <th className="px-4 py-3 font-semibold">Kode</th>
                <th className="px-4 py-3 font-semibold">Asal</th>
                <th className="px-4 py-3 font-semibold">Tujuan</th>
                <th className="px-4 py-3 font-semibold">Kelas</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Kursi</th>
                <th className="px-4 py-3 font-semibold">Waktu Berangkat</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {tiketList.map((t, i) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{t.maskapai}</td>
                  <td className="px-4 py-2">{t.kode_penerbangan}</td>
                  <td className="px-4 py-2">{t.asal}</td>
                  <td className="px-4 py-2">{t.tujuan}</td>
                  <td className="px-4 py-2 capitalize">{t.kelas}</td>
                  <td className="px-4 py-2">Rp{parseInt(t.harga).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">{t.jumlah_kursi}</td>
                  <td className="px-4 py-2">{new Date(t.waktu_berangkat).toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setEditingTiket(t)}
                      className="text-blue-600 hover:text-blue-800 mx-1 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTiket(t.id)}
                      className="text-red-600 hover:text-red-800 mx-1 text-lg"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {tiketList.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-4 py-4 text-center text-gray-500">
                    Belum ada data tiket.
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
