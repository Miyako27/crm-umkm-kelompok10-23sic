import { useState, useEffect } from 'react';

const defaultForm = {
  maskapai: '',
  kode_penerbangan: '',
  asal: '',
  tujuan: '',
  kelas: '',
  harga: '',
  jumlah_kursi: '',
  waktu_berangkat: '',
  promo_tiketpesawat: false
};

export default function FormTiketPesawat({ addTiket = () => {}, updateTiket = () => {}, editingTiket = null }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingTiket) {
      const waktu = new Date(editingTiket.waktu_berangkat);
      setForm({
        maskapai: editingTiket.maskapai || '',
        kode_penerbangan: editingTiket.kode_penerbangan || '',
        asal: editingTiket.asal || '',
        tujuan: editingTiket.tujuan || '',
        kelas: editingTiket.kelas || '',
        harga: editingTiket.harga || '',
        jumlah_kursi: editingTiket.jumlah_kursi || '',
        waktu_berangkat: waktu.toISOString().slice(0, 16),
        promo_tiketpesawat: editingTiket.promo_tiketpesawat === 1
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTiket]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.maskapai || !form.kode_penerbangan || !form.waktu_berangkat) {
      alert("Harap lengkapi semua data utama.");
      return;
    }

    const preparedData = {
      ...form,
      id: editingTiket?.id,
      harga: parseFloat(form.harga),
      jumlah_kursi: parseInt(form.jumlah_kursi),
      waktu_berangkat: new Date(form.waktu_berangkat).toISOString(),
      promo_tiketpesawat: form.promo_tiketpesawat ? 1 : 0
    };

    editingTiket ? updateTiket(preparedData) : addTiket(preparedData);
    setForm(defaultForm);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {editingTiket ? 'Edit Tiket Pesawat' : 'Tambah Tiket Pesawat'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[ 
            { label: 'Maskapai', name: 'maskapai' },
            { label: 'Kode Penerbangan', name: 'kode_penerbangan' },
            { label: 'Asal', name: 'asal' },
            { label: 'Tujuan', name: 'tujuan' },
            { label: 'Harga', name: 'harga', type: 'number' },
            { label: 'Jumlah Kursi', name: 'jumlah_kursi', type: 'number' }
          ].map(({ label, name, type = 'text' }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          ))}

          {/* Waktu Berangkat + Promo checkbox */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium mb-1">Waktu Berangkat</label>
              <input
                type="datetime-local"
                name="waktu_berangkat"
                value={form.waktu_berangkat}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apakah Promo?</label>
              <input
                type="checkbox"
                name="promo_tiketpesawat"
                checked={form.promo_tiketpesawat}
                onChange={handleChange}
                className="w-6 h-6 text-orange-500 accent-orange-500 mt-1"
              />
            </div>
          </div>

          {/* Kelas */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Kelas</label>
            <select
              name="kelas"
              value={form.kelas}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Pilih Kelas</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="bisnis">Bisnis</option>
              <option value="first">First Class</option>
              <option value="premium ekonomi">Premium Ekonomi</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold"
          >
            {editingTiket ? 'Perbarui Tiket' : 'Simpan Tiket'}
          </button>
        </div>
      </form>
    </div>
  );
}
