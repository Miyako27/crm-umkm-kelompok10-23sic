import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';

function SalesReportAdmin() {
  const [transactions, setTransactions] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const dummySalesData = [
    {
      id_transaksi: 'trx-001',
      detail_pesanan: 'Paket Wisata Bali (5 Hari 4 Malam)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: { nama: 'Budi Santoso', email: 'budi.santoso@example.com' }
    },
    {
      id_transaksi: 'trx-002',
      detail_pesanan: 'Pesan Hotel Grand Hyatt (3 Malam)',
      status_pembayaran: 'Belum Bayar',
      pelanggan: { nama: 'Siti Aminah', email: 'siti.aminah@example.com' }
    },
    {
      id_transaksi: 'trx-003',
      detail_pesanan: 'Sewa Mobil Avanza (2 Hari)',
      status_pembayaran: 'Belum Bayar',
      pelanggan: { nama: 'Rina Wijaya', email: 'rina.wijaya@example.com' }
    },
    {
      id_transaksi: 'trx-004',
      detail_pesanan: 'Tiket Pesawat Jakarta-Jogja (PP)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: { nama: 'Faisal Ramadhan', email: 'faisal.ramadhan@example.com' }
    },
    {
      id_transaksi: 'trx-005',
      detail_pesanan: 'Paket Snorkeling Gili Trawangan',
      status_pembayaran: 'Belum Bayar',
      pelanggan: { nama: 'Dewi Lestari', email: 'dewi.lestari@example.com' }
    },
    {
      id_transaksi: 'trx-006',
      detail_pesanan: 'Hotel Hilton Bandung (1 Malam)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: { nama: 'Agus Setiawan', email: 'agus.setiawan@example.com' }
    }
  ];

  const fetchSalesData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setTransactions(dummySalesData);
    setLoading(false);
  };

  const sendPaymentReminder = async (id, nama, email) => {
    setNotificationStatus(prev => ({ ...prev, [id]: 'Mengirim...' }));
    try {
      console.log(`Mengirim notifikasi ke ${email} (Pelanggan: ${nama})`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNotificationStatus(prev => ({ ...prev, [id]: 'Terkirim!' }));
    } catch {
      setNotificationStatus(prev => ({ ...prev, [id]: 'Gagal!' }));
    } finally {
      setTimeout(() => {
        setNotificationStatus(prev => {
          const newState = { ...prev };
          delete newState[id];
          return newState;
        });
      }, 3000);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Laporan Penjualan</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Laporan Penjualan</span>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">No</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">ID Transaksi</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama Pelanggan</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Pesanan</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">Memuat data...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">Tidak ada data penjualan.</td>
                </tr>
              ) : (
                transactions.map((trx, index) => (
                  <tr key={trx.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{trx.id_transaksi}</td>
                    <td className="px-4 py-3 text-gray-800">{trx.pelanggan.nama}</td>
                    <td className="px-4 py-3 text-gray-800">{trx.detail_pesanan}</td>
                    <td className="px-4 py-3 text-gray-800">{trx.pelanggan.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 inline-block text-xs font-medium rounded-full
                        ${trx.status_pembayaran === 'Sudah Bayar' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {trx.status_pembayaran}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {trx.status_pembayaran === 'Belum Bayar' ? (
                        <button
                          onClick={() => sendPaymentReminder(trx.id_transaksi, trx.pelanggan.nama, trx.pelanggan.email)}
                          className={`text-orange-600 hover:text-orange-800 text-lg p-2 rounded-full
                            ${notificationStatus[trx.id_transaksi] ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!notificationStatus[trx.id_transaksi]}
                          aria-label={`Kirim notifikasi ke ${trx.pelanggan.nama}`}
                        >
                          {notificationStatus[trx.id_transaksi] === 'Mengirim...' ? (
                            <span className="animate-pulse text-xs">Mengirim...</span>
                          ) : notificationStatus[trx.id_transaksi] === 'Terkirim!' ? (
                            <span className="text-green-600 text-xs">Terkirim!</span>
                          ) : notificationStatus[trx.id_transaksi] === 'Gagal!' ? (
                            <span className="text-red-600 text-xs">Gagal!</span>
                          ) : (
                            <FaPaperPlane />
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesReportAdmin;
