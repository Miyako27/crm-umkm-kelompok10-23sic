import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormPaketWisata from './FormPaketWisata';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function PaketWisataAdmin() {
  const [paket, setPaket] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);

  const fetchPaket = async () => {
    const { data, error } = await supabase
      .from('paketwisata')
      .select('*')
      .order('tanggal_berangkat', { ascending: false });

    if (error) console.error(error);
    else setPaket(data);
  };

  const addProduk = async (newData) => {
    const { error } = await supabase.from('paketwisata').insert(newData);
    if (error) console.error(error);
    else fetchPaket();
  };

  const updateProduk = async (updatedData) => {
    const { error } = await supabase
      .from('paketwisata')
      .update(updatedData)
      .eq('id_paket', updatedData.id_paket);

    if (error) console.error(error);
    else {
      fetchPaket();
      setEditingProduk(null);
    }
  };

  const deleteProduk = async (id) => {
    const { error } = await supabase
      .from('paketwisata')
      .delete()
      .eq('id_paket', id);

    if (error) console.error(error);
    else fetchPaket();
  };

  useEffect(() => {
    fetchPaket();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Paket Wisata</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Paket Wisata</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto">
        <FormPaketWisata
          addProduk={addProduk}
          updateProduk={updateProduk}
          editingProduk={editingProduk}
        />
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Nama Paket</th>
                <th className="px-4 py-3 font-semibold">Jenis</th>
                <th className="px-4 py-3 font-semibold">Lokasi</th>
                <th className="px-4 py-3 font-semibold">Harga</th>
                <th className="px-4 py-3 font-semibold">Kuota</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paket.map((p, i) => (
                <tr key={p.id_paket} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{p.nama_paket}</td>
                  <td className="px-4 py-2">{p.jenis_paket}</td>
                  <td className="px-4 py-2">{p.lokasi_tujuan}</td>
                  <td className="px-4 py-2">Rp{parseInt(p.harga).toLocaleString()}</td>
                  <td className="px-4 py-2">{p.kuota}</td>
                  <td className="px-4 py-2">{p.status}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setEditingProduk(p)}
                      className="text-blue-600 hover:text-blue-800 mx-1"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduk(p.id_paket)}
                      className="text-red-600 hover:text-red-800 mx-1"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {paket.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                    Belum ada data paket wisata.
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

export default PaketWisataAdmin;
