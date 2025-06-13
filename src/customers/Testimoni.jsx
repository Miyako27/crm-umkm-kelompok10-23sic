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

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  { label: 'Order', path: '#' },
  { label: 'Promo', path: '#' },
  { label: 'Artikel', path: '/artikel' },
  { label: 'Testimoni', path: '/testimoni' },
  { label: 'Kontak', path: '/kontak' },
  { label: 'FAQ', path: '#' },
];

const Testimoni = () => {
    return (
        <div className="font-sans">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
                    <div className="flex items-center">
                        <img
                            src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
                            alt="Logo"
                            className="h-10 mr-2"
                        />
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-6">
                        <nav>
                            <ul className="flex list-none m-0 p-0 space-x-6">
                                {navItems.map(({ label, path }) => (
                                    <li key={label}>
                                        <Link
                                            to={path}
                                            className="font-bold text-gray-800 text-lg hover:text-orange-500 transition-colors duration-300"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <Link
                            to="/login"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition-colors duration-300"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </header>
            {/* Breadcrumb */}
            <div className="bg-gray-50 py-4 border-b border-gray-200 mb-8">
                <div className="max-w-7xl mx-auto px-5">
                    <h2 className="text-[32px] font-extrabold text-gray-800">Testimoni</h2>
                    <div className="text-sm text-gray-600">
                        <Link to="/" className="hover:underline text-orange-600 font-semibold">
                            Beranda
                        </Link>{" "}
                        / <span className="text-gray-700">Testimoni</span>
                    </div>
                </div>
            </div>

            {/* Section Testimoni */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-5">
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

            {/* Footer */}
            <footer className="mt-8 bg-gray-900 text-gray-200">
                <div className="container mx-auto max-w-screen-xl px-5 py-12 flex flex-col md:flex-row justify-between gap-8">
                    <div className="md:w-1/3">
                        <img
                            src="https://www.mutiarasiaktravel.co.id/wp-content/uploads/2022/11/logo-mjm-e1668921353660.png"
                            alt="Logo Footer"
                            className="h-12 mb-4"
                        />
                        <p className="text-sm max-w-xs">
                            Tripenya - Healing Gak Pake Drama, Cuma Disini!
                        </p>
                    </div>

                    <div className="md:w-1/3">
                        <h3 className="font-bold text-xl mb-2">Ikuti Kami</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Facebook</a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Twitter</a>
                            </li>
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Instagram</a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:w-1/3">
                        <h3 className="font-bold text-xl mb-2">Hubungi Kami</h3>
                        <p>Telp: +62 812-3456-7890</p>
                        <p>Alamat: Jl. Sudirman No.123, Pekanbaru, Riau</p>
                        <p>Jam Buka: Senin - Minggu, 08.00 - 20.00 WIB</p>
                    </div>
                </div>

                <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
                    © Copyright {new Date().getFullYear()} by Miyako, Pendy, Nuraisyah.
                </div>
            </footer>
        </div>
    );
};

export default Testimoni;