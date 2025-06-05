import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import CustomerManagement from './pages/CustomerManagement';
import FormSupirArmada from './pages/FormSupirArmada';
import Armada from './pages/Armada';
import PemesananTiket from './pages/PemesananTiket';
import DataFeedback from './pages/FeedbackPelanggan';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />

        {/* Armada Routes */}
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
