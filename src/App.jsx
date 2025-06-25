import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import CustomerLayout from './customers/components/CustomerLayout';

// Admin Pages
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import Mitra from './pages/Mitra';
import TestimoniAdmin from './pages/TestimoniAdmin';
import FAQ from './pages/FAQ';
import ArtikelAdmin from './pages/ArtikelAdmin';
import FormArtikel from './pages/FormArtikel';
import FormFaq from './pages/FormFaq';
import FAQAdmin from './pages/FAQAdmin';
import User from './pages/User';
import TravelAdmin from './pages/TravelAdmin';
import PaketWisataAdmin from './pages/PaketWisataAdmin';


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
import ProfilCustomer from './customers/pages/ProfilCustomer';
import SalesReportAdmin from './pages/SalesReportAdmin';
import TiketPesawat from './pages/TiketPesawatAdmin';
import FormOrderTravel from './customers/pages/FormOrderTravel'; 
import FormOrderTiketPesawat from './customers/pages/FormOrderTiketPesawat';
import ListTiketPesawatCustomer from './customers/pages/ListTiketPesawatCustomer';
import FormFinalTiketPesawat from './customers/pages/FormFinalTiketPesawat';
import KonfirmasiPembayaran from './customers/pages/KonfirmasiPembayaranTiketPesawat';
import DaftarAdmin from './pages/DaftarAdmin';
import CheckoutPage from './customers/pages/CheckoutPage';
import ListTiketTravelCustomer from './customers/pages/ListTiketTravelCustomer';
import FormFinalTravel from './customers/pages/FormFinalTravel';
import Daming from './pages/Daming';
import Loyalitas from './pages/Loyalitas';
import LoyaltyPage from './pages/LoyaltyPage';

function App() {
  return (
    <Routes>
      {/* Tidak perlu layout */}
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
        <Route path="/order-customer/paket-wisata" element={<Order />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/profilcustomer" element={<ProfilCustomer />} />
        <Route path="/order-customer/travel" element={<FormOrderTravel />} />
        <Route path="/order-customer/tiket-pesawat" element={< FormOrderTiketPesawat />} /> 
        <Route path="/list-tiket-pesawat" element={< ListTiketPesawatCustomer />} /> 
        <Route path="/form-final-tiket" element={<FormFinalTiketPesawat />} />
        <Route path="/konfirmasi-pembayaran" element={<KonfirmasiPembayaran />} />
        <Route path="/order-customer/paket-wisata" element={<Order />} />
        <Route path="/checkout" element={<CheckoutPage />} /> 
        <Route path="/order-customer/travel/list" element={<ListTiketTravelCustomer />} />
        <Route path="/order-customer/travel/pemesanan" element={<FormFinalTravel />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/mitra" element={<Mitra />} />
        <Route path="/artikel-list" element={< FormArtikel />} />
        <Route path="/artikel_admin" element={< ArtikelAdmin />} />
        <Route path="/faq-list" element={< FormFaq />} />
        <Route path="/faqadmin" element={< FAQAdmin />} />
        <Route path="/pelanggan" element={< User />} />
        <Route path="/testimoni-admin" element={< TestimoniAdmin />} />
        <Route path="/produk/paket-wisata" element={< PaketWisataAdmin />} />
        <Route path="/produk/travel" element={< TravelAdmin />} />
        <Route path="/laporan" element={< SalesReportAdmin />} />
        <Route path="/produk/tiket-pesawat" element={< TiketPesawat />} />
        <Route path="/produk/travel" element={< TravelAdmin />} /> 
        <Route path="/daftar-admin" element={< DaftarAdmin />} /> 
        <Route path="/daming" element={< Daming />} /> 
        <Route path="/loyalitas" element={< Loyalitas />} /> 
        <Route path="/loyalitas-grafik" element={< LoyaltyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
