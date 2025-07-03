import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';

function TestimoniCustomer() {
  const [testimoniContent, setTestimoniContent] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchCustomerName = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from('pelanggan')
        .select('nama')
        .eq('email', user.email)
        .single();

      if (!error && data?.nama) {
        setCustomerName(data.nama);
      }
    };

    fetchCustomerName();
  }, []);

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const handleSubmitTestimoni = async (e) => {
    e.preventDefault();

    if (!customerName || !testimoniContent || rating === 0) {
      showMessage('Ulasan dan rating wajib diisi!', 'error');
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        showMessage('Gagal mengambil data pengguna.', 'error');
        return;
      }

      const { data: pelangganData, error: pelangganError } = await supabase
        .from('pelanggan')
        .select('id_pelanggan')
        .eq('email', user.email)
        .single();

      if (pelangganError || !pelangganData) {
        showMessage('Data pelanggan tidak ditemukan.', 'error');
        return;
      }

      const { error } = await supabase.from('testimoni').insert([
        {
          nama_pengirim: customerName,
          email_pengirim: user.email,
          pesan: testimoniContent,
          rating: rating,
          id_pelanggan: pelangganData.id_pelanggan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
      ]);

      if (error) throw error;

      showMessage('Testimoni berhasil dikirim!', 'success');
      setTestimoniContent('');
      setRating(0);
    } catch (err) {
      console.error('Error submitting testimoni:', err.message);
      showMessage('Gagal mengirim testimoni: ' + err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-800">Testimoni Pelanggan</h2>
            <div className="text-sm text-gray-600">
              <Link to="/" className="hover:underline text-orange-600 font-semibold">
                Beranda
              </Link>{' '}
              / <span className="text-gray-700">Testimoni</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-4xl mx-auto p-6 flex justify-center">
        <div className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Berikan Ulasan Anda</h3>

          {message && (
            <div
              className={`p-3 mb-4 rounded-md text-center ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmitTestimoni}>
            <div className="mb-4">
              <textarea
                id="testimoniContent"
                value={testimoniContent}
                onChange={(e) => setTestimoniContent(e.target.value)}
                rows="5"
                placeholder="Ceritakan pengalaman Anda..."
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold mt-4 transition duration-200 ease-in-out shadow-lg"
            >
              Kirim Testimoni
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestimoniCustomer;
