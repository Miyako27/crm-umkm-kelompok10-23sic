import React, { useEffect, useState } from "react";
import { supabase } from '../../supabase';
import { Link } from "react-router-dom";
import { BiChat } from "react-icons/bi";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("created_at", { ascending: true });
      if (!error) setFaqs(data);
    };
    fetchFAQ();
  }, []);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Breadcrumb & Search Section */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-5">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-extrabold">
              Frequently Asked Questions
            </h2>
            <div className="text-sm text-gray-600">
              <Link
                to="/"
                className="hover:underline text-orange-600 font-semibold"
              >
                Beranda
              </Link>{" "}
              / <span className="text-gray-700">FAQ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main FAQ Content */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Header dengan Garis Oranye di atas */}
        <div className="mb-10">
          <div className="w-16 h-1 bg-orange-600 mb-3"></div>
          <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
            Punya pertanyaan seputar paket wisata kami? Temukan jawabannya di sini!
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ilustrasi kiri */}
          <div className="hidden md:flex justify-center items-center">
            <img
              src="/images/FAQ.png"
              alt="FAQ Illustration"
              className="max-w-sm"
            />
          </div>

          {/* Accordion kanan */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id_faq}
                className={`
                  rounded-md shadow-sm
                  ${activeIndex === index ? 'border border-orange-500' : 'border border-gray-200'}
                `}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className={`
                    w-full text-left px-5 py-3 bg-orange-500 text-white font-semibold focus:outline-none flex justify-between items-center
                    ${activeIndex === index ? 'rounded-t-md' : 'rounded-md'}
                    ${activeIndex === index ? 'border-b border-orange-400' : ''} /* Tambahkan border-b saat aktif */
                  `}
                >
                  {faq.pertanyaan}
                  <span>{activeIndex === index ? "▲" : "▼"}</span>
                </button>
                {activeIndex === index && (
                  <div
                    className="px-5 py-4 bg-orange-100 text-gray-700 rounded-b-md" /* Ubah bg dan hilangkan border-t */
                  >
                    {faq.jawaban}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Floating Live Chat Button */}
      <a
        href="https://wa.me/6285766351957?text=Halo%20saya%20ingin%20bertanya%20tentang%20paket%20wisata"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-yellow-400 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 transition duration-300"
        title="Tanya via WhatsApp"
      >
        <BiChat className="text-white text-3xl" />
      </a>
      </div>
    </>
  );
};

export default FAQ;