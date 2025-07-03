import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FormFinalTravel() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTravel = location.state?.selectedTravel;

  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    nama: '',
    tanggal_transaksi: '',
    jenis_pesanan: '',
    jumlah_pesanan: 1,
    total_harga: '',
    metode_pembayaran: '',
    id_travel: selectedTravel?.id_travel || null,
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchUserAndPrefillForm = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Gagal mendapatkan user:", userError?.message);
        return;
      }
      setCurrentUser(user);

      // Ambil nama pelanggan dari tabel pelanggan
      const { data: pelangganData, error: pelangganError } = await supabase
        .from('pelanggan')
        .select('nama')
        .eq('email', user.email)
        .single();

      if (pelangganError) {
        console.error("Gagal mendapatkan data pelanggan:", pelangganError.message);
        return;
      }

      // Format tanggal lokal
      const localDate = new Date();
      const offset = localDate.getTimezoneOffset();
      const adjustedDate = new Date(localDate.getTime() - offset * 60000);
      const formattedDate = adjustedDate.toISOString().slice(0, 16);

      setForm((prev) => ({
        ...prev,
        nama: pelangganData?.nama || '',
        tanggal_transaksi: formattedDate,
        jenis_pesanan: selectedTravel ? `Travel ${selectedTravel.asal} - ${selectedTravel.tujuan}` : '',
        jumlah_pesanan: 1,
        total_harga: selectedTravel ? (selectedTravel.harga * 1) : '',
        id_travel: selectedTravel?.id_travel || null,
      }));
    };

    fetchUserAndPrefillForm();
  }, [selectedTravel]);

  useEffect(() => {
    if (selectedTravel && form.jumlah_pesanan) {
      const total = parseFloat(selectedTravel.harga) * parseInt(form.jumlah_pesanan, 10);
      setForm((prev) => ({ ...prev, total_harga: total }));
    } else if (!form.jumlah_pesanan) {
      setForm((prev) => ({ ...prev, total_harga: 0 }));
    }
  }, [form.jumlah_pesanan, selectedTravel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const submitOrder = async (e, orderStatus) => {
    e.preventDefault();

    const requiredFields = [
      'nama',
      'tanggal_transaksi',
      'jenis_pesanan',
      'jumlah_pesanan',
      'total_harga',
      'metode_pembayaran',
    ];

    const hasEmpty = requiredFields.some((field) => !form[field]);
    if (hasEmpty) {
      showMessage('Harap lengkapi semua data yang wajib diisi.', 'error');
      return;
    }

    try {
      const totalHargaNum = parseFloat(form.total_harga);
      if (isNaN(totalHargaNum) || totalHargaNum <= 0) {
        showMessage('Total harga tidak valid.', 'error');
        return;
      }

      const { error } = await supabase.from('penjualan').insert([{
        nama_pelanggan: form.nama,
        tanggal_transaksi: form.tanggal_transaksi,
        jenis_pesanan: form.jenis_pesanan,
        jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
        total_harga: totalHargaNum,
        metode_pembayaran: form.metode_pembayaran,
        status: orderStatus,
        id_travel: form.id_travel,
      }]);

      
      if (error) throw error;

      if (orderStatus === 'Di Keranjang') {
        showMessage('Pesanan berhasil ditambahkan ke keranjang!', 'success');
      } else {
        showMessage('Pemesanan berhasil dibuat!', 'success');
        setTimeout(() => {
          navigate('/testimoni-customer');
        }, 2000);
      }

      setForm((prev) => ({
        ...prev,
        jumlah_pesanan: 1,
        total_harga: selectedTravel ? (selectedTravel.harga * 1) : '',
        metode_pembayaran: '',
      }));
    } catch (err) {
      console.error(err);
      showMessage('Gagal menyimpan data: ' + err.message, 'error');
    }
  };

  const handleAddToCart = (e) => {
    submitOrder(e, 'Di Keranjang');
  };

  const handlePlaceOrder = (e) => {
    submitOrder(e, 'Belum Lunas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/loginBg.png')" }}>
      <div className="w-full max-w-4xl mx-auto p-4">
        <form className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Form Pemesanan Travel</h2>

          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama Pelanggan</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={form.nama}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="tanggal_transaksi" className="block text-sm font-medium mb-1">Tanggal Transaksi</label>
              <input
                type="datetime-local"
                id="tanggal_transaksi"
                name="tanggal_transaksi"
                value={form.tanggal_transaksi}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="jenis_pesanan" className="block text-sm font-medium mb-1">Jenis Pesanan</label>
              <input
                type="text"
                id="jenis_pesanan"
                name="jenis_pesanan"
                value={form.jenis_pesanan}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="jumlah_pesanan" className="block text-sm font-medium mb-1">Jumlah Pesanan</label>
              <input
                type="number"
                id="jumlah_pesanan"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="total_harga" className="block text-sm font-medium mb-1">Total Harga</label>
              <input
                type="text"
                id="total_harga"
                name="total_harga"
                value={typeof form.total_harga === 'number' ? `Rp ${form.total_harga.toLocaleString('id-ID')}` : ''}
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                readOnly
                required
              />
            </div>

            <div>
              <label htmlFor="metode_pembayaran" className="block text-sm font-medium mb-1">Metode Pembayaran</label>
              <select
                id="metode_pembayaran"
                name="metode_pembayaran"
                value={form.metode_pembayaran}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Pilih Metode</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="E-Wallet">E-Wallet</option>
                <option value="Tunai">Tunai</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Masukkan Keranjang
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="flex-1 bg-orange-500 hover:bg-orange-600 border border-gray-300 text-white px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
