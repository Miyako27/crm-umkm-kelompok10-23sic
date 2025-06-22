import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Order', path: '/order-customer' },
  { label: 'Promo', path: '/promo' },
  { label: 'Artikel', path: '/artikel' },
  { label: 'Testimoni', path: '/testimoni' },
  { label: 'Kontak', path: '/kontak' },
  { label: 'FAQ', path: '/faq-customer' },
];

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user_login");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userLogout", updateUser);
    updateUser();

    return () => {
      window.removeEventListener("userLogout", updateUser);
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

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center px-5 min-h-[80px]">
        <div className="flex items-center">
          <img src="/images/logoo.png" alt="Logo" className="h-10 mr-2" />
        </div>

        <div className="flex items-center space-x-6">
          <nav>
            <ul className="flex list-none m-0 p-0 space-x-6">
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
            </ul>
          </nav>
          {renderRightButton()}
        </div>
      </div>
    </header>
  );
}
