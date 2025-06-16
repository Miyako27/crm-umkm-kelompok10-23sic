import React from "react";
import { Link } from "react-router-dom";

const testimonials = [
    {
        name: "Pen",
        message: "Pelayanannya ramah dan cepat! Sangat direkomendasikan.",
        photo: "https://img.freepik.com/premium-vector/fitness-gym-mascot_242714-95.jpg",
    },
    {
        name: "Pendy",
        message: "Perjalanan wisata sangat menyenangkan dan nyaman.",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZDuGwbIiWqugjLHCQj6kZjDfdbKke0sl6lmsgIwt_d6Ilxu_JHWq6FYB5qmMqUkVwOS0&usqp=CAU",
    },
    {
        name: "Miyako",
        message: "Guide-nya informatif dan profesional. Pengalaman luar biasa!",
        photo: "https://media.istockphoto.com/id/2046210300/vector/portrait-of-young-beautiful-muslim-woman-in-hijab-side-view-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=nLvHzS7JzqZLvm87Ep38xl6iXvPscLgGBR_4sWwBX80=",
    },
    {
        name: "Aisyah",
        message: "Harga terjangkau dengan pelayanan premium!",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSZGy48a-tIdiU5hC-fr3E1vOtRmSVP28-VA&s",
    },
];

const Testimoni = () => {
    return (
        <div className="font-sans">
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto px-5 flex flex-col space-y-1">
                    <h2 className="text-3xl font-extrabold text-gray-800">Testimoni</h2>
                    <div className="text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:underline text-orange-600 font-semibold"
                        >
                            Beranda
                        </Link>{" "}
                        / <span className="text-gray-700">Testimoni</span>
                    </div>
                </div>
            </div>

            {/* Section Testimoni */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-12">
                    {/* Header with Orange Line Above */}
                    <div className="mb-10">
                        <div className="w-16 h-1 bg-orange-600 mb-3"></div>
                        <h2 className="text-xl font-semibold text-left text-gray-700 leading-relaxed">
                            Pelayanan kami berbicara lewat kata-kata bahagia para pelanggan
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {testimonials.map((t, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={t.photo}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                                    />
                                    <h4 className="font-bold text-gray-800">{t.name}</h4>
                                </div>
                                <p className="text-gray-700 text-sm">"{t.message}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimoni;