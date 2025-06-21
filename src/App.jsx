import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CustomerLayout from './customers/components/CustomerLayout'; // Tambahkan ini

// Admin Pages
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import Mitra from './pages/Mitra';
import PemesananTiket from './pages/PemesananTiket';
import TestimoniAdmin from './pages/TestimoniAdmin';
import FAQ from './pages/FAQ';
import ArtikelAdmin from './pages/ArtikelAdmin';
import FormArtikel from './pages/FormArtikel';
import FormFaq from './pages/FormFaq';
import FAQAdmin from './pages/FAQAdmin';
import User from './pages/User';


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
import Registrasi from './customers/pages/Registrasi';
import PaketWisataAdmin from './pages/PaketWisataAdmin';



function App() {
  return (
    <Routes>
      {/* Login tidak perlu layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/registrasi" element={< Registrasi />} />

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
        <Route path="/faq" element={<FAQ />} />
        <Route path="/mitra" element={<Mitra />} />
        <Route path="/pemesanan_tiket" element={<PemesananTiket />} />
        <Route path="/artikel-list" element={< FormArtikel />} />
        <Route path="/artikel_admin" element={< ArtikelAdmin />} />
        <Route path="/faq-list" element={< FormFaq />} />
        <Route path="/faqadmin" element={< FAQAdmin />} />
        <Route path="/pelanggan" element={< User />} />
        <Route path="/testimoni-admin" element={< TestimoniAdmin />} />
        <Route path="/produk/paket-wisata" element={< PaketWisataAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
