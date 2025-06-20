import { useState } from 'react';

const FeedbackForm = ({ addFeedback }) => {
  const [form, setForm] = useState({
    feedback: '',
    tanggal: new Date().toISOString().split('T')[0] // default today (YYYY-MM-DD)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.feedback || !form.tanggal) return;

    // Fungsi eksternal untuk simpan (misal ke Supabase)
    addFeedback(form);

    // Reset form
    setForm({
      feedback: '',
      tanggal: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow border max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Form Feedback</h2>

      <textarea
        placeholder="Masukkan feedback Anda..."
        className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:outline-orange-500"
        value={form.feedback}
        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
      />

      <input
        type="date"
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-orange-500"
        value={form.tanggal}
        onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
      />

      <button
        type="submit"
        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Kirim Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
