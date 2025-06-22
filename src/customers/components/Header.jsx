import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Promo', path: '/promo' },
  { label: 'Artikel', path: '/artikel' },
  { label: 'Testimoni', path: '/testimoni' },
  { label: 'Kontak', path: '/kontak' },
  { label: 'FAQ', path: '/faq-customer' },
];

export default function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // untuk deteksi URL

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user_login");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userLogout", updateUser);
    updateUser();

    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-order")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("userLogout", updateUser);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderRightButton = () => {
    if (!user) {
      return (
        <NavLink
          to="/login"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition"
        >
          Login
        </NavLink>
      );
    }

    if (user.role === "admin") {
      return (
        <NavLink
          to="/dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition"
        >
          Dashboard
        </NavLink>
      );
    }

    return (
      <NavLink
        to="/profilcustomer"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-md transition"
      >
        Profil
      </NavLink>
    );
  };

  // Cek apakah halaman saat ini termasuk dalam menu Order
  const isOrderActive = location.pathname.startsWith("/order-customer");

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
        <div className="flex items-center">
          <img src="/images/logoo.png" alt="Logo" className="h-10 mr-2" />
        </div>

        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex list-none m-0 p-0 space-x-6 relative">
              {navItems.map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `font-bold text-lg transition-colors duration-300 ${
                        isActive ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Dropdown Menu Order */}
              <li className="relative dropdown-order">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`font-bold text-lg transition-colors duration-300 focus:outline-none flex items-center gap-1 ${
                    isOrderActive ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'
                  }`}
                  type="button"
                >
                  Order
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg rounded-md mt-2 z-50 min-w-[160px]">
                    <li>
                      <NavLink
                        to="/order-customer/travel"
                        className={({ isActive }) =>
                          `block px-4 py-2 transition-colors duration-200 ${
                            isActive ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:bg-orange-100'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Travel
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/order-customer/tiket-pesawat"
                        className={({ isActive }) =>
                          `block px-4 py-2 transition-colors duration-200 ${
                            isActive ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:bg-orange-100'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Tiket Pesawat
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/order-customer/paket-wisata"
                        className={({ isActive }) =>
                          `block px-4 py-2 transition-colors duration-200 ${
                            isActive ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:bg-orange-100'
                          }`
                        }
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Paket Wisata
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          {renderRightButton()}
        </div>
      </div>
    </header>
  );
}
