import { Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-white to-gray-50 shadow-sm border-b sticky top-0 z-10">
      
      {/* Search - kiri */}
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
        />
      </div>

      {/* Sign In - kanan */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-500 transition cursor-pointer">
        <User className="w-4 h-4" />
        Admin
      </div>
    </header>
  );
};

export default Header;
