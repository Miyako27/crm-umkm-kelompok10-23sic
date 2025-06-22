// src/pages/SalesReportAdmin.jsx
import { useEffect, useState } from 'react';
// Tidak perlu import supabase jika hanya menggunakan data dummy
// import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa'; // Icon untuk kirim notifikasi

function SalesReportAdmin() {
  const [transactions, setTransactions] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState({}); // State untuk status notifikasi per transaksi
  const [loading, setLoading] = useState(true);

  // Data dummy yang akan digunakan
  const dummySalesData = [
    {
      id_transaksi: 'trx-001',
      detail_pesanan: 'Paket Wisata Bali (5 Hari 4 Malam)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: {
        nama: 'Budi Santoso',
        email: 'budi.santoso@example.com'
      }
    },
    {
      id_transaksi: 'trx-002',
      detail_pesanan: 'Pesan Hotel Grand Hyatt (3 Malam)',
      status_pembayaran: 'Belum Bayar',
      pelanggan: {
        nama: 'Siti Aminah',
        email: 'siti.aminah@example.com'
      }
    },
    {
      id_transaksi: 'trx-003',
      detail_pesanan: 'Sewa Mobil Avanza (2 Hari)',
      status_pembayaran: 'Belum Bayar',
      pelanggan: {
        nama: 'Rina Wijaya',
        email: 'rina.wijaya@example.com'
      }
    },
    {
      id_transaksi: 'trx-004',
      detail_pesanan: 'Tiket Pesawat Jakarta-Jogja (PP)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: {
        nama: 'Faisal Ramadhan',
        email: 'faisal.ramadhan@example.com'
      }
    },
    {
      id_transaksi: 'trx-005',
      detail_pesanan: 'Paket Snorkeling Gili Trawangan',
      status_pembayaran: 'Belum Bayar',
      pelanggan: {
        nama: 'Dewi Lestari',
        email: 'dewi.lestari@example.com'
      }
    },
    {
      id_transaksi: 'trx-006',
      detail_pesanan: 'Hotel Hilton Bandung (1 Malam)',
      status_pembayaran: 'Sudah Bayar',
      pelanggan: {
        nama: 'Agus Setiawan',
        email: 'agus.setiawan@example.com'
      }
    }
  ];

  // Fungsi untuk mengambil data penjualan (sekarang menggunakan dummy data)
  const fetchSalesData = async () => {
    setLoading(true);
    // Simulasi penundaan jaringan
    await new Promise(resolve => setTimeout(resolve, 500));
    setTransactions(dummySalesData);
    setLoading(false);
  };

  // Fungsi untuk mengirim notifikasi pembayaran
  const sendPaymentReminder = async (transactionId, customerName, customerEmail) => {
    setNotificationStatus((prev) => ({ ...prev, [transactionId]: 'Mengirim...' }));

    try {
      // --- SIMULASI pengiriman notifikasi (Ini hanya menampilkan log di konsol) ---
      console.log(`Simulasi: Mengirim notifikasi pembayaran untuk transaksi ${transactionId} ke ${customerEmail} (Pelanggan: ${customerName})`);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasi delay
      setNotificationStatus((prev) => ({ ...prev, [transactionId]: 'Terkirim!' }));
      // -----------------------------------------------------------------------------------------

    } catch (error) {
      console.error('Error saat mengirim notifikasi:', error);
      setNotificationStatus((prev) => ({ ...prev, [transactionId]: 'Gagal!' }));
    } finally {
        // Setelah 3 detik, reset status notifikasi
        setTimeout(() => {
            setNotificationStatus((prev) => {
                const newState = { ...prev };
                delete newState[transactionId];
                return newState;
            });
        }, 3000);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []); // Jalankan sekali saat komponen dimuat

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Laporan Penjualan</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Laporan Penjualan</span>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Pelanggan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pesanan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Belum ada data penjualan.
                  </td>
                </tr>
              ) : (
                transactions.map((trx, index) => (
                  <tr key={trx.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{trx.id_transaksi.substring(0, 8)}...</td> {/* Tampilkan sebagian ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{trx.pelanggan.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{trx.detail_pesanan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{trx.pelanggan.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${trx.status_pembayaran === 'Sudah Bayar' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {trx.status_pembayaran}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {trx.status_pembayaran === 'Belum Bayar' ? (
                        <button
                          onClick={() => sendPaymentReminder(trx.id_transaksi, trx.pelanggan.nama, trx.pelanggan.email)}
                          className={`text-orange-600 hover:text-orange-800 mx-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-full p-2
                            ${notificationStatus[trx.id_transaksi] ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!!notificationStatus[trx.id_transaksi]} // Disable saat status notifikasi ada
                          aria-label={`Kirim notifikasi ke ${trx.pelanggan.nama}`}
                        >
                          {notificationStatus[trx.id_transaksi] === 'Mengirim...' ? (
                            <span className="animate-pulse text-sm">Mengirim...</span>
                          ) : notificationStatus[trx.id_transaksi] === 'Terkirim!' ? (
                            <span className="text-green-600 text-sm">Terkirim!</span>
                          ) : notificationStatus[trx.id_transaksi] === 'Gagal!' ? (
                            <span className="text-red-600 text-sm">Gagal!</span>
                          ) : (
                            <FaPaperPlane />
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
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
