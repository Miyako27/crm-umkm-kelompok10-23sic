import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

function User() {
  const [pelanggan, setPelanggan] = useState([]);

  const fetchPelanggan = async () => {
    const { data, error } = await supabase
      .from('pelanggan')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPelanggan(data);
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Pelanggan</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Pelanggan</span>
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
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Nama</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Telepon</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Password</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Sumber</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Kepuasan</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {pelanggan.map((user, index) => (
                <tr key={user.id_pelanggan} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{index + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{user.nama}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{user.telepon}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                    {user.password.length > 20
                      ? user.password.slice(0, 20) + '...'
                      : user.password}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">{user.sumber_masuk}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-800">
                    {user.tingkat_kepuasan ?? '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <button
                      onClick={() => alert('Fitur edit belum diaktifkan')}
                      className="text-blue-600 hover:text-blue-800 mx-1 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {pelanggan.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    Belum ada data pelanggan.
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

export default User;
