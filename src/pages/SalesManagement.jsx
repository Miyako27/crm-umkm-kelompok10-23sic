import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

function PenjualanTiketAdmin() {
  const [penjualan, setPenjualan] = useState([]);

  const fetchPenjualan = async () => {
    const { data, error } = await supabase
      .from('penjualan')
      .select('*')
      .order('tanggal_transaksi', { ascending: false });

    if (error) console.error(error);
    else setPenjualan(data);
  };

  const handleKirimEmail = (item) => {
    // Ganti logika ini dengan pengiriman email aktual
    alert(`Kirim email ke: ${item.nama_pelanggan}`);
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
                <th className="px-4 py-3 font-semibold">Jenis Pesanan</th>
                <th className="px-4 py-3 font-semibold">Jumlah</th>
                <th className="px-4 py-3 font-semibold">Total Harga</th>
                <th className="px-4 py-3 font-semibold">Metode Pembayaran</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {penjualan.map((item, index) => (
                <tr key={item.id_penjualan} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.nama_pelanggan}</td>
                  <td className="px-4 py-3">{new Date(item.tanggal_transaksi).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{item.jenis_pesanan}</td>
                  <td className="px-4 py-3">{item.jumlah_pesanan}</td>
                  <td className="px-4 py-3">Rp {parseFloat(item.total_harga).toLocaleString()}</td>
                  <td className="px-4 py-3 capitalize">{item.metode_pembayaran}</td>
                  <td className="px-4 py-3 capitalize">{item.status}</td>
                  <td className="px-4 py-3 text-center">
                    {item.status.toLowerCase() !== 'lunas' ? (
                      <button
                        onClick={() => handleKirimEmail(item)}
                        className="text-orange-600 hover:text-blue-800 text-xl"
                        title="Kirim Email Pengingat"
                      >
                        <FaEnvelope />
                      </button>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>

                </tr>
              ))}
              {penjualan.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
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
