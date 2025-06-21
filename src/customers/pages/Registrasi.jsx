import { useState } from 'react';
import { supabase } from '../../supabase';

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
    status: '',
    sumber_masuk: '',
    preferensi_produk: '',
    tingkat_kepuasan: '',
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
      const { error } = await supabase.from('pelanggan').insert([form]);
      if (error) throw error;

      alert('Data berhasil disimpan!');
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
        status: '',
        sumber_masuk: '',
        preferensi_produk: '',
        tingkat_kepuasan: '',
      });
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginBg.png')" }}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Registrasi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Nama', name: 'nama', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Password', name: 'password', type: 'password' },
              { label: 'Telepon', name: 'telepon', type: 'text' },
              { label: 'Alamat', name: 'alamat', type: 'text' },
              { label: 'Kota', name: 'kota', type: 'text' },
              { label: 'Provinsi', name: 'provinsi', type: 'text' },
              { label: 'Pekerjaan', name: 'pekerjaan', type: 'text' },
              { label: 'Status', name: 'status', type: 'text' },
              { label: 'Preferensi Produk', name: 'preferensi_produk', type: 'text' },
              { label: 'Tingkat Kepuasan (1-10)', name: 'tingkat_kepuasan', type: 'number' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                value={form.jenis_kelamin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dari mana kamu mengenal Tripenya?</label>
              <select
                name="sumber_masuk"
                value={form.sumber_masuk}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Pilih Sumber</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Website">Website</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
