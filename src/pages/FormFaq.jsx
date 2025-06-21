import { useState, useEffect } from 'react';

const FormFaq = ({ addFAQ, updateFAQ, editingFAQ }) => {
  const [form, setForm] = useState({
    pertanyaan: '',
    jawaban: '',
  });

  useEffect(() => {
    if (editingFAQ) {
      setForm(editingFAQ);
    } else {
      setForm({
        pertanyaan: '',
        jawaban: '',
      });
    }
  }, [editingFAQ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pertanyaan || !form.jawaban) return;

    editingFAQ ? updateFAQ(form) : addFAQ(form);

    setForm({ pertanyaan: '', jawaban: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {editingFAQ ? 'Edit FAQ' : 'Tambah FAQ'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pertanyaan</label>
          <input
            type="text"
            name="pertanyaan"
            value={form.pertanyaan}
            onChange={handleChange}
            placeholder="Masukkan pertanyaan"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Jawaban</label>
          <textarea
            name="jawaban"
            value={form.jawaban}
            onChange={handleChange}
            placeholder="Masukkan jawaban"
            className="w-full border border-gray-300 rounded-md p-2 resize-none h-32"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
          >
            {editingFAQ ? 'Perbarui' : 'Simpan'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormFaq;
