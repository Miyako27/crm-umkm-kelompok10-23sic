import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import CustomerManagement from './pages/CustomerManagement'
import FAQ from './pages/FAQ'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Route>
    </Routes>
  )
  
}

export default App

