// src/pages/admin/LogAktivitasAdmin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Uncomment the line below if you integrate with Supabase for real data
// import { supabase } from '../../supabase'; 

function LogAktivitasAdmin() {
  const [logAktivitas, setLogAktivitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for demonstration.
  // Replace this with fetching data from your Supabase 'log_aktivitas' table.
  const dummyLogData = [
    {
      id: 'log1',
      admin: 'Pendy',
      pelanggan: 'Budi',
      jenis_aktivitas: 'Email pengingat bayar',
      tanggal_waktu: '2025-07-04 10:30:00'
    },
    {
      id: 'log2',
      admin: 'Miya',
      pelanggan: 'Siti Aminah',
      jenis_aktivitas: 'Mengubah Status Pesanan #PENJ001 menjadi "lunas"',
      tanggal_waktu: '2025-07-04 11:15:20'
    },
    {
      id: 'log3',
      admin: 'Aisyah',
      pelanggan: 'Dewi Lestari',
      jenis_aktivitas: 'Mengirim promo melalui email',
      tanggal_waktu: '2025-07-04 14:05:10'
    },
    {
      id: 'log4',
      admin: 'Akbar',
      pelanggan: 'Bayu Wicaksono',
      jenis_aktivitas: 'Email pengingat bayar',
      tanggal_waktu: '2025-07-03 09:00:00'
    },
    {
      id: 'log5',
      admin: 'Dika',
      pelanggan: 'Rina Wijaya',
      jenis_aktivitas: 'Mengubah Status Pesanan #PENJ001 menjadi "lunas',
      tanggal_waktu: '2025-07-03 16:45:00'
    },
    {
      id: 'log6',
      admin: 'Deedat',
      pelanggan: 'Jeli',
      jenis_aktivitas: 'Mengirim promo melalui email',
      tanggal_waktu: '2025-07-02 08:10:00'
    },
  ].sort((a, b) => new Date(b.tanggal_waktu) - new Date(a.tanggal_waktu)); // Sort by most recent date

  useEffect(() => {
    const fetchLogAktivitas = async () => {
      setIsLoading(true);

      // Using dummy data for now
      setTimeout(() => {
        setLogAktivitas(dummyLogData);
        setIsLoading(false);
      }, 500); 
    };

    fetchLogAktivitas();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 text-center py-20">
        <p className="text-gray-600 text-lg">Memuat log aktivitas...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb Section */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Log Aktivitas</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Log Aktivitas</span>
          </div>
        </div>
      </div>

      {/* Main Content: Log Activities Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis Aktivitas</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal & Waktu</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {logAktivitas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Belum ada log aktivitas.
                  </td>
                </tr>
              ) : (
                logAktivitas.map((log, index) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{log.admin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{log.pelanggan}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{log.jenis_aktivitas}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{log.tanggal_waktu}</td>
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

export default LogAktivitasAdmin;