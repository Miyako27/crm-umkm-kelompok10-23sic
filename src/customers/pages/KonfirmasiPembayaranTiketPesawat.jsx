import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaCheckCircle, FaHome } from "react-icons/fa";

export default function KonfirmasiPembayaranBerhasil() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Konfirmasi Pembayaran";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg text-center border border-gray-200">
        <FaCheckCircle className="text-blue-500 text-6xl mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Terima kasih telah melakukan pembayaran!
        </h1>
        <p className="text-gray-700 text-sm mb-4">
          Pembayaran Anda berhasil dikonfirmasi dan akan segera <strong>diproses oleh admin</strong>.
        </p>
        <p className="text-gray-600 text-sm">
          Kami akan mengirimkan informasi selanjutnya melalui email atau WhatsApp yang Anda daftarkan.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <FaHome /> Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
