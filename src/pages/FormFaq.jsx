import { useState, useEffect } from 'react';

const FormFaq = ({ addFAQ, updateFAQ, editingFAQ }) => {
  const [form, setForm] = useState({
    pertanyaan: '',
    jawaban: '',
  });

  useEffect(() => {
    if (editingFAQ) setForm(editingFAQ);
    else setForm({
      pertanyaan: '',
      jawaban: '',
    });
  }, [editingFAQ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pertanyaan || !form.jawaban) return;

    editingFAQ ? updateFAQ(form) : addFAQ(form);
    setForm({ pertanyaan: '', jawaban: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Pertanyaan"
        className="w-full p-2 border rounded"
        value={form.pertanyaan}
        onChange={e => setForm({ ...form, pertanyaan: e.target.value })}
      />
      <textarea
        placeholder="Jawaban"
        className="w-full p-2 border rounded"
        value={form.jawaban}
        onChange={e => setForm({ ...form, jawaban: e.target.value })}
        rows={4}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingFAQ ? 'Perbarui' : 'Tambah'}
      </button>
    </form>
  );
};

export default FormFaq;
