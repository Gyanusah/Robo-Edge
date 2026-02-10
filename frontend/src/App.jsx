import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import SinglePage from './pages/SinglePage'
import Gallery from './pages/Gallery'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import NoticePopup from './components/NoticePopup'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SinglePage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <NoticePopup />
    </BrowserRouter>
  )
}

export default App
