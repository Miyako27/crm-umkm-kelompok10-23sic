import {
  LayoutDashboard,
  Box,
  BarChart2,
  Newspaper,
  MessageSquare,
  ClipboardList,
  Users,
  Car,
  Ticket,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [openProduk, setOpenProduk] = useState(true); // default terbuka
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    {
      name: 'Produk',
      icon: <Box size={20} />,
      submenus: [
        { name: 'Travel', path: '/produk/travel' },
        { name: 'Tiket Pesawat', path: '/produk/tiket-pesawat' },
        { name: 'Hotel', path: '/produk/hotel' },
        { name: 'Paket Wisata', path: '/produk/paket-wisata' },
      ]
    },
    { name: 'Laporan', icon: <BarChart2 size={20} />, path: '/laporan' },
    { name: 'Artikel', icon: <Newspaper size={20} />, path: '/artikel_admin' },
    { name: 'Testimoni', icon: <MessageSquare size={20} />, path: '/testimoni-admin' },
    { name: 'Penjualan', icon: <ClipboardList size={20} />, path: '/penjualan' },
    { name: 'Pelanggan', icon: <Users size={20} />, path: '/pelanggan' },
    { name: 'Mitra', icon: <Car size={20} />, path: '/mitra' },
    { name: 'Pemesanan', icon: <Ticket size={20} />, path: '/pemesanan_tiket' },
    { name: 'FAQ', icon: <HelpCircle size={20} />, path: '/faqadmin' },
  ];

  const accountItems = [
    { name: 'Pengaturan Akun', icon: <Settings size={20} />, path: '/akun' },
  ];

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

      {/* <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
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
        ))}
      </nav> */}
    </aside>
  );
};

export default Sidebar;
