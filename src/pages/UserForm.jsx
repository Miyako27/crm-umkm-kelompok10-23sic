import { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, editingUser }) => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
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

  useEffect(() => {
    if (editingUser) setForm(editingUser);
    else setForm({
      nama: '',
      email: '',
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
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nama || !form.email) return;

    editingUser ? updateUser(form) : addUser(form);
    setForm({
      nama: '',
      email: '',
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="text" placeholder="Nama" className="w-full p-2 border rounded" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
      <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Telepon" className="w-full p-2 border rounded" value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} />
      <select className="w-full p-2 border rounded" value={form.jenis_kelamin} onChange={e => setForm({ ...form, jenis_kelamin: e.target.value })}>
        <option value="">Pilih Jenis Kelamin</option>
        <option value="Laki-laki">Laki-laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
      <input type="date" className="w-full p-2 border rounded" value={form.tanggal_lahir} onChange={e => setForm({ ...form, tanggal_lahir: e.target.value })} />
      <input type="text" placeholder="Alamat" className="w-full p-2 border rounded" value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} />
      <input type="text" placeholder="Kota" className="w-full p-2 border rounded" value={form.kota} onChange={e => setForm({ ...form, kota: e.target.value })} />
      <input type="text" placeholder="Provinsi" className="w-full p-2 border rounded" value={form.provinsi} onChange={e => setForm({ ...form, provinsi: e.target.value })} />
      <input type="text" placeholder="Pekerjaan" className="w-full p-2 border rounded" value={form.pekerjaan} onChange={e => setForm({ ...form, pekerjaan: e.target.value })} />
      <input type="text" placeholder="Status" className="w-full p-2 border rounded" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
      <input type="text" placeholder="Sumber Masuk" className="w-full p-2 border rounded" value={form.sumber_masuk} onChange={e => setForm({ ...form, sumber_masuk: e.target.value })} />
      <input type="text" placeholder="Preferensi Produk" className="w-full p-2 border rounded" value={form.preferensi_produk} onChange={e => setForm({ ...form, preferensi_produk: e.target.value })} />
      <input type="number" placeholder="Tingkat Kepuasan (1-10)" className="w-full p-2 border rounded" value={form.tingkat_kepuasan} onChange={e => setForm({ ...form, tingkat_kepuasan: e.target.value })} />
      
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {editingUser ? 'Perbarui' : 'Tambah'}
      </button>
    </form>
  );
};

export default UserForm;
