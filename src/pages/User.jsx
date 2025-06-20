import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import UserForm from './UserForm';

function User() {
  const [pelanggan, setPelanggan] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchPelanggan = async () => {
    const { data, error } = await supabase
      .from('pelanggan')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else setPelanggan(data);
  };

  const addUser = async (user) => {
    const { error } = await supabase.from('pelanggan').insert(user);
    if (error) console.error(error);
    else fetchPelanggan();
  };

  const updateUser = async (user) => {
    const { error } = await supabase
      .from('pelanggan')
      .update(user)
      .eq('id_pelanggan', user.id_pelanggan);
    
    if (error) console.error(error);
    else {
      fetchPelanggan();
      setEditingUser(null);
    }
  };

  const deleteUser = async (id_pelanggan) => {
    const { error } = await supabase
      .from('pelanggan')
      .delete()
      .eq('id_pelanggan', id_pelanggan);
    
    if (error) console.error(error);
    else fetchPelanggan();
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Pelanggan dengan Supabase</h1>
      
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        editingUser={editingUser}
      />
      
      <ul className="mt-4">
        {pelanggan.map(user => (
          <li key={user.id_pelanggan} className="border p-2 my-2 flex justify-between">
            <div>
              <p className="font-semibold">{user.nama}</p>
              <p className="text-sm text-gray-600">{user.email} - {user.telepon}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingUser(user)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id_pelanggan)}
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

export default User;
