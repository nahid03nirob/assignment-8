import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import { AppProviders } from './providers/AppProviders'
import { ProtectedRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import Animals from './pages/Animals'
import Details from './pages/Details'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
