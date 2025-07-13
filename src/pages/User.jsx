import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaEdit, FaEnvelope } from 'react-icons/fa';
import CryptoJS from 'crypto-js';

function User() {
  const [pelanggan, setPelanggan] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ nama: '', email: '', password: '' });
  const [showModal, setShowModal] = useState(false);

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

  const openEditModal = (user) => {
    setSelectedUser(user);
    setForm({
      nama: user.nama,
      email: user.email,
      password: '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    const updates = {
      nama: form.nama,
      email: form.email,
    };

    if (form.password.trim() !== '') {
      updates.password = CryptoJS.SHA256(form.password).toString();
    }

    const { error } = await supabase
      .from('pelanggan')
      .update(updates)
      .eq('id_pelanggan', selectedUser.id_pelanggan);

    if (error) {
      alert('Gagal update: ' + error.message);
    } else {
      alert('Data pelanggan berhasil diperbarui.');
      setShowModal(false);
      fetchPelanggan();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-bold text-gray-800">Data Pelanggan</h2>
          <p className="text-sm text-gray-600">
            <Link to="/dashboard" className="text-orange-600 font-medium hover:underline">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Pelanggan</span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['No', 'Nama', 'Email', 'Telepon', 'Sumber', 'Status', 'Aksi'].map((title, idx) => (
                  <th key={idx} className={`px-4 py-3 font-semibold text-gray-700 ${title === 'Aksi' ? 'text-center' : 'text-left'}`}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {pelanggan.length > 0 ? (
                pelanggan.map((user, index) => (
                  <tr key={user.id_pelanggan} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-800">{user.nama}</td>
                    <td className="px-4 py-3 text-gray-800">{user.email}</td>
                    <td className="px-4 py-3 text-gray-800">{user.telepon || '-'}</td>
                    <td className="px-4 py-3 text-gray-800">{user.sumber_masuk || '-'}</td>
                    <td className="px-4 py-3 text-gray-800">{user.status || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => openEditModal(user)} className="text-blue-600 hover:text-blue-800 mx-2 text-lg" aria-label="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => alert('Fitur email belum diaktifkan')} className="text-orange-600 hover:text-orange-800 mx-2 text-lg" aria-label="Email">
                        <FaEnvelope />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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

      {/* Modal Edit */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
          style={{ backgroundImage: "url('/images/loginBg.png')" }}
        >
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-2">Edit Pelanggan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Nama</label>
                <input
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password Baru (Opsional)</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-md">
                Batal
              </button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
