import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FAQForm from './FormFaq';

function FAQAdmin() {
  const [faqList, setFaqList] = useState([]);
  const [editingFAQ, setEditingFAQ] = useState(null);

  const fetchFAQ = async () => {
    const { data, error } = await supabase
      .from('faq')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setFaqList(data);
  };

  const addFAQ = async (faq) => {
    const { error } = await supabase.from('faq').insert(faq);
    if (error) console.error(error);
    else fetchFAQ();
  };

  const updateFAQ = async (faq) => {
    const { error } = await supabase
      .from('faq')
      .update(faq)
      .eq('id_faq', faq.id_faq);

    if (error) console.error(error);
    else {
      fetchFAQ();
      setEditingFAQ(null);
    }
  };

  const deleteFAQ = async (id_faq) => {
    const { error } = await supabase
      .from('faq')
      .delete()
      .eq('id_faq', id_faq);

    if (error) console.error(error);
    else fetchFAQ();
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD FAQ dengan Supabase</h1>

      <FAQForm
        addFAQ={addFAQ}
        updateFAQ={updateFAQ}
        editingFAQ={editingFAQ}
      />

      <ul className="mt-4">
        {faqList.map((faq) => (
          <li key={faq.id_faq} className="border p-2 my-2">
            <p className="font-semibold">{faq.pertanyaan}</p>
            <p className="text-sm text-gray-700">{faq.jawaban}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => setEditingFAQ(faq)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFAQ(faq.id_faq)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQAdmin;
