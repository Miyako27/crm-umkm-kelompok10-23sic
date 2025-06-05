import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

const Armada = () => {
  const navigate = useNavigate();

  const dataArmada = [
    {
      namaSupir: 'Miyako',
      noHpSupir: '081234567890',
      nomorKTP: '1234567890123456',
      namaArmada: 'Truk Fuso',
      nomorPolisi: 'BM 1234 XY',
      kapasitas: '5 Orang',
    },
    {
      namaSupir: 'Aisyah',
      noHpSupir: '082345678901',
      nomorKTP: '6543210987654321',
      namaArmada: 'Pickup L300',
      nomorPolisi: 'BM 5678 ZZ',
      kapasitas: '2 Orang',
    },
    {
      namaSupir: 'Pendy',
      noHpSupir: '083456789012',
      nomorKTP: '1122334455667788',
      namaArmada: 'Box Truck',
      nomorPolisi: 'BM 9999 AA',
      kapasitas: '2 Orang',
    },
  ];

  const handleTambahData = () => {
    navigate('/armada/form-armada');
  };

  const handleEdit = (index) => {
    console.log('Edit data ke-', index);
  };

  const handleDelete = (index) => {
    console.log('Hapus data ke-', index);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-600">
          <li>
            <Link to="/" className="hover:text-pink-500">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-semibold" aria-current="page">
            Armada
          </li>
        </ol>
      </nav>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Armada</h1>
          <p className="text-sm text-gray-500">List Data Supir dan Kendaraan</p>
        </div>
        <button
          onClick={handleTambahData}
          className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow-md transition duration-300"
        >
          + Tambah Data
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-purple-100 text-gray-700">
            <tr>
              <th className="p-3 text-left border-b">#</th>
              <th className="p-3 text-left border-b">Nama Supir</th>
              <th className="p-3 text-left border-b">No. HP</th>
              <th className="p-3 text-left border-b">No. KTP</th>
              <th className="p-3 text-left border-b">Nama Armada</th>
              <th className="p-3 text-left border-b">No. Polisi</th>
              <th className="p-3 text-left border-b">Kapasitas</th>
              <th className="p-3 text-left border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataArmada.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-150"
              >
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b font-medium text-gray-800">{item.namaSupir}</td>
                <td className="p-3 border-b text-gray-700">{item.noHpSupir}</td>
                <td className="p-3 border-b text-gray-700">{item.nomorKTP}</td>
                <td className="p-3 border-b text-gray-700">{item.namaArmada}</td>
                <td className="p-3 border-b text-gray-700">{item.nomorPolisi}</td>
                <td className="p-3 border-b text-gray-700">{item.kapasitas}</td>
                <td className="p-3 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-800 hover:scale-105 transition p-1 rounded-full"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 hover:scale-105 transition p-1 rounded-full"
                      title="Hapus"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Armada;
