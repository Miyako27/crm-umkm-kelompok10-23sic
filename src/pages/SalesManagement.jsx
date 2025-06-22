import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function PenjualanTiketAdmin() {
  const [penjualan, setPenjualan] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchPenjualan = async () => {
    const { data, error } = await supabase
      .from('PenjualanTiket')
      .select(`
        *,
        tiketPesawat: tiket_id (
          id, maskapai, kode_penerbangan
        )
      `)
      .order('tanggal_transaksi', { ascending: false });

    if (error) console.error(error);
    else setPenjualan(data);
  };

  const deletePenjualan = async (id) => {
    const { error } = await supabase
      .from('PenjualanTiket')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else fetchPenjualan();
  };

  useEffect(() => {
    fetchPenjualan();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Penjualan Tiket</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Penjualan</span>
          </div>
        </div>
      </div>

      {/* Tabel Penjualan */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Nama Pelanggan</th>
                <th className="px-4 py-3 font-semibold">Tanggal Transaksi</th>
                <th className="px-4 py-3 font-semibold">Tiket</th>
                <th className="px-4 py-3 font-semibold">Jumlah</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {penjualan.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.nama_pelanggan}</td>
                  <td className="px-4 py-3">{new Date(item.tanggal_transaksi).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {item.tiketPesawat
                      ? `${item.tiketPesawat.maskapai} (${item.tiketPesawat.kode_penerbangan})`
                      : '—'}
                  </td>
                  <td className="px-4 py-3">{item.jumlah}</td>
                  <td className="px-4 py-3">Rp {parseFloat(item.total).toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.status_pembayaran}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    {/* Optional Edit Button */}
                    {/* <button
                      onClick={() => setEditing(item)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <FaEdit />
                    </button> */}
                    <button
                      onClick={() => deletePenjualan(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {penjualan.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    Belum ada data penjualan.
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

export default PenjualanTiketAdmin;
