import React from 'react';

const dataFeedback = [
  {
    id: 1,
    nama: 'Andi',
    feedback:
      'Pelayanan sangat baik dan cepat, stafnya ramah sekali. Saya merasa sangat puas dengan pengalaman pemesanan tiket ini.',
    tanggal: '2025-06-01',
  },
  {
    id: 2,
    nama: 'Sari',
    feedback:
      'Proses pemesanan mudah dan tidak ribet. Namun, saya berharap ada fitur pilihan kursi supaya bisa lebih nyaman saat menonton.',
    tanggal: '2025-06-02',
  },
  {
    id: 3,
    nama: 'Budi',
    feedback:
      'Harga tiket cukup terjangkau, tapi saya berharap ada diskon untuk pembelian tiket dalam jumlah banyak.',
    tanggal: '2025-06-03',
  },
  {
    id: 4,
    nama: 'Lia',
    feedback:
      'Websitenya responsif dan tampilannya menarik. Saran saya agar menambahkan fitur notifikasi untuk update jadwal acara.',
    tanggal: '2025-06-04',
  },
  {
    id: 5,
    nama: 'Rizky',
    feedback:
      'Sangat membantu, terutama karena bisa memilih tanggal dengan mudah. Namun, pilihan metode pembayaran harus ditambah.',
    tanggal: '2025-06-05',
  },
];

const DataFeedback = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Data Feedback Pelanggan</h1>

      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full w-full divide-y divide-gray-200">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold w-12">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-40">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Feedback</th>
              <th className="px-6 py-3 text-left text-sm font-semibold w-36">Tanggal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataFeedback.map(({ id, nama, feedback, tanggal }, index) => (
              <tr key={id} className="hover:bg-gray-50 align-top">
                <td className="px-6 py-4 whitespace-nowrap text-sm align-top">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-top">{nama}</td>
                <td className="px-6 py-4 text-sm text-gray-700 align-top whitespace-normal">{feedback}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top">{tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataFeedback;
