import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import FAQForm from './FormFaq';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">FAQ</h2>
          <div className="text-sm text-gray-600">
            <Link
              to="/dashboard"
              className="hover:underline text-orange-600 font-semibold"
            >
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">FAQ</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto">
        <FAQForm
          addFAQ={addFAQ}
          updateFAQ={updateFAQ}
          editingFAQ={editingFAQ}
        />
      </div>

      {/* Tabel FAQ */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pertanyaan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jawaban</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {faqList.map((faq, index) => (
                <tr key={faq.id_faq} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800 max-w-xs">{faq.pertanyaan}</td>
                  <td className="px-6 py-4 text-gray-800 whitespace-pre-wrap max-w-lg">{faq.jawaban}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setEditingFAQ(faq)}
                      className="text-blue-600 hover:text-blue-800 mx-2 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteFAQ(faq.id_faq)}
                      className="text-red-600 hover:text-red-800 mx-2 text-lg"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {faqList.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Belum ada data FAQ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FAQAdmin;
