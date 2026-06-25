import { NavLink, Outlet } from 'react-router-dom'
import { Home, List, LogOut, Phone, Send, UserCircle2, MessagesSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'

const MainLayout = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('You logged out successfully')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_30%),linear-gradient(135deg,#f7fffb_0%,#f4efe2_100%)] text-slate-800">
      <nav className="sticky top-0 z-20 border-b border-emerald-100/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-emerald-700">
            <span className="rounded-full bg-emerald-600 p-2 text-white">🐄</span> QurbaniHat
          </NavLink>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-700 sm:gap-6">
            <NavLink to="/" className="flex items-center gap-1 hover:text-emerald-600"><Home size={16} /> Home</NavLink>
            <NavLink to="/animals" className="flex items-center gap-1 hover:text-emerald-600"><List size={16} /> All Animals</NavLink>
            {user ? (
              <>
                <NavLink to="/my-profile" className="flex items-center gap-1 hover:text-emerald-600"><UserCircle2 size={16} /> Profile</NavLink>
                <button onClick={handleLogout} className="flex items-center gap-1 rounded-full border border-emerald-300 px-3 py-1.5 text-emerald-700 hover:bg-emerald-50"><LogOut size={16} /> Logout</button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="rounded-full border border-emerald-400 px-3 py-1.5 text-emerald-700 hover:bg-emerald-50">Login</NavLink>
                <NavLink to="/register" className="rounded-full bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700">Register</NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-emerald-100 bg-[#133b2e] text-emerald-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="mb-3 text-lg font-semibold">QurbaniHat</h3>
            <p className="text-sm text-emerald-100/80">A premium marketplace for healthy livestock booking for Eid-ul-Adha.</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <p className="mb-2 flex items-center gap-2 text-sm text-emerald-100/80"><Phone size={16} /> +880 1712 345678</p>
            <p className="text-sm text-emerald-100/80">support@qurbanihat.com</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-3 text-sm text-emerald-100/80">
              <a href="#" className="flex items-center gap-2 rounded-full border border-emerald-200/30 px-3 py-2"><MessagesSquare size={16} /> Facebook</a>
              <a href="#" className="flex items-center gap-2 rounded-full border border-emerald-200/30 px-3 py-2"><Send size={16} /> Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
