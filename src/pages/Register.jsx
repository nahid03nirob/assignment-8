import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', photo: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    register({ ...form, photo: form.photo || '' })
    toast.success('Registration successful. Welcome aboard!')
    navigate('/my-profile')
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center rounded-4xl border border-emerald-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-800">Register</h2>
      <p className="mt-2 text-slate-600">Create your account to book animals and track your profile.</p>
      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Name" />
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Email" />
        <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Photo URL (optional)" />
        <input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 outline-none" placeholder="Password" />
        <button className="w-full rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">Register</button>
      </form>
      <p className="mt-4 text-sm text-slate-600">Already a member? <Link to="/login" className="font-semibold text-emerald-700">Login</Link></p>
    </div>
  )
}

export default Register
