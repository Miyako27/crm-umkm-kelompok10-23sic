import { MdOutlineRateReview } from "react-icons/md"; 
import { MdNewspaper } from "react-icons/md"; 
import { BiNews } from "react-icons/bi"; 
import { FaNewspaper } from "react-icons/fa"; 
import { GiNewspaper } from "react-icons/gi"; 
import { FaQuestionCircle } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  LayoutDashboard,
  Box,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { name: 'Produk', icon: <Box />, path: '/produk' },
  { name: 'Laporan', icon: <BarChart2 />, path: '/laporan' },
  { name: 'Artikel', icon: <MdNewspaper />, path: '/artikel_admin' },
  { name: 'Testimoni', icon: <MdOutlineRateReview />, path: '/laporan' },
  { name: 'Penjualan', icon: <FaClipboardList />, path: '/penjualan' },
  { name: 'Pelanggan', icon: <BsFillPeopleFill />, path: '/pelanggan' },
  { name: 'Mitra', icon: <AiFillCar />, path: '/mitra' },
  { name: 'Pemesanan', icon: <BsTicketPerforatedFill />, path: '/pemesanan_tiket' },
  { name: 'Feedback Pelanggan', icon: <VscFeedback />, path: '/feedback_pelanggan' },
  { name: 'FAQ', icon: <FaQuestionCircle />, path: '/faq' },
];

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  // { name: 'Sign In', icon: <LogIn />, path: '/signin' },
  // { name: 'Sign Up', icon: <UserPlus />, path: '/signup' },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="mb-8">
        <img src="/images/logoo.png" alt="Logo" className="h-10 mx-auto" />
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${isActive(item.path)
                ? 'bg-orange-200 text-orange-800 font-semibold'
                : 'text-gray-700'
              }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-100 transition ${isActive(item.path)
                ? 'bg-orange-200 text-orange-800 font-semibold'
                : 'text-gray-700'
              }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
