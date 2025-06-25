import {
  LayoutDashboard,
  Box,
  BarChart2,
  Newspaper,
  MessageSquare,
  ClipboardList,
  Users,
  Car,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RiAdminLine } from 'react-icons/ri';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openProduk, setOpenProduk] = useState(true);

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    {
      name: 'Produk',
      icon: <Box size={20} />,
      submenus: [
        { name: 'Travel', path: '/produk/travel' },
        { name: 'Tiket Pesawat', path: '/produk/tiket-pesawat' },
        { name: 'Paket Wisata', path: '/produk/paket-wisata' },
      ]
    },
    { name: 'Prediksi', icon: <BarChart2 size={20} />, path: '/loyalitas' },
    { name: 'Artikel', icon: <Newspaper size={20} />, path: '/artikel_admin' },
    { name: 'Daftar Admin', icon: <RiAdminLine size={20} />, path: '/daftar-admin' },
    { name: 'Testimoni', icon: <MessageSquare size={20} />, path: '/testimoni-admin' },
    { name: 'Penjualan', icon: <ClipboardList size={20} />, path: '/penjualan' },
    { name: 'Pelanggan', icon: <Users size={20} />, path: '/pelanggan' },
    { name: 'Mitra', icon: <Car size={20} />, path: '/mitra' },
    { name: 'FAQ', icon: <HelpCircle size={20} />, path: '/faqadmin' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_login");
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block overflow-y-auto">
      <div className="mb-8">
        <img src="/images/logoo.png" alt="Logo" className="h-10 mx-auto" />
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.submenus ? (
              <>
                <button
                  onClick={() => setOpenProduk(!openProduk)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-orange-100 transition ${
                    openProduk ? 'bg-orange-50 text-orange-800' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {openProduk ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {openProduk && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.submenus.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className={`block px-2 py-1 rounded-md text-sm hover:bg-orange-100 ${
                          isActive(sub.path)
                            ? 'text-orange-700 font-semibold'
                            : 'text-gray-700'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${
                  isActive(item.path)
                    ? 'bg-orange-200 text-orange-800 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
