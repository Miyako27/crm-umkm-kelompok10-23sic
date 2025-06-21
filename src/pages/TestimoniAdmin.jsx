import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TestimoniAdmin() {
  const [testimoni, setTestimoni] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTestimoni = async () => {
    const { data, error } = await supabase
      .from('testimoni')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setTestimoni(data);
  };

  const updateTestimoni = async (item) => {
    const { error } = await supabase
      .from('testimoni')
      .update(item)
      .eq('id_testimoni', item.id_testimoni);

    if (error) console.error(error);
    else {
      fetchTestimoni();
      setEditing(null);
    }
  };

  const deleteTestimoni = async (id_testimoni) => {
    const { error } = await supabase
      .from('testimoni')
      .delete()
      .eq('id_testimoni', id_testimoni);

    if (error) console.error(error);
    else fetchTestimoni();
  };

  useEffect(() => {
    fetchTestimoni();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="py-4 border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Testimoni</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Testimoni</span>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pesan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {testimoni.map((item, index) => (
                <tr key={item.id_testimoni} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.nama_pengirim}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.email_pengirim}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.pesan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.rating}</td>
                </tr>
              ))}
              {testimoni.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Belum ada testimoni.
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

export default TestimoniAdmin;
