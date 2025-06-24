import { useEffect, useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import bcrypt from "bcryptjs";

export default function FormAdmin({ addAdmin, updateAdmin, editingAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    document.title = "Login Admin Travel";
  }, []);

  // Isi form saat mode edit
  useEffect(() => {
    if (editingAdmin) {
      setEmail(editingAdmin.email);
      setPassword(""); // kosongkan password untuk keamanan
      setIsEditing(true);
    } else {
      setEmail("");
      setPassword("");
      setIsEditing(false);
    }
  }, [editingAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Jika mode edit
        const updatedData = {
          id_admin: editingAdmin.id_admin,
          email: email,
          ...(password && { password: bcrypt.hashSync(password, 10) }),
        };
        await updateAdmin(updatedData);
      } else {
        // Jika tambah baru
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newData = {
          email: email,
          password: hashedPassword,
        };
        await addAdmin([newData]);
      }

      // Reset form
      setEmail("");
      setPassword("");
      setIsEditing(false);
    } catch (err) {
      console.error("Terjadi kesalahan:", err.message);
      alert("Gagal menyimpan data admin.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Admin" : "Tambah Admin"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder="Masukkan email admin"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEditing ? "Password Baru (Opsional)" : "Password"}
            </label>
            <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
                placeholder={
                  isEditing
                    ? "Kosongkan jika tidak ingin mengganti password"
                    : "Masukkan password"
                }
                required={!isEditing}
              />
            </div>
          </div>

          {/* Tombol */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
          >
            {isEditing ? "Ubah Data Admin" : "Tambah Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
