import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

export default function EditProfil() {
    const [form, setForm] = useState({
        nama: '',
        email: '',
        password: '',
        telepon: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        alamat: '',
        kota: '',
        provinsi: '',
        pekerjaan: '',
        sumber_masuk: '',
        preferensi_produk: '',
    });

    const [originalEmail, setOriginalEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchProfil = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('Pengguna belum login');
            navigate('/login');
            return;
        }

        const { data, error } = await supabase
            .from('pelanggan')
            .select('*')
            .eq('email', user.email)
            .single();

        if (error) {
            console.error(error);
            alert('Gagal ambil data profil');
        } else {
            setForm({ ...data, password: '' });
            setOriginalEmail(data.email); // simpan email awal
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProfil();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updateData = {
            nama: form.nama,
            email: form.email,
            telepon: form.telepon,
            jenis_kelamin: form.jenis_kelamin,
            tanggal_lahir: form.tanggal_lahir,
            alamat: form.alamat,
            kota: form.kota,
            provinsi: form.provinsi,
            pekerjaan: form.pekerjaan,
            sumber_masuk: form.sumber_masuk,
            preferensi_produk: form.preferensi_produk,
        };

        if (form.password.trim() !== '') {
            const { error: authError } = await supabase.auth.updateUser({
                password: form.password,
            });
            if (authError) {
                alert('Gagal ubah password: ' + authError.message);
                setLoading(false);
                return;
            }
            updateData.password = CryptoJS.SHA256(form.password).toString();
        }

        if (form.email !== originalEmail) {
            const { error: emailUpdateError } = await supabase.auth.updateUser({
                email: form.email,
            });
            if (emailUpdateError) {
                alert('Gagal ubah email di Auth: ' + emailUpdateError.message);
                setLoading(false);
                return;
            }
        }

        const { error } = await supabase
            .from('pelanggan')
            .update(updateData)
            .eq('email', originalEmail);

        setLoading(false);

        if (error) {
            console.error(error);
            alert('Gagal update profil');
        } else {
            alert('Profil berhasil diperbarui');
            setOriginalEmail(form.email); // perbarui email asal
            navigate('/profilcustomer'); // redirect ke halaman profil
        }
    };

    if (loading) return <p className="text-center mt-10">Memuat data profil...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/loginBg.png')" }}>
            <div className="w-full max-w-4xl mx-auto p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Profil</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nama & Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama</label>
                            <input type="text" name="nama" value={form.nama || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" name="email" value={form.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        {/* Password & Telepon */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Password Baru (Opsional)</label>
                            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Biarkan kosong jika tidak ingin ubah password" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Telepon</label>
                            <input type="text" name="telepon" value={form.telepon || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        {/* Alamat & Kota */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Alamat</label>
                            <input type="text" name="alamat" value={form.alamat || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Kota</label>
                            <input type="text" name="kota" value={form.kota || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        {/* Provinsi & Pekerjaan */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Provinsi</label>
                            <input type="text" name="provinsi" value={form.provinsi || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Pekerjaan</label>
                            <input type="text" name="pekerjaan" value={form.pekerjaan || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>

                        {/* Preferensi Produk & Jenis Kelamin */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Preferensi Produk</label>
                            <select name="preferensi_produk" value={form.preferensi_produk || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Pilih Preferensi</option>
                                <option value="Travel">Travel</option>
                                <option value="Tiket Pesawat">Tiket Pesawat</option>
                                <option value="Paket Wisata">Paket Wisata</option>
                                <option value="Semua">Semua</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
                            <select name="jenis_kelamin" value={form.jenis_kelamin || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        {/* Tanggal Lahir & Sumber Masuk */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
                            <input type="date" name="tanggal_lahir" value={form.tanggal_lahir || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Dari Mana Tahu Tripenya?</label>
                            <select name="sumber_masuk" value={form.sumber_masuk || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Pilih Sumber</option>
                                <option value="Website">Website</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Tiktok">Tiktok</option>
                                <option value="Rekomendasi Orang Lain">Rekomendasi Orang Lain</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
