import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const initialFAQ = [
  {
    id: 1,
    question: "Apakah bisa booking via WhatsApp atau hanya lewat website?",
    answer:
      "Bisa! Kamu bisa booking lewat WhatsApp, telepon, atau langsung dari website kami. Kami siap bantu proses pemesanan dengan cepat dan mudah.",
  },
  {
    id: 2,
    question: "Apakah ada refund jika batal?",
    answer:
      "Tentu, refund bisa dilakukan sesuai dengan syarat dan ketentuan yang berlaku. Hubungi CS kami ya!",
  },
];

export default function FAQ() {
  const [faqList, setFaqList] = useState(initialFAQ);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFAQ = () => {
    if (!formData.question || !formData.answer) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newFAQ = {
      id: faqList.length + 1,
      ...formData,
    };

    setFaqList([...faqList, newFAQ]);
    setFormData({ question: "", answer: "" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus pertanyaan ini?")) {
      setFaqList(faqList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="relative p-6 max-w-6xl mx-auto">
      {/* BREADCRUMB */}
      <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <span className="text-gray-700 font-semibold">FAQ</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Halaman FAQ</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Kembali" : "Tambah"}
      </button>

      {showForm && (
        <div className="mb-6 mt-20 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-3">
            <label className="block font-medium mb-1">Pertanyaan</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan pertanyaan"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Jawaban</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan jawaban"
              rows={3}
            />
          </div>
          <button
            onClick={handleAddFAQ}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Simpan
          </button>
        </div>
      )}

      {!showForm && (
        <div className="overflow-x-auto bg-white rounded shadow mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Pertanyaan
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Jawaban
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {faqList.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-pre-wrap">{item.question}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap">{item.answer}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => alert("Fitur edit belum tersedia")}
                        className="text-blue-600 hover:text-blue-800 hover:scale-105 transition p-1 rounded-full"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 hover:scale-105 transition p-1 rounded-full"
                        title="Hapus"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {faqList.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    Tidak ada data FAQ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
