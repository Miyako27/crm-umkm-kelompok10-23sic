import { useState } from 'react';
import { supabase } from '../../supabase';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

export default function Registrasi() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.email || !form.password) {
      alert('Nama, Email, dan Password wajib diisi');
      return;
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        console.error('Sign Up Error:', signUpError);
        alert(`Gagal registrasi auth: ${signUpError.message}`);
        return;
      }

      const hashedPassword = CryptoJS.SHA256(form.password).toString();

      const { error: insertError } = await supabase.from('pelanggan').insert([
        {
          email: form.email,
          nama: form.nama,
          password: hashedPassword,
          telepon: form.telepon,
          jenis_kelamin: form.jenis_kelamin,
          tanggal_lahir: form.tanggal_lahir,
          alamat: form.alamat,
          kota: form.kota,
          provinsi: form.provinsi,
          pekerjaan: form.pekerjaan,
          sumber_masuk: form.sumber_masuk,
          preferensi_produk: form.preferensi_produk,
        },
      ]);

      if (insertError) {
        console.error('Insert Pelanggan Error:', insertError);
        alert(`Gagal simpan data pelanggan: ${insertError.message}`);
        return;
      }

      alert('Registrasi berhasil!');
      setForm({
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
    } catch (err) {
      console.error('Unhandled Error:', err);
      alert('Terjadi kesalahan tak terduga saat registrasi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/loginBg.png')" }}>
      <div className="w-full max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Registrasi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ label: 'Nama', name: 'nama' }, { label: 'Email', name: 'email', type: 'email' }, { label: 'Password', name: 'password', type: 'password' }, { label: 'Telepon', name: 'telepon' }, { label: 'Alamat', name: 'alamat' }, { label: 'Kota', name: 'kota' }, { label: 'Provinsi', name: 'provinsi' }, { label: 'Pekerjaan', name: 'pekerjaan' }].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={label} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1">Preferensi Produk</label>
              <select name="preferensi_produk" value={form.preferensi_produk} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Pilih Preferensi</option>
                <option value="Travel">Travel</option>
                <option value="Tiket Pesawat">Tiket Pesawat</option>
                <option value="Paket Wisata">Paket Wisata</option>
                <option value="Semua">Semua</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
              <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
              <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dari Mana Tahu Tripenya?</label>
              <select name="sumber_masuk" value={form.sumber_masuk} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
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
          <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login di sini
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
}
