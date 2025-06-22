// src/components/admin/HotelAdmin.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabase'; // Sesuaikan path jika berbeda
import FormHotel from './FormHotel'; // Sesuaikan path jika berbeda
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function HotelAdmin() {
  const [hotelList, setHotelList] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);

  const fetchHotels = async () => {
    const { data, error } = await supabase
      .from('hotel') // Mengambil data dari tabel 'hotel'
      .select('*')
      .order('nama_hotel', { ascending: true }); // Mengurutkan berdasarkan nama hotel

    if (error) {
      console.error('Error fetching hotels:', error.message);
    } else {
      setHotelList(data);
    }
  };

  const addHotel = async (newData) => {
    const { error } = await supabase.from('hotel').insert(newData);
    if (error) {
      console.error('Error adding hotel:', error.message);
    } else {
      fetchHotels(); // Refresh data setelah menambahkan
    }
  };

  const updateHotel = async (updatedData) => {
    const { error } = await supabase
      .from('hotel')
      .update({ ...updatedData, updated_at: new Date().toISOString() })
      .eq('id_hotel', updatedData.id_hotel); // Mengupdate berdasarkan id_hotel

    if (error) {
      console.error('Error updating hotel:', error.message);
    } else {
      fetchHotels(); // Refresh data setelah mengupdate
      setEditingHotel(null); // Reset mode editing
    }
  };

  const deleteHotel = async (id) => {
    const { error } = await supabase
      .from('hotel')
      .delete()
      .eq('id_hotel', id); // Menghapus berdasarkan id_hotel

    if (error) {
      console.error('Error deleting hotel:', error.message);
    } else {
      fetchHotels(); // Refresh data setelah menghapus
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []); // Jalankan sekali saat komponen dimuat

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-4 mb-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Data Hotel</h2>
          <div className="text-sm text-gray-600">
            <Link to="/dashboard" className="hover:underline text-orange-600 font-semibold">
              Dashboard
            </Link>{' '}
            / <span className="text-gray-700">Hotel</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto">
        <FormHotel
          addHotel={addHotel}
          updateHotel={updateHotel}
          editingHotel={editingHotel}
        />
      </div>

      {/* Table */}
      <div className="mt-10 overflow-x-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Nama Hotel</th>
                <th className="px-4 py-3 font-semibold">Lokasi</th>
                <th className="px-4 py-3 font-semibold">Harga/Malam</th>
                <th className="px-4 py-3 font-semibold">Rating</th>
                <th className="px-4 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {hotelList.map((hotel, i) => (
                <tr key={hotel.id_hotel} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{hotel.nama_hotel}</td>
                  <td className="px-4 py-2">{hotel.lokasi}</td>
                  <td className="px-4 py-2">Rp{parseInt(hotel.harga_per_malam).toLocaleString()}</td>
                  <td className="px-4 py-2">{hotel.rating_bintang} Bintang</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setEditingHotel(hotel)}
                      className="text-blue-600 hover:text-blue-800 mx-1 text-lg"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteHotel(hotel.id_hotel)}
                      className="text-red-600 hover:text-red-800 mx-1 text-lg"
                      aria-label="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {hotelList.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    Belum ada data hotel.
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

export default HotelAdmin;