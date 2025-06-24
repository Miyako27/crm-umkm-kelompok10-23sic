import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FormAdmin from './FormAdmin';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DaftarAdmin() {
    const [adminList, setAdminList] = useState([]);
    const [editingAdmin, setEditingAdmin] = useState(null);

    const fetchAdmin = async () => {
        const { data, error } = await supabase
            .from('admin')
            .select('*')
            .order('id_admin', { ascending: true });

        if (error) console.error("Gagal mengambil data admin:", error);
        else setAdminList(data);
    };

    const addAdmin = async (newData) => {
        const { error } = await supabase.from('admin').insert(newData);
        if (error) console.error("Gagal menambahkan admin:", error);
        else fetchAdmin();
    };

    const updateAdmin = async (updatedData) => {
        const { error } = await supabase
            .from('admin')
            .update(updatedData)
            .eq('id_admin', updatedData.id_admin);

        if (error) console.error("Gagal memperbarui admin:", error);
        else {
            fetchAdmin();
            setEditingAdmin(null);
        }
    };

    const deleteAdmin = async (id) => {
        const konfirmasi = window.confirm("Yakin ingin menghapus admin ini?");
        if (!konfirmasi) return;

        const { error } = await supabase
            .from('admin')
            .delete()
            .eq('id_admin', id);

        if (error) console.error("Gagal menghapus admin:", error);
        else fetchAdmin();
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            {/* Breadcrumb */}
            <div className="py-4 mb-8">
                <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
                    <h2 className="text-3xl font-extrabold text-gray-800">Manajemen Admin</h2>
                    <div className="text-sm text-gray-600">
                        <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
                            Dashboard
                        </Link>{' '}/ <span className="text-gray-700">Admin</span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-5xl mx-auto">
                <FormAdmin
                    addAdmin={addAdmin}
                    updateAdmin={updateAdmin}
                    editingAdmin={editingAdmin}
                />


            </div>

            {/* Table */}
            <div className="mt-10 overflow-x-auto">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold">No</th>
                                <th className="px-4 py-3 font-semibold">Email</th>
                                <th className="px-4 py-3 font-semibold">Password</th>
                                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {adminList.map((admin, i) => (
                                <tr key={admin.id_admin} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{i + 1}</td>
                                    <td className="px-4 py-2">{admin.email}</td>
                                    <td className="px-4 py-2">{admin.password}</td>
                                    <td className="px-4 py-2 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => setEditingAdmin(admin)}
                                                className="text-blue-600 hover:text-blue-800 text-lg"
                                                aria-label="Edit"
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() => deleteAdmin(admin.id_admin)}
                                                className="text-red-600 hover:text-red-800 text-lg"
                                                aria-label="Hapus"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {adminList.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                                        Belum ada data admin.
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

export default DaftarAdmin;
