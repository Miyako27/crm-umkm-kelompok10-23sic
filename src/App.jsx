import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CustomerLayout from './customers/components/CustomerLayout'; // Tambahkan ini

// Admin Pages
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import CustomerManagement from './pages/CustomerManagement';
import Armada from './pages/Armada';
import PemesananTiket from './pages/PemesananTiket';
import DataFeedback from './pages/FeedbackPelanggan';
import FormSupirArmada from './pages/FormSupirArmada';
import FAQ from './pages/FAQ';

// Customer Pages
import Home from './customers/pages/Home';
import Login from './customers/pages/Login';
import Artikel from './customers/pages/Artikel';
import ArtikelDetail from './customers/pages/ArtikelDetail';
import Profil from './customers/pages/Profil';
import Kontak from './customers/pages/Kontak';
import Testimoni from './customers/pages/Testimoni';
import FaqCustomer from './customers/pages/FaqCustomer';
import Order from './customers/pages/Order';
import Promo from './customers/pages/Promo';

function App() {
  return (
    <Routes>
      {/* Login tidak perlu layout */}
      <Route path="/login" element={<Login />} />

      {/* Customer Routes */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/:id" element={<ArtikelDetail />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/faq-customer" element={<FaqCustomer />} />
        <Route path="/order-customer" element={<Order />} />
        <Route path="/promo" element={<Promo />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/mitra" element={<Armada />} />
        <Route path="/armada/form-armada" element={<FormSupirArmada />} />
        <Route path="/pemesanan_tiket" element={<PemesananTiket />} />
        <Route path="/feedback_pelanggan" element={<DataFeedback />} />
      </Route>
    </Routes>
  );
}

export default App;
