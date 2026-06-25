import { NavLink, Outlet } from 'react-router-dom'
import { Home, List, LogOut, Phone, Send, UserCircle2, MessagesSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Layout = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('qurbani-user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem('qurbani-user')
      setUser(stored ? JSON.parse(stored) : null)
    }
    window.addEventListener('qurbani-user-updated', syncUser)
    return () => window.removeEventListener('qurbani-user-updated', syncUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('qurbani-user')
    setUser(null)
    toast.success('You logged out successfully')
    window.dispatchEvent(new Event('qurbani-user-updated'))
  }

  return (
    <div className="min-h-screen bg-[#fffaf3] text-slate-800">
      <nav className="sticky top-0 z-20 border-b border-amber-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-amber-700">
            <span className="rounded-full bg-amber-500 p-2 text-white">🐄</span> QurbaniHat
          </NavLink>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-700 sm:gap-6">
            <NavLink to="/" className="flex items-center gap-1 hover:text-amber-600"><Home size={16} /> Home</NavLink>
            <NavLink to="/animals" className="flex items-center gap-1 hover:text-amber-600"><List size={16} /> All Animals</NavLink>
            {user ? (
              <>
                <NavLink to="/my-profile" className="flex items-center gap-1 hover:text-amber-600"><UserCircle2 size={16} /> Profile</NavLink>
                <button onClick={handleLogout} className="flex items-center gap-1 rounded-full border border-amber-300 px-3 py-1.5 text-amber-700 hover:bg-amber-50"><LogOut size={16} /> Logout</button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="rounded-full border border-amber-400 px-3 py-1.5 text-amber-700 hover:bg-amber-50">Login</NavLink>
                <NavLink to="/register" className="rounded-full bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700">Register</NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-amber-200 bg-[#1f2a1f] text-amber-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <h3 className="mb-3 text-lg font-semibold">QurbaniHat</h3>
            <p className="text-sm text-amber-100/80">A trusted marketplace for healthy livestock booking for Qurbani.</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <p className="mb-2 flex items-center gap-2 text-sm text-amber-100/80"><Phone size={16} /> +880 1712 345678</p>
            <p className="text-sm text-amber-100/80">support@qurbanihat.com</p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-3 text-sm text-amber-100/80">
              <a href="#" className="flex items-center gap-2 rounded-full border border-amber-200/30 px-3 py-2"><MessagesSquare size={16} /> Facebook</a>
              <a href="#" className="flex items-center gap-2 rounded-full border border-amber-200/30 px-3 py-2"><Send size={16} /> Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
