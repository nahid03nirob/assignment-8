import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const existing = JSON.parse(localStorage.getItem('qurbani-user') || 'null')
    if (!existing || existing.email !== form.email || existing.password !== form.password) {
      toast.error('Invalid credentials. Use the registered email and password.')
      return
    }
    login(existing)
    toast.success('Login successful')
    navigate('/')
  }

  const handleGoogleLogin = () => {
    login({ name: 'Google User', email: 'google.user@example.com', photo: '', password: 'google' })
    toast.success('Signed in with Google')
    navigate('/')
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[2rem] border border-emerald-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-800">Login</h2>
      <p className="mt-2 text-slate-600">Sign in to reserve animals and manage your profile.</p>
      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Email" />
        <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Password" />
        <button className="w-full rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="mt-4 w-full rounded-full border border-emerald-300 px-4 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50">Continue with Google</button>
      <p className="mt-4 text-sm text-slate-600">New here? <Link to="/register" className="font-semibold text-emerald-700">Create an account</Link></p>
    </div>
  )
}

export default Login
