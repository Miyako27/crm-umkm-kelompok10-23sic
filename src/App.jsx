import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import CustomerManagement from './pages/CustomerManagement';
// import FAQ from './pages/FAQ';
import Armada from './pages/Armada';
import PemesananTiket from './pages/PemesananTiket';
import DataFeedback from './pages/FeedbackPelanggan';
import FormSupirArmada from './pages/FormSupirArmada';
import Home from './customers/Home';
import FAQ from './pages/FAQ';
import Login from './customers/Login';
import Artikel from './customers/Artikel';
import ArtikelDetail from './customers/ArtikelDetail';
import Profil from './customers/Profil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kontak" element={<Kontak />} />
      <Route path="/testimoni" element={<Testimoni />} />

      <Route path="/" element={<Home/>} />
      <Route path="/artikel" element={<Artikel />} />
      <Route path="/artikel/:id" element={<ArtikelDetail />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/login" element={<Login/>} />
      
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/armada" element={<Armada />} />
        <Route path="/armada/form-armada" element={<FormSupirArmada />} />

        {/* Pemesanan Tiket Routes */}
        <Route path="/pemesanan_tiket" element={<PemesananTiket />} />

        {/* Pemesanan Tiket Routes */}
        <Route path="/feedback_pelanggan" element={<DataFeedback />} />
      </Route>
    </Routes>
  );
}

export default App;
