import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormFinalTiketPesawat() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedFlight = state?.selectedFlight;

  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    nama: '',
    tanggal_transaksi: '',
    jenis_pesanan: '',
    jumlah_pesanan: 1,
    total_harga: '',
    metode_pembayaran: '',
    id_tiketpesawat: selectedFlight?.id || null,
  });

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setCurrentUser(user);

      const { data: pelangganData } = await supabase
        .from("pelanggan")
        .select("nama")
        .eq("email", user.email)
        .single();

      const localDate = new Date();
      const offset = localDate.getTimezoneOffset();
      const adjustedDate = new Date(localDate.getTime() - offset * 60000);
      const formattedDate = adjustedDate.toISOString().slice(0, 16);

      setForm((prev) => ({
        ...prev,
        nama: pelangganData?.nama || '',
        tanggal_transaksi: formattedDate,
        jenis_pesanan: selectedFlight
          ? `Pesawat ${selectedFlight.asal} - ${selectedFlight.tujuan}`
          : '',
        total_harga: selectedFlight?.harga || '',
        id_tiketpesawat: selectedFlight?.id || null,
      }));
    };

    fetchUser();
  }, [selectedFlight]);

  useEffect(() => {
    if (selectedFlight && form.jumlah_pesanan) {
      const total = parseFloat(selectedFlight.harga) * parseInt(form.jumlah_pesanan, 10);
      setForm((prev) => ({ ...prev, total_harga: total }));
    }
  }, [form.jumlah_pesanan]);

  const showMessage = (text, type) => {
    setMessage(text);
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

      const { error } = await supabase.from("penjualan").insert([{
        nama_pelanggan: form.nama,
        tanggal_transaksi: form.tanggal_transaksi,
        jenis_pesanan: form.jenis_pesanan,
        jumlah_pesanan: parseInt(form.jumlah_pesanan, 10),
        total_harga: totalHargaNum,
        metode_pembayaran: form.metode_pembayaran,
        status: orderStatus,
        id: form.id,
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
        total_harga: selectedFlight ? (selectedFlight.harga * 1) : '',
        metode_pembayaran: '',
      }));
    } catch (err) {
      console.error(err);
      showMessage('Gagal menyimpan data: ' + err.message, 'error');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/loginBg.png')" }}>
      <div className="w-full max-w-4xl mx-auto p-4">
        <form className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Form Pemesanan Tiket Pesawat</h2>

          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Pelanggan</label>
              <input type="text" value={form.nama} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Transaksi</label>
              <input type="datetime-local" value={form.tanggal_transaksi} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Pesanan</label>
              <input type="text" value={form.jenis_pesanan} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jumlah Pesanan</label>
              <input
                type="number"
                name="jumlah_pesanan"
                value={form.jumlah_pesanan}
                onChange={handleChange}
                min={1}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Harga</label>
              <input
                type="text"
                value={`Rp ${Number(form.total_harga).toLocaleString("id-ID")}`}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Metode Pembayaran</label>
              <select
                name="metode_pembayaran"
                value={form.metode_pembayaran}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Pilih Metode</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Kartu Kredit">Kartu Kredit</option>
                <option value="E-Wallet">E-Wallet</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={(e) => submitOrder(e, "Di Keranjang")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Masukkan Keranjang
            </button>
            <button
              type="button"
              onClick={(e) => submitOrder(e, "Belum Lunas")}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold text-lg transition duration-200 ease-in-out shadow-lg"
            >
              Pesan Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}