import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import SalesManagement from './pages/SalesManagement';
import CustomerManagement from './pages/CustomerManagement';
import FAQ from './pages/FAQ';
import Armada from './pages/Armada';
import FormSupirArmada from './pages/FormSupirArmada';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/penjualan" element={<SalesManagement />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/armada" element={<Armada />} />
        <Route path="/armada/form-armada" element={<FormSupirArmada />} />
      </Route>
    </Routes>
  );
}

export default App;
